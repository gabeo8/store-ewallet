const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Product = require('../models/product');
const ProductController = require('../controllers/product');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');

// upload server
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './tmp/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
// no auth
router.get('/', ProductController.get_all_products);

// admin auth
router.patch(
  ':productId',
  [adminAuth, userAuth],
  ProductController.update_product
);
router.delete(
  '/:productId',
  [adminAuth, userAuth],
  ProductController.delete_product
);
router.post(
  '/',
  [adminAuth, userAuth],
  upload.single('productImage'),
  ProductController.create_product
);
// user auth
router.get('/:productId', userAuth, ProductController.get_product);

module.exports = router;
