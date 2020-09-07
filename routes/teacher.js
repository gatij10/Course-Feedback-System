const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

// @route    POST api/student
//@desc      Register a user
//@access    Public
router.post('/', (req, res) => {
  res.send('Register a user');
});

module.exports = router;
