const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, required: false },
    typeUser: { type: String, required: false, default: 'user' }, // user, admin
    typePost: { type: String, required: false, default: 'active' }, // active, important, canceled
    date: { type: Date, default: Date.now },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }]
})

schema.index({'title': 'text'});

module.exports = model('Post', schema)
