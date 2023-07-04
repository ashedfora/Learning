const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const userData = mongoose.model('UserData', userSchema);
module.exports = userData;
