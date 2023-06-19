const mongoose = require('mongoose');

const UserExamsSchema = new mongoose.Schema({
    examId: {
        type: String,
        
    },
    userId: {
        type: String,  
    },
    grade: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
    },
    userInfo: {
        username: {
            type: String,
        },
        examname: {
            type: String,
        },
        email: {
            type: String,
        }
    },
    examReview: [{

        qAnswers: {
            type: String,
        },
        qCorrect: {
            type: String,
        },
        qTitle: {
            type: String,
        }
    }],
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('UserExams', UserExamsSchema);