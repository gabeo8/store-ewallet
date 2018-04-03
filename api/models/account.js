const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  balanced: { type: Number, default: 0 },
  historyDeposit: [
    {
      createAt: { type: Date },
      numberDeposit: Number
    }
  ],
  historyOrder: [
    {
      createAt: { type: Date },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      paid: Number
    }
  ]
});

module.exports = mongoose.model('Account', accountSchema);
