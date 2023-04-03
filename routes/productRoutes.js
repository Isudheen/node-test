const express = require('express');

const catchAsync = require('../utils/catchAsync');
const productController = require('../controllers/productController');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.addProduct);

router
  .route('/:productId')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.removeProduct);

module.exports = router;
