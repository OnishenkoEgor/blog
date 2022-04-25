const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

router.post('/register', [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Too short pass').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data to registration'
            })
        }

        const { email, password } = req.body

        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return res.json(400).json({ message: 'User with this email already existed' })
        }

        const hashedPass = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPass })
        await user.save()

        res.status(201).json('User created')
    } catch (e) {
        res.status(500).json({ message: 'Critical routes error' })
    }
})

router.post('/login', [
    check('email', 'Incorrect email').normalizeEmail().isEmail(),
    check('password', 'Incorrect password').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data to login'
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'User with this email not existed' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid data' })
        }

        const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' })

        res.json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({ message: 'Critical routes error' })
    }
})


router.get('/test-get', (req, res) => {
    res.write('check')
})

module.exports = router