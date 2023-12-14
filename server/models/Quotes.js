const mongoose = require('mongoose');
const User = require('../models/User');

const quoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    like: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        text: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Quote', quoteSchema);
