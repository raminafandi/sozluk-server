const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment_msg: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
