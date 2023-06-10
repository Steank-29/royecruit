import React, {useState , useEffect} from 'react'
import { Grid, IconButton, Typography } from '@mui/material'
import {styled , keyframes} from '@mui/material/styles'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GpsFixedIcon from '@mui/icons-material/NearMe'


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

const Gmail = styled(EmailIcon)`
  font-size: 22px;
  color: #DB4437;
`;

const Phone = styled(PhoneIcon)`
  font-size: 22px;
  color: green;
`;

const Gps = styled(GpsFixedIcon)`
  font-size: 32px;
  color: #3498db;
`;

const Home = styled('div')(({ theme }) => ({
    marginTop: "140px",
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
  
  const Span = styled('span')(({ theme }) => ({
    background: `linear-gradient(-45deg, #0077be, #00ad7c ,#0077be)`,
    backgroundSize: '400% 400%',
    animation: `${GradientAnimation} 3s ease-in-out infinite`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
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

export default function Info(props) {

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

    const [visibler, setVisibler] = useState(false);

    useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!visibler) {
        setVisibler(true);
      }
    }, 600);

    const handleScroll = () => {
      const offsetY = window.pageYOffset;
      const screenHeight = window.innerHeight;
      const textPosition = document.querySelector('.text').offsetTop;
      if (offsetY > textPosition - screenHeight / 2) {
        setVisibler(true);
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [visibler]);

  const [visibles, setVisibles] = useState(false);

    useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!visibles) {
        setVisibles(true);
      }
    }, 700);

    const handleScroll = () => {
      const offsetY = window.pageYOffset;
      const screenHeight = window.innerHeight;
      const textPosition = document.querySelector('.text').offsetTop;
      if (offsetY > textPosition - screenHeight / 2) {
        setVisibles(true);
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [visibles]);

  const [visiblet, setVisiblet] = useState(false);

    useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!visiblet) {
        setVisiblet(true);
      }
    }, 800);

    const handleScroll = () => {
      const offsetY = window.pageYOffset;
      const screenHeight = window.innerHeight;
      const textPosition = document.querySelector('.text').offsetTop;
      if (offsetY > textPosition - screenHeight / 2) {
        setVisiblet(true);
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [visiblet]);

  const [visiblef, setVisiblef] = useState(false);

    useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!visiblef) {
        setVisiblef(true);
      }
    }, 900);

    const handleScroll = () => {
      const offsetY = window.pageYOffset;
      const screenHeight = window.innerHeight;
      const textPosition = document.querySelector('.text').offsetTop;
      if (offsetY > textPosition - screenHeight / 2) {
        setVisiblef(true);
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [visiblef]);

  const [visibleh, setVisibleh] = useState(false);

  useEffect(() => {
  const timeoutId = setTimeout(() => {
    if (!visibleh) {
      setVisibleh(true);
    }
  }, 1000);

  const handleScroll = () => {
    const offsetY = window.pageYOffset;
    const screenHeight = window.innerHeight;
    const textPosition = document.querySelector('.text').offsetTop;
    if (offsetY > textPosition - screenHeight / 2) {
      setVisibleh(true);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(timeoutId);
  };
}, [visibleh]);



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
            We're always here at your service</Pretext>
            
              <Text variant="h4" sx={{
              color: "#000",
              fontSize: { xs: '40px', sm: '45px', md: '55px', lg : '65px' },
              fontWeight: "700",
              fontFamily: "Oswald",
              }} className={`text ${visible ? 'visible' : ''}`}>
              All<Span> informations </Span>you're looking for.
              </Text>
            
        </Home>
        <Grid container spacing={2} sx={{marginTop : 2, marginBottom:{xs:0, sm:0, md:6, lg:10}}}>
      <Grid item xs={12} sm={6}>
        <Text sx={{marginLeft: 7, marginTop : 4, textAlign:"justify", fontFamily:'Oswald', fontSize: 22, fontWeight: 600}} className={`text ${visibler ? 'visible' : ''}`}>
        At <Span>Royecruit</Span>, we are committed to providing unparalleled<br/>
        customer service. Our dedicated team of <Span>professionals </Span>
        is<br/> always here to support you, offering expert guidance<br/>
        and <Span>assistance </Span>every step of the way.
        Whether you have<br/> a question, need help with an <Span>interview</Span>,
        or simply want<br/> to learn more about our services, we are here to help. 
        <br/>With <Span>Royecruit</Span>, you can trust that you are in good<br/> hands, and that
        our team will work tirelessly to help<br/> you achieve your <Span>goals.</Span>
        </Text>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Text sx={{marginLeft: 7, marginTop : 4, textAlign:"justify", fontFamily:'Oswald', fontSize: 18, fontWeight: 300}} className={`text ${visibles ? 'visible' : ''}`}>
            To reach us by phone call on <b>+216 555-463-7688</b> <Phone/>
        </Text>
        <Text sx={{marginLeft: 7, marginTop : 4, textAlign:"justify", fontFamily:'Oswald', fontSize: 18, fontWeight: 300}} className={`text ${visiblet ? 'visible' : ''}`}>
            To send us an email <b>Royecruit@support.com</b> <Gmail/>
        </Text>
        <Text sx={{marginLeft: 7, marginTop : 4, textAlign:"justify", fontFamily:'Oswald', fontSize: 18, fontWeight: 300}} className={`text ${visiblef ? 'visible' : ''}`}>
            To check in social media profiles <IconButton><Facebook /></IconButton> <b>or</b> <IconButton><Twitter/></IconButton> <b>or</b> <IconButton><Linkedin/></IconButton>
        </Text>
        <Text sx={{marginLeft: 7, marginTop : 4, textAlign:"justify", fontFamily:'Oswald', fontSize: 18, fontWeight: 300}} className={`text ${visibleh ? 'visible' : ''}`}>
            To visit our company <b>Via del Corso, 00186 Roma RM, Italy</b> <IconButton><Gps/></IconButton>
        </Text>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Text sx={{marginTop: 2, marginLeft : 7, fontFamily:"Oswald", fontSize: 22,}} className={`text ${visibler ? 'visible' : ''}`}>
                In case of an emmargency here's the personnal email to contact our HR responsible <b>Jerimmywhite@gmail.com</b><Gmail/>
            </Text>
            <Text variant="caption"  sx={{marginTop: 1.5, marginLeft : 7, fontFamily:"Oswald", fontSize: 14, fontWeight:"bold", color:"red"}} className={`text ${visibler ? 'visible' : ''}`}>
                Important° : please note that the given email above is only for emmargencies.
            </Text>
        </Grid>
        </Grid>
    </React.Fragment>
  )
}