const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const authenticator = require('../middleware/authenticator');
const {
  postQuote,
  getAllQuotes,
  updateQuote,
  updateLikes,
} = require('../controllers/Quotes');

router.post('/new', authenticator, postQuote);
router.get('/all', getAllQuotes);
router.put('/edit/:id', updateQuote);
router.put('/:id/like', authenticator, updateLikes);

module.exports = router;
