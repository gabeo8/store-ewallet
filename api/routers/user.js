const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');

// no auth
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
router.post('/signup', UserController.user_signup)

/*
POST /user/login
{
  "email": "hongngoc@gmail.com",
  "password": "12232424"
}
return 
{
  "message": "Auth successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvbmduZ29jQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVhYzI1YmU0ZTJkYTE1MDZkY2QxZjUzMiIsImlhdCI6MTUyMjY4Njk5Nn0.P58yLMlmyKw1Yr30B9Ob8M_-ROTm5T8nJOICkvJgze4"
}
*/
router.post('/login', UserController.user_login);

// user auth

router.patch('/:userId', userAuth, UserController.user_update);

// admin auth
router.get('/', [adminAuth, userAuth], UserController.get_all_users);
/*
DELETE /user/
*/
router.delete('/:userId', [adminAuth, userAuth], UserController.user_delete);

module.exports = router;
