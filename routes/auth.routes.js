const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post('/register', [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Too short pass').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'Incorrect user data' })
        }

        const { email, password } = req.body

        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return res.json(400).json({ message: 'User with this email already existed' })
        }

        const hashedPass = await bcrypt.hash(password, 12)

        const user = new User(email, hashedPass)
        await user.save()
        
        res.status(201).json('User created')
    } catch (e) {
        res.status(500).json({ message: 'Routes error' })
    }
})

router.post('/login', async (req, res) => {
    try {

    } catch (e) {

    }
})

module.exports = router