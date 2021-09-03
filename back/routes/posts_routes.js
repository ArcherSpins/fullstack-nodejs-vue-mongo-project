const { Router } = require('express')
const Post = require('../models/Post')
const auth = require('../middleware/auth_middleware')
const router = Router()

router.post('/create', async (req, res) => {
    try {
        const { title, content, typeUser, typePost } = req.body

        const post = new Post({ title, content, typeUser: typeUser || 'user', typePost: typePost || 'active' })

        await post.save()

        res.status(201).json(post)

    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const { typeUser, typePost, userId, search, startDate, endDate } = req.query;

        const filter = {}

        if (typeUser) {
            filter.typeUser = typeUser;
        }

        if (typePost) {
            filter.typePost = typePost;
        }

        if (userId) {
            filter.owner = userId;
        }

        if (search) {
            filter.$text = { $search: search };
        }

        if (startDate) {
            filter.date = {
                $gte: new Date(startDate),
            }
        }

        if (endDate) {
            if (filter.date) {
                filter.date.$lte = new Date(endDate)
            } else {
                filter.date = {
                    $lte: new Date(endDate),
                }
            }
        }

        // Post.geoSearch

        const posts = await Post.find(filter) // ???
        res.json(posts);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id) // ???
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
