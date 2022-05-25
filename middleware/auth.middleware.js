const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    if (req.headers.authentication) {
        const token = req.headers.authentication
        const data = jwt.verify(token, config.get('jwtSecret'))
        const user = await User.findOne({ id: data.userId })
        req.user = user
        next()
    } else {
        res.status(400).json({ message: 'No token in headers' })
    }
}
