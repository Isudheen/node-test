const catchAsync = require('../utils/catchAsync');
const Product = require('../models/Product');

//PRODUCTS

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    message: 'success',
    data: products,
  });
  next();
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const id = req.params.productId;
  const product = await Product.findById(id);

  res.status(200).json({
    message: 'success',
    data: product,
  });
  next();
});

exports.addProduct = catchAsync(async (req, res, next) => {
  const payload = { ...req.body };
  const product = await Product.create(payload);

  res.status(200).json({
    message: 'success',
    data: product,
  });
  next();
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const id = req.body.productId;
  const payload = { ...req.body };

  const product = await Product.findByIdAndUpdate(id);

  res.status(200).json({
    message: 'success',
    data: product,
  });
  ``;
  next();
});

exports.removeProduct = catchAsync(async (req, res, next) => {
  const id = req.params.productId;

  const product = await Product.findByIdAndDelete(id);

  res.status(200).json({
    message: 'success',
    data: product,
  });

  next();
});
