const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Room = new Schema({
    name: {
        type: String,
    },
    capacity: {
        type: String,
    },
    type: {
        type: String,
    },
    building: {
        type: String,
    },
    snv: {
        type: [] ,
    },
});

module.exports = mongoose.model('room', Room);