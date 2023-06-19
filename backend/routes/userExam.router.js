const express = require('express');


const router = express.Router();
const UserExamController = require('../controllers/UserExam.controller')

router.get('/' ,  UserExamController.getUserExam);
router.get('/exam/:id1/:id2' ,  UserExamController.getUserExamById);
router.get('/examm/:id' ,  UserExamController.getExamm);
router.get('/:id' ,  UserExamController.getSpecificExamm);
router.post('/' ,  UserExamController.postUserExam);
router.put('/:id/:id1' ,  UserExamController.putUserExam);
router.patch('/:id/:id1' ,  UserExamController.patchUserExam);
router.patch('/userexam/:id/:id1' ,  UserExamController.UpdateScore);
router.delete('/:id' ,  UserExamController.deleteUserExam);
router.delete('/' ,  UserExamController.deleteManyUserExam);
router.delete('/many/:id1/:id2', UserExamController.deleteManyUserExamS);


module.exports = router;