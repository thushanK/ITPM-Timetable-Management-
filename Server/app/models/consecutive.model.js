const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConSession = new Schema({
    
    session_01 : {
        type: Schema.ObjectId,
    },
    session_02 : {
        type: Schema.ObjectId,
    },
    rooms: {
        type: [],
    }
});
module.exports = mongoose.model('conSession', ConSession);
