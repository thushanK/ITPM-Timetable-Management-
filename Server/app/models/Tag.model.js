const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tag = new Schema({
    
    name: {
        type: String,
    },
    rooms : {
        type: [],
    }

});
module.exports = mongoose.model('tag', Tag);
