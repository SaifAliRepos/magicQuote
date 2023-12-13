const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const {
  postUser,
  updateUser,
  loginUser,
  loadUser,
  getAllUsers,
  verifyUser,
} = require('../controllers/Users');
const authenticator = require('../middleware/authenticator');

router.post(
  '/register',
  body('email').exists().withMessage('Email required'),
  check('password')
    .exists()
    .withMessage('Passowrd required with length more than 6'),
  postUser,
);

router.post('/update', authenticator, updateUser);

router.post('/login', loginUser);

router.get('/auth', authenticator, loadUser);

router.get('/all', getAllUsers);

router.put('/verify', authenticator, verifyUser);
module.exports = router;
