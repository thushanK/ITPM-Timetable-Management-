const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Building = new Schema({
    name: {
        type: String,
    },
    noOfFloors: {
        type: String,
    },
    accessTime: {
        type: String
    },
});

module.exports = mongoose.model('building', Building);