const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company:{
    type:String,
    required:true
  },  
  contactInfo: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  employment: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Job', jobSchema);
