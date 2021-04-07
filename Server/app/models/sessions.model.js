const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Sessions = new Schema({

    lecturer: {
        type: Schema.ObjectId,
       
    },
    tag: {
        type: Schema.ObjectId,
        

    },
    subject: {
        type: Schema.ObjectId,

    },
    group: {
        type: Schema.ObjectId,

    },
    no_of_students: {
        type: String,

    },
    duration: {
        type: String,
    },
    rooms: {
        type: [],
    },
    parallel : {
        type: Boolean,
        default: false
    },
    consecutive : {
        type: Boolean,
        default: false
    },
    snv: {
        type: [] ,
    }, 

});
module.exports = mongoose.model('sessions', Sessions);
