const { Router } = require('express');
const router = Router();
const { getAllOrders, createOrder } = require('../controller/order');
const { isAdmin, isAuth } = require('../middleware/Auth.js');

router.get('/',isAdmin, getAllOrders);
router.post('/', isAuth,createOrder);
module.exports = router;