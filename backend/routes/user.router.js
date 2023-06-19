const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();
const userController = require('../controllers/user.controller');
const companyController = require('../controllers/company.controller.js');
const adminController = require('../controllers/admin.controller.js')




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = `${__dirname}/../uploads`;
    fs.mkdirSync(directory, { recursive: true });
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

//WEBSITE CLIENT/COMPANY
router.post('/register' , upload.single('image') , companyController.register );
router.post('/login' ,  companyController.login );
router.post('/contact' , companyController.companycontact);
router.get('/companies', companyController.getCompanies);
router.get('/companyinfo/:id', companyController.companyinfo);
router.put('/updatecompany/:id', companyController.updateCompany)
router.put('/updatecompanyinfo/:id', companyController.updateCompanyinfo)
router.get('/getcompany/:id', companyController.getcompanybyid)
router.post('/mail', companyController.getCompanyUsers)
router.post('/send-email', companyController.sendEmail)
router.post('/jobs', companyController.addJob)
router.post('/questions', companyController.addQuestions);
router.get('/getquestions', companyController.getQuestions)
router.post('/getcompanyEval', companyController.companyEval)
router.post('/answers', companyController.addAnswers);
router.get('/offers', companyController.getOffers)
router.put('/company/:id/image', upload.single('image'), companyController.updateCompanyImage);
router.put('/updatepasswordC/:id', companyController.updatePasswordCompany);
router.post('/usertookeval', companyController.Usertookeval)
router.post('/getcompanyEvalAnswer', companyController.companyEvalAnswer)
router.post('/getcompanyEvalUser', companyController.companyEvalUser)
router.post('/send-email-delay/:id', companyController.sendEmailDelay);
router.post('/send-email-acceptance/:id', companyController.sendEmailAcceptance);
router.post('/send-email-rejection/:id', companyController.sendEmailRejection);
router.get('/companyinfoos/:id', companyController.companyinfoos)

router.post('/upload', upload.single('file'), companyController.uploadFile)

//WEBSITE CLIENT/USER
router.post('/registeruser' , upload.single('image') , userController.register );
router.post('/signin' ,  userController.signin );
router.get('/users', userController.getUsers);
router.put('/updateuserinfo/:id',  userController.updateUserInfo)
router.put('/updateuser/:id',  userController.updateUser)
router.put('/updatepassword/:id', userController.updatePassword);
router.put('/users/:id/image', upload.single('image'), userController.updateUserImage);

router.get('/users/:id', userController.getUserInfo);
router.get('/getUser/:id', userController.getUser)

router.delete('/deleteEval/:id', companyController.deleteEval)

router.get('/users/stage/:id', userController.getUserInfoS)



//WEBSITE ADMIN
router.post('/registeradmin' , upload.single('image') , adminController.register );
router.post('/moderator', adminController.contactedUsers)
router.post('/ctalk', adminController.contactingcompanies)
router.get('/countrybyone', adminController.CountCountriesByOne)
router.get('/industrybyone', adminController.CountIndustriesByOne)
router.get('/count', adminController.countCompanies);
router.get('/counting', adminController.countusers);
router.get('/admin', adminController.getAdmin)
router.put('/statusCompany/:companyId', adminController.StatusCompany);
router.put('/statusUser/:userId', adminController.StatusUser);
router.delete('/userdelete/:userId', adminController.DeleteUser);
router.delete('/companydelete/:userId', adminController.DeleteCompany);

module.exports = router;
