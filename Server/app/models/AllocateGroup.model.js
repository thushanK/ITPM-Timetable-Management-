const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AllocateGroup = new Schema({
    Group: {
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

module.exports = mongoose.model('AllocateGroup', AllocateGroup);