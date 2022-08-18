const mysqlQuery = require('../utils/mysql');
const moment = require('moment');

class Order {
    constructor({ id, total, orderTime, status, items, note }) {
        this.id = id;
        this.total = total || null,
        this.orderTime = orderTime || null;
        this.status = status;
        this.items = items || [];
        this.note = note || '';
    }
};

class Item {
    constructor({productId, orderId, amount, total}){
        this.productId = productId;
        this.orderId = orderId;
        this.amount = amount;
        this.total = total;
    }
}

mapToOrder = (args) => {
    const order = new Order({});
    order.id = args['order_id'];
    order.total = args['total'];
    order.note = args['note'];
    order.orderTime = args['order_time'];
    order.status = args['order_status'];
    order.customerId = args['customer_id'];
    order.employeeId = args['employee_id'];
    return order;
}

mapToItem = (args) => {
    const item = new Item({});
    item.productId = args['product_id'];
    item.orderId = args['order_id'];
    item.amount = args['amount'];
    item.total = args['total'];
    
    return item;
}

class OrderModel {
    constructor() {
        this.tableName = 'OrderBill';
    };

    create = async(orderInfo) => {
        const order = new Order(orderInfo);
        const sql = `INSERT INTO ${this.tableName}(total, order_time, order_status, note, customer_id, employee_id) VALUES (${order.total}, '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', ${order.status} ,'${order.note}', '${order.customerId}', '${order.employeeId}') ;`
        let result = await mysqlQuery(sql);
        const orderId = result.data.rows.insertId;
        const items = order.items.map(item => new Item({...item, orderId}));
        let values = items.map(item => ` ( ${item.orderId} , ${item.productId} , ${item.amount} , ${item.total}) `);
        values = values.join(' , ');
        const sql1 = `INSERT INTO OrderDetail(order_id , product_id , amount, total) VALUES ${values} ;`;
        result = await mysqlQuery(sql1);
        return {success: result.success};
    };

    findById = async (id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE order_id = ${id} ;`;
        const result =  await mysqlQuery(sql);
        let order;
        if(result.success && result.data.rows[0]){
            order = mapToOrder(result.data.rows[0]);
            const sql1 = `SELECT * FROM OrderDetail WHERE order_id = ${id} ;`;
            const result1 = await mysqlQuery(sql1);
            if(result1.success){
                order.items = result1.data.rows.map((item) => mapToItem(item));
            }
        }
        return {success:result.success, data:order};
    };

    find = async(filter, limit, offset) => {
        let condition = [' 1 '];
        if(filter.startTime && filter.endTime){
            condition.push(`( order_time BETWEEN' ${filter.startTime} AND  ${filter.endTime} ) ;`);
        }
        if(filter.status){
            condition.push(`( order_status = ${filter.status} )`);
        }
        if(filter.customerId){
            condition.push(`( customer_id = ${filter.customerId} )`);
        }
        if(filter.employeeId){
            condition.push(`( employee_id = ${filter.employeeId} )`);
        }
        condition = condition.join(' AND ');

        const sql = `SELECT * FROM ${this.tableName} WHERE ${condition} LIMIT ${limit} OFFSET ${offset} ;`;
        const result = await mysqlQuery(sql);
        let data;
        if(result.success){
            data = result.data.rows.map(order => mapToOrder(order));
        }
        return {success:result.success, data};
    };

    deleteById = async (id) => {
        let sql = `DELETE FROM OrderDetail WHERE order_id = ${id} ;`;
        let result = await mysqlQuery(sql);
        if(result.success){
            sql = ` DELETE FROM ${this.tableName} WHERE order_id = ${id} ;`;
            result = await mysqlQuery(sql);
        }
        return {success: result.success};
    };

    count = async (filter) => {
        let condition = [' 1 '];
        if(filter.startTime && filter.endTime){
            condition.push(`( order_time BETWEEN' + ${filter.startTime} AND  ${filter.endTime} ) ;`);
        if(filter.status){
            condition.push(`( order_status = ${filter.status} )`);
        }
        condition = condition.join(' AND ');
        const sql = `SELECT COUNT(order_id) as amount FROM ${this.tableName} WHERE ${condition} ;`;
        const result = await mysqlQuery(sql);
        return result;
    };
    }
}

const orderModel = new OrderModel();

module.exports = orderModel;