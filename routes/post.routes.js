const { Router } = require("express");
const User = require('../models/User');
const Post = require('../models/Post');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const e = require("express");
const router = new Router();

router.get('/', async (req, res) => {
    try {
        let posts = req.query.authorID ? await Post.findOne({ authorID }) : await Post.find({});

        if (!posts.length) {
            res.status(400).json({ message: 'Posts is empty' })
        }

        res.status(200).json({ response: posts })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: "Fatal error in getting posts : " + e })
    }

})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(400).json({ message: "Not founded post dy id" })
        }
        res.status(200).json({ response: post })
    } catch (e) {
        res.status(400).json({ message: "Fatal error in gettind post by id:" + e })
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const { user } = req;
        if (!title && !content) {
            res.status(400).json({ message: 'Not content to create post' })
        }
        const post = new Post({ title, content, timeCreated: new Date().toDateString(), author: user.name, authorID: user.id });
        await post.save()
        res.status(200).json({ message: "Post Created" })
    } catch (e) {
        res.status(400).json({ message: "Fatal error in creating posts : " + e })
    }
})


module.exports = router