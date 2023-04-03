const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/:userId', orderController.getOrders);

router.route('/checkout/:userId').get(orderController.checkout);

module.exports = router;
