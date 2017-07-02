const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

let schema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

schema.post('remove', (message) => {
    if(message.user) {
        User.findById(message.user, (err, user) => {
            user.messages.pull(message);
            user.save();
        });
    }
});


module.exports = mongoose.model('Message', schema);
