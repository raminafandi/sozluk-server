const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const { name, email, age, password, passwordConf } = req.body;

  console.log(req.body);
  if (password !== passwordConf) {
    return res.status(400).json({
      errors: [
        {
          msg: "Passwords don't match!",
        },
      ],
    });
  }
  try {
    let user = User.find({
      email,
    });
    if (user.email) {
      console.log('nereye gidiyon oc');
      return res.status(400).json({
        errors: [
          {
            msg: 'User Exists.',
          },
        ],
      });
    } else {
      let user = new User();
      user.email = email;
      user.name = name;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        res.json({
          token,
        });
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Invalid Credentials',
          },
        ],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Invalid Credentials',
          },
        ],
      });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
      if (err) throw err;
      res.json({
        token,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
