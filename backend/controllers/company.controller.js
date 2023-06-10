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
  const { evalId , userId  } = req.body;
  try {

    const user = await UserAnswer.findOne({ evalId : evalId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid evaluation id' });
    }

    const user1 = await userdb.findOne({ _id : userId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid evaluation id' });
    }

    res.status(200).json( {user, user1} );
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