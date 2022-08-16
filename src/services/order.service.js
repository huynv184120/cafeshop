const OrderModel = require("../models/order.model");
const ProductModel = require('../models/product.model');

const {NotFoundError, BadRequestError} = require('../commons/error');

const orderService = {
    getListOrder: async ({ page, isPaging, pageSize, filter}) => {
        const skip = pageSize * (page - 1);
        const result = await OrderModel.find(filter, pageSize, skip);
        if(result.success){
            return result.data;       
        }else{
            throw new NotFoundError({});
        }
    },
    getOrderById: async (id) => {
        const result = await OrderModel.findById(id);
        if(result.data){
            const note = JSON.parse(result.data.note);
            return {...result.data, ...note};       
        }else{
            throw new NotFoundError({});
        }
    },
    createOrder: async (orderInfo) => {
        const listItem = orderInfo.items.map(item => ProductModel.findById(item.productId));
        let productList = await Promise.all(listItem);
        productList = productList.map((item) => item.data);
        orderInfo.items = orderInfo.items.map((item, index) => ({...item, total:(productList[index].price-productList[index].discount)*item.amount}));
        orderInfo.total = orderInfo.items.reduce((total, cur) => total + cur.total , 0);
        orderInfo.status = 0;
        order.note = JSON.stringify({phone: orderInfo.phone, address: orderInfo.address, note: orderInfo.note});
        const result = await OrderModel.create(orderInfo);
        if(!result.success){
            throw new BadRequestError({});
        }
        return result.success;
    },
    updateOrder: async (id, newOder) => {
        await orderService.deleteOrder(id);
        return orderService.createOrder(newOder);
    },
    deleteOrder: async (id) => {
        const result = await OrderModel.deleteById(id);
        if(!result.success){
            throw new BadRequestError({});
        }
        return result.success;
    }

}

module.exports = orderService;