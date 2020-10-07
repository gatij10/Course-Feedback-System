const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Teacher = require('../models/Teacher');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route    POST api/teacher
//@desc      Register a teacher
//@access    Public
router.post(
  '/',
  [
    body('name', 'Please add name').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
    body('teacherID', 'Please enter your Id').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, teacherID, courseName } = req.body;
    try {
      let checkemail = await Teacher.findOne({ email });
      let checkId = await Teacher.findOne({ teacherID });
      if (checkemail || checkId) {
        res.status(400).json({ msg: 'User already exists' });
      }

      teacher = new Teacher({
        name,
        email,
        password,
        teacherID,
        courseName,
      });

      const salt = await bcrypt.genSalt(10);
      teacher.password = await bcrypt.hash(password, salt);

      await teacher.save();

      const payload = {
        teacher: {
          id: teacher.id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
