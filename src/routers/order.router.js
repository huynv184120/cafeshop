const orderRouter = require('express').Router();
const { successResponse, ResponseData } = require('../commons/response');
const orderService = require('../services/order.service');

orderRouter.get('', async (req, res) => {
    const page = req.query.page || 1;
    const isPaging = req.query.isPaging || true;
    const pageSize = req.query.pageSize || 10;
    const { startTime, endTime, status } = req.query;
    const result = await orderService.getListOrder({ page, isPaging, pageSize, filter: { startTime, endTime, status } });
    return successResponse(res, new ResponseData({result}));
});

orderRouter.get('/:id', async (req, res) => {
    const order_id = req.params.id;
    const result = await orderService.getOrderById(order_id);
    return successResponse(res, new ResponseData({result}));
});

orderRouter.post('', async (req, res) => {
    const address = req.body.address;
    const orderItems = req.body.items;
    await orderService.createOrder({address, orderItems});
    return successResponse(res, new ResponseData());
});

orderRouter.put('/:id', async (req, res) => {
    const order_id = req.params.id;
    const address = req.body.address;
    const orderItems = req.body.items;
    await orderService.updateOrder(order_id, {address, orderItems});
    return successResponse(res, new ResponseData());
});

orderRouter.delete('/:id', async (req, res) => {
    const order_id = req.params.id;
    await orderService.deleteOrder(order_id);
    return successResponse(res, new ResponseData());
});

module.exports = orderRouter;