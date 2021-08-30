const { Router } = require('express')
const config = require('config')
const fs = require('fs');
const path = require('path')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const User = require('../models/User');
const router = Router()
const { getUser } = require('../helpers/getUser')

// /api/profile have
router.put(
    '/update',
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при обновлении'
            })
        }

        const token = req.headers?.authorization?.replace(/(Bearer)\s/, '') || req.body.token;

        if (!token) {
            return res.status(403).json({
                message: 'Вы не авторизованы'
            })
        }

        const request = async (filePath) => {
            const { username, email, birthday, name, lastname, patronymic, phone } = req.body;

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

            user.phone = phone ?? user.phone;
            user.patronymic = patronymic ?? user.patronymic;
            user.lastname = lastname ?? user.lastname;
            user.name = name ?? user.name;
            user.birthday = birthday ?? user.birthday;
            user.email = email ?? user.email;
            user.username = username ?? user.username;
            user.image = filePath || user.image

            await user.save()

            res.status(201).json({ message: 'Пользователь обновлен', user: getUser(user) })
        }

        if (req.files?.file) {
            const fileName = req.files.file.name.replace(/\s/g, '')
            req.files.file.mv(path.join(__dirname, '/images/', fileName), (error) => {
                if (error) {
                  res.status(400).json(JSON.stringify({ status: 'error', message: error }))

                  return
                }

                fs.readFile(path.join(__dirname, '/images/', fileName), (err, data) => {
                    request('data:' + req.files.file.mimetype + ';base64, ' + Buffer.from(data).toString('base64'))
                });
              })
            
            return;
        }

        request()
    } catch (err) {
        console.log(err)
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