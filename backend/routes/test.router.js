const express = require('express');


const router = express.Router();
const examController = require('../controllers/Exam.controller');

router.get('/' ,  examController.getExams);
router.get('/:id' ,  examController.getExam);
router.get('/exam/:id' ,  examController.getExamById);
router.post('/' ,  examController.postExam);
router.patch('/:id' ,  examController.updateExam);
router.delete('/:id' ,  examController.deleteExam);
module.exports = router;