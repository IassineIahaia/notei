const moongosse = require('mongoose');

const noteSchema = new moongosse.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creatd_at: {
        type: Date,
        default: Date.now
    },
    updtated_at: {
        type: Date,
        default: Date.now
    },
    author: {
        type: moongosse.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = moongosse.model('Note', noteSchema);