const { Router } = require('express');
const router = Router();
const { getAllOrders, createOrder, editOrderStatus, Dashboard } = require('../controller/order');
const { isAdmin, isAuth } = require('../middleware/auth.js');

router.get('/', isAdmin, getAllOrders);
router.post('/', isAuth, createOrder);
router.put('/:id/status', isAdmin, editOrderStatus);
router.get('/dashboard',isAdmin,Dashboard)

module.exports = router;
