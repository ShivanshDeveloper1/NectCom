const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders } = require('../controller/orderController');

router.post('/', createOrder);
router.get('/', getAllOrders);

module.exports = router;