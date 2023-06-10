import { Card,  CardContent,  Container, Grid,  Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled, keyframes } from "@mui/material/styles";
import axios from 'axios';





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






export default function Offers() {


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

    const [jobs, setJobs] = useState([]);
    const [CID , setCID] =useState('')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/royecruit/offers'); 
        setJobs(response.data);
        setCID(response.data.map(item => item.company))
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);


  const [user, setUser] = useState([]);
      
      useEffect(() => {
      
      axios.get(`http://localhost:5000/royecruit/companyinfo/${CID}`)
        .then(response => {
          setUser(response.data);

        })
        .catch(error => {
          console.error(error);

        });
      }, []);



  return (
    <React.Fragment>
        <Container sx={{mt:15}}>
        <Pretext sx={{
            marginTop: 14,  textAlign: "center", fontFamily: "Oswald", fontWeight: "bold", fontSize: 44,
          }} className={`text ${showText ? 'visible' : ''}`} >
            Go Through Our Job<Span> Offers </Span>
          </Pretext>


      <Grid container spacing={2} sx={{mt:4}}>
      {jobs.map((job) => (
      <Grid item xs={6}>
      <Card sx={{ minWidth: 275 }} key={job._id}>
      <CardContent>
        <Typography sx={{ mb: 1.5, fontSize: 26, fontFamily:"Oswald", fontWeight:'bold', color:"black"  }} component="div">
        Looking For A <Span>{job.jobTitle}</Span>
        </Typography>
        <br/>
        <Typography sx={{ mb: 1.5, fontSize:16, fontFamily:"Oswald", fontWeight:'bold', color:"black"  }} >
        Type: <span style={{fontSize:19}}>{job.description} {job.employment}</span>
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize:16, fontFamily:"Oswald", fontWeight:'bold', color:"black"  }} >
        Salary: <span style={{fontSize:19}}>{job.salary}$</span>
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize:16, fontFamily:"Oswald", fontWeight:'bold', color:"black"  }} >
        Requirement For The Job: <span style={{fontSize:19}}>{job.qualifications}</span>
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5, fontSize:16, fontFamily:"Oswald", fontWeight:'bold', color:"black"  }}>
         Brief Description: <span style={{fontSize:19}}>{job.instructions}</span>
          <br />
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize:16, fontFamily:"Oswald", fontWeight:'bold', color:"black"  }} >
        Contact Informations: <span style={{fontSize:19}}>{job.contactInfo}</span>
        </Typography>
      </CardContent>
    </Card>
      </Grid>
          ))}
    </Grid>



        </Container>

        {user.companyname}
    </React.Fragment>
  )
}
