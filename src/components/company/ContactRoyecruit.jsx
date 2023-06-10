import React from 'react'
import { Button, Divider, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { styled , keyframes } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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
const Twitter = styled(TwitterIcon)`
  font-size: 32px;
  color: #1DA1F2;
`;

const Facebook = styled(FacebookIcon)`
  font-size: 32px;
  color: #1877F2;
`;

const Linkedin = styled(LinkedInIcon)`
  font-size: 32px;
  color: #0077B5;
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


function CompanyContact() {

    const [showText, setShowText] = React.useState(false);
    const [fullname, setFullname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [problem, setProblem] = React.useState('');

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

  const [eyes, setEyes] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setEyes(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fullname ==='') {
      toast.error('Please type your fullname.', {
        position: "bottom-center"
      });
    } else if ( fullname.length < 2 ) {
      toast.error('Fullname is required.', {
        position: "bottom-center"
      });
    } else if ( fullname.includes("?") ) {
      toast.error('Your name & lastname cannot include ?', {
        position: "bottom-center"
      });
    } else if ( fullname.includes("!") ) {
      toast.error('Your name & lastname cannot include !', {
        position: "bottom-center"
      });
    } else if ( fullname.includes("@") ) {
      toast.error('Your name & lastname cannot include @', {
        position: "bottom-center"
      });
    } else if ( email==='' ) {
      toast.error('Please type your email.', {
        position: "bottom-center"
      });
    } else if ( problem ==='' ) {
      toast.error("Please tell us what seem's to be the problem.", {
        position: "bottom-center"
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address', {
        position: 'bottom-center',
      });
    } else {

    
    try {
      // Send a POST request to the backend API
      const response = await axios.post('http://localhost:5000/royecruit/contact', {
            fullname,
            email,
            problem,
          });
          const data = response.data;
          if (response.status === 200) {
            toast.success(data.message, {
              position: "bottom-left"
            });
            setFullname('');
            setEmail('');
            setProblem('');
          }    

    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-left"
      });
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
                Talk to our platform team
            </Pretext>
            
            <Pretext variant="h4" sx={{
                color: "#36454F",
                fontSize: { xs: '18px', sm: '20px', md: '22px' , lg : '24px' },
                fontWeight: "300",
                fontFamily: "Oswald",
            }} className={`text ${visible ? 'visible' : ''}`} >
            If you have any <Span>questions</Span> or <Spaw>concerns</Spaw>, please don't hesitate to reach out to our team.
            </Pretext>

            
        </Home>


        <Grid container spacing={2} sx={{marginTop : 4, marginBottom:{xs:0, sm:0, md:6, lg:10}}}>
      <Grid item xs={12} sm={6}>
        <Paper sx={{ p: 2 , transform: isVisible ? "translateX(0)" : "translateX(-320%)",
        transition: "transform 1s ease-in-out", }} elevation={0}>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Company Name"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              sx={{width: "90%", marginLeft: {lg:7.5}}}         
            />
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{width: "90%", marginLeft: {lg:7.5}}} 
            />
            <TextField
              margin="dense"
              label="What seem's to be the problem?"
              multiline
              rows={4}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              sx={{width: "90%", marginLeft: {lg:7.5}}} 
            />
              <Button type="submit" sx={{ float: "right" , paddingRight: 4, paddingLeft: 4, marginTop: 2, border: "none", color: "#fff" , background: "#000" , fontFamily: "Oswald" , '&:hover': { color: "#fff", background:`linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)` , border: "none"} }} variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper sx={{ p: 2 , transform: eyes ? "translateX(0)" : "translateX(320%)",
        transition: "transform 1s ease-in-out", }} elevation={0}>
          <Typography sx={{fontFamily: "Oswald", marginLeft: 6, fontSize : 22, marginTop: 3, fontWeight: "400", color:"black", textAlign:"justify"}}>
          "We're here to help! Reach out to us with<br/> any questions, feedback or inquiries you may have<br/> We look forward to hearing from you."
          </Typography>
          <Typography sx={{fontFamily: "Oswald",marginTop: 1, marginLeft: 6, fontSize : 26, fontWeight: "bold", color:"black", textAlign:"justify"}}>
          Royecruit HRM
          </Typography>
          <Divider variant="middle" sx={{marginTop : 2 , color: "black" , width: {xs:"95%", sm: "95%",lg:"80%"}}} />
          <Typography sx={{fontFamily: "Oswald", marginTop : 2 , marginLeft: 6, fontSize : 20, fontWeight: "bold", color:"black", textAlign:"justify"}}>
          Our social media profiles for more informations
          </Typography>

          <Typography sx={{ marginLeft: 6}}>

          <IconButton>
            <Facebook/>
          </IconButton>

          <IconButton>
            <Twitter/>
          </IconButton>

          <IconButton>
            <Linkedin/>
          </IconButton>

          </Typography>
        </Paper>
      </Grid>
    </Grid>
    <ToastContainer/>
    </React.Fragment>
  )
}

export default CompanyContact