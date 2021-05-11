const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Timeslot = new Schema({

    group_id : {
        type: Schema.ObjectId,
    },
    group_name: {
        type: String,
    },
    type: {
        type: String,
    },
    start_time: {
        type: String  ,
    },
    end_time: {
        type: String  ,
    },


});
module.exports = mongoose.model('timeslot', Timeslot);
