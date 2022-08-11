const userRouter = require('express').Router();
const { successResponse, ResponseData } = require('../commons/response');
const userService = require('../services/user.service');
const asyncHandler = require('../utils/asyncHandler');
const { BadRequestError } = require('../commons/error');
const roleApp = require('../commons/role');

userRouter.put('/:id',asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const role = req.body.role;
    if (![roleApp.shop, roleApp.user].includes(role))
        throw new BadRequestError({message:'Invalid role'});
    const result = await userService.assignRole(userId, role);
    return successResponse(res, new ResponseData({}));
}));

userRouter.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const userId = req.params.id;
        const result = await userService.findUserById(userId);
        return successResponse(res, new ResponseData({result: {id: result._id, email: result.email, 
            phone: result.phone, role: result.role}}));
    }
))

module.exports = userRouter;