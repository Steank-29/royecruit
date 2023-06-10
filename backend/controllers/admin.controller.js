const contact = require('../models/usercontact.model')
const companies = require('../models/companycontact.model')
const companyModel = require('../models/company.model')
const userModel = require('../models/user.model')
const cloudinary = require('cloudinary').v2;
const Admin = require('../models/admin.model');
const User = require('../models/user.model')


cloudinary.config({
  cloud_name: 'dmmz2mgrr',
  api_key: '224933378218192',
  api_secret: 'HXNACy-i7whD2FohG3D5t8FZRYM'
});

module.exports.register = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'R-Admin',
      use_filename: true,
      unique_filename: false
    });

    const newAdmin = new Admin({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      dateofbirth: req.body.dateofbirth,
      gender: req.body.gender,
      homeAddress: req.body.homeAddress,
      jobPosition: req.body.jobPosition,
      image: result.secure_url,
      imageId: result.public_id
    });

    await newAdmin.save();
    res.send({ code: 200, message: 'Signup success' });
  } catch (error) {
    console.log(error);
    res.send({ code: 500, message: 'Signup error' });
  }
};

module.exports.getAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.send({ code: 200, message: 'Success', admins });
  } catch (error) {
    console.log(error);
    res.send({ code: 500, message: 'Error retrieving admins' });
  }
};

exports.contactedUsers = async (req, res) => {
    
    const { fullname, email, problem } = req.body;

    const contactProblem = new contact({
        fullname,
        email,
        problem
      });
    
      try {
        await contactProblem.save();
        res.status(200).json({ message: 'Our HRM Will Contact You As Soon As Possible.' });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while registering your case.!' });
      }
}

exports.contactingcompanies = async (req, res) => {
    
    const { company, email, problem } = req.body;

    const contactProblem = new companies({
        company,
        email,
        problem
      });
    
      try {
        await contactProblem.save();
        res.status(200).json({ message: 'Our HRM Will Contact You As Soon As Possible.' });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while registering your case.!' });
      }
}


exports.CountCountriesByOne = async (req, res) => {
  try {
    const countries = [
      'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Côte d\'Ivoire',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo (Congo-Brazzaville)',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia (Czech Republic)',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini (fmr. "Swaziland")',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Holy See',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (formerly Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia (formerly Macedonia)',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine State',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
    ];

    const countryCounts = await companyModel.aggregate([
      {
        $match: {
          companyaddress: { $in: countries },
        },
      },
      {
        $group: {
          _id: '$companyaddress',
          count: { $sum: 1 },
        },
      },
    ]);

    const countryCountsMap = {};
    const totalCount = countryCounts.length;

    // Initialize the counts for all countries to 0
    countries.forEach((country) => {
      countryCountsMap[country] = 0;
    });

    // Map the counts from the aggregation result
    countryCounts.forEach(({ _id, count }) => {
      countryCountsMap[_id] = count;
    });

    res.status(200).json({ countryCounts: countryCountsMap , countryTotal: totalCount });
  } catch (error) {
    console.error('Error counting countries:', error);
    res.status(500).json({ message: 'Error counting countries' });
  }
};

exports.CountIndustriesByOne = async (req, res) => {
  try {
    const industries = [
      'Healthcare',
      'Education',
      'Information technology',
      'Manufacturing',
      'Retail',
      'Financial services',
      'Hospitality',
      'Transportation and logistics',
      'Construction',
      'Energy',
      'Entertainment',
      'Professional services',
      'Government',
      'Agriculture',
      'Mining and extraction',
      'Nonprofit',
      'Real estate',
      'Insurance',
      'Telecommunications',
      'Legal'
    ];

    const industryCounts = await companyModel.aggregate([
      {
        $match: {
          industry: { $in: industries },
        },
      },
      {
        $group: {
          _id: '$industry',
          count: { $sum: 1 },
        },
      },
    ]);

    const industryCountsMap = {};
    const totalIndustry = industryCounts.length;

    // Initialize the counts for all countries to 0
    industries.forEach((industry) => {
      industryCountsMap[industry] = 0;
    });

    // Map the counts from the aggregation result
    industryCounts.forEach(({ _id, count }) => {
      industryCountsMap[_id] = count;
    });

    res.status(200).json({ industryCounts: industryCountsMap , industryTotal: totalIndustry });
  } catch (error) {
    console.error('Error counting industries:', error);
    res.status(500).json({ message: 'Error counting industries' });
  }
};

exports.countCompanies = async (req, res) => {
  try {
    const companyCount = await companyModel.countDocuments();
    const allusers = await companyModel.find()

    res.status(200).json({ count: companyCount, users : allusers });
  } catch (error) {
    console.error('Error counting companies:', error);
    res.status(500).json({ message: 'Error counting companies' });
  }
};

exports.countusers = async (req, res) => {
  try {
    const companyCount = await userModel.countDocuments();
    const allusers = await userModel.find()

    res.status(200).json({ count: companyCount , users : allusers });
  } catch (error) {
    console.error('Error counting companies:', error);
    res.status(500).json({ message: 'Error counting companies' });
  }
};


exports.StatusCompany = async (req, res) => {
  const  {companyId}  = req.params;
  const  status  = req.body.status;

  try {
    const company = await companyModel.findByIdAndUpdate(
      companyId,
      { status: status},
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.StatusUser = async (req, res) => {
  const  {userId}  = req.params;
  const  status  = req.body.status;

  try {
    const company = await User.findByIdAndUpdate(
      userId,
      { status: status },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.DeleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.DeleteCompany = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await companyModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};