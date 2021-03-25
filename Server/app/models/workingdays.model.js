const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Workingdays = new Schema({

    name: {
        type: String,
    },
    daycount: {
        type: Number,
    },
    dayslist: {
        type: [],

    },
    d_list: {
        type: [],
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String,
    },


});
module.exports = mongoose.model('workingdays', Workingdays);