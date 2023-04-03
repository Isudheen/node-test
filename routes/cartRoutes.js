const express = require('express');

const catchAsync = require('../utils/catchAsync');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.route('/').post(cartController.addToCart);

module.exports = router;
