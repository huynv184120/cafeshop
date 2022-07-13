const ProductModel = require('../models/product.model');
const {NotFoundError} = require('../commons/error');
const productService = {
    getProductById: async(id) => {
        const product = await ProductModel.findById(id);
        if(!product){
            throw new NotFoundError();
        }
        return product;
    },
    // createProduct: async(productInfo) => {
    //     const product = 
    // }
}

module.exports = productService;