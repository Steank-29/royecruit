import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CgetToken } from '../Cauth';
import jwtDecode from 'jwt-decode';
import { Backdrop, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import { ToastContainer, toast } from 'react-toastify';


export default function UserAnswer() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId]=useState('')

  const token = CgetToken();

    const [companyId, setCompanyId] = useState(null);
    

    useEffect(() => {
      
      if (token) {
      const decodedToken = jwtDecode(token);
      setCompanyId(decodedToken.id);
      }
      }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/royecruit/getcompanyEvalAnswer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setUserId(data.userId)
          setErrorMessage('');
        } else {
          const errorData = await response.json();
          setUser(null);
          setErrorMessage(errorData.message);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
        setErrorMessage('Internal server error');
      }
    };



    const fetchUserInfo = async () => {
        try {
          const response = await fetch('http://localhost:5000/royecruit/getcompanyEvalUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          });
  
          if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userFirstname', data.firstname);
            localStorage.setItem('userLastname', data.lastname);
          } else {
            const errorData = await response.json();
            setUserInfo(null);
          }
        } catch (error) {
          console.error(error);
          setUserInfo(null);
        }
      };

    fetchUser();
    fetchUserInfo();
  }, [id, userId]);

  const [showBackdrop, setShowBackdrop] = useState(false);


    const handleSendEmail = async () => {
      const mailed =  localStorage.getItem('userEmail');
      const firstname = localStorage.getItem('userFirstname');
      const lastname = localStorage.getItem('userLastname');
      const fullname = `${firstname} ${lastname}`
  
      try {

        setShowBackdrop(true);

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
        setShowBackdrop(false);
        } else {
            toast.error('An Error Was Found While Sending Email', {
                position:"top-center"
            });
            setShowBackdrop(false);
        }
      } catch (error) {
        console.error('Error sending email:', error);
        toast.error('An Error Was Found While Sending Email', {
            position:"top-center"
        });
        setShowBackdrop(false);
      }
    };


    const handleSendEmailAcceptance = async () => {
        const mailed =  localStorage.getItem('userEmail');
        const firstname = localStorage.getItem('userFirstname');
        const lastname = localStorage.getItem('userLastname');
        const fullname = `${firstname} ${lastname}`
    
        try {

            setShowBackdrop(true);

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
            setShowBackdrop(false);
          } else {
            toast.error('An Error Was Found While Sending Email', {
                position:"top-center"
            });
            setShowBackdrop(false);
          }
        } catch (error) {
          console.error('Error sending email:', error);
          toast.error('An Error Was Found While Sending Email', {
            position:"top-center"
        });
        setShowBackdrop(false);
        }
      };


      const handleSendEmailRejection = async () => {
        const mailed =  localStorage.getItem('userEmail');
        const firstname = localStorage.getItem('userFirstname');
        const lastname = localStorage.getItem('userLastname');
        const fullname = `${firstname} ${lastname}`
    
        try {

            setShowBackdrop(true);

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
            setShowBackdrop(false);
          } else {
            toast.error('An Error Was Found While Sending Email', {
                position:"top-center"
            });
            setShowBackdrop(false);
          }
        } catch (error) {
          console.error('Error sending email:', error);
          toast.error('An Error Was Found While Sending Email', {
            position:"top-center"
        });
        setShowBackdrop(false);
        }
      };

  return (
    <div>
        <Typography sx={{mt:14}}>

        </Typography>

<TableContainer component={Paper} sx={{mt:1}}>
    <Typography sx={{fontFamily:"Oswald", fontSize:24, fontWeight:"bold", textTransform:"uppercase"}}>Job Seekers Who Took The Evaluation</Typography>
    {userInfo && (
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontFamily:"Oswald", fontSize:16, fontWeight:"bold", textTransform:"uppercase"}} align="center">Firstname</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:16, fontWeight:"bold", textTransform:"uppercase"}} align="center">Lastname</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:16, fontWeight:"bold", textTransform:"uppercase"}} align="center">Email</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:16, fontWeight:"bold", textTransform:"uppercase"}} align="center">Degree</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:16, fontWeight:"bold", textTransform:"uppercase"}} align="center">Phone</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:16, fontWeight:"bold", textTransform:"uppercase"}} align="center">Picture</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell sx={{fontFamily:"Oswald", fontSize:16,  textTransform:"uppercase"}} align="center">{userInfo.firstname}</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:16,  textTransform:"uppercase"}} align="center">{userInfo.lastname}</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:16,  textTransform:"uppercase"}} align="center">{userInfo.email}</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:16,  textTransform:"uppercase"}} align="center">{userInfo.degree}</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:16,  textTransform:"uppercase"}} align="center">{userInfo.phone}</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:16, fontWeight:"bold", textTransform:"uppercase"}} align="center"><img src={userInfo.image} alt={userInfo.firstname} style={{width:"50px", height:"50px", borderRadius:"50%"}}/></TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="center" colSpan={2} > <Button  onClick={handleSendEmail} sx={{color:"white", background:"black", border:"none", borderRadius:"2%", "&:hover" :{color:"black", background:"white", border:"none", borderRadius:"2%"}}} > Delay Mail<HourglassTopIcon sx={{color:"#4169E1"}}/> </Button>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showBackdrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            </TableCell>
            <TableCell align="center" colSpan={2} > <Button  onClick={handleSendEmailAcceptance} sx={{color:"white", background:"black", border:"none", borderRadius:"2%", "&:hover" :{color:"black", background:"white", border:"none", borderRadius:"2%"}}} > Acceptance Mail  <MarkEmailReadIcon sx={{color:"#008000"}}/> </Button> 
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showBackdrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            </TableCell>
            <TableCell align="center" colSpan={2} > <Button  onClick={handleSendEmailRejection} sx={{color:"white", background:"black", border:"none", borderRadius:"2%", "&:hover" :{color:"black", background:"white", border:"none", borderRadius:"2%"}}} > Rejection Mail  <CancelScheduleSendIcon sx={{color:"#B22222"}}/> </Button> 
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showBackdrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            </TableCell>
            </TableRow>
            
        </TableBody>
        <TableHead>
        <TableRow>
            <TableCell sx={{fontFamily:"Oswald", fontSize:18, fontWeight:"bold", textTransform:"uppercase"}} align="center" colSpan={6} > Answers Of {userInfo.lastname} {userInfo.firstname}</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {user && user.answers.map((answer, index) => (
        <TableRow key={index}>
            <TableCell align="center" sx={{fontFamily:"Oswald", fontSize:16,  textTransform:"uppercase"}} colSpan={6}><span style={{fontSize:14}}>Answer For Question {index+1}:</span> {answer}</TableCell>
        </TableRow>
        ))}
</TableBody>

      </Table>
      )}
    </TableContainer>

    <ToastContainer />

    </div>
  );
}
