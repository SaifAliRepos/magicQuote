const jwt = require('jsonwebtoken')
const config = require('config')

const generateJwtToken = (email, callback, expiresIn = '1h') => {
  const payload = {
    user: {
      email: email
    }
  };

  jwt.sign(
    payload,
    'mySecret',
    { expiresIn },
    (err, token) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, token);
      }
    }
  );
};


module.exports = generateJwtToken;
