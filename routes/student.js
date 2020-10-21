const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Student = require('../models/Student');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route    POST api/student
//@desc      Register a student
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
    body('studentID', 'Please enter your Id').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, studentID } = req.body;
    try {
      let checkemail = await Student.findOne({ email });
      let checkId = await Student.findOne({ studentID });
      if (checkemail || checkId) {
        res.status(400).json({ msg: 'User already exists' });
      }

      student = new Student({
        name,
        email,
        password,
        studentID,
      });

      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);

      await student.save();

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
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
