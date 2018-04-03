const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  price: { type: Number, default: 0 },
  quatity: { type: Number },
  description: String,
  productImage: String,
  type: String
});
productSchema.index({name: 'text'})

module.exports = mongoose.model('Product', productSchema);
