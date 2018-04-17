const mongoose = require('mongoose');

const Product = require('../models/product');

exports.get_all_products = (req, res, next) => {
  Product.find({})
    // .select()
    .exec()
    .then(doc => {
      // console.log(doc);
      return res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.create_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    quatity: req.body.quatity,
    description: req.body.description,
    productImage: req.file.path,
    type: req.body.type
  });

  // save to mongodb
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'post /products',
        created_product: product
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.product_search = (req, res, next) => {
  // console.log(req.params.search);

  Product.find({ $text: { $search: req.params.search } })
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({ error: err }));
};

exports.product_cator = (req, res, next) => {
  // console.log(req.params.search);

  Product.find({ type: req.params.cator  })
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({ error: err }));
};

exports.get_product = (req, res, next) => {
  // console.log(req.params.productId);
  Product.findOne({ _id: req.params.productId })
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

exports.update_product = (req, res, next) => {
  console.log(req.params.productId);
  const update_product = {
    name: req.body.name,
    quatity: req.body.quatity,
    price: req.body.price,
    description: req.body.description,
    type: req.body.type
  };
  Product.findByIdAndUpdate(req.params.productId, {
    $set: update_product
  })
    .exec()
    .then(doc => {
      res.status(200).json({
        message: 'Product updated!'
      })
    })
    .catch(err => res.status(500).json({ error: err }));
};

exports.delete_product = (req, res, next) => {
  Product.remove({ _id: req.params.productId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
