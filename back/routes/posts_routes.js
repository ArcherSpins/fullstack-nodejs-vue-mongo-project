const { Router } = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const auth = require('../middleware/auth_middleware')
const { getUser } = require('../helpers/getUser')
const router = Router()

router.post('/create', async (req, res) => {
    try {
        const { title, content, typeUser, typePost, userId } = req.body

        const post = new Post({ title, content, typeUser: typeUser || 'user', typePost: typePost || 'active', userId })

        await post.save()

        res.status(201).json(post)

    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.put('/update', async (req, res) => {
    try {
        const { title, content, typeUser, typePost, postId, likes, comment } = req.body

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Not found post!' })
        }

        await Post.findOneAndUpdate({ _id: postId }, {
            title: title || post.title,
            content: content || post.content,
            typeUser: typeUser || post.typeUser,
            typePost: typePost || post.typePost,
            likes: likes || post.likes,
            typePost: typePost || post.typePost,
        }, {useFindAndModify: false});

        const updatedPost = await Post.findById(postId);

        res.status(200).json(updatedPost)

    } catch (err) {
        console.log(err)
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
            filter.typePost = typePost.split(',');
        }

        if (userId) {
            filter.owner = userId;
        }

        if (search) {
            filter.$text = { $search: search.split(' ').map(w => `"${w}"`).join(' ') };
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
        console.log(filter)
        const posts = await Post.find(filter) // ???
        const users = await User.find({})

        const findUser = (post) => {
            return users.find(user => {
                return String(user.id) === String(post.userId)
            })
        }

        res.json(Array.from(posts).map(post => ({ post, user: getUser(findUser(post), posts) })));
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

router.delete('/:id', async (req, res) => {
    try {
        const posts = await Post.findByIdAndDelete(req.params.id) // ???
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
