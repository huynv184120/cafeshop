const orderRouter = require('express').Router();
const { successResponse, ResponseData, failureResponse } = require('../../commons/response');
const orderService = require('../../services/order.service');
const asyncHandler = require('../../utils/asyncHandler');
const userService = require('../../services/user.service');
const appStatus = require('../../commons/appStatus');

orderRouter.get('/', asyncHandler(async (req, res) => {
    // #swagger.tags = ['Order']
    const page = req.query.page || 1;
    const isPaging = req.query.isPaging || true;
    const pageSize = req.query.pageSize || 10;
    const { startTime, endTime, status } = req.query;
    const result = await orderService.getListOrder({
        page, isPaging, pageSize,
        filter: { startTime, endTime, status }
    });
    return successResponse(res, new ResponseData({ result }));
}));

orderRouter.get('/:id', asyncHandler(async (req, res) => {
    // #swagger.tags = ['Order']
    const order_id = req.params.id;
    const result = await orderService.getOrderById(order_id);
    return successResponse(res, new ResponseData({ result }));
}));

orderRouter.post('/', asyncHandler(async (req, res) => {
    // #swagger.tags = ['Order']
    const userId = req.credentials.id;
    const supporter = userService.getSupporter(userId)?.userId;
    if (!supporter) {
        return failureResponse(res, {
            message: "xin lỗi hiện không co nhân viên nào phục vụ, vui lòng quay lại sau",
            appStatus: appStatus.NO_EMPLOYEES_ONLINE
        })
    }
    await orderService.createOrder({
        ...req.body, customerId: userId,
        employeeId: supporter
    });
    return successResponse(res, new ResponseData({}));
}));

orderRouter.put('/:id', asyncHandler(async (req, res) => {
    // #swagger.tags = ['Order']
    const order_id = req.params.id;
    const address = req.body.address;
    const orderItems = req.body.items;
    await orderService.updateOrder(order_id, { address, orderItems });
    return successResponse(res, new ResponseData({}));
}));

orderRouter.delete('/:id', asyncHandler(async (req, res) => {
    // #swagger.tags = ['Order']
    const order_id = req.params.id;
    await orderService.deleteOrder(order_id);
    return successResponse(res, new ResponseData({}));
}));

module.exports = orderRouter;