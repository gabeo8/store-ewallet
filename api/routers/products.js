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
    cb(null, './uploads/');
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
/*
GET /products
return [
    {
        "price": 21,
        "_id": "5abefabe55be040b700ec94c",
        "name": "Harry 1",
        "quatity": 100,
        "description": "book i like",
        "productImage": "tmp\\2018-03-31T03-04-30.465Z1408855658.jpg",
        "type": "ebook",
        "__v": 0
    },
   ...
]
*/

router.get('/search/:search', ProductController.product_search);
/*
GET /products/search/harry

retrun [
  {
      "price": 21,
      "_id": "5abefabe55be040b700ec94c",
      "name": "Harry 1",
      "quatity": 100,
      "description": "book i like",
      "productImage": "tmp\\2018-03-31T03-04-30.465Z1408855658.jpg",
      "type": "ebook",
      "__v": 0
  },
  {
      "price": 21,
      "_id": "5abf06ff2d59fe0e48b4750b",
      "name": "Harry 1",
      "quatity": 100,
      "description": "book i like",
      "productImage": "tmp\\2018-03-31T03-56-47.505Z1408855658.jpg",
      "type": "ebook",
      "__v": 0
  },
  {
      "price": 21,
      "_id": "5abf3efdb9f9e80cbcb8389a",
      "name": "Harry 1",
      "quatity": 100,
      "description": "book i like",
      "productImage": "tmp\\2018-03-31T07-55-41.166Z1408855658.jpg",
      "type": "ebook",
      "__v": 0
  }
]
*/

router.get('/:productId', ProductController.get_product);
/*
GET /products/5abefabe55be040b700ec94c

return {
  "price": 21,
  "_id": "5abefabe55be040b700ec94c",
  "name": "Harry 1",
  "quatity": 100,
  "description": "book i like",
  "productImage": "tmp\\2018-03-31T03-04-30.465Z1408855658.jpg",
  "type": "ebook",
  "__v": 0
}
*/

// admin auth
router.put(
  '/:productId',
  [adminAuth, userAuth],
  ProductController.update_product
);
/*
PUT /products/5abefabe55be040b700ec94c
{
	"name": "Like Harry",
    "quatity": 212,
    "description": "other descript loremjksfbsfj",
    "type": "ebook"
}

return {
    "message": "Product updated!"
}
*/


router.delete(
  '/:productId',
  [adminAuth, userAuth],
  ProductController.delete_product
);

/*
DELETE /products/5abefabe55be040b700ec94c
return {
    "message": "Product deleted"
}

*/


router.post(
  '/',
  [adminAuth, userAuth],
  upload.single('productImage'),
  ProductController.create_product
);


module.exports = router;
