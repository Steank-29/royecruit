const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dateofbirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  homeAddress: {
    type: String,
    required: true
  },
  jobPosition: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  imageId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
