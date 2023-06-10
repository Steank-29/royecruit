const mongoose = require('mongoose');

// Define the schema
const yourSchema = new mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
  companyname: {
    type: String,
    required: true
  },
  evalname: {
    type: String,
    required: true
  },
  questions: {
    type: [String],
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    required:true
  },
  dated: {
    type: Date,
    required: true,
  }

});

// Create the model using the schema
const YourModel = mongoose.model('Evaluations', yourSchema);

// Export the model
module.exports = YourModel;
