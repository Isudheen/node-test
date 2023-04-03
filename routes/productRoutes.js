const express = require('express');

const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.adminProtect,
    productController.getAllProducts
  )
  .post(
    authController.protect,
    authController.adminProtect,
    productController.addProduct
  );

router
  .route('/:productId')
  .get(
    authController.protect,
    authController.adminProtect,
    productController.getProduct
  )
  .patch(
    authController.protect,
    authController.adminProtect,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.adminProtect,
    productController.removeProduct
  );

module.exports = router;
