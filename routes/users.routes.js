const { Router } = require("express");
const User = require('../models/User')
const config = require('config');
const router = new Router();
const auth = require('../middleware/auth.middleware');


router.get('/', async (req, res) => {
    try {

        const users = await User.find({});

        if (!users.length) {
            return res.status(400).json({ message: "users is empty" })
        }

        res.status(200).json(users)

    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: 'cant fint user' })
        }

        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            photo: user.photo
        })
    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})

router.put('/edit/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndUpdate({ id }, { ...req.body });
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(400).json({ message: 'can not remove user' })
        }
        res.status(200).json({})
    } catch (error) {
        res.status(400).json({ message: 'Catch fatal error', error })
    }
})

module.exports = router