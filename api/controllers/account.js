const mongoose = require('mongoose');

const Account = require('../models/account');
const Order = require('../models/order');

exports.get_info_account = (req, res, next) => {
  // console.log(req.user_data.userId);
  Account.findOne({ accountId: req.user_data.userId })
    .populate('accountId')
    .exec()
    .then(doc => {
      console.log(doc);
      return res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.deposit_account = (req, res, next) => {
  const deposit = {
    createAt: new Date(),
    numberDeposit: req.body.balance
  };
  Account.findOne({ accountId: req.user_data.userId }, 'balanced')
    .exec()
    .then(doc => {
      Account.update(
        { accountId: req.user_data.userId },
        {
          $push: {
            historyDeposit: deposit
          },
          $set: {
            balanced: doc.balanced + deposit.numberDeposit
          }
        }
      )
        .exec()
        .then(doc => {
          // console.log(doc);
          return res.status(200).json({
            message: 'Deposit Ok'
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.order_payment = (req, res, next) => {
  // find order id
  Order.findOne({
    ownerUid: req.user_data.userId,
    _id: req.body._id
  })
    .populate('product', 'price')
    .exec()
    .then(order => {
      console.log(order);

      Account.findOne({ accountId: req.user_data.userId })
        .select('balanced historyOrder')
        .exec()
        .then(account => {
          console.log(order.product.price)
          console.log(account.balanced);
          // check balance
          if (order.product.price <= account.balanced) {
            // change status order
            // push deposit history
          }
         
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
