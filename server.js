const express = require('express');
require('./config/database');

const app = express();

app.use(express.json());

const userRoutes = require('./routes/users');
const noteRoutes = require('./routes/notes');





app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;