const express = require('express');
const { model } = require('mongoose');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Student = require('../models/Student');
const auth = require('../middleware/StudentAuth');

const router = express.Router();

// @route    GET api/auth
// @desc     get logged in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    res.json(student);
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
    body('studentID', 'Please enter your Id').exists(),
  ],
  async (req, res) => {
    //res.send('Login user');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password, studentID } = req.body;
    try {
      let student = await Student.findOne({ email });
      if (!student) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        student: {
          id: student.id,
          studentID,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
