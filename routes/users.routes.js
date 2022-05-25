const { Router } = require("express");
const User = require('../models/User')
const config = require('config');
const router = new Router();

router.get('/', async (req, res) => {
    try {

        const users = await User.find({});

        if (!users.length) {
            return res.status(400).json({ message: "users is empty" })
        }

        res.status(200).json({ response: users })

    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(400).json({ message: 'cant fint user' })
        }

        res.status(200).json({
            response: {
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

router.get('/test-get', (req, res) => {
    try {
        return res.status(200).json({ check: "check" })
    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})





module.exports = router