const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

// @route    GET api/auth
// @desc     get logged in user
// @access   Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @route    POST api/auth
// @desc     auth user and get token
// @access   Public
router.get('/', (req, res) => {
  res.send('Login user');
});

module.exports = router;
