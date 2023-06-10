import React from "react";
import { Grid, Button} from '@mui/material';
import company from "../assets/company.jpg";
import condidate from "../assets/condidate.jpg";


function Signup() {



  const imageStyles = {
    width: "100%",
    height: "112%",
  };

  
  
  

  return (
   
      <Grid container spacing={0} height="100%">
      <Grid item xs={12} sm={12} md={6} lg={6}  sx={{
          marginTop: {xs: 0, sm: 0, md:0, lg:0}
        }}>
          
            
          <img
            src={condidate}
            alt="random"
            style={imageStyles}
          />
     
        <Button href="/client" variant="contained" sx={{position: 'absolute',
    top: {xs: 200, sm: 200, lg: 280},
    left: {xs: 100, sm: 100, lg: 210},
    padding: 2,
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Oswald',
    fontSize: 14,
    fontWeight: 900,
    border: "2px solid white",
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
      border: "2px solid white"
    },}}>
        Register as Candidate
      </Button>
      <Button href="/" variant="outlined" sx={{top:"1%", position:"fixed", left:"1%" , fontFamily:"Oswald", fontSize:16, background:"transparent", border:"none", color:"white",paddingLeft: 2, paddingRight: 2, paddingBottom:1, paddingTop:1, textTransform:"uppercase", "&:hover":{background:"transparent", color:"white", border:"none"}}}>Royecruit</Button>

      
    
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}  sx={{
          marginTop: {xs: 0, sm: 0, md:0, lg:0}
        }}>
          <img
            src={company}
            alt="random"
            style={imageStyles}
          />
           <Button href="/company" variant="contained" sx={{position: 'absolute',
   top: {xs: 600, sm: 600, lg:280}, 
   left: {xs: 100, sm: 100, lg: 880},
    padding: 2,
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Oswald',
    fontSize: 14,
    fontWeight: 600,
    border: "2px solid white",
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'white',
      border: "2px solid white"
    },}}>
        Register as Company
      </Button>
        </Grid>
      </Grid>

  );
}

export default Signup;
