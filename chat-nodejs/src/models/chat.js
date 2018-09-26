const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    author: String,
    text: String
})

const Chat = mongoose.model('chat', ChatSchema)

module.exports = Chat;