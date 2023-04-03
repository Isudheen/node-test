const catchAsync = require('../utils/catchAsync');
const Cart = require('../models/Cart');

exports.addToCart = catchAsync(async (req, res, next) => {
  const userId = req.query.userId;
  const productId = req.query.productId;
  const quantity = req.query.quantity;
  const payload = {
    userId,
    products: [
      {
        productId,
        quantity,
      },
    ],
  };

  let cart = await Cart.findOne({ userId: userId });

  if (!cart) {
    cart = await Cart.create(payload);
    res.status(200).json({
      message: 'success',
      data: cart,
    });
    next();
  }
  const product = cart.products.filter((el) => el.productId == productId);
  if (product.length) {
    cart.products.forEach((el) => {
      if (el.productId == productId) {
        el.quantity = quantity;
      }
    });
  } else {
    cart.products.push(payload.products[0]);
  }
  await cart.save();
  res.status(200).json({
    message: 'success',
    data: cart,
  });
  next();
});
