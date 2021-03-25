const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Location = new Schema({
    name: {
        type: String,
    },
    building: {
        type: String,
    },
    type: {
        type: String,
    },
    capacity: {
        type: String,
    },
    snv: {
        type: [] ,
    },
});

module.exports = mongoose.model('location', Location);