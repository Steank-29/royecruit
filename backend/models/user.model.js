const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
    },
  dateofbirth: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
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
  degree: {
    type: String,
    required: true,
  },
  selectedCountry: {
    type: String,
    required: false,
    default:""
    },  
    selectedState: {
    type: String,
    required: false,
    default:""
    },
    home: {
    type: String,
    required: false,
    default:""
    },
    gender: {
    type: String,
    required: false,
    default:""
    },
    altphone: {
    type: String,
    default:""
    },
    altemail: {
    type: String,
    default:""
    },
    profile: {
    type: String,
    default:""
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

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});


const User = mongoose.model('users', userSchema);

module.exports = User;
