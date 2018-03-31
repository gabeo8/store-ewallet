const express = require('express');
const router = express.Router();


const UserController = require('../controllers/user');
const AccountController = require('../controllers/account');

const userAuth = require('../middleware/userAuth');

router.post('/', userAuth, AccountController.order_payment)

module.exports = router;
