const { Schema, model } = require('mongoose')

module.exports = model('Comment', new Schema({
    content: {
        type: String,
        required: true,
        unique: false
    },
    timeCreated: {
        type: Date,
        required: true,
        unique: false
    },
    author: {
        type: String,
        required: true,
        unique: false
    },
    authorID: {
        type: String,
        required: true,
        unique: false
    },
}))