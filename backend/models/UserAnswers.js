const mongoose = require('mongoose');

// Define the schema
const yourSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  evalId: {
    type: String,
    required: true
  },
  answers: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    required: false
  },
  date:{
    type:Date,
    required: false,
  }

});

// Create the model using the schema
const YourModel = mongoose.model('Evaluations-Answers', yourSchema);

// Export the model
module.exports = YourModel;
