import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { CgetToken} from '../Cauth'
import axios from 'axios';
import { styled, keyframes } from "@mui/material/styles";
import { Button, FormHelperText, Grid, TextField, Tooltip, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Link } from "react-router-dom";

import { BarChart, Delete, Edit, Visibility } from "@mui/icons-material";
import QuizIcon from '@mui/icons-material/Quiz';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';




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

const TestQCM = () => {
    const [userId, setUserId] = useState(null);
    const [showText, setShowText] = useState(false);
    const [examNameStorage, setExamNameStorage] = useState([]);

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




      const [testName, setTestName] = useState('');


    
      const handleTestNameChange = (event) => {
        setTestName(event.target.value);
      };
      const getExamNames = async () => {
        const { data } = await axios.get(`http://localhost:5000/exam/${userId}`);
        setExamNameStorage(data);
      }
      
      const deleteExam = (id) => {
        axios.delete(`http://localhost:5000/exam/${id}`).then((response) => {
          console.log(response.status);
          console.log(response.data);
        });
      }
      useEffect(() => {
        getExamNames();
      }, [testName]);

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          if (testName == "") {
            alert("If you want to create an exam you have to give it a name")
          } else {
            const newExam = {
              creatorUserId: userId,
              examname: testName,
            };
            console.log(newExam)
            axios.post("http://localhost:5000/exam/", newExam).then((response) => {
              console.log(response.status);
              console.log(response.data);
            });
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };


  return (
    <React.Fragment>

<         Pretext sx={{
            marginTop: 14,  textAlign: "center", fontFamily: "Oswald", fontWeight: "bold", fontSize: 54,
          }} className={`text ${showText ? 'visible' : ''}`}>
            Upload A <Span>Test</Span> QCM If It's Needed
          </Pretext>
          <Text  sx={{
              color: "#000",
              fontSize: 20,
              fontWeight: "700",
              fontFamily: "Oswald",
              textAlign: "center",
              mb:6,
              }} className={`text ${visible ? 'visible' : ''}`}>
              Discover the Path to Recruiting <Span>Elite</Span> Employees Effortlessly!
              </Text>

          <form onSubmit={handleSubmit} >
        <Typography sx={{marginTop: 2 , marginLeft: 12, color:"black", fontFamily:"Oswald", fontSize: 20, fontWeight:"bold"}}>
          Test Name <QuizIcon sx={{mb:-1}}/>
        </Typography>
        <FormHelperText sx={{marginLeft: 12, color:"black", fontFamily:"Oswald",}}>It's important to use a significant <u>Test Name</u></FormHelperText>
        <TextField
            type="text"
            label="Enter Your Desired Test Name"
            name="evalname"
            value={testName}
          onChange={handleTestNameChange}
            sx={{marginTop: 1.5 , width: '38%', marginLeft: 12}}
          />
      <Button type="submit" variant='contained' sx={{color:"white", fontFamily:"Oswald",paddingTop:1.75, paddingBottom:1.75, backgroundColor:"black", "&:hover": {color:"black", backgroundColor:"white"}, ml:6, mt:1.75, mb:5}} endIcon={<DoneOutlineIcon/>}>Submit Test </Button>
      
      <Typography sx={{marginLeft: 12, color:"black", fontFamily:"Oswald", fontSize: 20, fontWeight:"bold"}}>
          Discover & Manage Your Own Tests
        </Typography>
        <TableBody>
</TableBody>

    </form>
    {examNameStorage.map((name) => (
    <Grid container spacing={2} key={name.examname} sx={{mt:2, mb:8}}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Grid container direction="column" alignItems="center" justifyContent="center" rowSpacing={2} sx={{ height: '100%' }}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" sx={{cursor:"pointer",mt:9, marginLeft: 12, color:"black", fontFamily:"Oswald", fontSize: 20, fontWeight:"bold"}} ><Span><u>{name.examname}</u></Span></Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} md={8} lg={9}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              <Link to={`/anlyze/${name._id}`}>
              <Tooltip title="Manage & Respond To Candidate" arrow>
          <Button sx={{color:"white", backgroundColor:'black', borderRadius:"5%", border:"none", "&:hover":{color:"white", backgroundColor:'black', borderRadius:"5%", border:"none"}}}>
            <BarChart style={{ verticalAlign: "middle", padding: "5px", color:"green" }} />
            Analyze &nbsp;
          </Button>
          </Tooltip>
        </Link>
        </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
            <Link to={`/create/${name._id}/${userId}`}>
            <Tooltip title="Upload Your Questions" arrow>
          <Button sx={{color:"white", backgroundColor:'black', borderRadius:"5%", border:"none", "&:hover":{color:"white", backgroundColor:'black', borderRadius:"5%", border:"none"}}}>
            &nbsp; &nbsp;
            <Edit style={{ verticalAlign: "middle", padding: "5px", color:"white" }} />
            Edit &nbsp; &nbsp; &nbsp;
          </Button>
          </Tooltip>
        </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
            <Tooltip title="Delete This Test" arrow>
            <Button sx={{color:"white", backgroundColor:'black', borderRadius:"5%", border:"none", "&:hover":{color:"white", backgroundColor:'black', borderRadius:"5%", border:"none"}}}  onClick={() => { deleteExam(name._id); }}>
          &nbsp;
          <Delete style={{ verticalAlign: "middle", padding: "5px", color:"red" }} />
          Delete &nbsp;
        </Button>
        </Tooltip>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
      ))}

    </React.Fragment>
  );
};

export default TestQCM;