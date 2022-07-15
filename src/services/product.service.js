const ProductModel = require('../models/product.model');
const {NotFoundError, BadRequestError} = require('../commons/error');

const productService = {
    getProductById: async(id) => {
        const result = await ProductModel.findById(id);
        if(result.data){
            return result.data;       
        }else{
            throw new NotFoundError({});
        }
    },
    createProduct: async(productInfo) => {
        const result = await ProductModel.create(productInfo);
        if(!result.success){
            throw new BadRequestError({});
        }
        return result.success;
    },
    getListProduct: async({ page, isPaging, pageSize, filter})=>{
        // isPaging true is default
        const skip = pageSize * (page - 1);
        const result = await ProductModel.find(filter, pageSize, skip);
        if(result.success){
            return result.data;       
        }else{
            throw new NotFoundError({});
        }
    },
    updateProduct: async (id, {name, description, price, discount, status}) => {
        const result = await ProductModel.update(id, {name, description, price, discount, status});
        if(!result.success){
            throw new BadRequestError({});
        }
        return result.success;
    },
    deleteProduct: async (id) => {
        const result = await  ProductModel.deleteById(id);
        if(!result.success){
            throw new BadRequestError({});
        }
        return result.success;
    }
}

module.exports = productService;