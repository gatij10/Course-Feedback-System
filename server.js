const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect database
connectDB();

app.use(express.json({ extended: false }));

//define routes
app.use('/api/student', require('./routes/student')); //register student
app.use('/api/teacher', require('./routes/teacher')); //register teacher
app.use('/api/studentauth', require('./routes/studentauth')); //student login and authentication
app.use('/api/teacherauth', require('./routes/teacherauth')); //teacher login and authentication
app.use('/api/score', require('./routes/score')); //updates score and count
app.use('/api/courses', require('./routes/courses')); //gets all the courses from database

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
