const mysqlQuery = require('../utils/mysql');
moment = require('moment')

class Order {
    constructor({ id, total, orderTime, address, status, items, note }) {
        this.id = id;
        this.total = total || null,
        this.orderTime = orderTime || null;
        this.address = address || '';
        this.status = status || null;
        this.items = items || null;
        this.note = note || null
    }
};


class OrderModel {
    constructor() {
        this.tableName = 'OrderBill';
    };

    create = async (orderInfo) => {
        const order = new Order(orderInfo);
        const sql = `INSERT INTO ${this.tableName}(total, order_time, address, order_status, note) VALUES (${order.total}, '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', '${order.address}', ${order.status},'${order.note}');`
        const createdOrderInfo = await mysqlQuery(sql);
        const order_id = createdOrderInfo.data.rows.insertId;
    };
    

}

const orderModel = new OrderModel();

module.exports = orderModel;