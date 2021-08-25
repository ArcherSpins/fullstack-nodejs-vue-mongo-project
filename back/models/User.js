const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String },
    password: { type: String, required: true },

    birthday: { type: String },
    name: { type: String},
    lastname: { type: String },
    patronymic: { type: String },
    phone: { type: String },

    posts: [{ type: Types.ObjectId, ref: 'Post' }]
})

module.exports = model('User', schema)
