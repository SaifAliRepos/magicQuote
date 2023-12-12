const express = require('express')
const router = express.Router()
const { body, check } = require('express-validator');
const { postUser, updateUser, loginUser } = require('../controllers/Users');
const sendVerificationEmail = require('../middleware/verificationEmail');
const authenticator = require('../middleware/authenticator');

// @route GET /user
// @desc Test route
// @access Public

router.post('/register',
  body('email').exists().withMessage("Email required"),
  check('password').exists().withMessage("Passowrd required with length more than 6"),
  postUser
)

router.post('/update',
  check('password').exists().withMessage("Passowrd required with length more than 6"),
  authenticator,
  updateUser
)

router.post('/login',
  loginUser
)




module.exports = router;
