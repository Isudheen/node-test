const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get().post(authController.signUp);

router.post('/login', authController.login);

module.exports = router;
