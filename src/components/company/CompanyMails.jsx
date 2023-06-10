import React, { useEffect, useState } from 'react'
import { CgetToken } from '../Cauth';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography,  } from '@mui/material';
import { styled , keyframes } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';

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

export default function CompanyMails() {

    const token = CgetToken();


    const [userId, setUserId] = useState(null);
    const [userses, setUserses] = useState([])
    

    useEffect(() => {
      
      if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      }
      }, []);

      const [user, setUser] = useState('');
      
      useEffect(() => {
      
      axios.get(`http://localhost:5000/royecruit/companyinfo/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      }, [userId]);


      fetch('http://localhost:5000/royecruit/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId })
      })
        .then(response => response.json())
        .then(data => {
          setUserses(data.users);
        })
        .catch(error => {
          console.error('Error:', error);
        });

      const [showText, setShowText] = React.useState(false);
      const [mailed, setMailed] = React.useState('');
      const [response, setResponse] = React.useState('');
      const [showBackdrop, setShowBackdrop] = useState(false);
  
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
  
    const [isVisible, setIsVisible] = React.useState(false);
  
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 600);
      return () => clearTimeout(timer);
    }, []);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
       if ( mailed==='' ) {
        toast.error("Please choose the email of the job seeker you're responding to.", {
          position: "bottom-center"
        });
      } else if ( response ==='' ) {
        toast.error("Please fill the response of yours", {
          position: "bottom-center"
        });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailed)) {
        toast.error('Please enter a valid email address', {
          position: 'bottom-center',
        });
      } else {

        const mail = `${user.email}`

        try {
            setShowBackdrop(true);
            const respond = await axios.post('http://localhost:5000/royecruit/send-email', { mail, mailed, response });
            setMailed('')
            setResponse('')
            toast.success(respond.data.message, {
                position:'top-center'
            });
            setShowBackdrop(false);
          } catch (error) {
            console.error('Error sending email:', error);
            toast.error(error.respond.data.message, {
                position:'top-center'
            });
            setShowBackdrop(false);
          }

      }
    };



  return (
    <React.Fragment>

        <Home>
            <Pretext variant="h4" sx={{
                color: "#000",
                fontSize: { xs: '40px', sm: '45px', md: '55px' , lg : '65px' },
                fontWeight: "700",
                fontFamily: "Oswald",
            }} className={`text ${showText ? 'visible' : ''}`} >
                Respond professionally to the inquiries 
            </Pretext>
            
            <Pretext variant="h4" sx={{
                color: "#36454F",
                fontSize: { xs: '18px', sm: '20px', md: '22px' , lg : '24px' },
                fontWeight: "300",
                fontFamily: "Oswald",
            }} className={`text ${visible ? 'visible' : ''}`} >
            It is<Span> crucial </Span>to engage in communication by respond to the messages <Spaw>received</Spaw> from Job Seekers.
            </Pretext>

            
        </Home>

            <Stack>


        <Paper sx={{ p: 2 , transform: isVisible ? "translateX(0)" : "translateX(-320%)",
        transition: "transform 1s ease-in-out", }} elevation={0}>
          <form onSubmit={handleSubmit}>
            <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:"bold", mt:2, marginLeft: {lg:22.5}}}>
                From 
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Company Name"
              type="text"
              value={user.email}
              defaultValue={user.email}
              sx={{width: "67%", marginLeft: {lg:22.5}}}         
            />
            <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:"bold", marginLeft: {lg:22.5}}}>
                To 
            </Typography>
            <FormControl sx={{ width: "67%", marginLeft: {lg:22.5} }}>
      <InputLabel id="company-select-label">Job Seekers Inquiries</InputLabel>
      <Select
        labelId="company-select-label"
        id="company-select"
        value={mailed}
        label="Job Seekers"
        onChange={(e) => setMailed(e.target.value)}
      >
        {userses.map(users => (
          <MenuItem key={users._id} value={users.email}>{users.email}</MenuItem>
        ))}
      </Select>
      </FormControl>
            <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:"bold", marginLeft: {lg:22.5}}}>
                Response 
            </Typography>
            <TextField
              margin="dense"
              label="What seem's to be the problem?"
              multiline
              rows={4}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              sx={{width: "67%", marginLeft: {lg:22.5}}} 
            />
              <Button type="submit" sx={{ float: "right" , paddingRight: 6, paddingLeft: 6, mr:29, marginTop: 2, border: "none", color: "#fff" , background: "#000" , fontFamily: "Oswald" , '&:hover': { color: "#fff", background:`linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)` , border: "none"} }} variant="contained" endIcon={<SendIcon />}>
                Reply
              </Button>

          </form>
          </Paper>
          </Stack>
    <ToastContainer/>
    <Backdrop open={showBackdrop}>
        <CircularProgress color="inherit" sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} />
      </Backdrop>
        
    </React.Fragment>
  )
}
