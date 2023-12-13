const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ Message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, 'mySecret');
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ Message: 'Something went wrong or token expired' });
  }
};
