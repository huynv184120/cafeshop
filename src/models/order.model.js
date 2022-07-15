const mysqlQuery = require('../utils/mysql');
moment = require('moment')

class Order {
    constructor({ id, total, orderTime, address, status, items, note }) {
        this.id = id;
        this.total = total || null,
        this.orderTime = orderTime || null;
        this.address = address || '';
        this.status = status || null;
        this.items = items || [];
        this.note = note || null
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

class OrderModel {
    constructor() {
        this.tableName = 'OrderBill';
    };

    create = async(orderInfo) => {
        const order = new Order(orderInfo);
        const sql = `INSERT INTO ${this.tableName}(total, order_time, address, order_status, note) VALUES (${order.total}, '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', '${order.address}', ${order.status},'${order.note}') ;`
        const createdOrderInfo = await mysqlQuery(sql);
        const orderId = createdOrderInfo.data.rows.insertId;
        const items = order.items.map(item => new Item({...item, orderId}));
        let values = items.map(item => ` ( ${item.orderId} , ${item.productId} , ${item.amount} , ${item.total}) `);
        values = values.join(' , ');
        const sql1 = `INSERT INTO OrderDetail Values(order_id , product_id , amount, total) VALUES ${values} ;`;
        const result = await mysqlQuery(sql1);
        return result;
    };

    findById = async (id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE order_id = ${id} ;`;
        const result =  await mysqlQuery(sql);
        return result;
    };

    find = async(filter, limit, offset) => {
        let condition = [' 1 '];
        if(filter.startTime && filter.endTime){
            condition.push(`( order_time BETWEEN' + ${filter.startTime} AND  ${filter.endTime} ) ;`);
        if(filter.status){
            condition.push(`( order_status = ${filter.status} )`);
        }
        condition = condition.join(' AND ');
        const sql = `SELECT * FROM ${this.tableName} WHERE ${condition} LIMIT ${limit} OFFSET ${offset} ;`;
        const result = await mysqlQuery(sql);
        return result;
    }};

    deleteById = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE order_id = ${id} ; DELETE FROM OrderDetail WHERE order_id = ${id} ;`;
        const result = await mysqlQuery(sql);
        return result;
    };
    

}

const orderModel = new OrderModel();

module.exports = orderModel;