var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('ListItem', new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    listId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'List'
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    }
}));