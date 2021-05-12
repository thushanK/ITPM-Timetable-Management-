const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Overlap = new Schema({

    session_01 : {
        type: Schema.ObjectId,
    },
    session_02 : {
        type: Schema.ObjectId,
    }

});
module.exports = mongoose.model('overlap', Overlap);
