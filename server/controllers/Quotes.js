const User = require('../models/User');
const Quote = require('../models/Quotes');
const { validationResult } = require('express-validator');

const postQuote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { description, tags } = req.body;
  const user = await User.findOne({ email: req.user.email });
  let quote = new Quote({ description, tags, user: user._id });

  try {
    quote = await quote.save();
    return res.status(200).json(quote);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getAllQuotes = async (req, res) => {
  try {
    let quotes = await Quote.find({});
    if (!quotes) {
      res.json({ Message: 'No user found!' });
    }

    res.json({ quotes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const showQuotes = async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json('Article not found');
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateQuote = async (req, res) => {
  try {
    let quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );

    if (!quote) {
      return res.status(404).json('Quote not found');
    }

    return res.status(200).json(quote);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateLikes = async (req, res) => {
  try {
    let quote = await Quote.findById(req.params.id);

    const user = await User.findOne({ email: req.user.email });
    const addLike = {
      user: user._id,
    };

    const index = quote.like.findIndex((i) => {
      return i.user.toString() == user._id;
    });

    if (index < 0) {
      quote.like.unshift(addLike);
    } else {
      quote.like.splice(index, 1);
    }

    await quote.save();

    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  updateLikes,
  updateQuote,
  postQuote,
  showQuotes,
  getAllQuotes,
};
