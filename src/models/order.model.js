const mysqlConnection = require('../utils/mysql');
class Order {
    constructor({ id, total, orderTime, address, status, items }) {
        this.id = id;
        this.total = total || null,
        this.orderTime = orderTime || null;
        this.address = address || null;
        this.status = status || null;
        this.items = items || null;
    }
};


class OrderModel {
    constructor() {
        this.tableName = 'OrderBill';
    };

    create = async (orderInfo) => {
        const order = new Order(orderInfo);
        const sql = `INSERT INTO ${this.tableName}(total, order_time, address, status) VALUES (${order.total}, ${order.orderTime}, ${order.address}, ${order.status});`
        await mysqlConnection.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
        });

    };
    

}

const orderModel = new OrderModel();

module.exports = orderModel;