const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    newspaper: {
      type: String,
      minLength: 2,
      required: true,
    },
		
    category: {
      type: String,
      minLength: 2,
      required: true,
    },

    articlesCount: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
      default: 1,
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

module.exports = mongoose.model('NewspaperArticleCountByCategory', schema);
