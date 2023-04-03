const Cart = require('../models/Cart');
const Order = require('../models/Order');
const catchAsync = require('../utils/catchAsync');

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().populate('user');

  res.status(200).json({
    message: 'success',
    data: orders,
  });

  next();
});

exports.checkout = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const cart = await Cart.findOne({ userId: userId }).populate({
    path: 'products.productId',
  });

  const { products } = cart;

  const amount = cart.products
    .map((product) => product.quantity * product.productId.price)
    .reduce((acc, curr) => acc + curr);

  const payload = {
    userId,
    products,
    amount,
    date: Date.now(),
  };

  const order = await Order.create(payload);
  await Cart.findOneAndDelete({ userId: userId }); //remove cart from DB
  res.status(200).json({
    message: 'success',
    data: order,
  });
  next();
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const orders = await Order.find({ userId: userId });

  res.status(200).json({
    message: 'success',
    data: orders,
  });
});
