const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/notei', {}).then(() => {
    console.log('Database connected')
}).catch(err => {
    console.log(err)
})
