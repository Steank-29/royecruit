const userdb = require('../models/user.model')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dmmz2mgrr',
  api_key: '224933378218192',
  api_secret: 'HXNACy-i7whD2FohG3D5t8FZRYM'
});



module.exports.register = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'R-Users',
      use_filename: true,
      unique_filename: false
    });
    const image = {
      url: result.secure_url,
      public_id: result.public_id,
      contentType: result.format
    };

    const newUser = new userdb({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      dateofbirth: req.body.dateofbirth,
      phone: req.body.phone,
      image: result.secure_url,
      imageid: result.public_id,
      degree: req.body.degree
    });

    await newUser.save();
    res.send({ code: 200, message: 'Signup success' });
  } catch (error) {
    console.log(error);
    res.send({ code: 500, message: 'Signup error' });
  }
}


exports.signin = async (req, res) => {
        const { email, password } = req.body;
        try {
          // Check if the user exists in the database
          const user = await userdb.findOne({ email });
          if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
          }
      
          // Compare the given password with the hashed password stored in the database
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
          }

          if (user.status === 'blocked') {
            return res.status(401).json({ message: `For some reason your account is blocked.!` });
          }
      
          // Generate an auth token for the user
          const token =  jwt.sign({id: user._id, image: userdb.image} , process.env.JWT_SECRET, {expiresIn: "30m"});
          const Refresh_token =  jwt.sign({id: user._id, image: userdb.image} , process.env.JWT_SECRET_REFRESH);
      

          res.status(200).json({ user, token, Refresh_token  });
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
          console.error(error);
        }
};


module.exports.getUserInfo = async (req, res) => {
  try {
    const user = await userdb.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}


module.exports.getUser = async (req, res) => {
  try {
    const user = await userdb.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}


exports.updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const { selectedCountry,
      selectedState,
      home,
      gender,
      altphone,
      altemail,
      profile,
      question,
      answer,} = req.body;

    const updatedAdmin = await userdb.findByIdAndUpdate(id, { selectedCountry,
      selectedState,
      home,
      gender,
      altphone,
      altemail,
      profile,
      question,
      answer,}, { new: true });

    res.json(updatedAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updateUser = async (req, res) => {
  try {

    const { id } = req.params;



    const { 
      firstname,
      lastname,
      email,
      dateofbirth,
      phone,
      degree,
    } = req.body;

    const updatedAdmin = await userdb.findByIdAndUpdate(id, { 
      firstname,
      lastname,
      email,
      dateofbirth,
      phone,
      degree,
    }, { new: true });

    res.json(updatedAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await userdb.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await userdb.findByIdAndUpdate(
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

exports.updateUserImage = async (req, res) => {
  try {
    const { id } = req.params;
    

    const user = await userdb.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

      if (user.imageid) {
        // Delete the existing image from Cloudinary
        await cloudinary.uploader.destroy(user.imageid);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'R-Users',
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

exports.getUsers = async (req, res) => {
  try {
    const companies = await userdb.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserInfoS = async (req, res) => {
try {
  const {id} = req.params;
  const user = await userdb.findById(id);
  res.status(200).json(user)
} catch (error) {
  res.status(404).json({message: error.message});
}
}