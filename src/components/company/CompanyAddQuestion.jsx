import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { CgetToken } from '../Cauth';
import { Button, Container, TextField, Typography, IconButton, Badge, Popover,} from '@mui/material';
import { styled , keyframes } from '@mui/material/styles';
import { Mail } from '@mui/icons-material';
import { HelpOutline } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TimerIcon from '@mui/icons-material/Timer';

const Home = styled('div')(({ theme }) => ({
  marginTop: "140px",
  textAlign: "center",
}));



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
const Spaw = styled('span')(({ theme }) => ({
  background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`,
  backgroundSize: '400% 400%',
  animation: `${GradientAnimation} 3s ease-in-out infinite`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const ContainerIcon = styled('div')({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
});


const messageList = [
  'Research the company thoroughly.',
  'Understand the job requirements and align your experience.',
  'Practice common interview questions.',
  'Highlight your accomplishments and measurable results.',
  'Prepare thoughtful questions to ask.',
  "Dress professionally according to the company's dress code.",
  'Practice good body language and maintain eye contact.',
  'Emphasize relevant skills and experiences.',
  'Demonstrate enthusiasm and positivity.',
  'Showcase teamwork and collaboration skills.',
  'Discuss professional growth and development.',
  'Follow up with a thank-you note to express appreciation.',
  'Arrive early and make a positive impression.',
];

export default function CompanyAddQuestion() {
  const [companyId, setCompanyId] = useState(null);

  const token = CgetToken();
  useEffect(() => {
    
    if (token) {
    const decodedToken = jwtDecode(token);
    setCompanyId(decodedToken.id);
    }
    }, []);

    const [questions, setQuestions] = useState([]);
    const [evalname, setEvalname] = useState("");
    const [duration, setDuration] = useState("");
    const [created, setCreated] = useState("");
    const [dated, setDated] = useState("");


    const handleAddQuestion = () => {
      setQuestions([...questions, '']);
    };
  
    const handleQuestionChange = (index, value) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = value;
      setQuestions(updatedQuestions);
    };

    const [user, setUser] = useState(null);
    const [companyname, setCompanyname] = useState('');
      
      useEffect(() => {
      
      axios.get(`http://localhost:5000/royecruit/companyinfo/${companyId}`)
        .then(response => {
          setUser(response.data);
          setCompanyname(response.data.companyname);
        })
        .catch(error => {
          console.error(error);
        });
      }, [companyId]);

  
    const handleSubmit = (event) => {
      event.preventDefault();
      const requestData = {
        companyId: companyId,
        companyname: companyname,
        evalname: evalname,
        questions: questions.filter((question) => question.trim() !== ''),
        duration: duration,
        created: created,
        dated: dated
      };
  
      // Make the API request
      axios.post('http://localhost:5000/royecruit/questions', requestData)
      .then((response) => {
        console.log('Response:', response.data);
        toast.success("Evaluation have been created successfully.",{
          position:"bottom-left"
        })
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error("You have a server side error",{
          position:"bottom-left"
        })
      });
      
    };


    const [showText, setShowText] = React.useState(false);
    React.useEffect(() => {
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
  
    const [visible, setVisible] = React.useState(false);
  
    React.useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (!visible) {
          setVisible(true);
        }
      }, 400);
  
      const handleScroll = () => {
        const offsetY = window.pageYOffset;
        const screenHeight = window.innerHeight;
        const textPosition = document.querySelector('.text').offsetTop;
        if (offsetY > textPosition - screenHeight / 2) {
          setVisible(true);
          window.removeEventListener('scroll', handleScroll);
          clearTimeout(timeoutId);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      };
    }, [visible]);

    const [anchorEl, setAnchorEl] = useState(null);
  const [randomMessage, setRandomMessage] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setRandomMessage(messageList[Math.floor(Math.random() * messageList.length)]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'message-popover' : undefined;
    

  return (
    <React.Fragment>
      <Home>
            <Pretext variant="h4" sx={{
                color: "#000",
                fontSize: { xs: '40px', sm: '45px', md: '55px' , lg : '65px' },
                fontWeight: "700",
                fontFamily: "Oswald",
            }} className={`text ${showText ? 'visible' : ''}`} >
                Upload Your Own Evaluation's Questions 
            </Pretext>
            
            <Pretext variant="h4" sx={{
                color: "#36454F",
                fontSize: { xs: '18px', sm: '20px', md: '22px' , lg : '24px' },
                fontWeight: "300",
                fontFamily: "Oswald",
            }} className={`text ${visible ? 'visible' : ''}`} >
            All Kind of<Span> interview's </Span>questions should be included for better <Spaw>job seeker</Spaw> find.
            </Pretext>

            
        </Home>

            <Container sx={{mb:40}}>
      <form onSubmit={handleSubmit}>
        <Typography sx={{marginTop: 3 , marginLeft: 12, color:"black"}}>
          Evaluation Name & Duration <TimerIcon sx={{mb:-0.75}}/>
        </Typography>
      <TextField
            type="text"
            label="Evaluation Name"
            name="evalname"
            onChange={(event) => setEvalname(event.target.value)}
            value={evalname}
            sx={{marginTop: 3 , width: '38%', marginLeft: 12}}
          />
          <TextField
            type="text"
            label="Duration"
            name="duration"
            onChange={(event) => setDuration(event.target.value)}
            value={duration}
            sx={{marginTop: 3 , width: '37.5%', marginLeft: 7}}
          />


<Typography sx={{marginTop: 3 , marginLeft: 12, color:"black"}}>
          From <CalendarTodayIcon sx={{mb:-0.75}}/> Until <CalendarTodayIcon sx={{mb:-0.75}}/>
        </Typography>
      <TextField
            type="date"
            label=""
            name="evalname"
            onChange={(event) => setCreated(event.target.value)}
            value={created}
            sx={{marginTop: 3 , width: '38%', marginLeft: 12}}
          />
          <TextField
            type="date"
            label=""
            name="duration"
            onChange={(event) => setDated(event.target.value)}
            value={dated}
            sx={{marginTop: 3 , width: '37.5%', marginLeft: 7}}
          />





        <Typography sx={{marginTop: 3 , marginLeft: 12, color:"black"}}>
          Questions ?
        </Typography>


      {questions.map((question, index) => (
        <div key={index}>
          <TextField
            type="text"
            label={<Typography>What Would Be The Question N° {index+1}</Typography>}
            name="question"
            onChange={(event) => handleQuestionChange(index, event.target.value)}
            value={question}
            sx={{marginTop: 3 , width: '80%', marginLeft: 12}}
          />
        </div>
      ))}
      <Button type="button" variant='contained' sx={{color:"white", backgroundColor:"black", "&:hover": {color:"black", backgroundColor:"white"}, ml:12, mt:4}} onClick={handleAddQuestion}>
        Add Questions
      </Button>
      <Button type="submit" variant='contained' sx={{color:"black", backgroundColor:"white", "&:hover": {color:"black", backgroundColor:"white"}, ml:4, mt:4}} >Upload Evaluation</Button>
    </form>
    <ContainerIcon>
    <IconButton color="inherit" onClick={handleClick}>
        <Badge color="success">
          <HelpOutline />
        </Badge>
      </IconButton>
      <Typography variant="caption">Quick Tip</Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>{randomMessage}</Typography>
      </Popover>
      </ContainerIcon>
    </Container>
      <ToastContainer/>
    </React.Fragment>
  )
}
