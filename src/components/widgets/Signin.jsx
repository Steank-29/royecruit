import React, {useState} from "react";
import {  Grid, TextField, Button, Typography } from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';
import { styled  } from '@mui/material/styles';
import job from "../assets/job.jpg";
import { ToastContainer, toast } from 'react-toastify';
import {login} from "../auth";
import axios from "axios";


function Signin() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginuser = async(e) => {
      e.preventDefault();


      if (email === "") {
          toast.error("email is required!", {
              position: "top-center"
          });
      } else if (!email.includes("@")) {
          toast.warning("includes @ in your email!", {
              position: "top-center"
          });
      } else if (password === "") {
          toast.error("password is required!", {
              position: "top-center"
          });
      } else if (password.length < 6) {
          toast.error("password must be 6 char!", {
              position: "top-center"
          });
      } else {

        try {
          const response = await axios.post('http://localhost:5000/royecruit/signin', {
            email,
            password,
          });
          const data = response.data;
          if (response.status === 200) {
            login(data.token);
            window.location.href='/lmain';
          } 
        } catch (error) {
          toast.error(error.response.data.message, {
            position: "top-center"
          });
        }
      }
}


  const imageStyles = {
    width: "100%",
    height: "112%",
    position: 'fixed'
  };


  const Hr = styled('hr')(({ theme }) => ({
    width: "140px",
}));

const Span = styled('span')(({ theme }) => ({
  fontFamily: "Oswald",
}));

  return (
    <div style={{ flexGrow: 1 }} >
      <Grid container spacing={0} height="100%">
        <Grid item xs={12} sm={6} sx={{marginTop: 10}} >
          <Grid item>
            <Typography sx={{textAlign: "center" , fontSize: {xs: 28, sm:28, md: 30, lg: 32} , fontWeight: "bold", fontFamily: "Oswald", marginTop: 2}}>
            Create your account
            </Typography>
            <Typography sx={{textAlign: "center" , fontSize: {xs: 14, sm:14, md: 15, lg: 16} ,fontFamily: "Oswald", marginTop: 1}}>
            Please note that Email verification is required for <br />signup. Your Email will only be used to verify <br /> your identity for security purposes.
            </Typography>
      </Grid>
      <form onSubmit={loginuser}>
      <Grid item>
      <TextField
          type="email"
          label="Email"
          variant="filled"
          sx={{ width: '300px' , marginLeft: {xs: 7 , sm: 10 , md: 15 , lg: 20}, marginTop: 1 }}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="filled"
          sx={{ width: '300px' , marginTop: 2 ,  marginLeft: {xs: 7 , sm: 10 , md: 15 , lg: 20} }}
          value={password}
          onChange={(event) => setPassword(event.target.value)}  
        />
      </Grid>
      <Grid item>
        <Button type="submit" variant="contained" sx={{ width: '300px' , marginTop: 2, marginLeft: {xs: 7 , sm: 10 , md: 15 , lg: 20} , backgroundColor: "#000" , color: "#fff" , '&:hover': {backgroundColor: "#fff", color: "#000", border: "1px solid white"}}}>
          Sign In
        </Button>
      </Grid>
      <ToastContainer/>
      </form>
      <Grid item>
        <Typography sx={{marginTop: {xs: 1, sm: 1, md: 2, lg: 2 }, marginLeft: {xs: 30 , sm: 30 , md: 35 , lg: 42} , fontFamily: "Oswald"}}>Forget password ?</Typography>
      </Grid>

      <Grid item>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <Hr  sx={{ marginTop: 2, marginLeft: {xs: 6 , sm: 9 , md: 14 , lg: 19}}} />
          </Grid>
          <Grid item>
            <Span>or</Span>
          </Grid>
          <Grid item>
            <Hr sx={{ marginTop: 2 }} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button variant="contained" href="/signup" sx={{ width: '300px' , marginTop: 2 ,  marginLeft: {xs: 7 , sm: 10 , md: 15 , lg: 20} , backgroundColor: "#000" , color: "#fff" , '&:hover': {backgroundColor: "#fff", color: "#000", border: "1px solid white"} }}>
          Sign Up
        </Button>
      </Grid>

      <Grid item>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<Facebook />}
              sx={{marginBottom: 1, width: '150px', borderColor: '#3b5998', backgroundColor: "#3b5998", color: '#fff', marginTop: 2 ,  marginLeft: {xs: 7 , sm: 10 , md: 15 , lg: 20}  , '&:hover': { backgroundColor: "#fff",  color: "#3b5998", border: "1px solid #3b5998"} }}
            >
              Facebook
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<Google />}
              sx={{marginBottom: 1, width: '150px', borderColor: '#db4437', color: '#db4437' , marginTop: 2 , '&:hover': { backgroundColor: "#db4437",  color: "#fff", border: "1px solid #db4437"} }}
            >
              Google
            </Button>
          </Grid>
        </Grid>
      </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} >
          <img
            src={job}
            alt="random"
            style={imageStyles}
          />
          <Button href="/companysignin" variant="outlined" sx={{top:"47%", position:"fixed", left:"70%" , fontFamily:"Oswald", fontSize:18, background:"white", border:"1px solid white", color:"black",paddingLeft: 2, paddingRight: 2, paddingBottom:1, paddingTop:1, textTransform:"uppercase", "&:hover":{background:"transparent", color:"white", border:"1px solid white"}}}>As Company</Button>

          <Button href="/" variant="outlined" sx={{top:"1%", left:"90%" , position:"fixed", fontFamily:"Oswald", fontSize:16, background:"transparent", border:"none", color:"white",paddingLeft: 2, paddingRight: 2, paddingBottom:1, paddingTop:1, textTransform:"uppercase", "&:hover":{background:"transparent", color:"white", border:"none"}}}>Royecruit</Button>

        </Grid>
      </Grid>
    </div>
  );
}

export default Signin;
