const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

exports.signUp = catchAsync(async (req, res, next) => {
  const payload = {
    name: req.body.name,
    password: req.body.password,
  };

  payload.password = await bcrypt.hash(payload.password, 11);

  const user = await User.create(payload);

  const { password, ...newUser } = user;

  const token = signToken(user.name);

  res.cookie('jwt', token);

  res.status(200).json({
    message: 'success',
    token,
    data: newUser,
  });
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ name: req.body.name });
  if (!user) throw new Error('No user found');

  const userVerify = await bcrypt.compare(req.body.password, user.password);
  if (!userVerify) throw new Error('Incorrect password');

  const { password, ...newUser } = user;

  const token = signToken(user.name);

  res.cookie('jwt', token);

  res.status(200).json({
    message: 'success',
    token,
    data: newUser,
  });
  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.jwt) {
    token = req.headers.jwt;
  }

  if (!token) throw new Error('Not logged in, Please login or signup');

  const verify = jwt.verify(token, process.env.JWT_SECRET);
  // { id: 'Harry', iat: 1680512765 }

  const user = await User.findOne({ name: verify.id });
  req.user = user; //assigning user to the request body
  next();
});

exports.adminProtect = catchAsync(async (req, res, next) => {
  const userRole = req.user.role;
  if (userRole != 'admin') throw new Error('Unauthorized');

  next();
});
