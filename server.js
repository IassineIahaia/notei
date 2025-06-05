const exepress = require('express');
require('./config/database');

const app = exepress();

app.use(exepress.json());

const userRoutes = require('./routes/users');





app.use(userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;