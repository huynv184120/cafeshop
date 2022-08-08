const userRouter = require('express').Router();
const { successResponse, ResponseData } = require('../../commons/response');
const userService = require('../../services/user.service');
const asyncHandler = require('../../utils/asyncHandler');


userRouter.put('/:id',asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const role = req.body.role;
    if (!['shop','user'].includes(role))
        return failureResponse({message:'Invalid role'});
    const result = await userService.assignRole(userId, role);
    return successResponse(res, new ResponseData({}));
}));


