const Exam = require('../models/exam.model')

//Get Exam(s)
module.exports.getExams = async (req, res) => {
    try {
      const data = await Exam.find();
      res.json(data);
    } catch (e) {
      res.json({ message: e });
    }
  };


module.exports.getExam = async (req, res) => {
    try {
      const data = await Exam.find({ creatorUserId: req.params.id });
      res.json(data);
    } catch (err) {
      res.json({ message: err });
    }
  };

//GET Exam by examId
module.exports.getExamById = async (req, res) => {
    try {
      const data = await Exam.find({ _id: req.params.id });
      res.json(data);
    } catch (err) {
      res.json({ message: err });
    }
  };
 
//POST Exam  
module.exports.postExam = async (req, res) => {
    const exam = new Exam({
      creatorUserId: req.body.creatorUserId,
      examname: req.body.examname,
      passGrade: req.body.passGrade,
      time: req.body.time,
    });
    exam
      .save()
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        res.json({ message: e });
      });
  };
//UPDATE Exam 
module.exports.updateExam = async (req, res) => {
    Exam.updateOne(
      { _id: req.params.id },
      {
        $set: {
          examname: req.body.examname,
          passGrade: req.body.passGrade,
          time: req.body.time,
        },
      }
    )
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        res.json({ message: e });
      });
  };
  
//DELETE Exam 
module.exports.deleteExam = async (req, res) => {
    Exam.deleteOne({ _id: req.params.id })
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        res.json({ message: e });
      });
  };
  
