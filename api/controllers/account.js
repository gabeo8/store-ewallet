const mongoose = require('mongoose');

const Account = require('../models/account');
const Order = require('../models/order');

exports.get_info_account = (req, res, next) => {
  // console.log(req.user_data.userId);
  Account.findOne({ accountId: req.user_data.userId })
    .populate('accountId', 'name')
    // .select('accountId balanced')
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

exports.check_balanced = (req, res, next) => {};

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
          console.log(doc);
          return res.status(200).json(doc);
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
    .exec()
    .then(doc => {
      console.log(doc)
      // check balance
      // change status order
      // push deposit history
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.get_deposit_history = (req, res, next) => {};

exports.get_buy_history = (req, res, next) => {};
