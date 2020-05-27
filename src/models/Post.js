const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: true,
    },
  ],
  likesCount: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
