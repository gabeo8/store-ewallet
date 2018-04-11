## Cài đặt

:sunglasses: Nếu có vấn đề vui lòng mail :mouse: `ancs21.ps[at]gmail.com`  :cat:

Bước 1.

Mở file `.env` thay địa chỉ MONGODB và tài khoản admin (cần tạo user trước và dùng địa chỉ email đó)

:exclamation: `Địa chỉ mặc định có thể bị xóa bất cứ lúc nào`

```
MONGODB=
EMAIL_ADMIN=
```

Bước 2.
Chạy lệnh tại thư mục chính của project

`npm install` hoặc `yarn install`

Bước 3.

Chạy chế độ Dev

`npm start` hoặc `yarn start`

Chạy chế độ Production

`npm run prod` hoặc `yarn prod`

## Backend REST API

### Lược đồ (Schema)

### ```user```
| Field | Type | Mô tả |
|:------|:-----|:------|
| `_id` | ObjectId | Tạo tự động bởi MongoDB |
| `createAt` | Date | Ngày tạo |
| `name` | String | Tên |
| `email` | String | Duy nhất |
| `password` | String | Mật khẩu  |
| `avatar` | String | URL hình ảnh avatar |
| `phone` | String | Số điện thoại |
| `address` | String | Địa chỉ |

### ```product```
| Field | Type | Mô tả |
|:------|:-----|:------|
| `_id` | ObjectId | Tạo tự động bởi MongoDB |
| `name` | String | Tên sản phẩm |
| `price` | String | Giá |
| `quatity` | Number | Số lượng còn lại |
| `description` | String | Mô tả về sản phẩm  |
| `productImage` | String | URL hình ảnh sản phẩm |
| `type` | String | Số điện thoại |

### ```order```
| Field | Type | Mô tả |
|:------|:-----|:------|
| `_id` | ObjectId | Tạo tự động bởi MongoDB |
| `ownerUid` | ObjectId | Id chủ đơn hàng |
| `product` | ObjectId | Id sản phẩm |
| `quatityBuy` | Number | Số lượng mua |
| `status` | String | Trạng thái đơn hàng |

### ```account```
| Field | Type | Mô tả |
|:------|:-----|:------|
| `accountId` | ObjectId | Id chủ tài khoản |
| `balanced` | ObjeNumberctId | Số dư hiện có |
| `historyDeposit` | Array of Object | Lịch sử nạp tiền |
| `historyOrder` | Array of Object | Lịch sử mua hàng |


### Router

### `user`

`Không cần đăng nhập`

`POST /user/signup`
```json
{
  "name": "Hong",
  "email": "hongngoc@gmail.com",
  "password": "12232424"
}
```
Giá trị trả về

```json
{
  "message": "Auth successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvbmduZ29jQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVhYzI1YmU0ZTJkYTE1MDZkY2QxZjUzMiIsImlhdCI6MTUyMjY4Njk0OH0.6W_GH4NZdIvMBNtxMkochC192qc9MVw4aqbWM5EwAm4"
}
```

`POST /user/login`

```json
{
  "email": "hongngoc@gmail.com",
  "password": "12232424"
}
```
Giá trị trả về

```json
{
  "message": "Auth successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvbmduZ29jQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVhYzI1YmU0ZTJkYTE1MDZkY2QxZjUzMiIsImlhdCI6MTUyMjY4Njk5Nn0.P58yLMlmyKw1Yr30B9Ob8M_-ROTm5T8nJOICkvJgze4"
}
```

`Cần đăng nhập`

`PUT /user`

```json
{
  "address": "SG",
  "name": "Admin",
  "phone": "113"
}
```
Giá trị trả về

```json
{
  "message": "User updated!"
}
```

`Cần đăng nhập dưới quyền admin`

`GET /user`

Giá trị trả về

```json
[
  {
      "_id": "5abd05736e88861164777ae1",
      "name": "Hello"
  },
  {
      "_id": "5abe06bd96e06c10bc51b5fc",
      "name": "Hello"
  },
  ...
]
```

`DELETE /user/{idUser}`

Giá trị trả về

```json
{
  "message": "User deleted"
}
```

### `product`

`Không cần đăng nhập`

`GET /products`

Giá trị trả về

```json
[
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
```


`GET /products/search/{harry}`

Giá trị trả về

```json
[
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
```

`GET /products/5abefabe55be040b700ec94c`

Giá trị trả về

```json
{
  "price": 21,
  "_id": "5abefabe55be040b700ec94c",
  "name": "Harry 1",
  "quatity": 100,
  "description": "book i like",
  "productImage": "tmp\\2018-03-31T03-04-30.465Z1408855658.jpg",
  "type": "ebook",
  "__v": 0
}
```

`Cần đăng nhập quyền admin`

`PUT /products/5abefabe55be040b700ec94c`

```json
{
  "name": "Like Harry",
  "quatity": 212,
  "description": "other descript loremjksfbsfj",
  "type": "ebook"
}
```

Giá trị trả về

```json
{
  "message": "Product updated!"
}
```

`DELETE /products/5abefabe55be040b700ec94c`

Giá trị trả về

```json
{
  "message": "Product deleted"
}
```


### `product`

`Cần đăng nhập`

`GET /orders/5ac318838faa9516302af770`

Giá trị trả về

```json
{
  "status": "pending",
  "_id": "5ac318838faa9516302af770",
  "ownerUid": "5ac26372c7a0981d90c6dc4d",
  "product": "5abf06ff2d59fe0e48b4750b",
  "quatityBuy": 2,
  "__v": 0
}
```

`POST /orders`

```json
{
  "productId": "5abf06ff2d59fe0e48b4750b",
  "quatityBuy": 2
}
```

Giá trị trả về

```json
 {
  "message": "Order stored",
  "createdOrder": {
      "_id": "5ac318838faa9516302af770",
      "ownerUid": "5ac26372c7a0981d90c6dc4d",
      "product": "5abf06ff2d59fe0e48b4750b"
  }
}
```

`PUT /orders/5ac317e14e49720934fe09a8`

```json
{ 
  "status": "paid"   
}
```

Giá trị trả về

```json
{
    "message": "Order updated"
}
```

`DELETE /orders/5ac318838faa9516302af770`

Giá trị trả về

```json
{
  "message": "Order deleted"
}
```

`Cần đăng nhập dưới quyền admin`

`GET /orders`

```json
[
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
  ...
]
```

### `account`

`Cần đăng nhập`

`GET /account`

Giá trị trả về

```json
{
    "balanced": 1776,
    "historyDeposit": [
      {
          "_id": "5ac26428f3c220077c493c8d",
          "createAt": "2018-04-02T17:11:04.121Z",
          "numberDeposit": 888
      },
      {
          "_id": "5ac2644eeac10a0504ccb104",
          "createAt": "2018-04-02T17:11:42.663Z",
          "numberDeposit": 888
      }
    ],
    "historyOrder": [],
    "_id": "5ac26372c7a0981d90c6dc4e",
    "accountId": {
        "avatar": "",
        "phone": "",
        "address": "",
        "createAt": "2018-04-02T17:08:02.752Z",
        "_id": "5ac26372c7a0981d90c6dc4d",
        "name": "admin",
        "email": "admin@admin.com",
        "password": "$2a$10$ka2VkiLVpWZ538npC79zB.M7hCvs/y6agIv28QqF1.v.wrfqLEMF.",
        "__v": 0
    },
    "__v": 0
}
```

`POST /account/deposit`

```json
{
  "balance": 888
}
```

Giá trị trả về

```json
  {
    "message": "Deposit Ok"
  }
```

### `payment`

`Cần đăng nhập`

`POST /payment`

```json
{
  "_id": "5ac3a59cd9f23e0c14c82c79"
}
```

Giá trị trả về

```json
{
  "message": "Payment Success"
}
```