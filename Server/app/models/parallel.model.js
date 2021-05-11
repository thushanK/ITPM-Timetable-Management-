const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Parallel = new Schema({

    session_01 : {
        type: Schema.ObjectId,
    },
    session_02 : {
        type: Schema.ObjectId,
    }

});
module.exports = mongoose.model('parallel', Parallel);
