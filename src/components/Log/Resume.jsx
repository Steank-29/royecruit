import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { Button, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { styled , keyframes } from '@mui/material/styles';
import user from '../assets/user.png'
import call from '../assets/phone-call.png'
import date from '../assets/date.png'
import emailIcon from '../assets/email.png'
import linker from '../assets/social-media.png'
import circle from '../assets/circle.png'
import { CastForEducation } from '@mui/icons-material';
import axios from 'axios';


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

const genders = [
  { name: 'Male' },
  { name: 'Female' },
]

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


export default function Resume() {


  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [prof, setProf] = useState('');
  const [dob, setDOB] = useState('');
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState('');
  const [social, setSocial] = useState('')
  const [computerSkills, setComputerSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [certif, setCertif] = useState([]);
  const [who, setWho] = useState('')
  const [obj, setObj] = useState('')
  const [act, setAct] = useState('')
  const [educ, setEduc] = useState([])
  const [work, setWork] = useState([])


  const handleEducChange = (e, index) => {
    const updatedInterests = [...educ];
    updatedInterests[index] = e.target.value;
    setEduc(updatedInterests);
  };

  const addEducField = () => {
    const updatedInterests = [...educ, ''];
    setEduc(updatedInterests);
  };


  const handleWorkChange = (e, index) => {
    const updatedInterests = [...work];
    updatedInterests[index] = e.target.value;
    setWork(updatedInterests);
  };

  const addWorkField = () => {
    const updatedInterests = [...work, ''];
    setWork(updatedInterests);
  };


  const handleCertifChange = (e, index) => {
    const updatedInterests = [...certif];
    updatedInterests[index] = e.target.value;
    setCertif(updatedInterests);
  };

  const addCertifField = () => {
    const updatedInterests = [...certif, ''];
    setCertif(updatedInterests);
  };



  const handleInterestChange = (e, index) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = e.target.value;
    setInterests(updatedInterests);
  };

  const addInterestField = () => {
    const updatedInterests = [...interests, ''];
    setInterests(updatedInterests);
  };

  
  
  
  
  const handleSkillChange = (e, index) => {
    const updatedSkills = [...computerSkills];
    updatedSkills[index] = e.target.value;
    setComputerSkills(updatedSkills);
  };

  const addSkillField = () => {
    const updatedSkills = [...computerSkills, ''];
    setComputerSkills(updatedSkills);
  };




  const handleLanguageChange = (e, index) => {
    const updatedLanguages = [...spokenLanguages];
    updatedLanguages[index] = e.target.value;
    setSpokenLanguages(updatedLanguages);
  };

  const addLanguageField = () => {
    const updatedLanguages = [...spokenLanguages, ''];
    setSpokenLanguages(updatedLanguages);
  };


  const generatePDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight() * 1.5;

    const greenWidth = pageWidth * 0.33;
    const greenHeight = pageHeight;

    const blueWidth = pageWidth;
    const blueHeight = pageHeight * 0.08;

    doc.setFillColor('#eaf6f6');
    doc.rect(0, 0, greenWidth, greenHeight, 'F');

    doc.setFillColor('#53a8b6');
    doc.rect(0, 20, blueWidth, blueHeight, 'F');

    doc.setFontSize(26);
    doc.setTextColor('black')
    doc.setFont('Arial', 'bold')
    doc.text(name, 3, 20);

    doc.setFontSize(20);
    doc.setTextColor('black')
    doc.setFont('Arial', 'normal')
    doc.text(prof, 3, 30);

    doc.setFontSize(14);
    doc.setTextColor('#000000')
    doc.setFont('Arial')
    doc.text(gender, 10, 50);
    doc.text(dob, 10, 60);
    doc.text(phone, 10, 70);
    doc.text(email, 10, 80);
    doc.text(social, 10, 90);


    doc.setFontSize(20);
    doc.setTextColor('black')
    doc.setFont('Arial', 'normal')
    doc.text('Objective ', 80, 80)
    doc.line(110, 78, 200, 78);

    doc.setFontSize(14);
    doc.setTextColor('#000000')
    doc.setFont('Arial')
    var wrappedTexting = doc.splitTextToSize(obj, pageWidth * 0.5);
    doc.text(wrappedTexting, 90, 90)

    doc.setFontSize(20);
    doc.setTextColor('black')
    doc.setFont('Arial', 'normal')
    doc.text('Education ', 80, 130)
    doc.line(110, 128, 200, 128);


    const lines = doc.splitTextToSize(educ, 160, 10);

    for (let i = 0; i < lines.length; i++) {
      doc.setFontSize(14);
      doc.setTextColor('#000000');
      doc.setFont('Arial');
      doc.text(lines[i], 90, 140 + i * 10);
    }

    doc.setFontSize(20);
    doc.setTextColor('black')
    doc.setFont('Arial', 'normal')
    doc.text('Experience ', 80, 180)
    doc.line(115, 178, 200, 178);

    const linesw = doc.splitTextToSize(work, 200, 10);

    for (let i = 0; i < linesw.length; i++) {
      doc.setFontSize(14);
      doc.setTextColor('#000000');
      doc.setFont('Arial');
      doc.text(linesw[i], 90, 190 + i * 10);
    }

    doc.setFontSize(20);
    doc.setTextColor('black')
    doc.setFont('Arial', 'normal')
    doc.text('Activities ', 80, 230)
    doc.line(115, 228, 200, 228);

    doc.setFontSize(14);
    doc.setTextColor('#000000')
    doc.setFont('Arial')
    var wrappedTextings = doc.splitTextToSize(act, pageWidth * 0.5);
    doc.text(wrappedTextings, 90, 240)
    
    

    doc.line(3, 95, 65, 95);

    doc.setFontSize(18);
    doc.setTextColor('#000000')
    doc.setFont('Arial', 'bold')
    doc.text('Languages ', 3, 105);

    const startY = 115;
    doc.setFontSize(12);
    doc.setTextColor('#000000');
    doc.setFont('Arial', 'normal');
    const interestsText = spokenLanguages.join(', ');
    doc.text(interestsText, 3, startY);

    doc.line(3, 120, 65, 120);


    doc.setFontSize(18);
    doc.setTextColor('#000000')
    doc.setFont('Arial', 'bold')
    doc.text('Computer ', 3, 130);


    const startYS = 140;
    doc.setFontSize(12);
    doc.setTextColor('#000000');
    doc.setFont('Arial', 'normal');
    const interestsTexter = computerSkills.join(', ');
    doc.text(interestsTexter, 3, startYS);

    doc.line(3, 145, 65, 145);

    doc.setFontSize(18);
    doc.setTextColor('#000000')
    doc.setFont('Arial', 'bold')
    doc.text('Interests ', 3, 155);

    const startYA = 165;
    doc.setFontSize(12);
    doc.setTextColor('#000000');
    doc.setFont('Arial', 'normal');
    const interestsTextering = interests.join(', ');
    doc.text(interestsTextering, 5, startYA);

    doc.line(3, 170, 65, 170);

    doc.setFontSize(18);
    doc.setTextColor('#000000')
    doc.setFont('Arial', 'bold')
    doc.text('Certifications ', 3, 180);


    const linesc = doc.splitTextToSize(certif, 190, 10);

    for (let i = 0; i < linesc.length; i++) {
      doc.setFontSize(12);
      doc.setTextColor('#000000');
      doc.setFont('Arial', 'normal');
      doc.text(linesc[i], 5, 190 + i * 10);
    }

    doc.line(3, 220, 65, 220);

    doc.setFontSize(18);
    doc.setTextColor('#000000')
    doc.setFont('Arial', 'bold')
    doc.text('Who Are You ? ', 3, 235);

    const startYAd = 245;
    doc.setFontSize(12);
    doc.setTextColor('#000000');
    doc.setFont('Arial', 'normal');
    var wrappedText = doc.splitTextToSize(who, pageWidth* 0.28);
    doc.text(wrappedText, 5, startYAd);



    const imageWidth = 5;
    const imageHeight = 5;
    const imageX = 3 ;
    const imageY = 46 ;
    doc.addImage(user, 'JPEG', imageX, imageY, imageWidth, imageHeight);


    const imageWidthL = 2;
    const imageHeightL = 2;
    const imageXj = 82 ;
    const imageYj = 88 ;
    doc.addImage(circle, 'JPEG', imageXj, imageYj, imageWidthL, imageHeightL);

    const imageWidthLn = 2;
    const imageHeightLn = 2;
    const imageXn = 82 ;
    const imageYn = 238 ;
    doc.addImage(circle, 'JPEG', imageXn, imageYn, imageWidthLn, imageHeightLn);



    const imageWidthD = 5;
    const imageHeightD = 5;
    const imageXD = 3 ;
    const imageD = 56 ;
    doc.addImage(date, 'JPEG', imageXD, imageD, imageWidthD, imageHeightD);


    const imageWidthS = 5;
    const imageHeightS = 5;
    const imageXS = 3 ;
    const imageS = 66 ;
    doc.addImage(call, 'JPEG', imageXS, imageS, imageWidthS, imageHeightS);

    const imageWidthST = 5;
    const imageHeightST = 5;
    const imageXST = 3 ;
    const imageST = 76 ;
    doc.addImage(emailIcon, 'JPEG', imageXST, imageST, imageWidthST, imageHeightST);


    const imageWidthSK = 5;
    const imageHeightSK = 5;
    const imageXSK = 3 ;
    const imageSK = 86 ;
    doc.addImage(linker, 'JPEG', imageXSK, imageSK, imageWidthSK, imageHeightSK);






  if (image) {
    const imgData = URL.createObjectURL(image);
    const imageWidth = 35;
    const imageHeight = 40;
    const imageX = 170 ;
    const imageY = 18 ;
    doc.addImage(imgData, 'JPEG', imageX, imageY, imageWidth, imageHeight);
  }

    doc.save(`RC-${name}.pdf`);
  };


  return (
    <div>

      <Typography sx={{textAlign:"center", mt:15, fontFamily:"Oswald", fontSize:50, fontWeight:"bold"}}>
        Generate Your Own <Spaw>Resume</Spaw> With One Click
      </Typography>

<div>
    <FormHelperText  sx={{ml:12,color:"black", mt:4, fontFamily:"Oswald", fontSize:16}}>Personal Information</FormHelperText>
  <TextField
  type='text'
  placeholder='Full Name'
  value={name}
  onChange={(e) => setName(e.target.value)}
  sx={{ml:12, width:"20%", mt:1}}
  />
  <TextField
  type='text'
  placeholder='Email'
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  sx={{ml:3, width:"20%", mt:1}}
  />

<TextField
  type='tel'
  placeholder='Phone Number'
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  sx={{ml:3, width:"20%", mt:1}}
  />


<TextField
  type='date'
  value={dob}
  onChange={(e) => setDOB(e.target.value)}
  sx={{ml:3, width:"20%", mt:1}}
  />

      <FormControl sx={{marginTop: 2, width: '20%', marginLeft: 12}}>
      <InputLabel id="country-label">Country</InputLabel>
      <Select
        labelId="country-label"
        id="country"
        label="Country"
      >
        {countries.map((country) => (
          <MenuItem key={country.name} value={country.name}>
            <span style={{marginRight: '0.5rem'}}>{country.flag}</span>{country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <FormControl sx={{marginTop: 2, width: '20%', marginLeft: 3}}>
      <InputLabel id="country-label">Gender</InputLabel>
      <Select
        labelId="country-label"
        id="country"
        label="Country"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        {genders.map((country) => (
          <MenuItem key={country.name} value={country.name}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

      <TextField
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        sx={{marginTop: 2, width: '20%', marginLeft: 3}}
      />

<TextField
  type='text'
  label="Social Media Link"
  value={social}
  onChange={(e) => setSocial(e.target.value)}
  sx={{ml:3, width:"20%", mt:2}}
  />

<TextField
  type='text'
  placeholder='Your Profession'
  value={prof}
  onChange={(e) => setProf(e.target.value)}
  sx={{ml:12, width:"85.5%", mt:1}}
  />

<TextField
      multiline
      rows={4}
      label="Introduce Yourself In Brief Lines"
      variant="outlined"
      value={who}
      onChange={(e) => setWho(e.target.value)}
      fullWidth
      sx={{ml:12, width:"85.5%", mt:1}}
    />


    <FormHelperText  sx={{ml:12,color:"black", mt:4, fontFamily:"Oswald", fontSize:16}}>Personal Background</FormHelperText>

          

      <Button sx={{marginTop: 2, width: '20%', marginLeft: 16, background:"royalblue", color:"white", "&:hover":{background:"royalblue", color:"white"}}}  onClick={addLanguageField}>Languages</Button>
      {spokenLanguages.map((language, index) => (
        <TextField
          label="Spoken Language"
          key={index}
          value={language}
          onChange={(e) => handleLanguageChange(e, index)}
          sx={{marginTop: 2, width: '20%', marginLeft: 16}}
        />
      ))}



      <Button sx={{marginTop: 2, width: '20%', marginLeft: 16, background:"#136456", color:"white", "&:hover":{background:"#136456", color:"white"}}} onClick={addSkillField}>Computer Skills</Button>
      {computerSkills.map((skill, index) => (
        <TextField
        label="Computer Skills"
          key={index}
          value={skill}
          onChange={(e) => handleSkillChange(e, index)}
          sx={{marginTop: 2, width: '20%', marginLeft: 16}}
        />
      ))}
      
      <Button sx={{marginTop: 2, width: '20%',  marginLeft: 16, background:"#F99245", color:"white", "&:hover":{background:"#F99245", color:"white"}}} onClick={addInterestField}>Interests</Button>
      {interests.map((interest, index) => (
        <TextField
        label="You Interest In"
          key={index}
          value={interest}
          onChange={(e) => handleInterestChange(e, index)}
          sx={{marginTop: 2, width: '20%', marginLeft: 16}}
        />
      ))}


<Button sx={{marginTop: 2, width: '20%',  marginLeft: 16, background:"#385170", color:"white", "&:hover":{background:"#385170", color:"white"}}} onClick={addCertifField}>Certifications</Button>
      {certif.map((certif, index) => (
        <TextField
        label="Certifications"
          key={index}
          value={certif}
          onChange={(e) => handleCertifChange(e, index)}
          sx={{marginTop: 2, width: '20%', marginLeft: 16}}
        />
      ))}

<FormHelperText  sx={{ml:12,color:"black", mt:4, fontFamily:"Oswald", fontSize:16}}>Important Detailes</FormHelperText>

<TextField
      multiline
      rows={4}
      label="What Is Your Objective For The Future ?"
      variant="outlined"
      value={obj}
      onChange={(e) => setObj(e.target.value)}
      fullWidth
      sx={{ml:12, width:"85.5%", mt:1}}
    />


<FormHelperText  sx={{ml:12,color:"black", mt:4, fontFamily:"Oswald", fontSize:16}}>Educational Background & Work Experience° Date Is Important</FormHelperText>



      {educ.map((educ, index) => (
        <TextField
        label="Educational Background"
          key={index}
          value={educ}
          onChange={(e) => handleEducChange(e, index)}
          sx={{marginTop: 2, width: '30%', marginLeft: 16}}
        />
      ))}
      <Button sx={{marginTop: 2, width: '20%',  marginLeft: 16, background:"#E7389F", color:"white", "&:hover":{background:"#E7389F", color:"white"}}} onClick={addEducField}>Educational Background</Button>



      {work.map((certif, index) => (
        <TextField
        label="Work Experience"
          key={index}
          value={certif}
          onChange={(e) => handleWorkChange(e, index)}
          sx={{marginTop: 2, width: '30%', marginLeft: 16}}
        />
      ))}
      <Button sx={{marginTop: 2, width: '20%',  marginLeft: 16, background:"#964B00", color:"white", "&:hover":{background:"#964B00", color:"white"}}} onClick={addWorkField}>Work Experience</Button>


<FormHelperText  sx={{ml:12,color:"black", mt:4, fontFamily:"Oswald", fontSize:16}}>Field Activities</FormHelperText>


<TextField
      multiline
      rows={4}
      label="What Is Your Activities ?"
      variant="outlined"
      value={act}
      onChange={(e) => setAct(e.target.value)}
      fullWidth
      sx={{ml:12, width:"85.5%", mt:1}}
    />




<Typography sx={{mt:10}}>

</Typography>
      <Button
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          marginTop: 2,
          width: '20%',
          background: 'black',
          color: 'white',
          '&:hover': { background: 'black', color: 'white' },
        }}
        onClick={generatePDF}
      >
        Generate CV
      </Button>
    </div>



    </div>
  )
}









