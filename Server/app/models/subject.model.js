const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Subject = new Schema({

    year: {
        type: Number,


    },
    semester: {
        type: String,


    },
    name: {
        type: String,

    },
    code: {
        type: String,

        unique: true
    },
    lechours: {
        type: String,
    },
    tutehours: {
        type: String,

    },
    labhours: {
        type: String,
    },
    evaluationhour: {
        type: String,

    },
    rooms: {
        type: [],
    },

});
module.exports = mongoose.model('subject', Subject);
