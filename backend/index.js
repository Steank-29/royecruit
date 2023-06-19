const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express()
const path = require('path');



const userRoutes = require('./routes/user.router')
const examRoutes = require('./routes/test.router')
const userexamRoutes = require('./routes/userExam.router')
const examQuestionRoutes = require('./routes/testQuestion.router')


app.use( express.json() )
app.use( cors() )
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/' , (req , res ) => {
    res.send("Hello From Backend")
})
app.use('/royecruit/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/royecruit' , userRoutes)
app.use('/exam' , examRoutes)
app.use('/examquestions' , examQuestionRoutes)
app.use('/userexams' , userexamRoutes)





mongoose.connect( process.env.CONNECTION_STRING , 
{
    useNewUrlParser : true,
    useUnifiedTopology : true
}
)

const db = mongoose.connection;

db.on("error" , console.error.bind(console , "connection failed : ") );
db.once("open" , function() {
    console.log(`Connection to database : "${process.env.DATA_BASE_NAME}" is working...`)
})

app.listen(process.env.PORT , ()=> {
    console.log(`app running on port, http://localhost:${process.env.PORT}`);
})
