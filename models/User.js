const mongoose = require('mongoose');

const User = new mongoose.Schema({
  email: {
    type: String, 
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  firstName: { type: String, default: 'Пользователь' },
  lastName: String,
  phone: String,
  city: String,
  avatar: String,
  online: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', User)