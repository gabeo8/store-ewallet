const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');

// no auth
router.post('/signup', UserController.user_signup);
router.post('/login', UserController.user_login);

// user auth
router.patch('/:userId', userAuth, UserController.user_update);

// admin auth
router.delete('/:userId', [adminAuth, userAuth], UserController.user_delete);

module.exports = router;
