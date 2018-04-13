var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('List', new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}));