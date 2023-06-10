const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const companySchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  companyaddress: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  companysize: {
    type: Number,
    required: true,
  },
  companywebsite: {
    type: String,
    required: true,
  },
  companyservice: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type : String,
    required: true
  },
  imageid: {
    type : String,
    required: true
  }, 
    selectedState: {
    type: String,
    required: false,
    default:""
    },
    location: {
      type: String,
      default:""
    },
    foundingDate: {
      type: Date,
      default:""
    },
    founder: {
      type: String,
      default: ''
    },
    employees: {
      type: Number,
      default: ''
    },
    revenue: {
      type: Number,
      default: ''
    },
    socialMedia: {
        type: String,
        default: ''
    },
      phone: {
        type: String,
        default: '',
      },
      customerSupport: {
        type: String,
        default: '',
      },
    question:{

        type: String,
        required: false,
        default:""
    },
    answer: {
        type: String,
        required: false,
        default:""
    },
    status: {
      type: String,
      default: 'authorized'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
}, { timestamps: true });

companySchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const Company = mongoose.model('companies', companySchema);

module.exports = Company;
