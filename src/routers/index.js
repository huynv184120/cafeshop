const orderRouter = require('./order.router');
const productRouter = require('./product.router');
const authRouter = require('./auth.router');
const router = require('express').Router();
const userRouter = require('./user.router');
const {verifyTokenMidlewares} = require('../middlewares/authMidlewares');

router.use('/orders', verifyTokenMidlewares ,orderRouter);
router.use('/products', productRouter);
router.use('/auth', authRouter);
router.use('/users', verifyTokenMidlewares, userRouter);
module.exports = router;