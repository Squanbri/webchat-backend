const mongoose = require('mongoose');

const Message = new mongoose.Schema({
  text: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  check: { type: Boolean, default: false },
  created_at: { type : Date, default: Date.now },
  updated_at: { type : Date, default: Date.now },
})

module.exports = mongoose.model('Message', Message)