const express = require('express');
const { model } = require('mongoose');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Teacher = require('../models/Teacher');
const auth = require('../middleware/TeacherAuth');

const router = express.Router();

// @route    GET api/auth
// @desc     get logged in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select('-password');
    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     auth user and get token
// @access   Public
router.post(
  '/',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
    body('teacherID', 'Please enter your Id').exists(),
  ],
  async (req, res) => {
    //res.send('Login user');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password, teacherID } = req.body;
    try {
      let teacher = await Teacher.findOne({ email });
      if (!teacher) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        teacher: {
          id: teacher.id,
          teacherID,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
