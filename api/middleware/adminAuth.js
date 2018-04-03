const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'serect');
    req.user_data = decoded;

    console.log(decoded);
    if (req.user_data.userId === '5ac26372c7a0981d90c6dc4d') {
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
