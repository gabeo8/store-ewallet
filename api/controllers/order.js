const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

// user auth
exports.get_order = (req, res, next) => {};
exports.create_order = (req, res, next) => {
  Product.findById(req.body.productId)
    .exec()
    .then(product => {
      if (!product) {
        res.status(404).json({
          message: 'Product not found'
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        ownerUid: req.user_data.userId,
        product: req.body.productId,
        quatityBuy: req.body.quatityBuy
      });
      return order.save();
    })
    .then(result => {
      // console.log(result);
      res.status(201).json({
        message: 'Order stored',
        createdOrder: {
          _id: result._id,
          product: result.ownerUid,
          product: result.product,
          quatityBuy: result.quantity
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// admin auth
exports.get_all_orders = (req, res, next) => {};

exports.delete_order = (req, res, next) => {};
