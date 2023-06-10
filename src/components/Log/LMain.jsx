import * as React from 'react'
import { Button, Typography, Card, CardContent , CardActionArea, CardMedia,  } from '@mui/material';
import { styled , keyframes } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import sign from "../assets/sign.png";
import cv from "../assets/cv.png";
import interview from "../assets/inter.png";
import CompanyTest from "../assets/Company_Test.png"
import CompanyTestOne from "../assets/CompanyTestOne.png"
import CompanyTestTwo from "../assets/CompanyTestTwo.png"
import { CarouselProvider, Slider, Slide,ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Link } from 'react-router-dom';



const Home = styled('div')(({ theme }) => ({
    marginTop: "140px",
    textAlign: "center",
}));

const Sliding = styled('div')(({ theme }) => ({
  marginTop: 2,
  textAlign: "center",
  marginBottom: 4
}));


const SectionOne = styled('div')(({ theme }) => ({
    marginTop: "130px",
    textAlign: "center",
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

const GradientTypography = styled('div')(({ theme }) => ({
  background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`,
  backgroundSize: '400% 400%',
  animation: `${GradientAnimation} 3s ease-in-out infinite`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));


function CarouselSlider() {
  return (
    <CarouselProvider
      naturalSlideWidth={800}
      naturalSlideHeight={500}
      totalSlides={3}
      isIntrinsicHeight={true}
      isPlaying
      interval={3000}
      
    >
      <Slider style={{
       marginLeft: "15%"
        
      }}>
        <Slide index={0}>
          <img src={CompanyTest} alt="company" style={{ width: '80%' }} />
        </Slide>
        <Slide index={1}>
          <img src={CompanyTestOne} alt="company" style={{ width: '80%' }} />
        </Slide>
        <Slide index={2}>
          <img src={CompanyTestTwo} alt="company" style={{ width: '80%' }} />
        </Slide>
      </Slider>
      <Sliding>
      <ButtonBack style={{ marginTop: 10 , backgroundColor: "#eee", color: "#000" , fontSize: "15px" ,
                    fontFamily: "Oswald", padding: 4, borderRadius: 5, border : "1px solid #eee",  marginBottom: 20 }}>Previous Picture</ButtonBack>
      <ButtonNext style={{ marginTop: 10 ,marginLeft: 20 , backgroundColor: "#000", color: "#fff" , fontSize: "15px" ,
                    fontFamily: "Oswald", padding: 4, borderRadius: 5, marginBottom: 20,border : "1px solid #000" }}>Next Picture</ButtonNext>
      </Sliding>
      
    </CarouselProvider>
  );
}

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

export default function LMain() {

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

  const [visibling, setVisibling] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!visibling) {
        setVisibling(true);
      }
    }, 600);

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

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [eyes, setEyes] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setEyes(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);


  


  return (
    <React.Fragment>
        <Home>
            <Pretext variant="h4" sx={{
                color: "#000",
                fontSize: { xs: '40px', sm: '50px', md: '60px' , lg : '70px' },
                fontWeight: "700",
                fontFamily: "Oswald",
            }} className={`text ${showText ? 'visible' : ''}`} >
                If you're interested in the job <br /> you'll need to submit a suitable <GradientTypography variant="h4" sx={{
                color: "#000",
                fontSize: { xs: '60px', sm: '60px', md: '60px' , lg : '70px' },
                fontWeight: "700",
                fontFamily: "Oswald",
            }}>Resume </GradientTypography> 
            </Pretext>
            
            <Text variant="subtitle2" sx={{
                fontSize: 20,
                fontFamily: "Oswald",
                marginTop: 4,
                color: "#36454F"
            }}
            className={`text ${visible ? 'visible' : ''}`}>
            Everyone is seeking the quickest, most effective, and guaranteed path to success. That's precisely why we offer an AI-generated resume based</Text>
            <Text variant="subtitle2" sx={{
                fontSize: 20,
                fontFamily: "Oswald",
                color: "#36454F"
            }}
            className={`text ${visibling ? 'visible' : ''}`}>
             on your skills as well as pre-job interviews. With our services, you can be confident in your ability to land your dream job.</Text>
            <Button sx={{ marginTop: 6 , background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`, color: "#fff", border: "1px solid none" , fontSize: "15px", paddingLeft: 5, paddingRight: 5 ,
                    fontFamily: "Oswald", transform: isVisible ? "translateX(0)" : "translateX(-350%)",transition: "transform 1s ease-in-out", '&:hover': {background: "white", color: "#000", border: "1px solid white"} }} href="#start" variant="contained" endIcon={<ArrowForwardIcon/>}> get start </Button>
            <Button sx={{ marginTop: 6 , marginLeft: 2, backgroundColor: "#000", color: "#fff" , fontSize: "15px" ,
                    fontFamily: "Oswald", paddingLeft: 4,  paddingRight: 4, border: "1px solid black" , transform: eyes ? "translateX(0)" : "translateX(320%)",transition: "transform 1s ease-in-out", '&:hover': {backgroundColor: "#fff", color: "#000" , border: "1px solid white"} }} href="/about" variant="contained"> more Royecruit</Button>
            
        </Home>

        <SectionOne>
            <Typography variant='body1' sx={{
                fontFamily: "Oswald",
                fontSize: {xs:22, sm: 22, md:24, lg:26},
                fontWeight: "bold"
            }}>
            The platform was created to distinguish between <br /> job seekers who need a job and those who want a job.
            </Typography>

            <Typography variant='subtitle2' sx={{
                fontFamily: "Oswald",
                fontSize: {xs:15, sm:15, md:16, lg:17},
                marginTop: 2
            }}>
            In brief, there are three phases to complete during the interview process, and each phase will be assigned points. <br /> Finally, the company will inform you of whether you have been accepted or rejected. 
            </Typography>
        </SectionOne>
                 
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: "40px", flexWrap: 'wrap' }}>
      
    <Card
      key='Sign up'
      sx={{
        maxWidth: 345,
        margin: 2,
        background: "black",
        color: "white",
        '&:hover': {
          transform: 'scale(1.1)',
          backgroundColor: "#eee",
          color: "black"
        },
      }}
    >
      <CardActionArea component="a" href="/signin">
        <CardMedia
          component="img"
          image={sign}
          alt="sign in"
          sx={{ height:200 }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography  sx={{ mb: 1 , fontFamily: "Oswald", fontWeight: "bold" , fontSize: {xs: 20, sm: 20, md: 22, lg:24} }}>
            Sign in
          </Typography>
          <Typography sx={{fontFamily: "Oswald", fontSize: {xs: 12, sm: 12, md: 14, lg:16}}}>
          It is important to note that failure to create an account will result in inability to proceed to the next phase. We strongly recommend creating an account.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card
      key='Make CV'
      sx={{
        maxWidth: 345,
        margin: 2,
        background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`,
        color: "white",
        '&:hover': {
          transform: 'scale(1.1)',
          background: "white",
          color:"black"
        },
      }}
    >
      <CardActionArea component="a" href="/">
        <CardMedia
          component="img"
          image={cv}
          alt="Make Cv"
          sx={{ height: 200 }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography  sx={{ mb: 1 , fontFamily: "Oswald", fontWeight: "bold" , fontSize: {xs: 20, sm: 20, md: 22, lg:24} }}>
            Upload CV
          </Typography>
          <Typography sx={{fontFamily: "Oswald", fontSize: {xs: 12, sm: 12, md: 14, lg:16}}}>
          Next, you will be prompted to create your curriculum vitae and download it. Rest assured, our AI-powered system will guide you through the process.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card
      key='Proceed for interview'
      sx={{
        maxWidth: 345,
        margin: 2,
        '&:hover': {
          transform: 'scale(1.1)',
          background: "black",
        color: "white",
        },
      }}
    >
      <CardActionArea component="a" href="/">
        <CardMedia
          component="img"
          image={interview}
          alt="interview"
          sx={{ height: 200 }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography  sx={{ mb: 1 , fontFamily: "Oswald", fontWeight: "bold" , fontSize: {xs: 20, sm: 20, md: 22, lg:24} }}>
          Proceed for interview
          </Typography>
          <Typography sx={{fontFamily: "Oswald", fontSize: {xs: 12, sm: 12, md: 14, lg:16}}}>
          The test is conducted under strict supervision, Sufficient time will be allotted to candidates possessing proficiency, to ensure completion of the test</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
   
    </div>
    <section id="start">
        <Typography variant='body1' sx={{
            fontFamily: "Oswald",
            fontSize: {xs:22, sm: 22, md:24, lg:26},
            fontWeight: "bold",
            textAlign : "center",
            marginTop : 3
        }}>
        Here is a brief about how the evaluation will be done
        </Typography>

        <Typography variant='body1' sx={{
            fontFamily: "Oswald",
            fontSize: {xs:14, sm: 14, md:16, lg:18},
            textAlign : "center",
            marginTop : 2,
            marginBottom : 4 }}>
        The evaluation consists of a single question that includes multiple choices and a programming problem that needs to be solved, the candidate<br/> 
        will have 90 minutes to complete the evaluation, However the candidate is allowed to leave the screen only 3 times during the evaluation.<br/>
        After the third time, the evaluation will automatically close itself, and the candidate will be unable to take the evaluation again
        Once the<br/> evaluation is completed, the candidate will receive their score. The company will then review the candidate's evaluation and inform them<br/> whether they have been accepted or rejected, if the candidate is accepted, they will be invited to a meeting for the job,
        It's important to note<br/>
        that the company has a strict policy regarding the evaluation, and any attempts to cheat or violate the evaluationing conditions will result in<br/> disqualification from the hiring process, Therefore the candidate should approach the evaluation with honesty and integrity, and take it<br/> seriously as it could be the first step towards a great career opportunity.<br/>
        </Typography>
        <CarouselSlider />
     
          <Typography variant='body1' sx={{
            fontFamily: "Oswald",
            fontSize: {xs:14, sm: 14, md:16, lg:18},
            textAlign : "justify",
            marginTop : 2,
            marginBottom : 4 }}>If you would like to learn more information or details about our company, please check out our<Link to="/about" style={{textDecoration:"none", fontWeight:"bold", color:"#000" }}> About </Link>page. </Typography>
            
            </section>  
    </React.Fragment>
  )
}
