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

`DELETE/user/{idUser}
`

Giá trị trả về

```json
{
  "message": "User deleted"
}
```




