const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const createJwtToken = require('../middleware/createJWT');
const generateJwtToken = require('../middleware/createJWT');
const sendVerificationEmail = require('../middleware/verificationEmail');

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  const { first_name, last_name, user_name, gender, email, password } = req.body;

  try {
    const verificationCode = await sendVerificationEmail(email);
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists.." }] })
    }

    user = new User({
      first_name,
      last_name,
      user_name,
      gender,
      email,
      password,
    });

    let salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    console.log(verificationCode)
    generateJwtToken(user.email, (err, token) => {
      return res.status(err ? 500 : 200).json({ error: err ? 'Something went wrong' : null, token, verificationCode: verificationCode });
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  const { first_name, last_name, user_name, gender, password, verified } = req.body;

  try {
    let user = await User.findOne({ email: req.user.email })
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User doesn't exist" }] })
    }

    user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        $set: {
          first_name,
          last_name,
          user_name,
          gender,
          verified,
          password,
        }
      },
      { new: true }
    );
    return res.status(200).json({ user });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User doesn't exist" }] })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid password" }] })
    }

    generateJwtToken(user.email, (err, token) => {
      return res.status(err ? 500 : 200).json({ error: err ? 'Something went wrong' : null, token });
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}



module.exports = {
  postUser, updateUser, loginUser
};


