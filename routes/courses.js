const express = require('express');
const Teacher = require('../models/Teacher');
const router = express.Router();

// @route    GET api/courses
// @desc     get all the courses
// @access   Public
router.get('/', async (req, res) => {
  try {
    const courses = await Teacher.distinct('courseName');
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
