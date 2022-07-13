const orderRouter = require('./order.router');
const productRouter = require('./product.router');
const router = require('express').Router();

router.use('/orders', orderRouter);
router.use('/products', productRouter);

module.exports = router;