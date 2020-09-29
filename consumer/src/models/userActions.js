const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      default: 1,
    },
    readArticleCount: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
      default: 0,
    },
    shareArticleCount: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
      default: 0,
    },
    searchCount: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
      default: 0,
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

module.exports = mongoose.model('UserActions', schema);
