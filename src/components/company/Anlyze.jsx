import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { styled, keyframes } from "@mui/material/styles";
import { toast } from 'react-toastify';
import { CgetToken } from '../Cauth';
import jwtDecode from 'jwt-decode';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';


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



const Anlyze = () => {

    const [examInfo, setExamInfo] = useState([]);
    const [start, setStart] = useState(true);

    const token = CgetToken();

    const [companyId, setCompanyId] = useState(null);
    

    useEffect(() => {
      
      if (token) {
      const decodedToken = jwtDecode(token);
      setCompanyId(decodedToken.id);
      }
      }, []);


    const {examId} = useParams();
    

    useEffect(() => {
        getExamInfos();
        // getExam();
    }, [])


    const getExamInfos = async () => {
        const { data } = await axios.get(`http://localhost:5000/userexams/examm/${examId}`);
        setExamInfo(data);
        setStart(false);
    }
   


    /*
        const getExamNames = async () => {
            const { data } = await axios.get(`http://localhost:5000/userexams/exam/${id.id}`);
            for (let i = 0; i < data.length; i++) {
                setDatas(data);
            }
        }
    
        const getExam = async () => {
            const { data } = await axios.get(`http://localhost:5000/exam/exam/${id.id}`);
            for (let i = 0; i < data.length; i++) {
                setExamName(data);
            }
            console.log(data)
        }
    
        const getUserName = async () => {
            for (var i = 0; i <= datas.length - 1; i++) {
                const { data } = await axios.get(`http://localhost:5000/users/` + datas[i]?.userId);
                for (let k = 0; k < data.length; k++) {
                    setNames(data)
                }
            }
            setStart(false)
        }
        */


    // onClick={getUserName}
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





    const handleSendEmail = async () => {
        const mailed =  localStorage.getItem('userEmail');
        const firstname = localStorage.getItem('userFirstname');
        const lastname = localStorage.getItem('userLastname');
        const fullname = `${firstname} ${lastname}`
    
        try {
  
  
          const response = await fetch(`http://localhost:5000/royecruit/send-email-delay/${companyId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mailed, fullname }),
          });
    
          if (response.ok) {
          toast.success('Email has been successfully sent', {
              position:"top-center"
          });
          } else {
              toast.error('An Error Was Found While Sending Email', {
                  position:"top-center"
              });

          }
        } catch (error) {
          console.error('Error sending email:', error);
          toast.error('An Error Was Found While Sending Email', {
              position:"top-center"
          });
        }
      };
  
  
      const handleSendEmailAcceptance = async () => {
          const mailed =  localStorage.getItem('userEmail');
          const firstname = localStorage.getItem('userFirstname');
          const lastname = localStorage.getItem('userLastname');
          const fullname = `${firstname} ${lastname}`
      
          try {
  

  
            const response = await fetch(`http://localhost:5000/royecruit/send-email-acceptance/${companyId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ mailed, fullname }),
            });
      
            if (response.ok) {
              toast.success('Email has been successfully sent', {
                  position:"top-center"
              });

            } else {
              toast.error('An Error Was Found While Sending Email', {
                  position:"top-center"
              });

            }
          } catch (error) {
            console.error('Error sending email:', error);
            toast.error('An Error Was Found While Sending Email', {
              position:"top-center"
          });
          }
        };
  
  
        const handleSendEmailRejection = async () => {
          const mailed =  localStorage.getItem('userEmail');
          const firstname = localStorage.getItem('userFirstname');
          const lastname = localStorage.getItem('userLastname');
          const fullname = `${firstname} ${lastname}`
      
          try {
  

  
            const response = await fetch(`http://localhost:5000/royecruit/send-email-rejection/${companyId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ mailed, fullname }),
            });
      
            if (response.ok) {
              toast.success('Email has been successfully sent', {
                  position:"top-center"
              });

            } else {
              toast.error('An Error Was Found While Sending Email', {
                  position:"top-center"
              });

            }
          } catch (error) {
            console.error('Error sending email:', error);
            toast.error('An Error Was Found While Sending Email', {
              position:"top-center"
          });
          }
        };


    return (
        <>


            
            <Container sx={{mt:15, mb:32}}>
            <Pretext sx={{
            marginTop: 14,  textAlign: "center", fontFamily: "Oswald", fontWeight: "bold", fontSize: 54,
          }} className={`text ${showText ? 'visible' : ''}`}>
            Manage and Review Your <Span>Test</Span>, Make Decision
          </Pretext>
          <Text  sx={{
              color: "#000",
              fontSize: 20,
              fontWeight: "700",
              fontFamily: "Oswald",
              textAlign: "center",
              mb:6,
              }} className={`text ${visible ? 'visible' : ''}`}>
              As soon as you can, Reply to the <Span>candidate</Span> who's you choose
              </Text>


                <TableContainer sx={{mt:4, border:"1px solid black"}}>
                <Table>
                <TableHead sx={{background:"black"}}>
                <TableRow>
                <TableCell sx={{fontFamily:"Oswald", fontSize:18, fontWeight:"bold", color:"white", textAlign:"center"}}>Candidate</TableCell>
                <TableCell sx={{fontFamily:"Oswald", fontSize:18, fontWeight:"bold", color:"white", textAlign:"center"}}>Email</TableCell>
                <TableCell sx={{fontFamily:"Oswald", fontSize:18, fontWeight:"bold", color:"white", textAlign:"center"}}>Test Name</TableCell>
                <TableCell sx={{fontFamily:"Oswald", fontSize:18, fontWeight:"bold", color:"white", textAlign:"center"}}>Score</TableCell>
                <TableCell sx={{fontFamily:"Oswald", fontSize:18, fontWeight:"bold", color:"white", textAlign:"center"}}>Check Answers</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {examInfo.map((exam) => (
                <TableRow key={exam._id}>
                <TableCell sx={{fontFamily:"Oswald", fontSize:18, fontWeight:"bold", color:"black", textAlign:"center"}}>{exam.userInfo.username}</TableCell>
                <TableCell sx={{fontFamily:"Oswald", fontSize:18, fontWeight:"bold", color:"black", textAlign:"center"}}>{exam.userInfo.email}</TableCell>
                <TableCell sx={{fontFamily:"Oswald", fontSize:18, fontWeight:"bold", color:"black", textAlign:"center"}}>{exam.userInfo.examname}</TableCell>
                <TableCell sx={{fontFamily:"Oswald", fontSize:18, fontWeight:"bold", color:"black", textAlign:"center"}}>{exam.grade}</TableCell>
                <TableCell sx={{fontFamily:"Oswald", fontSize:18, fontWeight:"bold", color:"black", textAlign:"center"}}>
                <Link to={`/examreview/${examId}`}><Button sx={{background:`linear-gradient(-45deg, #0077be, #00ad7c ,#0077be)`, border:"none", color:"white", "&:hover": {background:"black", color:"white", border:"none",} , fontFamily:"Oswald"}} variant="outlined" size="small">Check</Button></Link>
                </TableCell>
                </TableRow>
                    ))}
                <TableRow>
            <TableCell  colSpan={5} > 
                <Button  onClick={handleSendEmail} sx={{color:"white", background:"black", border:"none", borderRadius:"2%", "&:hover" :{color:"black", background:"white", border:"none", borderRadius:"2%"}, ml:30}} > Delay Mail<HourglassTopIcon sx={{color:"#4169E1"}}/> </Button>
                <Button  onClick={handleSendEmailAcceptance} sx={{color:"white", background:"black", border:"none", borderRadius:"2%", "&:hover" :{color:"black", background:"white", border:"none", borderRadius:"2%"}, ml:10}} > Acceptance Mail  <MarkEmailReadIcon sx={{color:"#008000"}}/> </Button> 
                <Button  onClick={handleSendEmailRejection} sx={{color:"white", background:"black", border:"none", borderRadius:"2%", "&:hover" :{color:"black", background:"white", border:"none", borderRadius:"2%"}, ml:10}} > Rejection Mail  <CancelScheduleSendIcon sx={{color:"#B22222"}}/> </Button> 
            </TableCell>
            </TableRow>
                </TableBody>
                </Table>
                </TableContainer>
            </Container>
    
        </>
    )
}

export default Anlyze