const OrderModel = require("../models/order.model");

const orderService = {
    getListOrder: async () => {
        
    },
    getOrderById: async () => {

    },
    createOrder: async (orderInfo) => {
        await OrderModel.create(orderInfo);
    },
    updateOrder: async () => {

    },
    deleteOrder: async () => {

    }

}

module.exports = orderService;