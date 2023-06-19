const ExamQuestions = require('../models/examQuestions.model')

//Get ExamQ(s)
module.exports.getExamQs = async (req, res) => {
    ExamQuestions.find()
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        res.json({ message: e });
      });
  };
//Get ExamQ
module.exports.getExamQ = async (req, res) => {
    try {
      ExamQuestions.find({ examId: req.params.id })
        .then(data => {
          res.json(data);
        })
        .catch(e => {
          res.json({ message: e });
        });
    } catch (err) {
      res.json({ message: err });
    }
  };
//POST ExamQ
module.exports.postExamQ = async (req, res) => {
    const examQuestions = new ExamQuestions({
      examId: req.body.examId,
      questionTitle: req.body.questionTitle,
      options: req.body.options,
      correctOption: req.body.correctOption,
    });
  
    examQuestions
      .save()
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        res.json({ message: e });
      });
  };
//Put ExamQ
module.exports.putExamQ = async (req, res) => {
    ExamQuestions.updateOne(
      { _id: req.params.id },
      {
        $push: {
          options: req.body.options,
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

//PATCH ExamQ
module.exports.patchExamQ = async (req, res) => {
    ExamQuestions.updateOne(
      { _id: req.params.id },
      {
        $set: {
          examId: req.body.examId,
          questionTitle: req.body.questionTitle,
          options: req.body.options,
          correctOption: req.body.correctOption,
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
//DELETE ExamQ
module.exports.deleteExamQ = async (req, res) => {
    ExamQuestions.deleteOne({ _id: req.params.id })
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        res.json({ message: e });
      });
  };
  