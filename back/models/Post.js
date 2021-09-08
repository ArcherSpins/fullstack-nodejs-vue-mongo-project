const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: String, required: false }],
    typeUser: { type: String, required: false, default: 'user' }, // user, admin, manager
    typePost: { type: String, required: false, default: 'active' }, // active, important, canceled
    image: { type: String, required: false, default: null },
    date: { type: Date, default: Date.now },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    userId: { type: Types.ObjectId, ref: 'User' }
})

schema.index({'title': 'text'});

module.exports = model('Post', schema)
