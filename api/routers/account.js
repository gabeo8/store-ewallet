const express = require('express');
const router = express.Router();

const AccountController = require('../controllers/account');
const userAuth = require('../middleware/userAuth');

// user auth
router.get('/', userAuth, AccountController.get_info_account);
router.post('/deposit', userAuth, AccountController.deposit_account);
// admin auth

module.exports = router;
