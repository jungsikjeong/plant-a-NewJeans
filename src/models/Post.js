const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  title: {
    type: String,
    required: true,
  },

  contents: {
    type: String,
    required: true,
  },

  image: [{ type: String }],

  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', PostSchema);
