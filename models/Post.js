const { Schema, model } = require('mongoose')

module.exports = model('Post', new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
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