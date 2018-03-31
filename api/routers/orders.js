const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order');

const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');

// user auth
router.get('/:idOrder', userAuth, OrderController.get_order)
router.post('/:idOrder', userAuth, OrderController.create_order)
router.delete(':/idOrder', userAuth, OrderController.delete_order)
// admin auth
router.get('/', userAuth, OrderController.get_all_orders)


module.exports = router;
