const express = require('express');

const app = express();

//define routes
app.use('/api/student', require('./routes/student'));
app.use('/api/student', require('./routes/teacher'));
app.use('/api/student', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
