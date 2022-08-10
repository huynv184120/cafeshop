const authRouter = require('express').Router();
const authService = require('../services/auth.service');
const { successResponse, ResponseData } = require('../commons/response');
const asyncHandler = require('../utils/asyncHandler');


authRouter.post(
    '/signin', 
    asyncHandler(async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const result = await authService.login({email, password});
        return successResponse(res, new ResponseData({result: result}));
    })
);
authRouter.post(
    '/signup', 
    asyncHandler(async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        const result = await authService.signup({email, password, phone});
        return successResponse(res, new ResponseData({result: result}));
    })
)

module.exports = authRouter;