import React, { useState, useEffect  } from 'react'
import { Typography , Paper, CardContent, CardHeader , Grid ,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  DialogContentText,
  Card,
  } from '@mui/material'
import { styled , keyframes } from '@mui/material/styles';
import { FaGem , FaRocket } from 'react-icons/fa';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import InfoIcon from '@mui/icons-material/Info';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import chart from "../components/assets/chart.png"
import growth from "../components/assets/growth.png"
import employee from "../components/assets/employee.png"
import equality from "../components/assets/equality.png"
import mission from "../components/assets/mission.png"
import self from "../components/assets/self.png"
import sound from "../components/assets/sound.png"


import { CarouselProvider, Slider, Slide} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const Home = styled('div')(({ theme }) => ({
  marginTop: "140px",
  textAlign: "center",
}));


const Title = styled('div')(({ theme }) => ({
  color : "#000",
  fontWeight : "bold",
  fontFamily : "Oswald"
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

const StyledCard = styled(Paper)`
  max-width: 300px;
  margin: 0 auto;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
`;



const StyledIcon = styled(GroupsIcon)`
  font-size: 48px;
  color: #000;
`;

const StyledIcon2 = styled(SettingsSuggestIcon)`
  font-size: 48px;
  color: #000;
`;

const StyledIcon3 = styled(Diversity2Icon)`
  font-size: 48px;
  color: #000;
`;

const StyledIcon4 = styled(InfoIcon)`
  font-size: 48px;
  color: #000;
`;

const Twitter = styled(TwitterIcon)`
  font-size: 22px;
  color: #1DA1F2;
`;

const Facebook = styled(FacebookIcon)`
  font-size: 22px;
  color: #1877F2;
`;

const Linkedin = styled(LinkedInIcon)`
  font-size: 22px;
  color: #0077B5;
`;

const Gmail = styled(EmailIcon)`
  font-size: 22px;
  color: #DB4437;
`;

const Phone = styled(PhoneIcon)`
  font-size: 22px;
  color: green;
`;

const StyledIcon5 = styled(ApartmentIcon)`
  font-size: 48px;
  color: #000;
`;

const StyledIcon6 = styled(PersonSearchIcon)`
  font-size: 48px;
  color: #000;
  
`;



function CarouselSlider() {
 
  const cardStyle = {
    height: '100%',
  };
  return (
    <CarouselProvider
      
      totalSlides={2}
      isIntrinsicHeight={true}
      isPlaying
      interval={3000}
      
    >
      <Slider >
        <Slide index={0}>
        <Card style={cardStyle} elevation={3} sx={{background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, borderRadius: 2 }} >
              <CardContent>
                <Typography sx={{marginLeft: "25%"}}> <img src={chart} alt="Eco" style={{ width: 64, height: 64 }} /></Typography>
                <Typography variant="h6" component="h2" sx={{fontWeight : "bold", fontFamily: "Oswald", fontSize: 22, color:"#fff"}}>
                Economic prosperity
                </Typography>
                <Typography variant="body2" component="p" sx={{ fontFamily: "Oswald", fontSize: 18, marginTop: 1, color: "#fff"}}>
                Royecruit is a platform that enhances companies' recruitment and HR capabilities, enabling them to make smarter hiring decisions and achieve economic prosperity to empowers companies to focus on what they do best.                </Typography>
              </CardContent>
            </Card>
        </Slide>
        <Slide index={1}>
        <Card style={cardStyle} elevation={3} sx={{background: `linear-gradient(-45deg, #00a152, #006da1)`, borderRadius: 2 }} >
              <CardContent>
                <Typography sx={{marginLeft: "25%"}}> <img src={growth} alt="growth" style={{ width: 64, height: 64 }}  /></Typography>
                <Typography variant="h6" component="h2" sx={{fontWeight : "bold", fontFamily: "Oswald", fontSize: 22, color:"#fff"}}>
                Sustainable growth
                </Typography>
                <Typography variant="body2" component="p" sx={{ fontFamily: "Oswald", fontSize: 18, marginTop: 1, color: "#fff"}}>
                To achieve sustainable growth while maintaining quality and sustainability, it's crucial to hire the right employees who have the right skills, experience, and attitude to help the company achieve its goals more efficiently.               </Typography>
              </CardContent>
            </Card>
        </Slide>
      </Slider>
      
    </CarouselProvider>
  );
}

function CarouselSlider2() {
 
  const cardStyle = {
    height: '100%',
  };
  return (
    <CarouselProvider
      
      totalSlides={2}
      isIntrinsicHeight={true}
      isPlaying
      interval={3000}
      
    >
      <Slider >
        <Slide index={0}>
        <Card style={cardStyle} elevation={3} sx={{background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, borderRadius: 2 }} >
              <CardContent>
                <Typography sx={{marginLeft: "25%"}}> <img src={self} alt="self" style={{ width: 64, height: 64 }} /></Typography>
                <Typography variant="h6" component="h2" sx={{fontWeight : "bold", fontFamily: "Oswald", fontSize: 22, color:"#fff"}}>
                Self-improvement
                </Typography>
                <Typography variant="body2" component="p" sx={{ fontFamily: "Oswald", fontSize: 18, marginTop: 1, color: "#fff"}}>
                Self-improvement not only helps individuals excel in their work domain, but also in their personal lives. By continuously identifying areas for development and taking proactive steps towards growth, individuals can unlock their full potential and achieve greater success.</Typography>
              </CardContent>
            </Card>
        </Slide>
        <Slide index={1}>
        <Card style={cardStyle} elevation={3} sx={{background: `linear-gradient(-45deg, #00a152, #006da1)`, borderRadius: 2 }} >
              <CardContent>
                <Typography sx={{marginLeft: "25%"}}> <img src={sound} alt="transparency" style={{ width: 64, height: 64 }}  /></Typography>
                <Typography variant="h6" component="h2" sx={{fontWeight : "bold", fontFamily: "Oswald", fontSize: 22, color:"#fff"}}>
                Transparency
                </Typography>
                <Typography variant="body2" component="p" sx={{ fontFamily: "Oswald", fontSize: 18, marginTop: 1, color: "#fff"}}>
                Royecruit ensures transparency between candidates, companies to ensures a fair and efficient recruitment process by enabling clear communication and information disclosure. This allows for attracting the right talent for the job.               </Typography>
              </CardContent>
            </Card>
        </Slide>
      </Slider>
      
    </CarouselProvider>
  );
}

const Text = styled(Typography)(({ theme }) => ({
  opacity: 0,
  transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
  animation: '$fadeIn 1s ease-in-out',
  transform: 'translateY(50%)',
  '&.visible': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(50%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
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


const Missiontext = styled(Typography)(({ theme }) => ({
  opacity: 0,
  transition: 'opacity 6s ease-in-out, transform 2s ease-in-out',
  animation: '$slideDown 10s ease-in-out',
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

function About(props) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
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

  const [visibling, setVisibling] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!visibling) {
        setVisibling(true);
      }
    }, 400);

    const handleScroll = () => {
      const offsetY = window.pageYOffset;
      const screenHeight = window.innerHeight;
      const textPosition = document.querySelector('.text').offsetTop;
      if (offsetY > textPosition - screenHeight / 2) {
        setVisibling(true);
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [visibling]);


  const [visiblity, setVisiblity] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!visiblity) {
        setVisiblity(true);
      }
    }, 600);

    const handleScroll = () => {
      const offsetY = window.pageYOffset;
      const screenHeight = window.innerHeight;
      const textPosition = document.querySelector('.text').offsetTop;
      if (offsetY > textPosition - screenHeight / 2) {
        setVisiblity(true);
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [visiblity]);


  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!showText) {
        setShowText(true);
      }
    }, 700);

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


  const [showTexting, setShowTexting] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!showTexting) {
        setShowTexting(true);
      }
    }, 8000);

    const handleScroll = () => {
      const offsetY = window.pageYOffset;
      const screenHeight = window.innerHeight;
      const textPosition = document.querySelector('.text').offsetTop;
      if (offsetY > textPosition - screenHeight / 2) {
        setShowTexting(true);
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [showTexting]);

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    handleOpen();
  };

  const [open1, setOpen1] = useState(false);

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClick1 = () => {
    handleOpen1();
  };

  const [open2, setOpen2] = useState(false);

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClick2 = () => {
    handleOpen2();
  };

  const [open3, setOpen3] = useState(false);

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClick3 = () => {
    handleOpen3();
  };

  const [open4, setOpen4] = useState(false);

  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const handleClick4 = () => {
    handleOpen4();
  };


  const [open5, setOpen5] = useState(false);

  const handleOpen5 = () => {
    setOpen5(true);
  };

  const handleClose5 = () => {
    setOpen5(false);
  };

  const handleClick5 = () => {
    handleOpen5();
  };

  const rootStyle = {
    flexGrow: 1,
    marginTop: 20,
  };
  const paperStyle = {
    padding: 20,
    textAlign: 'center',
    color: 'black',
  };
  const cardStyle = {
    height: '100%',
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const [view, setView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setView(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);


  const [eye, setEye] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEye(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);


  const [isVisibler, setIsVisibler] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisibler(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const [viewer, setViewer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setViewer(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);


  const [eyes, setEyes] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEyes(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  

  return (
    <React.Fragment>
      <Home>
      <Pretext variant="subtitle2" sx={{
                fontSize: 16,
                fontFamily: "Oswald",
                marginTop: 4,
                fontWeight: "bold",
                color: "#36454F"
            }} className={`text ${showText ? 'visible' : ''}`}>
            For <Span>enhanced<FaGem /></Span> & <Spaw>efficient<FaRocket/></Spaw> outcomes</Pretext>
            
              <Text variant="h4" sx={{
              color: "#000",
              fontSize: { xs: '40px', sm: '45px', md: '55px', lg : '65px' },
              fontWeight: "700",
              fontFamily: "Oswald",
              }} className={`text ${visible ? 'visible' : ''}`}>
              Our intentions are to set an efficient<br/> 
              <Spaw>pathway</Spaw> to help you get your <Span>dream job.</Span>
              </Text>
            <Text variant="subtitle2" sx={{
                fontSize: 18,
                fontFamily: "Oswald",
                color: "#36454F", 
                marginTop : 2
            }} className={`text ${visiblity ? 'visible' : ''}`}>
             However, before that, let me take you on a tour to introduce who we are, explain our services, and introduce our developers.</Text>
             <Text variant="subtitle2" sx={{
                fontSize: 18,
                fontFamily: "Oswald",
                color: "#36454F"
            }} className={`text ${visibling ? 'visible' : ''}`}>
             In brief and easy to follow, if anything is unclear, you'll find a more detailed explanation below.</Text>
        </Home>

        <Grid container spacing={2} sx={{marginTop: 5 }}>
      <Grid item xs={12} sm={4}>
      <StyledCard elevation={0} sx={{
        transform: isVisible ? "translateX(0)" : "translateX(-120%)",
        transition: "transform 1s ease-in-out",
      }} >
      <CardHeader
        sx={{textAlign : 'center'}}
        title={<IconButton onClick={handleClick} >
        <StyledIcon />
        </IconButton>}
        subheader={<Title> WHO ARE WE ? </Title>}
      >
        </CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" sx={{marginBottom: 2, fontFamily : "Oswald",}}>
        <b>Royecruit</b> is a platform that helps companies find the best candidates for their job openings. Our mission is to revolutionize the recruitment process by providing innovative solutions...
        </Typography>
        <Button variant='contained' sx={{background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, border: "1px solid none", color : "white", "&:hover":{background:"white", color:"black", border: "1px solid none"}}} onClick={handleClick}>Keep Reading</Button>
      </CardContent>
      
    </StyledCard>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{fontFamily: "Oswald", fontSize: 22 , fontWeight: "bold"}}>WHO ARE WE ?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            fontFamily: "Oswald", fontSize: 18
          }} >
          <Spaw><b>Royecruit</b></Spaw> is a platform that helps companies find the best candidates for their job openings. Our mission is to revolutionize the recruitment process by providing innovative solutions that save time and resources, while ensuring the best fit for both employers and job seekers.
          </DialogContentText>

            <DialogActions>
              <Button onClick={handleClose} sx={{background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, border: "1px solid white", color : "white" , "&:hover":{border: "1px solid white"} }} variant="outlined" >
                DONE READING
              </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>

      </Grid>

      


      <Grid item xs={12} sm={4}>
      <StyledCard elevation={0} sx={{
        transform: view ? "translateY(0)" : "translateY(620%)",
        transition: "transform 1s ease-in-out",
      }} >
      <CardHeader
        sx={{textAlign : 'center'}}
        title={<IconButton onClick={handleClick1} >
        <StyledIcon2 />
        </IconButton>}
        subheader={<Title> OUR SERVICES </Title>}
      >
        </CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" sx={{marginBottom: 2, fontFamily : "Oswald",}}>
        <b>Royecruit</b> offers a range of services to help companies streamline their recruitment process and find the best candidates for their job openings, Our platform uses advanced algorithms...
        </Typography>
        <Button variant='contained' sx={{background: "black", border: "1px solid none", color : "white", "&:hover":{background:`linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, color:"white", border: "1px solid none"}}} onClick={handleClick1}>Keep Reading</Button>
      </CardContent>
    </StyledCard>
    <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle sx={{fontFamily: "Oswald", fontSize: 22 , fontWeight: "bold"}}>OUR SERVICES</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            fontFamily: "Oswald", fontSize: 18
          }} >
             <Spaw><b>Royecruit</b></Spaw> offers a range of services to help companies streamline their recruitment process and find the best candidates for their job openings. Our platform uses advanced algorithms and AI technology to filter through thousands of resumes and applications, identifying the most qualified and suitable candidates for each job.
          </DialogContentText>

            <DialogActions>
              <Button onClick={handleClose1} sx={{background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, border: "1px solid white", color : "white", "&:hover":{border: "1px solid white"} }} variant="outlined" >
                DONE READING
              </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
      </Grid>

      

      <Grid item xs={12} sm={4}>  
      <StyledCard elevation={0} sx={{
        transform: eye ? "translateX(0)" : "translateX(220%)",
        transition: "transform 1s ease-in-out",
      }} >
      <CardHeader
        sx={{textAlign : 'center'}}
        title={<IconButton onClick={handleClick2} >
        <StyledIcon3 />
        </IconButton>}
        subheader={<Title> OUR TEAM </Title>}
      >
        </CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" sx={{marginBottom: 2, fontFamily : "Oswald",}}>
        Our team consists of experienced HR professionals, software developers, and data scientists who are passionate about helping companies find the best talent, Each member of our team...
        </Typography>
        <Button variant='contained' sx={{background: "white", border: "1px solid none", color : "black", "&:hover":{background:"black", color:"white", border: "1px solid none"}}} onClick={handleClick2}>Keep Reading</Button>
      </CardContent>
    </StyledCard>
   <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle sx={{fontFamily: "Oswald", fontSize: 22 , fontWeight: "bold"}}>OUR TEAM</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            fontFamily: "Oswald", fontSize: 18
          }} >
          Our team consists of experienced HR professionals, software developers, and data scientists who are passionate about helping companies find the best talent. Each member of our team brings a unique set of skills and expertise to the table, enabling us to provide top-notch solutions to our clients.      
          </DialogContentText>

            <DialogActions>
              <Button onClick={handleClose2} sx={{background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, border: "1px solid white", color : "white", "&:hover":{border: "1px solid white"} }} variant="outlined" >
                DONE READING
              </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
      
      </Grid>

      <Grid item xs={12} sm={4}>  
      <StyledCard elevation={0} sx={{
        transform: viewer ? "translateY(0)" : "translateY(520%)",
        transition: "transform 1s ease-in-out",
      }} >
      <CardHeader
        sx={{textAlign : 'center'}}
        title={<IconButton onClick={handleClick3} >
        <StyledIcon4 />
        </IconButton>}
        subheader={<Title> CONTACT INFO </Title>}
      >
        </CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" sx={{marginBottom: 2, fontFamily : "Oswald",}}>
        Feel free to contact us anytime at info@royecruit.com or by phone at 555-1234. You can also connect with us on our social media profiles on Twitter, Facebook, and LinkedIn...
        </Typography>
        <Button variant='contained' sx={{background: "black", border: "1px solid none", color : "white", "&:hover":{background:"white", color:"black", border: "1px solid none"}}} onClick={handleClick3}>Keep Reading</Button>
      </CardContent>
    </StyledCard>
   <Dialog open={open3} onClose={handleClose3}>
        <DialogTitle sx={{fontFamily: "Oswald", fontSize: 22 , fontWeight: "bold"}}>CONTACT INFO</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            fontFamily: "Oswald", fontSize: 18
          }} >
          Feel free to contact us anytime at <b>info@royecruit.com<Gmail/></b> or by phone at <b>+216 28-728-170<Phone/></b>, You can also connect with us on our social media profiles on Twitter<Twitter/>, Facebook<Facebook/>, and LinkedIn<Linkedin/> for news and updates about our platform and services. We look forward to hearing from you!
          </DialogContentText>

            <DialogActions>
              <Button onClick={handleClose3} sx={{background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, border: "1px solid white", color : "white", "&:hover":{border: "1px solid white"} }} variant="outlined" >
                DONE READING
              </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
      
      </Grid>

    
      <Grid item xs={12} sm={4}>  
      <StyledCard elevation={0} sx={{
        transform: eyes ? "translateX(0)" : "translateX(320%)",
        transition: "transform 1s ease-in-out",
      }}  >
      <CardHeader
        sx={{textAlign : 'center'}}
        title={<IconButton onClick={handleClick4} >
        <StyledIcon5 />
        </IconButton>}
        subheader={<Title> FOR COMPANY </Title>}
      >
        </CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" sx={{marginBottom: 2, fontFamily : "Oswald",}}>
        If a company wants to benefit from the services our platform provides to enhance their productivity, all they need to do is create an account, agree to the privacy policy, enter their job posting...       </Typography>
        <Button variant='contained' sx={{background: "white", border: "1px solid none", color : "black", "&:hover":{background:"black", color:"white", border: "1px solid none"}}} onClick={handleClick4}>Keep Reading</Button>
      </CardContent>
    </StyledCard>
   <Dialog open={open4} onClose={handleClose4}>
        <DialogTitle sx={{fontFamily: "Oswald", fontSize: 22 , fontWeight: "bold"}}>FOR COMPANY</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            fontFamily: "Oswald", fontSize: 18
          }} >
              If a company wants to benefit from the services our platform provides to enhance their productivity, all they need to do is create an account, agree to the privacy policy, enter their job posting, and upload it to the platform. They can do this at any time when they want to recruit new employees.              </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose4} sx={{background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, border: "1px solid white", color : "white", "&:hover":{border: "1px solid white"} }} variant="outlined" >
                DONE READING
              </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
      
      </Grid>

      <Grid item xs={12} sm={4}>  
      <StyledCard elevation={0} sx={{
        transform: isVisibler ? "translateX(0)" : "translateX(-420%)",
        transition: "transform 1s ease-in-out",
      }} >
      <CardHeader
        sx={{textAlign : 'center'}}
        title={<IconButton onClick={handleClick5} >
        <StyledIcon6 />
        </IconButton>}
        subheader={<Title> FOR CONDIDATE </Title>}
      >
        </CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" sx={{marginBottom: 2, fontFamily : "Oswald",}}>
        If you want to benefit from the opportunities our platform provides to enhance your job search, all you need to do is create an account, agree to the privacy policy, and upload your resume...        </Typography>
        <Button variant='contained' sx={{background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, border: "1px solid none", color : "white", "&:hover":{background:"white", color:"black", border: "1px solid none"}}} onClick={handleClick5}>Keep Reading</Button>
      </CardContent>
    </StyledCard>
   <Dialog open={open5} onClose={handleClose5}>
        <DialogTitle sx={{fontFamily: "Oswald", fontSize: 22 , fontWeight: "bold"}}>FOR CONDIDATE</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            fontFamily: "Oswald", fontSize: 18
          }} >
              If you want to benefit from the opportunities our platform provides to enhance your job search, all you need to do is create an account, agree to the privacy policy, and upload your resume. This will allow you to apply to job openings posted on the platform at any time.       </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose5} sx={{background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, border: "1px solid white", color : "white", "&:hover":{border: "1px solid white"} }} variant="outlined" >
                DONE READING
              </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
      
      </Grid>
      
    </Grid>

    <div style={rootStyle}>
      <Grid container spacing={1} sx={{marginTop: 2, marginBottom: 4}}>
        <Grid item xs={12} sm={6} >
          <Paper style={paperStyle} elevation={0} >
            <Missiontext variant="h4" className={`text ${showTexting ? 'visible' : ''}`} align="center" sx={{ fontFamily: "Oswald", fontWeight: "bold", fontSize: 55, marginTop: 35,}}>
            OUR COMPANY<br/> MISSION<br/> 
            <Typography> <img src={mission} alt="mission" style={{ width: 128, height: 128 }}  /></Typography>
            </Missiontext>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} container spacing={1} sx={{marginTop: 4}}>
          <Grid item xs={6} >
          <CarouselSlider />
            
          </Grid>
          <Grid item xs={6} >
          <Card style={cardStyle} elevation={3} sx={{background:"white",}} >
              <CardContent>
                <Typography sx={{marginLeft: "25%"}}> <img src={employee} alt="employee" style={{ width: 64, height: 64 }}  /></Typography>
                <Typography variant="h6" component="h2" sx={{fontWeight : "bold", fontFamily: "Oswald", fontSize: 22, color:"#000"}}>
                Reducing joblessness
                </Typography>
                <Typography variant="body2" component="p" sx={{ fontFamily: "Oswald", fontSize: 18, marginTop: 1, color: "#000"}}>
                Royecruit is a platform that connects job seekers with opportunities and helps companies make smarter hiring decisions, aiming to put an end to joblessness, creating a brighter future for job seekers and businesses alike.
               </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} >
          <Card style={cardStyle} elevation={3} sx={{background:"white",}} >
              <CardContent>
                <Typography sx={{marginLeft: "25%"}}> <img src={equality} alt="equality" style={{ width: 64, height: 64 }}  /></Typography>
                <Typography variant="h6" component="h2" sx={{fontWeight : "bold", fontFamily: "Oswald", fontSize: 22, color:"#000"}}>
                Equal opportunity
                </Typography>
                <Typography variant="body2" component="p" sx={{ fontFamily: "Oswald", fontSize: 18, marginTop: 1, color: "#000"}}>
                Our platform is committed to provide equal opportunity for both men and women, offering access to diverse job opportunities, education, and resources to unlock individual potential and create a better future for all.
               </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} >
          <CarouselSlider2 />
          </Grid>
        </Grid>
      </Grid>
    </div>
    <Text variant='body1' className={`text ${visiblity ? 'visible' : ''}`} sx={{
            fontFamily: "Oswald",
            fontSize: {xs:14, sm: 14, md:16, lg:18},
            textAlign : "center",
            marginTop : 2,
            marginBottom : 4 }}>At <Span>Royecruit</Span>, our mission is to provide equal job opportunities for all candidates, end joblessness, and connect companies with the most suitable job seekers. Through innovative technology and solutions, we strive to create a more inclusive and prosperous job market.</Text>
   
   
    </React.Fragment>
  )
}

export default About