const productService = require('../services/product.service');
const { successResponse, ResponseData } = require('../commons/response');
const asyncHandler = require('../utils/asyncHandler');

const productRouter = require('express').Router();

productRouter.get('', asyncHandler(async (req, res) => {
    res.json('product');
}));

productRouter.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await productService.getProductById(id);
    return successResponse(res, new ResponseData({ result }));
}));

productRouter.post('', asyncHandler(async (req, res) => {
    res.json('product');
}));

productRouter.put('/:id', asyncHandler(async (req, res) => {
    res.json('product');
}));

productRouter.delete('/id', asyncHandler(async (req, res) => {
    res.json('product');
}));

module.exports = productRouter;