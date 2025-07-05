const { Router } = require('express');
const router = Router();
const { getAllOrders, createOrder, editOrderStatus, Dashboard, getOrdersByUser } = require('../controller/order');
const { isAdmin, isAuth } = require('../middleware/auth.js');

router.get('/', isAdmin, getAllOrders);
router.post('/', isAuth, createOrder);
router.put('/:id/status', isAdmin, editOrderStatus);
router.get('/dashboard', isAdmin, Dashboard)
router.get('/user/:userId', isAuth, getOrdersByUser);

module.exports = router;
