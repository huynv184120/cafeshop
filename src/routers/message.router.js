const asyncHandler = require('../utils/asyncHandler');
const messageRouter = require('express').Router();
const userService = require('../services/user.service');
const messageService = require('../services/message.service');
const {successResponse, ResponseData} = require('../commons/response');
messageRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const page = req.query.page || 1;
        const isPaging = req.query.isPaging || true;
        const pageSize = req.query.pageSize || 50;
        const user = userService.findUserById(req.credentials.id);
        const roomId = user.room;
        const result = await messageService.getListMessageInRoom({roomId,page,isPaging,pageSize});
        return successResponse(res, new ResponseData({result}));
    })
);