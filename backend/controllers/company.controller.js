const Company = require('../models/company.model')
const CompanyRoyecruit = require ('../models/companyplatform')
const CompanyUsers = require('../models/companycontact.model')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');
const Job = require('../models/joboffer')
const Eval = require('../models/Question')
const UserAnswer = require('../models/UserAnswers')
const userdb = require('../models/user.model')

cloudinary.config({
  cloud_name: 'dmmz2mgrr',
  api_key: '224933378218192',
  api_secret: 'HXNACy-i7whD2FohG3D5t8FZRYM'
});



exports.register = async (req , res ) => {

    console.log(req.body);

    try {

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'R-Companies',
        use_filename: true,
        unique_filename: false
      });
      const image = {
        url: result.secure_url,
        public_id: result.public_id,
        contentType: result.format
      };
   
        const { companyname, companyaddress, industry, companysize ,companywebsite ,companyservice ,email ,} = req.body;
    
    
        const user = await Company.findOne({ email });
        if (user) {
          return res.status(400).json({ message: 'Email already exists' });
        }
    
        const newUser = new Company({
            companyname,
            companyaddress,
            industry,
            companysize,
            companywebsite,
            companyservice,
            email,
            password: req.body.password,
            image: result.secure_url,
            imageid:result.public_id
        });
    
        await newUser.save();
    
        res.status(200).json({ message: 'Account created successfully' });
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Server error' });
      }
}


exports.login = async (req, res) => {
  const { email , password } = req.body;
  try {
    // Check if the user exists in the database
    const user = await Company.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    // Compare the given password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (user.status==='blocked') {
      return res.status(401).json({ message: `For some reason your account is blocked.!` });
    }

    // Generate an auth token for the user
    const token =  jwt.sign({id: user._id, image: Company.image} , process.env.JWT_SECRET, {expiresIn: "30m"});
    const Refresh_token =  jwt.sign({id: user._id, image: Company.image} , process.env.JWT_SECRET_REFRESH);


    res.status(200).json({ user, token, Refresh_token  });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error(error);
  }
};





module.exports.companyinfo = async (req, res) => {
  try {
    const user = await Company.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}


exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateCompany = async (req, res) => {
  const { id } = req.params; // Assuming companyId is passed as a parameter

  try {
    const company = await Company.findById(id); // Find the company by ID

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Update the company's information based on the request body
    company.selectedState = req.body.selectedState || company.selectedState;
    company.location = req.body.location || company.location;
    company.foundingDate = req.body.foundingDate || company.foundingDate;
    company.founder = req.body.founder || company.founder;
    company.employees = req.body.employees || company.employees;
    company.revenue = req.body.revenue || company.revenue;
    company.socialMedia = req.body.socialMedia || company.socialMedia;
    company.phone = req.body.phone || company.phone;
    company.customerSupport = req.body.customerSupport || company.customerSupport;
    company.question = req.body.question || company.question;
    company.answer = req.body.answer || company.answer;

    const updatedCompany = await company.save(); 

    return res.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
  } catch (error) {
    console.error('Error updating company:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.companycontact = async (req, res) => {
    
  const { fullname, email, problem } = req.body;

  const contactProblem = new CompanyRoyecruit({
      fullname,
      email,
      problem
    });
  
    try {
      await contactProblem.save();
      res.status(200).json({ message: 'Our Platform HR_M Will Contact You As Soon As Possible.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while registering your case.!' });
    }
}


exports.getcompanybyid = async (req, res ) => {
  try {
    const user = await Company.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

exports.getCompanyUsers = async (req, res) => {
  try {
    const userId  = req.body.userId;

    // Query the database to count users with the given ID
    const count = await CompanyUsers.countDocuments({ company: userId });

    const users = await CompanyUsers.find({ company: userId });

    res.json({ count, users });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ error: 'An error occurred while counting users.' });
  }
};

exports.sendEmail = async (req, res) => {

  const { mail ,mailed, response } = req.body;

  const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: mail,
      to: mailed,
      subject: 'For Your Inquiries', 
      text: response,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};

exports.addJob = async (req, res) => {
  try {
    const {
      company,
      contactInfo,
      instructions,
      employment,
      salary,
      qualifications,
      description,
      jobTitle,
    } = req.body;

    const job = new Job({
      company,
      contactInfo,
      instructions,
      employment,
      salary,
      qualifications,
      description,
      jobTitle,
    });

    await job.save();

    res.status(201).json({ message: 'Job added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add job' });
  }
};


exports.addQuestions = async (req, res) => {
  const { companyId, companyname, evalname ,questions, duration, created, dated } = req.body;

  try {
    // Create a new instance of YourModel
    const newEntry = new Eval({
      companyId,  
      companyname,
      evalname,   
      questions,
      duration,
      created,
      dated
    });

    // Save the new entry to the database
    await newEntry.save();

    res.status(201).json({ message: 'Questions added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding questions.' });
  }
};

exports.getQuestions = async (req, res) => {

  try {
    const questions = await Eval.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving questions.' });
  }
};

exports.companyEval = async (req, res) => {
  const { companyId  } = req.body;
  try {

    const user = await Eval.find({ companyId : companyId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid companyId' });
    }

    res.status(200).json( user );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error(error);
  }
};



exports.addAnswers = async (req, res) => {
  const { userId, evalId, answers, status, date} = req.body;

  const existingAnswer = await UserAnswer.findOne({ userId, evalId });
  if (existingAnswer) {
    res.status(400).json({ message: 'You have already taken the evaluation' });
  }

  try {
    // Create a new instance of YourModel
    const newEntry = new UserAnswer({
      userId,  
      evalId,  
      answers,
      status,
      date
    });

    // Save the new entry to the database
    await newEntry.save();

    res.status(201).json({ message: 'Answers added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding questions.' });
  }
};


exports.getOffers = async (req, res) => {

  try {
    const questions = await Job.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving offers.' });
  }
};


exports.updateCompanyImage = async (req, res) => {
  try {
    const { id } = req.params;
    

    const user = await Company.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

      if (user.imageid) {
        // Delete the existing image from Cloudinary
        await cloudinary.uploader.destroy(user.imageid);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'R-Companies',
        use_filename: true,
        unique_filename: false
      });
      const image = {
        url: result.secure_url,
        public_id: result.public_id,
        contentType: result.format
      };

    // Update user's image URL and secure URL in the database
    user.image = result.secure_url;
    user.imageid = result.public_id;
    await user.save();

    return res.json({ message: 'User image updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updatePasswordCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await Company.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await Company.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    return res.json({
      message: 'Password updated successfully',
      user: updatedUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updateCompanyinfo = async (req, res) => {
  try {

    const { id } = req.params;



    const { 
      companyname,
      companyaddress,
      industry,
      companysize,
      companywebsite,
      companyservice,
      email,
    } = req.body;

    const updatedAdmin = await Company.findByIdAndUpdate(id, { 
      companyname,
      companyaddress,
      industry,
      companysize,
      companywebsite,
      companyservice,
      email,
    }, { new: true });

    res.json(updatedAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.companyEvalAnswer = async (req, res) => {
  const { id  } = req.body;
  try {

    const user = await UserAnswer.findOne({ evalId : id });
    if (!user) {
      return res.status(401).json({ message: 'Invalid evaluation id' });
    }

    res.status(200).json( user );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error(error);
  }
};


exports.companyEvalUser = async (req, res) => {
  const { userId  } = req.body;
  try {

    const user = await userdb.findOne({ _id : userId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid user id' });
    }

    res.status(200).json( user );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error(error);
  }
};



 exports.Usertookeval = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await UserAnswer.findOne({ userId: userId });
    if (user) {
      res.json({ status: 'Taken' });
    } else {
      res.json({ status: 'Not Taken' });
    }
  } catch (error) {
    console.error('Error finding user by userId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deleteEval = async (req, res) => {
  const { id  } = req.params;
  try {

    const user = await Eval.findByIdAndDelete({ id });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Id' });
    }

    res.status(200).json( {message: "Evaluation has been deleted." });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error(error);
  }
};


exports.sendEmailDelay = async (req, res) => {

  const {mailed , fullname } = req.body;
  const {id} =req.params

  const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASS,
    },
  });

  try {

    const company = await Company.findById(id);

    const currentDate = new Date().toLocaleDateString();

    await transporter.sendMail({
      from: company.email,
      to: mailed,
      subject: `A Delay Letter From ${company.companyname}`, 
      html: `<img src="${company.image}" style={{width:"30px", height:"30px", borderRadius:"50%"}} alt="Company Logo">
      <br/>
      <br/><span style={{fontWeight:"bold", fontSize:22, textTransform:"uppercase"}}>${company.companyname}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>${company.companyaddress} ${company.selectedState}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>${company.location}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>${currentDate}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Dear ${fullname}</span>
      <br/>
      <br/> Thank you for taking the time to complete our online evaluation. We appreciate your interest and enthusiasm in joining our organization.
      <br/>
      <br/> We would like to inform you that we are currently in the process of reviewing all applications and evaluating candidates. Due to the high volume of applications we have received, this process is taking longer than anticipated. We understand the importance of providing timely updates and appreciate your patience during this time.
      <br/>
      <br/>Rest assured that we are carefully assessing each application and evaluating candidates based on our requirements. We value your interest in ${company.companyname} and assure you that we will contact you as soon as possible with further updates regarding the status of your application.
      <br/>
      <br/>Once again, thank you for your understanding and patience. We look forward to being in touch with you soon.
      <br/>
      <br/>Best regards,
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Sami Jelassi</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Human Resource Manager</span>
      <br/>
      <br/><span style={{fontWeight:"bold", fontSize:22 textTransform:"uppercase"}}>${company.companyname}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Samijelassi2909@gmail.com</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>+21628728170</span>
      <br/>`,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};


exports.sendEmailAcceptance = async (req, res) => {

  const {mailed , fullname } = req.body;
  const {id} =req.params

  const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASS,
    },
  });

  try {

    const company = await Company.findById(id);

    const currentDate = new Date().toLocaleDateString();

    const currentDateL = new Date();

    const futureDate = new Date();
    futureDate.setDate(currentDateL.getDate() + 10);

    const formattedFutureDate = futureDate.toLocaleDateString();

    await transporter.sendMail({
      from: company.email,
      to: mailed,
      subject: `An Acceptance Letter From ${company.companyname}`, 
      html: `<img src="${company.image}" style={{width:"30px", height:"30px", borderRadius:"50%"}} alt="Company Logo">
      <br/>
      <br/><span style={{fontWeight:"bold", fontSize:22, textTransform:"uppercase"}}>${company.companyname}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>${company.companyaddress} ${company.selectedState}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>${company.location}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>${currentDate}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Dear ${fullname}</span>
      <br/>
      <br/> Congratulations!
      <br/>
      <br/> We are delighted to inform you that you have successfully passed our online evaluation. We were impressed by your skills, qualifications, and performance throughout the assessment process.
      <br/>
      <br/> We believe that your expertise and experience will be a valuable addition to our team. Your enthusiasm for the role was evident, and we are excited to offer you the opportunity to join us. We are confident that your contributions will greatly contribute to our ongoing success.
      <br/>
      <br/>Please find attached the official offer letter, which includes details regarding your compensation, benefits, start date, and other relevant information. Take your time to review the offer carefully and let us know of your decision by ${formattedFutureDate}. Should you have any questions or require further clarification, please do not hesitate to contact us.
      <br/>
      <br/>We look forward to welcoming you to our organization and embarking on a mutually rewarding journey together.
      <br/>
      <br/>Best regards,
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Sami Jelassi</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Human Resource Manager</span>
      <br/>
      <br/><span style={{fontWeight:"bold", fontSize:22 textTransform:"uppercase"}}>${company.companyname}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Samijelassi2909@gmail.com</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>+21628728170</span>
      <br/>`,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};


exports.sendEmailRejection = async (req, res) => {

  const {mailed , fullname } = req.body;
  const {id} =req.params

  const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASS,
    },
  });

  try {

    const company = await Company.findById(id);

    const currentDate = new Date().toLocaleDateString();

    await transporter.sendMail({
      from: company.email,
      to: mailed,
      subject: `A Rejection Letter From ${company.companyname}`, 
      html: `<img src="${company.image}" style={{width:"30px", height:"30px", borderRadius:"50%"}} alt="Company Logo">
      <br/>
      <br/><span style={{fontWeight:"bold", fontSize:22, textTransform:"uppercase"}}>${company.companyname}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>${company.companyaddress} ${company.selectedState}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>${company.location}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>${currentDate}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Dear ${fullname}</span>
      <br/>
      <br/>We appreciate the time and effort you put into completing our online evaluation . We carefully reviewed your performance and qualifications in relation to our requirements and regret to inform you that we have decided not to move forward with your application at this time.
      <br/>
      <br/>Please note that the decision was based on a thorough assessment of various factors, including the specific needs of the role and the overall fit within our team. While your application was strong, we had to make difficult choices, and unfortunately, we are unable to offer you the position.
      <br/>
      <br/>We want to assure you that this decision does not diminish your accomplishments or abilities. We encourage you to continue pursuing your career aspirations and exploring opportunities that align with your skills and interests. Your dedication and effort are commendable, and we wish you the very best in your future endeavors.
      <br/>
      <br/>Thank you again for your interest in [Company Name]. We appreciate the opportunity to get to know you, and we encourage you to consider applying for other positions that may arise in the future. We will retain your application in our database and reach out should any suitable openings arise.
      <br/>
      <br/>Wishing you success in your professional journey.
      <br/>
      <br/>Sincerely,
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Sami Jelassi</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Human Resource Manager</span>
      <br/>
      <br/><span style={{fontWeight:"bold", fontSize:22 textTransform:"uppercase"}}>${company.companyname}</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>Samijelassi2909@gmail.com</span>
      <br/>
      <br/><span style={{fontWeight:"bold", textTransform:"uppercase"}}>+21628728170</span>
      <br/>`,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};


exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file provided' });
  }

  return res.status(200).json({ message: 'File uploaded successfully' });
};


exports.companyinfoos = async (req, res) => {
  try {
    const {id} = req.params
    const company = await Company.findById(id)

    if(!company) {
      return res.status(404).json({error: 'Company not found'})
    }
    res.json({companyname: company.companyname})

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Internel server error'})
  }
}