import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { CgetToken} from '../Cauth'
import axios from 'axios';
import { styled, keyframes } from "@mui/material/styles";
import { Button, TextField, Typography } from '@mui/material';





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

const JobOffer = () => {
    const [userId, setUserId] = useState(null);
    const [showText, setShowText] = useState(false);

    const token = CgetToken();

    useEffect(() => {
      
      if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      }
      }, []);


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

      const [contactInfo, setContactInfo] = useState('');
      const [instructions, setInstructions] = useState('');
      const [employment, setEmployment] = useState('');
      const [salary, setSalary] = useState('');
      const [qualifications, setQualifications] = useState('');
      const [description, setDescription] = useState('');
      const [jobTitle, setJobTitle] = useState('');
    
      const handleContactInfoChange = (event) => {
        setContactInfo(event.target.value);
      };
    
      const handleInstructionsChange = (event) => {
        setInstructions(event.target.value);
      };
    
      const handleEmploymentChange = (event) => {
        setEmployment(event.target.value);
      };
    
      const handleSalaryChange = (event) => {
        setSalary(event.target.value);
      };
    
      const handleQualificationsChange = (event) => {
        setQualifications(event.target.value);
      };
    
      const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };
    
      const handleJobTitleChange = (event) => {
        setJobTitle(event.target.value);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5000/royecruit/jobs', {
            company: userId,
            contactInfo,
            instructions,
            employment,
            salary,
            qualifications,
            description,
            jobTitle
          });
    
          if (response.status === 201) {
            console.log('Job added successfully');
            setContactInfo('');
            setInstructions('');
            setEmployment('');
            setSalary('');
            setQualifications('');
            setDescription('');
            setJobTitle('');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <React.Fragment>

<Pretext sx={{
            marginTop: 14,  textAlign: "center", fontFamily: "Oswald", fontWeight: "bold", fontSize: 44,
          }} className={`text ${showText ? 'visible' : ''}`}>
            Upload A <Span>Job Offer</Span> If It's Needed
          </Pretext>

<form onSubmit={handleSubmit}>
<Typography sx={{marginTop: 2 , marginLeft: 12, color:"black", fontFamily:"Oswald"}}>
          Contact Info & Instructions
        </Typography>
        <TextField
            type="text"
            label="Contact Info"
            name="evalname"
            value={contactInfo}
          onChange={handleContactInfoChange}
            sx={{marginTop: 2 , width: '38%', marginLeft: 12}}
          />

<TextField
            type="text"
            label="Instructions"
            name="evalname"
            value={instructions}
            onChange={handleInstructionsChange}
            sx={{marginTop: 2 , width: '38%', marginLeft: 7}}
          />
<Typography sx={{marginTop: 2 , marginLeft: 12, color:"black", fontFamily:"Oswald"}}>
          Job Type & Salary
        </Typography>

<TextField
            type="text"
            label="Job Type"
            name="evalname"
            value={employment}
            onChange={handleEmploymentChange}
            sx={{marginTop: 2 , width: '38%', marginLeft: 12}}
          />

<TextField
            type="text"
            label="Salary In $"
            name="evalname"
            value={salary}
            onChange={handleSalaryChange}
            sx={{marginTop: 2 , width: '38%', marginLeft: 7}}
          />

<Typography sx={{marginTop: 2 , marginLeft: 12, color:"black", fontFamily:"Oswald"}}>
Qualifications & Description
        </Typography>

<TextField
            type="text"
            label="Qualifications"
            name="evalname"
            value={qualifications}
            onChange={handleQualificationsChange}
            sx={{marginTop: 2 , width: '38%', marginLeft: 12}}
          />

<TextField
            type="text"
            label="Full or Part time job"
            name="evalname"
            value={description}
            onChange={handleDescriptionChange}
            sx={{marginTop: 2 , width: '38%', marginLeft: 7}}
          />

<Typography sx={{marginTop: 2 , marginLeft: 12, color:"black", fontFamily:"Oswald"}}>
Job Title 
        </Typography>

<TextField
            type="text"
            label="Job Title"
            name="evalname"
            value={jobTitle}
            onChange={handleJobTitleChange}
            sx={{marginTop: 2 , width: '80%', marginLeft: 12}}
          />

      <Button type="submit" variant='contained' sx={{color:"white", backgroundColor:"black", "&:hover": {color:"black", backgroundColor:"white"}, ml:12, mt:4, mb:10}} >Submit Offer</Button>
    </form>
    </React.Fragment>
  );
};

export default JobOffer;
