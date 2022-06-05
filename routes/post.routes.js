const { Router } = require("express");
const User = require('../models/User');
const Post = require('../models/Post');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const e = require("express");
const router = new Router();

router.get('/', async (req, res) => {
    try {
        let { authorID } = req.query;
        let posts = authorID ? await Post.findOne({ authorID }) : await Post.find({});

        if ((!authorID && posts.length == 0) || (authorID && posts == null)) {
            return res.status(400).json({ message: 'Posts is empty' })
        }

        res.status(200).json({ response: Array.isArray(posts) ? posts : [posts] })
    } catch (e) {
        console.log({ message: "Fatal error in getting posts : " + e })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ message: "Not founded post dy id" })
        }
        return res.status(200).json({ response: post })
    } catch (e) {
        console.log({ message: "Fatal error in gettind post by id:" + e })
    }
})

router.post('/', auth, async (req, res) => {
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
        res.status(400).json({ message: `Fatal error on create post: ${e}` })
    }
})

router.put('/', auth, (req, res) => {
    try {

    } catch (e) {
        res.status(400).json({ message: `Fatal error on put post: ${e}` })
    }
})

router.delete('/', auth, (req, res) => {
    try {

    } catch (e) {
        res.status(400).json({ message: `Fatal error on delete post: ${e}` })
    }
})

module.exports = router