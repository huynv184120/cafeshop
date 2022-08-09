const orderRouter = require('./order.router');
const productRouter = require('./product.router');
const authRouter = require('./auth.router');
const router = require('express').Router();

router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/auth', authRouter);
module.exports = router;