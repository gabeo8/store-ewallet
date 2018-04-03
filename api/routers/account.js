const express = require('express');
const router = express.Router();

const AccountController = require('../controllers/account');
const userAuth = require('../middleware/userAuth');

// user auth
router.get('/', userAuth, AccountController.get_info_account);
/*
GET /account
return {
    "balanced": 1776,
    "historyDeposit": [
        {
            "_id": "5ac26428f3c220077c493c8d",
            "createAt": "2018-04-02T17:11:04.121Z",
            "numberDeposit": 888
        },
        {
            "_id": "5ac2644eeac10a0504ccb104",
            "createAt": "2018-04-02T17:11:42.663Z",
            "numberDeposit": 888
        }
    ],
    "historyOrder": [],
    "_id": "5ac26372c7a0981d90c6dc4e",
    "accountId": {
        "avatar": "",
        "phone": "",
        "address": "",
        "createAt": "2018-04-02T17:08:02.752Z",
        "_id": "5ac26372c7a0981d90c6dc4d",
        "name": "admin",
        "email": "admin@admin.com",
        "password": "$2a$10$ka2VkiLVpWZ538npC79zB.M7hCvs/y6agIv28QqF1.v.wrfqLEMF.",
        "__v": 0
    },
    "__v": 0
}
*/

router.post('/deposit', userAuth, AccountController.deposit_account);
/*
POST /account/deposit
{
  "numberDeposit": 888
}
return {
  "message": "Deposit Ok"
}
*/
// admin auth

module.exports = router;
