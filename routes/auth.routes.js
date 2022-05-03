const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

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
        const { email, password } = req.body
        const existedUser = await User.findOne({ email })

        if (existedUser) {
            return res.status(400).json({ message: 'User with this email already existed' })
        }

        const hashedPass = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPass })
        await user.save()

        res.status(200).json({ message: 'User created' })
    } catch (error) {
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

        const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' })

        res.json({ token, userId: user.id })

    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})
router.post('/delete', [], async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.id);
        if (!user) {
            return res.status(400).json({ message: 'can not remove user' })
        }
        res.status(200).json({ message: 'user succesful deleted' })
    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})

router.get('/test-get',  (req, res) => {
    try {
        return res.status(200).json({ check: "check" })
    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})

router.get('/users', async (req, res) => {
    try {

        const users =  await User.find({});

        if (!users) {
            return res.status(400).json({ message: "users is empty" })
        }

        res.status(200).json({ response: users })

    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(400).json({ message: 'cant fint user' })
        }

        res.status(200).json({ response: user })
    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})

module.exports = router