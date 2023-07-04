const mongoose = require('mongoose');

const { Schema } = mongoose;
const chatSchema = new Schema({
  cid: {
    type: String,
    index: true,
    required: true,
  },
  messages: [{ type: String }],
}, { timestamps: true });

const Chat = mongoose.model('Chats', chatSchema);
module.exports = Chat;
