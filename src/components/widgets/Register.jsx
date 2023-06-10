import React, {useState} from 'react';
import { Grid, Container, TextField, Typography,  IconButton, Button,  Select, InputLabel, MenuItem, FormControl, Backdrop  } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import company from "../assets/company.jpg";
import { FcOk } from "react-icons/fc";
import CircularProgress from '@mui/material/CircularProgress';

import { authentication } from './Firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';


const view = {
  display : "block",
  margin: "0 auto",
  borderRadius: "5px",
  marginTop: "25px"
};

const degrees = ['Associate degree', 
'Bachelor`s degree',
 'Master degree',
  'Doctoral degree', 
  'Professional degree', 
  'Certificate degree'];

const styles = {
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  imagecontainer: {
    position: 'relative',
    height: '100%',
    width: '50%',
  },
  image: {
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100%',
    width: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  formContainer: {
    overflowY: 'auto',
    padding: '16px',
    height: '100%',
  },
};





export default function Register() {



  const countryCode = "+216";

  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState('');


  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
      },
    }, authentication);
  }

  const RequestOTP = (e) => {
    e.preventDefault();
    if ( Phone.length>=12){
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, Phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if (otp.length === 6){
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp)
      .then((result) => {
        const USER = result.user;
        console.log(USER);
      })
      .catch((error) => {
        console.log(error);
      })
    }  
  }



    const [success, setSuccess] = useState(false);
    const [nameerror, setNameerror] = useState('')
    const [lasterror, setLasterror] = useState('')
    const [emailerror, setEmailerror] = useState('')
    const [dateerror, setDateerror] = useState('')
    const [phoneerror, setPhoneerror] = useState('')
    const [passworderror, setPassworderror] = useState('')
    const [degreeerror, setDegreeerror] = useState('')
    
    const [showPassword, setShowPassword] = useState(false);

    const [Firstname, setFirstname] = useState('')
    const handleFirstnameChange = (event) => {
      setFirstname(event.target.value);
      if (event.target.value !== '') {
        setNameerror('');
      }
    };

    const [Lastname, setLastname] = useState('')
    const handleLastnameChange = (event) => {
      setLastname(event.target.value);
      if (event.target.value !== '') {
        setLasterror('');
      }
    };

    const [Email, setEmail] = useState('')
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
      if (event.target.value !== '') {
        setEmailerror('');
      }
    };

    const [Dateofbirth, setDateofbirth] = useState('')
    const handleDateChange = (event) => {
      setDateofbirth(event.target.value);
      if (event.target.value !== '') {
        setDateerror('');
      }
    };

    const [Phone, setPhone] = useState(countryCode)
    const handlePhoneChange = (event) => {
      setPhone(event.target.value);
      if (event.target.value !== '') {
        setPhoneerror('');
      }
    };

    const [Password, setPassword] = useState('')
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      if (event.target.value !== '') {
        setPassworderror('');
      }
    };

    const [CPassword, setCPassword] = useState('')

    const [Degree, setDegree] = useState('')
    const handleDegreeChange = (event) => {
      setDegree(event.target.value);
      if (event.target.value !== '') {
        setDegreeerror('');
      }
    };

    const [image, setImage] = useState('')
    const [viewImage, setViewImage] = useState('')

    const handleChange = (e) => {
      console.log(e.target.files)
      setImage(e.target.files[0])
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setViewImage(reader.result);
      };
    }



    const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  }

  const [showBackdrop, setShowBackdrop] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (Firstname === "") {
        toast.error("Firstname is required!", {
            position: "top-center"
        });
        setNameerror("Firstname is required!");
    } else if (Lastname === ""){
      toast.error("Lastname is required!", {
        position: "top-center"
    });
    setLasterror("Lastname is required!");
    }else if (Email === "") {
        toast.error("Email is required!", {
            position: "top-center"
        });
        setEmailerror("Email is required!");
    } else if (!Email.includes("@")) {
        toast.warning("Includes @ in your Email!", {
            position: "top-center"
        });
        setEmailerror("Includes @ in your Email!");
    } else if (Dateofbirth === "") {
        toast.error("Date Of Birth is required!", {
            position: "top-center"
        });
        setDateerror("Date Of Birth is required!"); 
    } else if (Phone === "") {
        toast.error("Phone number is required", {
            position: "top-center"
        });
        setPhoneerror("Phone number is required");
    } else if (Password === "") {
        toast.error("Password is required!", {
            position: "top-center"
        });
        setPassworderror("Password is required!");
    }
    else if (Password.length < 8) {
        toast.warning("Password must be 8 character or longer!", {
            position: "top-center"
        });
        setPassworderror("Password must be 8 character or longer!");
    } else if (CPassword === "") {
        toast.error("Confirm password is required!", {
            position: "top-center"
        });
    }
    else if (CPassword.length < 8) {
        toast.error("Confirm password must be 8 char!", {
            position: "top-center"
        });
    } else if (Password !== CPassword) {
        toast.error("Password and Confirm password are not matching!", {
            position: "top-center"
        });
    } else if (Degree === "") {
        toast.error("Degree is required", {
            position: "top-center"
        });
        setDegreeerror("Degree is required");
    }else  {


      setShowBackdrop(true);
      

      const url = 'http://localhost:5000/royecruit/registeruser'
      const formData = new FormData()
  
      formData.append('firstname', Firstname);
      formData.append('lastname', Lastname);
      formData.append('email', Email);
      formData.append('dateofbirth', Dateofbirth);
      formData.append('phone', Phone);
      formData.append('password', Password);
      formData.append('image', image)
      formData.append('degree', Degree);
      fetch(url, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          toast.success("Registration successfully Made..." , {
              position: "top-center",
              duration:(2000)
            });
            setShowBackdrop(false);
            setSuccess(true);
            
        })
        .catch(error => {
          console.log(error);
          toast.error("Registration Failed..." , {
              position: "top-center",
              duration:(2000)
            });
            setShowBackdrop(false);
        });
      
      

    }
}

  return (
    <div style={styles.root}>
      <Grid container spacing={0}>
        
      {success ? (
                <Grid item  lg={12} md={6} sm={6} xs={6}>
                  
                    <Typography sx={{marginTop: 30, marginLeft: 21 , fontFamily: "Oswald", fontWeight: "bold", fontSize: 28, }}>Your account has been</Typography>
                    <Typography sx={{marginTop: 0, marginLeft: 23 , fontFamily: "Oswald", fontWeight: "bold", fontSize: 28, }}>created successfully <FcOk /> </Typography>
                    <Button variant="contained" href="/signin" sx={{position: 'fixed',
   top: {xs: 600, sm: 600, lg:330}, 
   left: {xs: 100, sm: 100, lg: 230},
    padding: 2,
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Oswald',
    fontSize: 14,
    fontWeight: 600,
    border: "2px solid black",
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'black',
      border: "2px solid white"
    },}}>
        HEAD TO SIGN IN 
      </Button>
 
                </Grid>
            ) : (
        <Grid item xs={12} md={6}>
        <Typography sx={{
            marginTop: 4, textAlign: "center", fontFamily: "Oswald", fontWeight: "bold", fontSize: 28,
          }}>
            Create your account now
          </Typography>
          <Typography sx={{
            marginTop: 2, textAlign: "center", fontFamily: "Oswald", fontWeight: 400, fontSize: 18,
          }}>
              Rest and sure, All your personal information <br /> will be confidential
          </Typography>
          <Container style={styles.formContainer}>
            <form onSubmit={handleSubmit}>
            <TextField type="text"  label="Firstname" name="Firstname" onChange={handleFirstnameChange} value={Firstname}  sx={{marginTop: 3 , width: '80%', marginLeft: 7}}   />
            {nameerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{nameerror}</div>}
            <TextField type="text"  label="Lastname" name="Lastname" onChange={handleLastnameChange} value={Lastname} sx={{marginTop: 3 , width: '80%', marginLeft: 7}}    />
            {lasterror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{lasterror}</div>}
            <TextField type="text"  label="Email" name="Email" onChange={handleEmailChange} value={Email} sx={{marginTop: 3 , width: '80%', marginLeft: 7}}    />
            {emailerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{emailerror}</div>}
            <TextField type="date"  name="Dateofbirth" onChange={handleDateChange} value={Dateofbirth} sx={{marginTop: 3 , width: '80%', marginLeft: 7}}  />
            {dateerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{dateerror}</div>}
            <TextField type="tel" name="Phone" label="Phone Number" onChange={handlePhoneChange} value={Phone} sx={{marginTop: 3 , width: '80%', marginLeft: 7}} />
            {phoneerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{phoneerror}</div>}
            {expandForm=== true?
            <TextField type="tel" name="OTP" label="Verification OTP" onChange={verifyOTP} value={OTP} sx={{marginTop: 3 , width: '80%', marginLeft: 7}} />
            :
            null
            }
            {
              expandForm === false?
              <Button onClick={RequestOTP} sx={{backround: "transparent", color: "black", marginLeft: 7, marginTop: 1, "&:hover": {background:"transparent", color:"black"}}} >Request OTP</Button>
              :
              null
            }
            <div id="recaptcha-container" style={{marginLeft: 55, marginTop: 20, marginBottom: 20}} ></div>
            <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            name="Password"
            onChange={handlePasswordChange} 
            value={Password}
            sx={{ width: '80%', marginLeft: 7}}
          > 
            </TextField> 

            <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{marginTop: 1}}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                {passworderror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{passworderror}</div>}
                <TextField
            type="password"
            label="Confirm Password"
            name="CPassword"
            onChange={(event) => setCPassword(event.target.value)}
            value={CPassword}
            sx={{marginTop: 3 , width: '80%', marginLeft: 7}}
          > 
            </TextField> 

            <TextField type="file" onChange={handleChange} sx={{marginTop: 3 , width: '80%', marginLeft: 7}} />

          {viewImage && (
          <img src={viewImage} style={view} alt="Selected" width="250" height="200" />
          )}

      <FormControl sx={{marginTop: 3 , width: '80%', marginLeft: 7}}>
      <InputLabel id="degree-label">Degree</InputLabel>
      <Select
        labelId="degree-label"
        id="degree"
        value={Degree}
        label="Degree"
        onChange={handleDegreeChange}
      >
        {degrees.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    {degreeerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{degreeerror}</div>}

      <Button type="submit" onClick={handleSubmit} variant="contained" sx={{marginTop: 4, backgroundColor: "black", color: "white" , paddingRight: 5 , paddingLeft: 5 , paddingTop: 1, paddingBottom: 1, marginLeft: 7, '&:hover': {backgroundColor: "white", color: "black"}}}>Submit</Button>
      <Button type="reset" variant="contained" sx={{marginTop: 4 , backgroundColor: "white", color: "black" , paddingRight: 5 , paddingLeft: 5 , paddingTop: 1, paddingBottom: 1, marginLeft: 7, '&:hover': {backgroundColor: "black", color: "white"}}}>Reset</Button>
      <Backdrop open={showBackdrop}>
        <CircularProgress color="inherit" sx={{marginRight: "50%"}} />
      </Backdrop>
            </form>
          </Container>
        </Grid>
            )}
        <Grid item lg={12} md={6} sm={6} xs={6}>
        <div style={styles.imagecontainer}>
          <div style={styles.image}>
          <img
            src={company}
            alt="random"
          />
          
            </div>
            
            </div>
            <Button href="/company" variant="contained" sx={{position: 'fixed',
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
      <Button href="/" variant="outlined" sx={{top:"1%", left:"90%" , position:"fixed", fontFamily:"Oswald", fontSize:16, background:"transparent", border:"none", color:"white",paddingLeft: 2, paddingRight: 2, paddingBottom:1, paddingTop:1, textTransform:"uppercase", "&:hover":{background:"transparent", color:"white", border:"none"}}}>Royecruit</Button>

        </Grid>
      </Grid>
      <ToastContainer/>
    </div>
  );
}
