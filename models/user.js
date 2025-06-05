const moongosse = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new moongosse.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); 
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


module.exports = moongosse.model('User', userSchema);