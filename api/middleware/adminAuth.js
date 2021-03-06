require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'serect');
    req.user_data = decoded;

    // console.log(decoded);
    if (req.user_data.email === process.env.EMAIL_ADMIN) {
      next();
    } else {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};
