const orderRouter = require('./order.router');
const productRouter = require('./product.router');

const route = (app) => {
    app.use('apis/orders', orderRouter);
}
module.exports = route;