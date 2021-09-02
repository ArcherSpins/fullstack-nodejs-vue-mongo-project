const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, required: false },
    date: { type: Date, default: Date.now },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }]
})

module.exports = model('Post', schema)
