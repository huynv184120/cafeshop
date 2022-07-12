const orderRouter = require('express').Router();

orderRouter.get('/', (req, res) => {
    res.json('order');
})

module.exports = orderRouter;