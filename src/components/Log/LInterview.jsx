import React, { useEffect, useRef, useState } from 'react';
import jwtDecode from 'jwt-decode';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Container, Card, CardHeader, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, CardActions, CardContent, Slide } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import { HelpOutline } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled, keyframes } from "@mui/material/styles";
import CountDownTimer from './CountDownTimer';




const Pretext = styled(Typography)(({ theme }) => ({
    opacity: 0,
    transition: 'opacity 2s ease-in-out, transform 1s ease-in-out',
    animation: '$slideDown 1s ease-in-out',
    transform: 'translateY(-50%)',
    '&.visible': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '@keyframes slideDown': {
      '0%': {
        opacity: 0,
        transform: 'translateY(-50%)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  }));
  
  const GradientAnimation = keyframes`
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
  `;
  
  const Span = styled('span')(({ theme }) => ({
    background: `linear-gradient(-45deg, #0077be, #00ad7c ,#0077be)`,
    backgroundSize: '400% 400%',
    animation: `${GradientAnimation} 3s ease-in-out infinite`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };



export default function LInterview() {
  const token = localStorage.getItem('usersdatatoken');
  const [userId, setUserId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const[success, setSuccess] = useState(false)
  const [date, setDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}/${month}/${day}`;

    setDate(formattedDate);
  }, []);


    const [evalId, setEvalId] = useState('')
    const [evalname, setEvalname]= useState('')
    const [evalquestions, setEvalquestions] = useState([]);

    
    const [answer, setAnswer] = useState('');
    const [answersList, setAnswersList] = useState([]);
  
    const handleAnswerChange = (e) => {
      setAnswer(e.target.value);
    };
  


  
    const [evalDuration, setEvalDuration] = useState(0);

    const videoRef = useRef(null);

    useEffect(() => {
      captureCamera();
    }, []);

    const captureCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
        } catch (err) {
          console.error('Failed to access the camera:', err);
        }
      };


  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, [token]);

  const [cID, setCID] = useState('')


  useEffect(() => {
    fetch('http://localhost:5000/royecruit/getquestions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setEvalId(data.map(item => item._id));
        localStorage.setItem('companyId', data.map(item => item.companyId))
        setEvalDuration(data.map(item => parseInt(item.duration, 10)));
        setEvalname(data.map(item => item.evalname));
        setEvalquestions(data.map(item => item.questions));
      })
      .catch(error => console.error(error));
  }, []);


  const [evaluationStatus, setEvaluationStatus] = useState('');


  const [long, setLong] = useState(0)
  const handleNextQuestion = async QL => {

    if (questionCount < QL - 1 && answer !== '' ) {
      setQuestionCount(prevCount => prevCount + 1);
      setLong(prevCount => prevCount + 1)
      if (answer.trim() !== '') {
        setAnswersList([...answersList, answer.trim()]);
        setAnswer('');
      }


      const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
        try {
          const photoBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
          const formData = new FormData();
          formData.append('file', photoBlob, `Picture Of UID: ${userId}`);
          formData.append('upload_preset', 'Steank'); 
    
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dmmz2mgrr/image/upload',
            formData
          );
    
          const photoURL = response.data.secure_url;
          console.log(photoURL);
        } catch (error) {
          console.error('Failed to upload the photo:', error);
        }
      
    } else if (questionCount < QL - 1 && answer === '' ) {
    toast.error("Please Submit Your Answer Before You Can Procced To The Next Question.", {
        position:"bottom-center"
    })
    }
    else if (questionCount === QL - 1) {
      setQuestionCount(0);
    }
  };


  const handleCardClick = async () => {

    try {
        const response = await axios.post('http://localhost:5000/royecruit/usertookeval', { userId: userId });
        const { status } = response.data;
        setEvaluationStatus(status);

        if (status === 'Taken') {
          alert("You've Already Took This Evaluation.");
          setDialogOpen(false);
        } else {
            setDialogOpen(true);
        }
      } catch (error) {
        console.error('Error checking evaluation status:', error);
      }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const navigate = useNavigate() ;

  const [inactiveCount, setInactiveCount] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setInactiveCount(inactiveCount => inactiveCount + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (inactiveCount === 3) {
      const postData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/royecruit/answers', {
                userId: userId.toString(),
                evalId : evalId.toString(),
                answers: answersList,
                status: 'taken',
                date: date
              });
              toast.warning("You have violated the rules. You are no longer eligible to take this evaluation", {
                position:"bottom-right"
            });
            window.location.reload()
            console.log(response.data)
        } catch (error) {
          console.error(error);
        }
      };
  
      postData();
    }
  }, [inactiveCount]);


  const evalDurationMulptyplied = evalDuration * 60 ;

  const handleSubmitEvaluation = async (event) => {
    event.preventDefault()

    try {
        const response = await axios.post('http://localhost:5000/royecruit/answers', {
          userId: userId.toString(),
          evalId : evalId.toString(),
          answers: answersList,
          status: 'taken',
          date: date
        });
  
        toast.success("Thank You For Taking The Evaluation", {
            position:"bottom-right"
        });
  
        // Clear the form fields
        setUserId('');
        setEvalId('');
        setAnswersList([]);
      } catch (error) {
        console.error(error);
      }

  }

  const [showText, setShowText] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!showText) {
        setShowText(true);
      }
    }, 200);

    const handleScroll = () => {
      const offsetY = window.pageYOffset;
      const screenHeight = window.innerHeight;
      const textPosition = document.querySelector('.text').offsetTop;
      if (offsetY > textPosition - screenHeight / 2) {
        setShowText(true);
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [showText]);


  const [companyInfo, setCompanyInfo] = useState(null)
  const companyIdL = localStorage.getItem('companyId')

  useEffect(() => {
  
  axios.get(`http://localhost:5000/royecruit/companyinfo/${companyIdL}`)
    .then(response => {
      setCompanyInfo(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [companyIdL]);



  return (
    <React.Fragment>
      <Container sx={{ mt: 15 }}>

      <Pretext sx={{
            marginTop: 14,  textAlign: "center", fontFamily: "Oswald", fontWeight: "bold", fontSize: 44,
          }} className={`text ${showText ? 'visible' : ''}`} >
            Existing <Span>Evaluations </Span> For The Moment
          </Pretext>

        
      

      {questions.map((question, index) => (
        <>

<Card sx={{ minWidth: 155, mt:4, border:"1px solid black" }}>
      <CardContent>
        <Typography gutterBottom>
        <Typography sx={{fontFamily:"Oswald", fontSize:13, color:"black", fontWeight:"bold", textTransform:"uppercase"}}>created By <span style={{fontSize:16}}><b>{question.companyname}</b></span></Typography>
        </Typography>
        <Typography gutterBottom>
        <Typography sx={{fontFamily:"Oswald", fontSize:13, color:"black", fontWeight:"bold", textTransform:"uppercase"}}>Domain: <span style={{fontSize:16}}><b><u>{companyInfo.industry}</u></b></span></Typography>
        </Typography>
        <Typography variant="h5" component="div">
        <Typography sx={{fontFamily:"Oswald", fontSize:21, fontWeight:"bold", textAlign:"center", textTransform:"uppercase"}}> {question.evalname} <u>Evaluation</u></Typography>
        </Typography>
        <Typography sx={{ mb: 1.5,fontFamily:"Oswald", fontSize:16, fontWeight:"bold",textTransform:"uppercase"  }} >
        <CalendarTodayIcon sx={{mb:-0.75}}/> From {formatDate(question.created)} Until {formatDate(question.dated)}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5,fontFamily:"Oswald", fontSize:16, fontWeight:"bold",textTransform:"uppercase"  }}>
        <TimerIcon sx={{mb: -0.75}}/> Duration <span style={{fontSize:18, fontWeight:"bold", color:"black"}}>{question.duration} minutes</span>
          <br />
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5,fontFamily:"Oswald", fontSize:16, fontWeight:"bold",textTransform:"uppercase"  }}>
        <HelpOutline sx={{mb: -0.75}}/> <span style={{fontSize:18, fontWeight:"bold", color:"black", textTransform:"capitalize"}}>You only have 3 attempts to exit the screen. </span>
          <br />
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5,fontFamily:"Oswald", fontSize:16, fontWeight:"bold",textTransform:"uppercase"  }}>
        <HelpOutline sx={{mb: -0.75}}/> <span style={{fontSize:18, fontWeight:"bold", color:"black", textTransform:"capitalize"}}>The camera should remain open. </span>
          <br />
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5,fontFamily:"Oswald", fontSize:16, fontWeight:"bold",textTransform:"uppercase"  }}>
        <HelpOutline sx={{mb: -0.75}}/> <span style={{fontSize:18, fontWeight:"bold", color:"black", textTransform:"capitalize"}}>Once Duration is over the evaluation will be closed. </span>
          <br />
        </Typography>

      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" sx={{color:'white', mr:4, fontFamily:"Oswald",paddingTop:1, paddingBottom:1, paddingRight:1, paddingLeft: 1, borderRadius:1, fontWeight:"bold", backgroundColor:"black", "&:hover": {color:"black", backgroundColor:"white"}}} onClick={handleCardClick}>Take Evaluation</Button>
      </CardActions>
    </Card>

            <Dialog TransitionComponent={Transition} fullScreen  open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>
            <video
        ref={videoRef}
        autoPlay
        style={{
          width: '250px',
          height: '120px',
        }}
      />
                <Typography sx={{float:"right", ml:3,  fontFamily:"OSwald", fontSize:16, fontWeight:"bold"}}>
        N°Q <br/> {question.questions.length}
        </Typography>
        <Typography sx={{float:"right", ml:3,  fontFamily:"OSwald", fontSize:16, fontWeight:"bold"}}>
        Lefted <br/>{inactiveCount}/3
        </Typography>
        <Typography sx={{float:"right", fontFamily:"OSwald", fontSize:16,ml:1, fontWeight:"bold"}}>
        Duration <br/> <CountDownTimer duration={evalDurationMulptyplied} />
        </Typography>
            </DialogTitle>
            <DialogContent>
  
                  <React.Fragment key={index}>
                  <Typography sx={{textAlign:"center", fontFamily:"Oswald", fontSize: 40, fontWeight:"bold", textTransform:"uppercase"}}>{question.evalname}</Typography>
                    <Typography sx={{textAlign:"center", fontFamily:"Oswald", fontSize: 20, fontWeight:"bold", mt:12}}>{question.questions[questionCount]}</Typography>

                    <div key={index}>
                    <TextField
                    type="text"
                    label={<Typography>Type Your Answer</Typography>}
                    name="question"
                    value={answer}
                    onChange={handleAnswerChange}
                    sx={{marginTop: 3 , width: '80%', marginLeft: 12}}
                    />
                    </div>
                     <br/> <br/>
                     {long <= question.questions.length-1  ? (
                        <>
                    <Button variant="contained" sx={{color:'black', border:"1px solid black", marginLeft: 14, fontFamily:"Oswald", borderRadius:1, fontWeight:"bold", backgroundColor:"white", "&:hover": {color:"white", backgroundColor:"black", border:"1px solid white",}}} onClick={() => handleNextQuestion(question.questions.length)}>
                    Next Question
                    </Button>
                    </>
                     ) : (
                        <Button variant="contained" sx={{color:'black', border:"1px solid black", marginLeft: 14, fontFamily:"Oswald", borderRadius:1, fontWeight:"bold", backgroundColor:"white", "&:hover": {color:"white", backgroundColor:"black", border:"1px solid white",}}} onClick={handleSubmitEvaluation}>
                        Submit Request
                      </Button>
                     ) }

                  </React.Fragment>
  
            </DialogContent>
            <DialogActions>
              <Button size="small" sx={{color:'white', fontFamily:"Oswald", borderRadius:1, fontWeight:"bold", backgroundColor:"black", "&:hover": {color:"white", backgroundColor:"black"}}} onClick={handleDialogClose}>Close</Button>
            </DialogActions>
          </Dialog>


        </>
              ))}

        <ToastContainer/>
      </Container>

    </React.Fragment>
  );
}


