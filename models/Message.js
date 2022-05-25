const { Schema, model } = require('mongoose')

module.exports = model('Message', new Schema({
    from: {
        type: 'String',
        required: true,
        unique: false
    },
    to: {
        type: 'String',
        required: true,
        unique: false
    },
    content: {
        type: 'String',
        required: true,
        unique: false
    }
}))