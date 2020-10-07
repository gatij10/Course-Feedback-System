const express = require('express');
const Teacher = require('../models/Teacher');
const router = express.Router();
const axios = require('axios');
const { json } = require('express');

// @route    POST api/score
// @desc     update score and count fields
// @access   Public

router.post('/', async (req, res) => {
  const { courseName, feedback } = req.body;

  const teacher = await Teacher.findOne({ courseName });

  if (!teacher) {
    res.status(400).json({ msg: 'Course does not exist' });
  }

  try {
    let { score, count } = teacher;
    //score will be fetched from flask server

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result = await axios.post(
      'http://localhost:5000/api/result',
      { feedback },
      config
    );

    //console.log(result.data);

    score = score + result.data;
    count = count + 1;

    await Teacher.updateOne({ courseName }, { score, count });

    res.status(200).json({ score, count });
  } catch (error) {
    console.error(error.message);

    res.send('Server Error');
  }
});

module.exports = router;
