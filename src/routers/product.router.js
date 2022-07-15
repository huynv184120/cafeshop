const productService = require('../services/product.service');
const { successResponse, ResponseData } = require('../commons/response');
const asyncHandler = require('../utils/asyncHandler');

const productRouter = require('express').Router();

productRouter.get('/', asyncHandler(async (req, res) => {
    // #swagger.tags = ['Product']
    const status = req.query.status;
    const page = req.query.page || 1;
    const isPaging = req.query.isPaging || true;
    const pageSize = req.query.pageSize || 10;
    const result = await productService.getListProduct({page, pageSize, isPaging, filter:{status}});
    return successResponse(res, new ResponseData({ result }));

}));

productRouter.get('/:id', asyncHandler(async (req, res) => {
    // #swagger.tags = ['Product']
    const id = req.params.id;
    const result = await productService.getProductById(id);
    return successResponse(res, new ResponseData({ result }));
}));

productRouter.post('/', asyncHandler(async (req, res) => {
    // #swagger.tags = ['Product']
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const discount = req.body.discount;
    const status = req.body.status;
    const result = await productService.createProduct({name, description, price, discount, status});
    return successResponse(res, new ResponseData({ result }));

}));

productRouter.put('/:id', asyncHandler(async (req, res) => {
    // #swagger.tags = ['Product']
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const discount = req.body.discount;
    const status = req.body.status;
    const result = await productService.updateProduct(id, {name, description, price, discount, status});
    return successResponse(res, new ResponseData({result}));
}));

productRouter.delete('/:id', asyncHandler(async (req, res) => {
    // #swagger.tags = ['Product']
    const id = req.params.id;
    const result = await productService.deleteProduct(id);
    return successResponse(res, new ResponseData({result}));
}));

module.exports = productRouter;