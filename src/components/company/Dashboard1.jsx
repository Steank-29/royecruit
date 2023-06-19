import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { CgetToken } from '../Cauth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ToastContainer, toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
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
    Button,
  } from '@mui/material';
import axios from 'axios';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Link } from 'react-router-dom';


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

export default function Dashboard1() {

    const token = CgetToken();

    const [companyId, setCompanyId] = useState(null);
    

    useEffect(() => {
      
      if (token) {
      const decodedToken = jwtDecode(token);
      setCompanyId(decodedToken.id);
      }
      }, []);

    const [evalData, setEvalData] = useState([])


    const [evalId, setEvalId] = useState('');


  const fetchCompanyEval = async () => {
    try {
      const response = await fetch('http://localhost:5000/royecruit/getcompanyEval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyId }),
      });

      const data = await response.json();
      setEvalData(data);
      setEvalId(data.map((item) => item._id));
      localStorage.setItem('evalId', data.map((item) => item._id))
    } catch (error) {
      console.error(error);
    }
  };

  

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




  return (
    <React.Fragment>
        <Container sx={{mt:15}}>

            <Typography variant="h4" sx={{
                color: "black",
                fontSize: { xs: '40px', sm: '45px', md: '55px' , lg : '65px' },
                fontWeight: "700",
                ml:2,
                fontFamily: "Oswald",
            }}  >
                Manage Your Evaluations & Requests
            </Typography>

            <Button variant="contained" onClick={fetchCompanyEval} sx={{color:"white", background:"black", borderRadius:"2%", "&:hover": {color:"black", background:"white", borderRadius:"2%"}, float:"right", mt:3, ml:4, mb:2}}> Fetch YOur Own Evaluations </Button>
            <Link to={`/userAnswer/${evalId}`}><Button sx={{color:"white", background:"black", borderRadius:"2%", "&:hover": {color:"black", background:"white", borderRadius:"2%"}, float:"right", mt:3, mb:2}}>Applicated Condidates</Button> </Link>
            


        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:"bold", textAlign:"center", color:"black"}}>Evaluation Name</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:"bold", textAlign:"center", color:"black"}}>Duration</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:"bold", textAlign:"center", color:"black"}}>Date of Creation</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:"bold", textAlign:"center", color:"black"}}>Eval ID</TableCell>
            <TableCell sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:"bold", textAlign:"center", color:"black"}}></TableCell>
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
              <IconButton onClick={handleDelete} color="error">
        <DeleteIcon  />
      </IconButton>  
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}>
                <Accordion >
                  <AccordionSummary sx={{ml:"45%"}}  expandIcon={<ExpandMoreIcon />}>
                    <Typography  sx={{fontFamily:"Oswald", fontSize:20, textTransform:"uppercase", fontWeight:"bold", textAlign:"center", color:"black"}}>Questions</Typography>
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
    <Typography sx={{mt:26}}>


    </Typography>



<ToastContainer/>
</Container>
    </React.Fragment>
  )
}
