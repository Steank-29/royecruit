import React, {useState} from "react";
import { Grid, Container, TextField, Typography, FormGroup, FormControlLabel, Checkbox, IconButton, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Backdrop } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { FcOk } from "react-icons/fc";
import condidate from "../assets/condidate.jpg";
import CircularProgress from '@mui/material/CircularProgress';

const view = {
  display : "block",
  margin: "0 auto",
  borderRadius: "5px",
  marginTop: "25px"
};

const countries = [
  { name: 'Afghanistan', flag: '🇦🇫' },
  { name: 'Albania', flag: '🇦🇱' },
  { name: 'Algeria', flag: '🇩🇿' },
  { name: 'American Samoa', flag: '🇦🇸' },
  { name: 'Andorra', flag: '🇦🇩' },
  { name: 'Angola', flag: '🇦🇴' },
  { name: 'Anguilla', flag: '🇦🇮' },
  { name: 'Antarctica', flag: '🇦🇶' },
  { name: 'Antigua and Barbuda', flag: '🇦🇬' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Armenia', flag: '🇦🇲' },
  { name: 'Aruba', flag: '🇦🇼' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Azerbaijan', flag: '🇦🇿' },
  { name: 'Bahamas', flag: '🇧🇸' },
  { name: 'Bahrain', flag: '🇧🇭' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Barbados', flag: '🇧🇧' },
  { name: 'Belarus', flag: '🇧🇾' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Belize', flag: '🇧🇿' },
  { name: 'Benin', flag: '🇧🇯' },
  { name: 'Bermuda', flag: '🇧🇲' },
  { name: 'Bhutan', flag: '🇧🇹' },
  { name: 'Bolivia', flag: '🇧🇴' },
  { name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { name: 'Botswana', flag: '🇧🇼' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'British Indian Ocean Territory', flag: '🇮🇴' },
  { name: 'British Virgin Islands', flag: '🇻🇬' },
  { name: 'Brunei', flag: '🇧🇳' },
  { name: 'Bulgaria', flag: '🇧🇬' },
  { name: 'Burkina Faso', flag: '🇧🇫' },
  { name: 'Burundi', flag: '🇧🇮' },
  { name: 'Cambodia', flag: '🇰🇭' },
  { name: 'Cameroon', flag: '🇨🇲' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Cape Verde', flag: '🇨🇻' },
  { name: 'Cayman Islands', flag: '🇰🇾' },
  { name: 'Central African Republic', flag: '🇨🇫' },
  { name: 'Chad', flag: '🇹🇩' },
  { name: 'Chile', flag: '🇨🇱' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Christmas Island', flag: '🇨🇽' },
  { name: 'Cocos Islands', flag: '🇨🇨' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Comoros', flag: '🇰🇲' },
  { name: 'Cook Islands', flag: '🇨🇰' },
  { name: 'Costa Rica', flag: '🇨🇷' },
  { name: 'Croatia', flag: '🇭🇷' },
  { name: 'Cuba', flag: '🇨🇺' },
  { name: 'Curacao', flag: '🇨🇼' },
  { name: 'Cyprus', flag: '🇨🇾' },
  { name: 'Czech Republic', flag: '🇨🇿' },
  { name: 'Democratic Republic of the Congo', flag: '🇨🇩' },
  { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Djibouti', flag: '🇩🇯' },
  { name: 'Dominica', flag: '🇩🇲' },
  { name: 'Dominican Republic', flag: '🇩🇴' },
  { name: 'East Timor', flag: '🇹🇱' },
  { name: 'Ecuador', flag: '🇪🇨' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'El Salvador', flag: '🇸🇻' },
  { name: 'Equatorial Guinea', flag: '🇬🇶' },
  { name: 'Eritrea', flag: '🇪🇷' },
  { name: 'Estonia', flag: '🇪🇪' },
  { name: 'Ethiopia', flag: '🇪🇹' },
  { name: 'Falkland Islands', flag: '🇫🇰' },
  { name: 'Faroe Islands', flag: '🇫🇴' },
  { name: 'Fiji', flag: '🇫🇯' },
  { name: 'Finland', flag: '🇫🇮' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'French Polynesia', flag: '🇵🇫' },
  { name: 'Gabon', flag: '🇬🇦' },
  { name: 'Gambia', flag: '🇬🇲' },
  { name: 'Georgia', flag: '🇬🇪'},
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'Gibraltar', flag: '🇬🇮' },
  { name: 'Greece', flag: '🇬🇷' },
  { name: 'Greenland', flag: '🇬🇱' },
  { name: 'Grenada', flag: '🇬🇩' },
  { name: 'Guam', flag: '🇬🇺' },
  { name: 'Guatemala', flag: '🇬🇹' },
  { name: 'Guernsey', flag: '🇬🇬' },
  { name: 'Guinea', flag: '🇬🇳' },
  { name: 'Guinea-Bissau', flag: '🇬🇼' },
  { name: 'Guyana', flag: '🇬🇾' },
  { name: 'Haiti', flag: '🇭🇹' },
  { name: 'Honduras', flag: '🇭🇳' },
  { name: 'Hong Kong', flag: '🇭🇰' },
  { name: 'Hungary', flag: '🇭🇺' },
  { name: 'Iceland', flag: '🇮🇸' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Iran', flag: '🇮🇷' },
  { name: 'Iraq', flag: '🇮🇶' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Isle of Man', flag: '🇮🇲' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Ivory Coast', flag: '🇨🇮' },
  { name: 'Jamaica', flag: '🇯🇲' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Jordan', flag: '🇯🇴' },
  { name: 'Kazakhstan', flag: '🇰🇿' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'Kiribati', flag: '🇰🇮' },
  { name: 'Kosovo', flag: '🇽🇰' },
  { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Kyrgyzstan', flag: '🇰🇬' },
  { name: 'Laos', flag: '🇱🇦' },
  { name: 'Latvia', flag: '🇱🇻' },
  { name: 'Lebanon', flag: '🇱🇧' },
  { name: 'Lesotho', flag: '🇱🇸' },
  { name: 'Liberia', flag: '🇱🇷' },
  { name: 'Libya', flag: '🇱🇾' },
  { name: 'Liechtenstein', flag: '🇱🇮' },
  { name: 'Lithuania', flag: '🇱🇹' },
  { name: 'Luxembourg', flag: '🇱🇺' },
  { name: 'Macao', flag: '🇲🇴' },
  { name: 'Madagascar', flag: '🇲🇬' },
  { name: 'Malawi', flag: '🇲🇼' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Maldives', flag: '🇲🇻' },
  { name: 'Mali', flag: '🇲🇱' },
  { name: 'Malta', flag: '🇲🇹' },
  { name: 'Marshall Islands', flag: '🇲🇭' },
  { name: 'Mauritania', flag: '🇲🇷' },
  { name: 'Mauritius', flag: '🇲🇺' },
  { name: 'Mayotte', flag: '🇾🇹' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Micronesia', flag: '🇫🇲' },
  { name: 'Moldova', flag: '🇲🇩' },
  { name: 'Monaco', flag: '🇲🇨' },
  { name: 'Mongolia', flag: '🇲🇳' },
  { name: 'Montenegro', flag: '🇲🇪' },
  { name: 'Montserrat', flag: '🇲🇸' },
  { name: 'Morocco', flag: '🇲🇦' },
  { name: 'Mozambique', flag: '🇲🇿' },
  { name: 'Myanmar', flag: '🇲🇲' },
  { name: 'Namibia', flag: '🇳🇦' },
  { name: 'Nauru', flag: '🇳🇷' },
  { name: 'Nepal', flag: '🇳🇵' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'New Caledonia', flag: '🇳🇨' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Nicaragua', flag: '🇳🇮' },
  { name: 'Niger', flag: '🇳🇪' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Niue', flag: '🇳🇺' },
  { name: 'Norfolk Island', flag: '🇳🇫' },
  { name: 'North Korea', flag: '🇰🇵' },
  { name: 'North Macedonia', flag: '🇲🇰' },
  { name: 'Northern Mariana Islands', flag: '🇲🇵' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Oman', flag: '🇴🇲' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Palau', flag: '🇵🇼' },
  { name: 'Palestine', flag: '🇵🇸' },
  { name: 'Panama', flag: '🇵🇦' },
  { name: 'Papua New Guinea', flag: '🇵🇬' },
  { name: 'Paraguay', flag: '🇵🇾' },
  { name: 'Peru', flag: '🇵🇪' },
  { name: 'Philippines', flag: '🇵🇭' },
  { name: 'Pitcairn Islands', flag: '🇵🇳' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Puerto Rico', flag: '🇵🇷' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Réunion', flag: '🇷🇪' },
  { name: 'Romania', flag: '🇷🇴' },
  { name: 'Russia', flag: '🇷🇺' },
  { name: 'Rwanda', flag: '🇷🇼' },
  { name: 'Samoa', flag: '🇼🇸' },
  { name: 'San Marino', flag: '🇸🇲' },
  { name: 'São Tomé and Príncipe', flag: '🇸🇹' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Senegal', flag: '🇸🇳' },
  { name: 'Serbia', flag: '🇷🇸' },
  { name: 'Seychelles', flag: '🇸🇨' },
  { name: 'Sierra Leone', flag: '🇸🇱' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Sint Maarten', flag: '🇸🇽' },
  { name: 'Slovakia', flag: '🇸🇰' },
  { name: 'Slovenia', flag: '🇸🇮' },
  { name: 'Solomon Islands', flag: '🇸🇧' },
  { name: 'Somalia', flag: '🇸🇴' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'South Georgia & South Sandwich Islands', flag: '🇬🇸' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'South Sudan', flag: '🇸🇸' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Sri Lanka', flag: '🇱🇰' },
  { name: 'St. Barthélemy', flag: '🇧🇱' },
  { name: 'St. Helena', flag: '🇸🇭' },
  { name: 'St. Kitts & Nevis', flag: '🇰🇳' },
  { name: 'St. Lucia', flag: '🇱🇨' },
  { name: 'St. Martin', flag: '🇲🇫' },
  { name: 'St. Pierre & Miquelon', flag: '🇵🇲' },
  { name: 'St. Vincent & Grenadines', flag: '🇻🇨' },
  { name: 'Sudan', flag: '🇸🇩' },
  { name: 'Suriname', flag: '🇸🇷' },
  { name: 'Svalbard & Jan Mayen', flag: '🇸🇯' },
  { name: 'Swaziland', flag: '🇸🇿' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Syria', flag: '🇸🇾' },
  { name: 'Taiwan', flag: '🇹🇼' },
  { name: 'Tajikistan', flag: '🇹🇯' },
  { name: 'Tanzania', flag: '🇹🇿' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Timor-Leste', flag: '🇹🇱' },
  { name: 'Togo', flag: '🇹🇬' },
  { name: 'Tokelau', flag: '🇹🇰' },
  { name: 'Tonga', flag: '🇹🇴' },
  { name: 'Trinidad & Tobago', flag: '🇹🇹' },
  { name: 'Tunisia', flag: '🇹🇳' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Turkmenistan', flag: '🇹🇲' },
  { name: 'Turks & Caicos Islands', flag: '🇹🇨' },
  { name: 'Tuvalu', flag: '🇹🇻' },
  { name: 'U.S. Outlying Islands', flag: '🇺🇲' },
  { name: 'U.S. Virgin Islands', flag: '🇻🇮' },
  { name: 'Uganda', flag: '🇺🇬' },
  { name: 'Ukraine', flag: '🇺🇦' },
  { name: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Uruguay', flag: '🇺🇾' },
  { name: 'Uzbekistan', flag: '🇺🇿' },
  { name: 'Vanuatu', flag: '🇻🇺' },
  { name: 'Vatican City', flag: '🇻🇦' },
  { name: 'Venezuela', flag: '🇻🇪' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'Wallis & Futuna', flag: '🇼🇫' },
  { name: 'Western Sahara', flag: '🇪🇭' },
  { name: 'Yemen', flag: '🇾🇪' },
  { name: 'Zambia', flag: '🇿🇲' },
  { name: 'Zimbabwe', flag: '🇿🇼' },
];

function Signup() {

  const http = "http://www.";


    
    const [success, setSuccess] = useState(false);
    const [nameerror, setNameerror] = useState('');
    const [domainerror, setDomainerror] = useState('');
    const [countryerror, setCountryerror] = useState('');
    const [sizeerror, setSizeerror] = useState('');
    const [websiteerror, setWebsiteerror] = useState('');
    const [sericeerror, setSericeerror] = useState('');
    const [emailerror, setEmailerror] = useState('');
    const [confirmerror, setConfirmerror] = useState('');
    const [passworderror, setPassworderror] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [companyname, setCompanyname] = useState('')
    const handleNameChange = (event) => {
      setCompanyname(event.target.value);
      if (event.target.value !== '') {
        setNameerror('');
      }
    };
    const [companyaddress, setCompanyaddress] = useState('')
    const handleCountryChange = (event) => {
      setCompanyaddress(event.target.value);
      if (event.target.value !== '') {
        setCountryerror('');
      }
    };

    const [industry, setIndustry] = useState('')
    const handleDomainChange = (event) => {
      setIndustry(event.target.value);
      if (event.target.value !== '') {
        setDomainerror('');
      }
    };

    const [companysize, setCompanysize] = useState('')
    const handleSizeChange = (event) => {
      setCompanysize(event.target.value);
      if (event.target.value !== '') {
        setSizeerror('');
      }
    };

    const [companywebsite, setCompanywebsite] = useState(http)
    const handleWebsiteChange = (event) => {
      setCompanywebsite(event.target.value);
      if (event.target.value !== '') {
        setWebsiteerror('');
      }
    };

    const [companyservice, setCompanyservice] = useState('')
    const handleServiceChange = (event) => {
      setCompanyservice(event.target.value);
      if (event.target.value !== '') {
        setSericeerror('');
      }
    };

    const [email, setEmail] = useState('')
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
      if (event.target.value !== '') {
        setEmailerror('');
      }
    };

    const [password, setPassword] = useState('')
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      if (event.target.value !== '') {
        setPassworderror('');
      }
    };

    const [CPassword, setCPassword] = useState('')
    const handleConfirmChange = (event) => {
      setCPassword(event.target.value);
      if (event.target.value !== '') {
        setConfirmerror('');
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

    
    if (companyname === "") {
        toast.warning("Company Name is required!", {
            position: "top-center"
        });
        setNameerror('Company Name is required!');
    }else if (industry === "") {
        toast.warning("Company Domain is required!", {
            position: "top-center"
        });
        setDomainerror('Company Domain is required!');
        
        
    }  else if ( companyaddress === "") {
        toast.warning("Country is required!", {
            position: "top-center"
        });
        
        setCountryerror('Country is required!');
    } else if (companysize === "") {
        toast.warning("Company Size is required!", {
            position: "top-center"
        });
        setSizeerror(' Company Size is required!');
    } else if (companywebsite === "") {
        toast.warning("Company Website is required!", {
            position: "top-center"
        });
        setWebsiteerror('Company Website is required!');
    }
    else if (companyservice === "") {
        toast.warning("Company Service is required!", {
            position: "top-center"
        });
        setSericeerror('Company Service is required!');
    } else if (email === "") {
      toast.warning("Email is required!", {
          position: "top-center"
      });
      setEmailerror('Email is required!');
  } else if (!email.includes("@")) {
      toast.warning("Includes @ in your Email!", {
          position: "top-center"
      });
      setEmailerror('Includes @ in your Email!');
     } else if (password === "") {
      toast.error("Password is required!", {
          position: "top-center"
      });
      setPassworderror('Password is required!');
  }
  else if (CPassword.length < 8) {
      toast.error("Password must be 8 char!", {
          position: "top-center"
      });
      setPassworderror('Password must be 8 char!');
  } else if (CPassword === "") {
        toast.error("Confirm password is required!", {
            position: "top-center"
        });
      setConfirmerror('Confirm password is required!');
    }
    else if (CPassword.length < 8) {
        toast.error("Confirm password must be 8 char!", {
            position: "top-center"
        });
      setConfirmerror('Confirm password must be 8 char!');
    } else if (password !== CPassword) {
        toast.error("Password and Confirm password are not matching!", {
            position: "top-center"
        });
      } else {
      
        setShowBackdrop(true);

        const url = 'http://localhost:5000/royecruit/register';
        const data = new FormData();
        data.append('companyname', companyname);
        data.append('companyaddress', companyaddress);
        data.append('industry', industry);
        data.append('companysize', companysize);
        data.append('companywebsite', companywebsite);
        data.append('companyservice', companyservice);
        data.append('email', email);
        data.append('password', password);
        data.append('image', image);

        fetch(url,{ method: 'POST', body: data })
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
          toast.success("Registration Failed..." , {
              position: "top-center",
              duration:(2000)
            });
            setShowBackdrop(false);
        });
      
    }
}






  return (
   
      <Grid container spacing={0} height="100%">
    <Grid item xs={12} md={6}>
          
      
          <img
            src={condidate}
            alt="random"
            style={{position: 'fixed',
            left: 0,
            top: 0,
            height: '100%',
            width: '50%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',}}
          />
      
        <Button href="/client" variant="contained" sx={{position: 'fixed',
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
        {success ? (
               <Grid item  lg={12} md={6} sm={6} xs={6}>
                  
               <Typography sx={{marginTop: 30, marginLeft: 104 , fontFamily: "Oswald", fontWeight: "bold", fontSize: 28, }}>Your account has been</Typography>
               <Typography sx={{marginTop: 0, marginLeft: 106 , fontFamily: "Oswald", fontWeight: "bold", fontSize: 28, }}>created successfully <FcOk /> </Typography>
               <Button variant="contained" href="/companysignin" sx={{position: 'fixed',
top: {xs: 600, sm: 600, lg:330}, 
left: {xs: 100, sm: 100, lg: 900},
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
          <Container style={{height: '100%', padding: '16px',}}>
            <form onSubmit={handleSubmit}>
            <TextField type="text"  label="Company name" name="companyname" onChange={handleNameChange} value={companyname}  sx={{marginTop: 3 , width: '80%', marginLeft: 7}}   />
            {nameerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{nameerror}</div>}
            <FormControl sx={{marginTop: 3, width: '80%', marginLeft: 7}}>
      <InputLabel id="industry-label">Domain</InputLabel>
      <Select
        labelId="industry-label"
        id="industry"
        value={industry}
        label="Industry"
        onChange={handleDomainChange}
      >
        {[
          'Healthcare',
          'Education',
          'Information technology',
          'Manufacturing',
          'Retail',
          'Financial services',
          'Hospitality',
          'Transportation and logistics',
          'Construction',
          'Energy',
          'Entertainment',
          'Professional services',
          'Government',
          'Agriculture',
          'Mining and extraction',
          'Nonprofit',
          'Real estate',
          'Insurance',
          'Telecommunications',
          'Legal'
        ].map((industry) => (
          <MenuItem key={industry} value={industry}>
            {industry}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    {domainerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{domainerror}</div>}
    <FormControl sx={{marginTop: 3, width: '80%', marginLeft: 7}}>
      <InputLabel id="country-label">Country</InputLabel>
      <Select
        labelId="country-label"
        id="country"
        value={companyaddress}
        label="Country"
        onChange={handleCountryChange}
      >
        {countries.map((country) => (
          <MenuItem key={country.name} value={country.name}>
            <span style={{marginRight: '0.5rem'}}>{country.flag}</span>{country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    {countryerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{countryerror}</div>}
            
            <TextField type="number"  name="companysize" label="Company Size" onChange={handleSizeChange} value={companysize} sx={{marginTop: 3 , width: '80%', marginLeft: 7}}  />
            {sizeerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{sizeerror}</div>}
            <TextField type="text" name="companywebsite" label="Company Website" onChange={handleWebsiteChange} value={companywebsite} sx={{marginTop: 3 , width: '80%', marginLeft: 7}} />
            {websiteerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{websiteerror}</div>}
            <FormHelperText sx={{marginLeft: 7, color:"black"}}>URLs must end with .Domain_Name</FormHelperText>
            <TextField type="text" name="companyservice" label="Describe your company services" onChange={handleServiceChange} value={companyservice} sx={{marginTop: 3 , width: '80%', marginLeft: 7}} />
            {sericeerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{sericeerror}</div>}
            <TextField type="email" name="companyemail" label="Email Address" onChange={handleEmailChange} value={email} sx={{marginTop: 3 , width: '80%', marginLeft: 7}} />
            {emailerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{emailerror}</div>}
            <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            name="Password"
            onChange={handlePasswordChange} 
            value={password}
            sx={{marginTop: 3 , width: '80%', marginLeft: 7}}
          > 

            </TextField> 
            <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{marginTop: 4}}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                {passworderror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{passworderror}</div>}
                <TextField
            type="password"
            label="Confirm Password"
            name="CPassword"
            onChange={handleConfirmChange}
            value={CPassword}
            sx={{marginTop: 3 , width: '80%', marginLeft: 7}}
          > 
          {confirmerror && <div style={{ color: 'red', marginLeft: 55, marginTop: 10 }}>{confirmerror}</div>}
            </TextField> 
            <TextField type="file" onChange={handleChange} sx={{marginTop: 3 , width: '80%', marginLeft: 7}} />
            <FormHelperText sx={{marginLeft: 7, color:"black"}}>It's important° to upload your logo</FormHelperText>

          {viewImage && (
          <img src={viewImage} style={view} alt="Selected" width="250" height="200" />
          )}
           
                        
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} name="Check"  sx={{marginTop: 3 , width: '80%', marginLeft: 5.5}} label="By checking this field you accept the privacy police of Royecruit" /> 
      </FormGroup>
      <Button type="submit" onClick={handleSubmit} variant="contained" sx={{marginTop: 4, backgroundColor: "black", color: "white" , paddingRight: 5 , paddingLeft: 5 , paddingTop: 1, paddingBottom: 1, marginLeft: 7, '&:hover': {backgroundColor: "white", color: "black"}}}>Submit</Button>
      <Button type="reset" variant="contained" sx={{marginTop: 4 , backgroundColor: "white", color: "black" , paddingRight: 5 , paddingLeft: 5 , paddingTop: 1, paddingBottom: 1, marginLeft: 7, '&:hover': {backgroundColor: "black", color: "white"}}}>Reset</Button>
      <Backdrop open={showBackdrop}>
        <CircularProgress color="inherit" sx={{marginLeft: "55%"}} />
      </Backdrop>
            </form>
            <ToastContainer/>
          </Container>
        </Grid>
            )}
        </Grid>


  );
}

export default Signup;
