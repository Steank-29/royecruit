const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    creatorUserId: {
      type: String,
      required: true,
    },
    examname: {
      type: String,
    },
    passGrade: {
      type: Number,
      default: 10,
    },
    time: {
      type: Number,
      default: 20,
    },
  },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model('exam', ExamSchema);