const express = require('express');


const router = express.Router();
const QuestionController = require('../controllers/Questions.controller')

router.get('/' ,  QuestionController.getExamQs);
router.get('/:id' ,  QuestionController.getExamQ);
router.post('/' ,  QuestionController.postExamQ);
router.put('/:id' ,  QuestionController.putExamQ);
router.patch('/:id' ,  QuestionController.patchExamQ);
router.delete('/:id' ,  QuestionController.deleteExamQ);

module.exports = router;