const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()
const auth = require('../middleware/auth.middleware')


router.post('/register', [
    check('email', 'Incorrect email'),
    check('password', 'Too short pass')
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors,
                message: 'Incorrect data to registration'
            })
        }
        const { name, surname, phone, photo, email, password, } = req.body
        const existedUser = await User.findOne({ email })

        if (existedUser) {
            return res.status(400).json({ message: 'User with this email already existed' })
        }
        const hashedPass = await bcrypt.hash(password, 12)
        const user = new User({ name, surname, phone, photo, email, password: hashedPass })
        await user.save()

        res.status(200).json({ message: 'User created' })
    } catch (error) {
        console.dir(error)
        res.status(400).json({ message: 'Catch fatal error', error })
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

        const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1d' })

        res.status(200).json({
            token, user: {
                id: user.id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                phone: user.phone,
                photo: user.photo
            }
        })

    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})

router.post('/validate', auth, (req, res) => {
    try {
        const { user } = req;
        if (user) {
            res.status(200).json({})
        } else {
            res.status(400).json({ message: 'Not find user' })
        }
    } catch (e) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})

module.exports = router