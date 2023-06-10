import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, CardMedia, CardContent, Card, CardActionArea, TextField, MenuItem, Select, InputLabel, FormControl, Autocomplete, Box, Modal, Button, Accordion, AccordionSummary, AccordionDetails} from '@mui/material'
import { styled , keyframes } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const Home = styled('div')(({ theme }) => ({
  marginTop: "100px",
  textAlign: "center",
}));

const countries = [
  { name: '', flag: '' },
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


const Spaw = styled('span')(({ theme }) => ({
  background: `linear-gradient(-45deg, #00ad7c, #0077be ,#00ad7c)`,
  backgroundSize: '400% 400%',
  animation: `${GradientAnimation} 3s ease-in-out infinite`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));  

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
  transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
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




function Service(props) {

    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [countryFilter, setCountryFilter] = useState('');
    const [industryFilter, setIndustryFilter] = useState('');
    const [employeeFilter, setEmployeeFilter] = useState('');

    const [showAccordion, setShowAccordion] = useState('');

    // Function to toggle the accordion visibility
    const toggleAccordion = (index) => {
      if (showAccordion === index) {
        setShowAccordion('');
      } else {
        setShowAccordion(index);
      }
    };

    useEffect(() => {
        async function fetchData() {
        const response = await axios.get('http://localhost:5000/royecruit/companies');
        setCompanies(response.data);
        }
        fetchData();
    }, []);    

    useEffect(() => {
      const filtered = companies.filter((company) => {
        let passCountry = true;
        let passIndustry = true;
        let passEmployee = true;
  
        if (countryFilter !== '' && company.companyaddress !== countryFilter) {
          passCountry = false;
        }
  
        if (industryFilter !== '' && company.industry !== industryFilter) {
          passIndustry = false;
        }
  
        if (
          employeeFilter !== '' &&
          company.companysize < parseInt(employeeFilter)
        ) {
          passEmployee = false;
        }
  
        return passCountry && passIndustry && passEmployee;
      });
  
      setFilteredCompanies(filtered);
    }, [companies, countryFilter, industryFilter, employeeFilter]);


    const handleCountryFilterChange = (e) => {
      setCountryFilter(e.target.value);
    };
  
    const handleIndustryFilterChange = (e) => {
      setIndustryFilter(e.target.value);
    };
  
    const handleEmployeeFilterChange = (e) => {
      setEmployeeFilter(e.target.value);
    };

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


  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!showText) {
        setShowText(true);
      }
    }, 700);

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

  const [eyes, setEyes] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEyes(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const [viewer, setViewer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setViewer(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const [isVisibler, setIsVisibler] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisibler(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
<Home>      
              <Text variant="h4" sx={{
              color: "#000",
              fontSize: { xs: '40px', sm: '45px', md: '55px', lg : '60px' },
              fontWeight: "700",
              fontFamily: "Oswald",
              }} className={`text ${visible ? 'visible' : ''}`}>
              Let our services be your beacon of hope<br/> 
              towards<Spaw> a brighter</Spaw> career future.
              </Text>
              <Pretext variant="subtitle2" sx={{
                fontSize: 22,
                fontFamily: "Oswald",
                marginTop: 1,
                fontWeight: "bold",
                color: "black"
            }} className={`text ${showText ? 'visible' : ''}`}>
              Believe in yourself and the endless opportunities that lie ahead.</Pretext>
        </Home>

<Pretext className={`text ${showText ? 'visible' : ''}`} variant="subtitle2" sx={{color:"black",  fontFamily:"Oswald", fontSize:18, ml:3,  mt: 5, textAlign:"justify"}} >
It's always our unwavering commitment and topmost priority to empower and embolden you on your quest for the perfect job, by meticulously <br/> curating an expansive network of unparalleled opportunities that not only align seamlessly with your unique skills, passions, and career <br/> aspirations, but also serve as transformative stepping stones towards realizing your professional dreams.
</Pretext>
<Pretext className={`text ${showText ? 'visible' : ''}`} variant="subtitle2" sx={{color:"black", fontWeight:"bold", fontFamily:"Oswald", fontSize:19, ml:3 , mt: 2, textAlign:"justify"}} >
Discover Companies.
</Pretext>

<FormControl sx={{marginTop: 1, width: '25%', marginLeft: 18 , 
        transform: eyes ? "translateX(0)" : "translateX(360%)",
        transition: "transform 1s ease-in-out",
      }}>
<InputLabel id="country-label">Choose Country</InputLabel>
<Select
  labelId="country-label"
  id="country"
  value={countryFilter}
  label="Country"
  onChange={handleCountryFilterChange}
>
  {countries.map((country) => (
    <MenuItem key={country.name} value={country.name}>
      <span style={{marginRight: '0.5rem'}}>{country.flag}</span>{country.name}
    </MenuItem>
  ))}
</Select>
</FormControl>

<FormControl sx={{marginTop: 1, width: '25%', marginLeft: 2, transform: viewer ? "translateX(0)" : "translateX(380%)",
        transition: "transform 1s ease-in-out",}}>
<InputLabel id="industry-label">Choose Industry</InputLabel>
<Select
  labelId="industry-label"
  id="industry"
  value={industryFilter}
  label="Industry"
  onChange={handleIndustryFilterChange}
>
  {[
    '',
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
    'Legal',

  ].map((industry) => (
    <MenuItem key={industry} value={industry}>
      {industry}
    </MenuItem>
  ))}
</Select>
</FormControl>


<TextField
  type="number"
  placeholder="Number Of Employees"
  value={employeeFilter}
  onChange={handleEmployeeFilterChange}
  sx={{marginTop: 1, width: '25%', marginLeft: 2, 
  transform: isVisibler ? "translateX(0)" : "translateX(380%)",
  transition: "transform 1s ease-in-out",}}
/>
        <Grid container spacing={1} sx={{marginTop: 4, marginBottom : 4}} >
  {filteredCompanies.map((company, index) => (
    <Grid item xs='auto' key={index}>

<Card sx={{ maxWidth: 345, ml: 7, mt:2 }} elevation={0}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="120"
          width="110"
          image={company.image}
          alt="company logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:"Oswald", mt:1, fontSize: 16, fontWeight:"bold", textAlign:"center", textTransform:"uppercase"}}>
            {company.industry}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{fontFamily:"Oswald", mt:1}}>
            N° Employees : <b><span style={{color:"cadetblue"}}>{company.companysize}</span></b> 
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{fontFamily:"Oswald", mt:0.5}}>
           Website : <b><span style={{color:"black"}}>{company.companywebsite}</span></b>
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{fontFamily:"Oswald", mt:0.5}}>
            Brief Description : <b><span style={{color:"black"}}>{company.companyservice}</span></b>
          </Typography>
          <Accordion elevation={0} eventKey={index} show={showAccordion === index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body2" color="text.primary" sx={{fontFamily:"Oswald", mt:0.5}}>
             <b><span style={{color:"black"}}>Discover More</span></b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="body2" color="text.primary" sx={{fontFamily:"Oswald", mt:0.5}}>
            Country : <b><span style={{color:"black"}}>{company.companyaddress}</span></b>
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{fontFamily:"Oswald", mt:0.5}}>
            State : <b><span style={{color:"black"}}>{company.selectedState}</span></b>
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{fontFamily:"Oswald", mt:0.5}}>
            Location : <b><span style={{color:"black"}}>{company.location}</span></b>
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{fontFamily:"Oswald", mt:0.5}}>
            Hired Employees/y : <b><span style={{color:"cadetblue"}}>{company.employees}</span></b>
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{fontFamily:"Oswald", mt:0.5}}>
          Annual Income : <b><span style={{color:"cadetblue"}}>{company.revenue}B <b><span style={{color:"black"}}>$</span></b> </span></b>
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{fontFamily:"Oswald", mt:0.5}}>
            Customer Support : <b><span style={{color:"black"}}>{company.customerSupport}</span></b>
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{fontFamily:"Oswald", mt:0.5}}>
            Phone Number : <b><span style={{color:"cadetblue"}}>{company.phone}</span></b>
          </Typography>
        </AccordionDetails>
      </Accordion>
        </CardContent>
      </CardActionArea>

    </Card>
    </Grid>
  ))}

</Grid>

<Pretext className={`text ${showText ? 'visible' : ''}`} variant="subtitle2" sx={{color:"black", mb:3, fontFamily:"Oswald", fontSize:18, ml:3,  mt: 5, textAlign:"justify", fontWeight:"bold"}} >
In order to apply for a job at any of these esteemed companies, simply follow the straightforward process of creating your own <Link to="/client" style={{textDecoration:"none", textTransform:"uppercase"}}>account</Link><br/> which will grant you full access and enable you to commence your application journey with ease.
</Pretext>


    </React.Fragment>
  )
}

export default Service