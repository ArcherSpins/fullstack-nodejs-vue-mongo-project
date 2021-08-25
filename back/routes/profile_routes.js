const { Router } = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User');
const router = Router()
const { getUser } = require('../helpers/getUser')

// /api/profile have
router.put(
    '/update',
    [
        check('username', 'Некорректный username').isLength({ min: 1 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при обновлении'
            })
        }

        const token = req.headers?.authorization?.replace(/(Bearer)\s/, '');

        if (!token) {
            return res.status(403).json({
                message: 'Вы не авторизованы'
            })
        }

        const { username } = req.body;

        const resultVerify = jwt.verify(token, config.get('jwtSecret'));

        if (!resultVerify || !resultVerify.userId) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Не валидный токен'
            })
        }
        const user = await User.findOne({ _id: resultVerify.userId });

        if (!user) {
            res.status(400).json({ message: 'Не удалось найти пользователя' })
            return;
        }

        user.username = username;

        await user.save()

        res.status(201).json({ message: 'Пользователь обновлен', user: getUser(user) })

    } catch (err) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get(
    '/',
    async (req, res) => {
        try {
            const token = req.headers?.authorization?.replace(/(Bearer)\s/, '');

            if (!token) {
                return res.status(403).json({
                    message: 'Вы не авторизованы'
                })
            }
    
            const resultVerify = jwt.verify(token, config.get('jwtSecret'));
    
            if (!resultVerify || !resultVerify.userId) {
                return res.status(400).json({
                    message: 'Не валидный токен'
                })
            }
            const user = await User.findOne({ _id: resultVerify.userId });
    
            if (!user) {
                res.status(400).json({ message: 'Не удалось найти пользователя' })
                return;
            }
    
            res.status(200).json({ user: getUser(user) })
    
        } catch (err) {
            if (err.message.includes('jwt expired')) {
                res.status(400).json({ message: 'Срок действия токена истек', status: 'jwt' })
            } else {
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
            }
        }
    }
)

module.exports = router