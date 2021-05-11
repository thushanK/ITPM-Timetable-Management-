const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AllocateSession = new Schema({
    Session: {
        type: Schema.ObjectId,
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

module.exports = mongoose.model('AllocateSession', AllocateSession);