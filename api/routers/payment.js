const express = require('express');
const router = express.Router();


const UserController = require('../controllers/user');
const AccountController = require('../controllers/account');

const userAuth = require('../middleware/userAuth');

router.post('/', userAuth, AccountController.order_payment)
/*
POST /payment
{
	"_id": "5ac3a59cd9f23e0c14c82c79"
}

return {
    "message": "Payment Success"
}

*/

module.exports = router;
