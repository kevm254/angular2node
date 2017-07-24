const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
   content: {
       type: String,
       required: true
   }
});

module.exports = mongoose.model('Blog', schema);