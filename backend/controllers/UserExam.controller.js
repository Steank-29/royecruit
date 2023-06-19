const UserExams = require('../models/userExams.model')

//Get UserExam
module.exports.getUserExam = async (req, res) => {
    try {
      const userExams = await UserExams.find();
      res.status(200).json(userExams);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

//Get UserExamID
module.exports.getUserExamById = async (req, res) => {
    try {
      UserExams.find({ userId: req.params.id1, examId: req.params.id2 }).then(data => {
        res.json(data);
      });
    } catch (err) {
      res.json({ message: err });
    }
  };
//Get ExammID
module.exports.getExamm = async (req, res) => {
    try {
      UserExams.find({ examId: req.params.id }).then(data => {
        res.json(data);
      });
    } catch (err) {
      res.json({ message: err });
    }
  };
//Get SpecificExamm
module.exports.getSpecificExamm = async (req, res) => {
    try {
      UserExams.find({ userId: req.params.id }).then(data => {
        res.json(data);
      });
    } catch (err) {
      res.json({ message: err });
    }
  };
//POST UserExam
module.exports.postUserExam = async (req, res) => {
    const userExams = new UserExams({
      examId: req.body.examId,
      userId: req.body.userId,
      grade: req.body.grade,
      userInfo: req.body.userInfo,
      examReview: req.body.examReview,
      status: req.body.status,
    });
    userExams
      .save()
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        res.json({ message: e });
      });
  };
//PUT UserExam
module.exports.putUserExam = async (req, res) => {
    UserExams.updateOne(
      { examId: req.params.id, userId: req.params.id1 },
      {
        $push: {
          examReview: req.body.examReview,
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
//PATCH UserExam
module.exports.patchUserExam = async (req, res) => {
    UserExams.updateOne(
      { userId: req.params.id ,examId: req.params.id1 },
      {
        $set: {
          examId: req.body.examId,
          userId: req.body.userId,
          grade: req.body.grade
        }
      }
    )
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        res.json({ message: e });
      });
  };
//DELETE One UserExam
module.exports.deleteUserExam = async (req, res) => {
    UserExams.deleteOne({ _id: req.params.id })
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        res.json({ message: e });
      });
  };
//DELETE Many UserExam
module.exports.deleteManyUserExam = async (req, res) => {
    UserExams.deleteMany({ grade: 0 })
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        res.json({ message: e });
      });
  };
  module.exports.UpdateScore = async (req, res) => {
    UserExams.updateOne(
      { userId: req.params.id, examId: req.params.id1 },
      {
        $set: {
          grade: req.body.grade
        }
      }
    )
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        res.json({ message: e });
      });
  };
  
  exports.deleteManyUserExamS = async (req, res) => {
    try {
      const userExams = await UserExams.find({ userId: req.params.id1, examId: req.params.id2 });
  
      if (userExams.length > 1) {
        const duplicateUserExams = userExams.slice(1); 
  
        await UserExams.deleteMany({ _id: { $in: duplicateUserExams.map(userExam => userExam._id) } });
  
        res.status(200).json({ message: 'Duplicate user exams deleted', deletedUserExams: duplicateUserExams });
      } else {
        res.status(200).json({ message: 'No duplicate user exams found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting duplicate user exams', error });
    }
  };
  