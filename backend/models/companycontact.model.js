const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  company: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  problem: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Users-Company', userSchema);
