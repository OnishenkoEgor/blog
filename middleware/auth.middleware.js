const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    try {
        if (req.headers.authentication) {
            const token = req.headers.authentication;
            const data = jwt.verify(token, config.get('jwtSecret'))
            const user = await User.findOne({ _id: data.userId })
            req.user = user
            next()
        } else {
            res.status(400).json({ message: 'No token in headers' })
        }
    } catch (e) {
        res.status(400).json({message:'Fatal error'})
        console.log(e)
    }
}
