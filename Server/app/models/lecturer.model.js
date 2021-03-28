const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Lecturer = new Schema({

    name: {
        type: String,
        unique: true

    },
    empId: {
        type: String,
        unique: true

    },
    faculty: {
        type: String,

    },
    department: {
        type: String,

    },
    center: {
        type: String,

    },
    building: {
        type: String,


    },
    level: {
        type: Number,

    },
    rank: {
        type: String,



    },
    image: {
        type: String,

    },
    rooms: {
        type: []
    },
    snv: {
        type: [] ,
    },
});
module.exports = mongoose.model('lecturer', Lecturer);
