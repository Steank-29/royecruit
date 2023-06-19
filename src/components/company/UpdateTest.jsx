import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
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

export default function UpdateTest() {
  const [myStartDatas, setMyStartDatas] = useState([]);
  const [examName, setExamName] = useState('');
  const [examGrade, setExamGrade] = useState();
  const [examTime, setExamTime] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate()

  const {examId , userId} = useParams();
  

  useEffect(() => {
    getConfigureData();
  }, [])

  const getConfigureData = async () => {
    await axios.get(`http://localhost:5000/exam/exam/` + examId).then((response) => {
      console.log(response.status);
      setMyStartDatas(response.data);
      setIsLoading(false);
    })
  }

  const handleConfigure = (e) => {
    e.preventDefault();
    const exam = {
      examname: examName,
      time: examTime,
      passGrade: examGrade,
    };
    axios.patch(`http://localhost:5000/exam/${examId}`, exam).then((response) => {
      console.log(response.status);
      console.log(response.data);
      navigate(`/testqcm/${userId}`);
    });
  }



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
                Update Your Test
            </Pretext>

            
        </Home>

      <Container sx={{mb:40}}>  
      {myStartDatas.map((exam, index) => (
  <div key={index}>
    <form onSubmit={handleConfigure}>
      <Typography sx={{marginTop: 3, marginLeft: 12, color: "black"}}>
        Test Name & Duration <TimerIcon sx={{mb: -0.75}}/>
      </Typography>

      <TextField
  type="text"
  label="Test Name"
  name="examName"
  placeholder={exam.examname}
  value={examName}
  onChange={(e) => setExamName(e.target.value)}
  sx={{ marginTop: 3, width: '38%', marginLeft: 12 }}
/>


      <TextField
        type="number"
        label="Duration"
        name="examTime"
        placeholder={exam.time}
        value={examTime}
        onChange={e => setExamTime(e.target.value)}
        sx={{marginTop: 3, width: '37.5%', marginLeft: 7}}
      />

<TextField
  type="number"
  label="Pass Grade"
  placeholder={exam.passGrade}
  name="examGrade"
  value={examGrade}
  onChange={e => setExamGrade(e.target.value)}
  sx={{marginTop: 3, width: '38%', marginLeft: 12}}
/>


      <Button
        type="submit"
        variant="contained"
        sx={{
          color: "black",
          backgroundColor: "white",
          "&:hover": {color: "black", backgroundColor: "white"},
          ml: 4,
          mt: 4
        }}
      >
        Update Test
      </Button>
    </form>
  </div>
))}

    </Container>
      <ToastContainer/>
    </React.Fragment>
  )
}