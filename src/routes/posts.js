const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/createPost', async (req, res) => {
  const { header, text, category } = req.body;

  if (header === '' || text === '') {
    return res.status(400).json({
      errors: [
        {
          msg: 'Complete all gaps before submit!',
        },
      ],
    });
  }

  try {
    let post = new Post();
    post.header = header;
    post.text = text;

    post.category = category;

    post.save();
    return res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
