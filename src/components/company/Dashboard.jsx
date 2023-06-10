import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { CgetToken } from '../Cauth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ToastContainer, toast } from 'react-toastify';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled , keyframes } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Accordion,
    AccordionSummary,
    Typography,
    Container,
    IconButton,
    Paper,
    TextField,
    Button,
    AccordionDetails,
    Grid,
    Popover
  } from '@mui/material';
import axios from 'axios';
import FileCopyIcon from '@mui/icons-material/FileCopy';



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


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

export default function Dashboard() {

    const token = CgetToken();

    const [companyId, setCompanyId] = useState(null);
    

    useEffect(() => {
      
      if (token) {
      const decodedToken = jwtDecode(token);
      setCompanyId(decodedToken.id);
      }
      }, []);

    const [evalData, setEvalData] = useState([])

    const [error, setError] = useState(null);

    const [evalId, setEvalId] = useState('');
    const [userId, setUserId] = useState('');



  useEffect(() => {
    const fetchCompanyEval = async () => {
      try {
        const response = await fetch('http://localhost:5000/royecruit/getcompanyEval', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ companyId }),
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        setEvalData(data);
        setEvalId(data.map((item) => item.evalId));
        setError('');
      } catch (error) {
        setError('An error occurred while fetching the company evaluation');
        console.error(error);
      }
    };

    fetchCompanyEval();


  }, []);



  

  const [user, setUser] = useState(null);
  const [userinfo, setUserinfo] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/royecruit/getcompanyEvalAnswer", { evalId, userId });
      const { data } = response;

      if (response.status === 200) {
        setUser(data.user);
        localStorage.setItem('userId', data.user.userId)
        setUserinfo(data.user1);
      } else {
        setUser(null);
        setUserinfo(null);
      }
    } catch (error) {
      setUser(null);
      console.error(error);
    }
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/royecruit/deleteEval/${evalId}`);
      toast.success(response.data.message, {
        position:"top-center"
      })
    } catch (error) {
      console.error(error);

    }
  };

  const userIdL = localStorage.getItem('userId')

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;


  return (
    <React.Fragment>
        <Container sx={{mt:15}}>

            <Pretext variant="h4" sx={{
                color: "#000",
                fontSize: { xs: '40px', sm: '45px', md: '55px' , lg : '65px' },
                fontWeight: "700",
                ml:2,
                fontFamily: "Oswald",
            }} className={`text ${showText ? 'visible' : ''}`} >
                Manage Your Evaluations & Requests
            </Pretext>


            <form onSubmit={handleSubmit}>
          <TextField
          type='password'
          value={evalId}
          label="Type Evaluation ID"
          onChange={(e) => setEvalId(e.target.value)}
          sx={{width:"30%", mt:2, ml:6}}
          />
          <TextField
          type='password'
          value={userId}
          label="Get User Info"
          onChange={(e) => setUserId(e.target.value)}
          sx={{width:"30%", mt:2, ml:2}}
          />
        <Button variant='contained' sx={{color:"white",mt:2, ml:2, width:"30%" ,p:2, background:`linear-gradient(-45deg, #0077be, #00ad7c ,#0077be)`, "&:hover": {color:"white", background:`linear-gradient(-45deg, #0077be, #00ad7c ,#0077be)`,}}} startIcon={<AssignmentIcon/>} type="submit">Get Answers</Button>
      </form>

        <TableContainer component={Paper} sx={{mt:2}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>Evaluation Name</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>Duration</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>Date of Creation</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>Eval ID</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>User ID</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {evalData.map((evalItem) => (
            <>
            <TableRow key={evalItem.id}>
              <TableCell sx={{fontFamily:"Oswald", fontSize:18, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>{evalItem.evalname}</TableCell>
              <TableCell sx={{fontFamily:"Oswald", fontSize:18, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>{evalItem.duration}</TableCell>
              <TableCell sx={{fontFamily:"Oswald", fontSize:18, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>{formatDate(evalItem.created)}</TableCell>
              <TableCell sx={{fontFamily:"Oswald", fontSize:18, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>
              <IconButton
              onClick={() => {
              navigator.clipboard.writeText(evalItem._id);
              toast.info(`Evaluation ID Is Copied `, {
                position:"top-center"
              });
              }}
              >
              <FileCopyIcon sx={{color:"royalblue"}} />
              </IconButton>
            </TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:18, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>
              <IconButton
              onClick={() => {
              navigator.clipboard.writeText(userIdL);
              toast.info(`User ID  Is Copied `, {
                position:"top-center"
              });
              }}
              >
              <FileCopyIcon sx={{color:"royalblue"}} />
              </IconButton>
            </TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:18, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>
              <IconButton onClick={handleDelete} color="error">
        <DeleteIcon  />
      </IconButton>  
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Accordion sx={{ml:18}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>Questions</Typography>
                  </AccordionSummary>
                  {evalItem.questions.map((question) => (
                    <TableRow key={question} >
                      <TableCell sx={{fontFamily:"Oswald", fontSize:18, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black",}}>{question}</TableCell>
                    </TableRow>
                  ))}
                </Accordion>
              </TableCell>
            </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

                    
    <div>
      


      {user && (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>Answers</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {user.answers.map((answer, index) => (
        <TableRow>
          <TableCell key={index} sx={{fontFamily:"Oswald", fontSize:18, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black",}}>
          <span style={{fontSize:14, textTransform:"capitalize"}}><u>Answer For Question {index+1}</u>:</span> {answer}
          </TableCell>
        </TableRow>
        ))}
        <TableRow>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
)}

<Accordion sx={{mt:2}}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:400, textAlign:"center", color:"black"}}>User Contact</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {userinfo && (
          <>
            <Grid container spacing={2} sx={{ml:10}}>
      <Grid item xs={3}>
        <Typography sx={{fontFamily:"Oswald"}}>{userinfo.lastname} {userinfo.firstname}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{fontFamily:"Oswald"}}>{userinfo.email}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography sx={{fontFamily:"Oswald"}}>{userinfo.phone}</Typography>
      </Grid>
      <Grid item xs={3}>
        <img src={userinfo.image} alt={userinfo.firstname} style={{ borderRadius: "50%", width: "40px", height: "40px" }} />
      </Grid>
    </Grid>
          </>
        )}
      </AccordionDetails>
    </Accordion>


    </div>


    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
      }}
    >
      <IconButton size='large' color="primary" onClick={handleClick}>
        <MessageIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div
          style={{
            padding: '1rem',
          }}
        >
          <span style={{fontFamily:"Oswald", fontSize:17, fontWeight:"bold", mt:1.5}}>From :</span> <TextField label="Company Email" sx={{mt:1}} /><br/>
          <span style={{fontFamily:"Oswald", fontSize:17, fontWeight:"bold"}}>To :</span> <TextField label="Provided User Email" sx={{mt:1}}/><br/>
          <span style={{fontFamily:"Oswald", fontSize:17, fontWeight:"bold"}}>Response :</span><TextField label="Response For The Evaluation" sx={{mt:1}}/>
        </div>
      </Popover>
    </div>



    <Typography sx={{mt:26}}>

    </Typography>


<ToastContainer/>
</Container>
    </React.Fragment>
  )
}
