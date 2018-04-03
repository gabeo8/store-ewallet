const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');

// no auth

router.post('/signup', UserController.user_signup)
/*
POST /user/signup
{
  "name": "Hong",
  "email": "hongngoc@gmail.com",
  "password": "12232424"
}
return
{
    "message": "Auth successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvbmduZ29jQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVhYzI1YmU0ZTJkYTE1MDZkY2QxZjUzMiIsImlhdCI6MTUyMjY4Njk0OH0.6W_GH4NZdIvMBNtxMkochC192qc9MVw4aqbWM5EwAm4"
}
*/
router.post('/login', UserController.user_login);

/*
POST /user/login
{
  "email": "hongngoc@gmail.com",
  "password": "12232424"
}
return {
  "message": "Auth successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvbmduZ29jQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVhYzI1YmU0ZTJkYTE1MDZkY2QxZjUzMiIsImlhdCI6MTUyMjY4Njk5Nn0.P58yLMlmyKw1Yr30B9Ob8M_-ROTm5T8nJOICkvJgze4"
}
*/


// user auth

router.put('/', userAuth, UserController.user_update);
/*
PUT /user
{
	"address": "SG",
    "name": "Admin",
    "phone": "113"
}

retutn {
    "message": "User updated!"
}
*/

// admin auth

router.get('/', [adminAuth, userAuth], UserController.get_all_users);
/*
GET /user
return [
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
*/

router.delete('/:userId', [adminAuth, userAuth], UserController.user_delete);

/*
DELETE /user/5abe06bd96e06c10bc51b5fc
return {
    "message": "User deleted"
}
*/
module.exports = router;
