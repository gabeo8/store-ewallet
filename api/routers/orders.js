const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order');

const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');

// user auth
router.get('/:idOrder', userAuth, OrderController.get_order);
/*
GET /orders/5ac318838faa9516302af770
return {
    "status": "pending",
    "_id": "5ac318838faa9516302af770",
    "ownerUid": "5ac26372c7a0981d90c6dc4d",
    "product": "5abf06ff2d59fe0e48b4750b",
    "quatityBuy": 2,
    "__v": 0
}
*/

router.post('/', userAuth, OrderController.create_order);
/*
POST /orders
{
	"productId": "5abf06ff2d59fe0e48b4750b",
	"quatityBuy": 2
}
return {
    "message": "Order stored",
    "createdOrder": {
        "_id": "5ac318838faa9516302af770",
        "ownerUid": "5ac26372c7a0981d90c6dc4d",
        "product": "5abf06ff2d59fe0e48b4750b"
    }
}
*/
router.put('/:idOrder', userAuth, OrderController.update_order);
/*
PUT /orders/5ac317e14e49720934fe09a8
{
 	"status": "paid"   
}
return {
    "message": "Product update"
}
*/

router.delete('/:idOrder', userAuth, OrderController.delete_order);
/*
DELETE /orders/5ac318838faa9516302af770
return {
    "message": "Order deleted"
}
*/

// admin auth
router.get('/', userAuth, OrderController.get_all_orders);
/*
GET /orders
return [
    {
        "status": "pending",
        "_id": "5ac317e14e49720934fe09a8",
        "ownerUid": "5ac26372c7a0981d90c6dc4d",
        "quatityBuy": 2,
        "__v": 0
    },
    {
        "status": "pending",
        "_id": "5ac3182ef64c05093461ea5b",
        "ownerUid": "5ac26372c7a0981d90c6dc4d",
        "quatityBuy": 2,
        "__v": 0
    },
    ....
]
*/

module.exports = router;
