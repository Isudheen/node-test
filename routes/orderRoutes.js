const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/:userId', authController.protect, orderController.getOrders);

router
  .route('/checkout/:userId')
  .get(authController.protect, orderController.checkout);

module.exports = router;
