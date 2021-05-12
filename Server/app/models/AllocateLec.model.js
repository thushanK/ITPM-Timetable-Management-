const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AllocateLec = new Schema({
    lecture: {
        type: String,
    },
    date: {
        type: String,
    },
    start_time: {
        type: String
    },
    end_time: {
        type: String
    },
});

module.exports = mongoose.model('AllocateLec', AllocateLec);