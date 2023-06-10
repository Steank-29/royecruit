import React,{useState} from 'react'
import { Container, Grid, Box, Typography, Avatar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert, } from "@mui/material";
import logo512 from '../assets/logo512.png';
import { FcFeedback } from "react-icons/fc";
import CloseIcon from '@mui/icons-material/Close';

export default function Footer() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [opens, setOpens] = React.useState(false);

    const handleClick = () => {
      setOpens(true);
    };
  
    const handleCloses = (re) => {
      setOpens(false);
    };

    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" sx={{ mb: 2 , fontFamily: "Oswald", fontSize: 18, fontWeight: "bolder"}}>
            General resources
            </Typography>
            <Typography  variant="body1" sx={{ mb: 1, fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"}  }}>
             <a href="/" style={{textDecoration:"none", fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"}}}> Home </a>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"} }}>
              Blog
            </Typography>
            <Typography onClick={handleClick} variant="body1" sx={{ mb: 1, fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"} }}>
              Interview
            </Typography>
            <Snackbar
                  open={opens}
                  autoHideDuration={6000}
                  onClose={handleCloses}
                  action={action}
                >
                  <Alert onClose={handleCloses} severity="error" sx={{ width: '100%' }}>
          You can not explore intreviews unless you have account
        </Alert>
                  </Snackbar>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"} }}>
            <a href="/service" style={{textDecoration:"none", fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"}}}> Service </a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" sx={{ mb: 2 , fontFamily: "Oswald", fontSize: 18, fontWeight: "bolder"}}>
              More
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"} }}>
            <a href="/about" style={{textDecoration:"none", fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"}}}> About </a>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"} }}>
            <a href="/moderator" style={{textDecoration:"none", fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"}}}> Contact Royecruit team</a>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"} }}>
            <a href="/ctalk" style={{textDecoration:"none", fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"}}}> Contact Company</a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" sx={{ mb: 2, fontFamily: "Oswald", fontSize: 18, fontWeight: "bolder" }}>
            About Royecruit
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"} }}>
            <a href="/info" style={{textDecoration:"none", fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"}}}> General Informations </a>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"} }}>
            References
            </Typography>
            
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" sx={{ mb: 2 , fontFamily: "Oswald", fontSize: 18, fontWeight: "bolder"}}>
            Legal
            </Typography>
            <Typography onClick={handleOpen}  variant="body1" sx={{ mb: 1, fontFamily: "Oswald", color: "#666", fontSize: 16, "&:hover": {color:"black"} }}>
             Privacy Policy
            </Typography>
            <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ marginTop: 2, fontFamily: "Oswald", fontSize: 42, textAlign: "center", fontWeight:"bold"}}>Privacy Policy</DialogTitle>
        <DialogContent>
          <Typography sx={{ marginTop: 2, fontFamily: "Oswald", fontSize: 24, fontWeight:"bold"}}>
          Privacy Policy for Ryecruit
          </Typography>
        <Typography sx={{marginTop: 1,color:"black", fontFamily:"oswald", fontSize:18, textAlign:"justify"}}>
        At Ryecruit, we are committed to protecting the privacy of our users and safeguarding the personal information that they entrust to us.<br/> 
        This Privacy Policy describes how we collect, use, and disclose information about our users, including job seekers and employers.
        </Typography>

<Typography sx={{ marginTop: 2, fontFamily: "Oswald", fontSize: 24, fontWeight:"bold"}}>
Information We Collect
</Typography>
<Typography sx={{marginTop: 1,color:"black", fontFamily:"oswald", fontSize:18 , textAlign:"justify"}}>
We collect personal information from users when they create an account, upload or create a resume, apply for jobs, take online tests, and communicate with other users through our messaging system. This information may include name, email address, phone number, employment and education history, resume and cover letter content, test scores and performance data, and user-generated content, such as messages sent through our messaging system.

We may also collect usage data automatically through the use of cookies, web beacons, and other tracking technologies. This information may include IP address, browser type, device type, and other usage data.
</Typography>

<Typography sx={{ marginTop: 2, fontFamily: "Oswald", fontSize: 24, fontWeight:"bold"}}>
How We Use Information
</Typography>
<Typography sx={{marginTop: 1,color:"black", fontFamily:"oswald", fontSize:18 , textAlign:"justify"}}>
We use the information we collect to provide and improve our services to users, match job seekers with job opportunities, allow employers to find and evaluate job candidates, communicate with users about job opportunities and other relevant information, enforce our policies and terms of service, analyze and improve our website and services, and prevent fraud and other unlawful activity.
</Typography>
<Typography sx={{ marginTop: 2, fontFamily: "Oswald", fontSize: 24, fontWeight:"bold"}}>
How We Share Information
</Typography>
<Typography sx={{marginTop: 1,color:"black", fontFamily:"oswald", fontSize:18 , textAlign:"justify"}}>
We may share information with third-party service providers who help us operate our website and provide our services, such as hosting providers, payment processors, and customer support services. We may also share information with employers who have posted job opportunities or with job seekers who have applied for those opportunities.

In some cases, we may be required to share information in response to a legal request or order, or to protect the rights or safety of our users or others. We may also share aggregated or de-identified information that does not identify individual users.
</Typography>
<Typography sx={{ marginTop: 2, fontFamily: "Oswald", fontSize: 24, fontWeight:"bold"}}>
Your Choices
</Typography>
<Typography sx={{marginTop: 1,color:"black", fontFamily:"oswald", fontSize:18 , textAlign:"justify"}}>
Users can control their privacy settings and the information they share on Ryecruit. Users can edit their account information, resume, and cover letter at any time, and can delete their account if they no longer wish to use our services.
</Typography>
<Typography sx={{ marginTop: 2, fontFamily: "Oswald", fontSize: 24, fontWeight:"bold"}}>
Security
</Typography>
<Typography sx={{marginTop: 1,color:"black", fontFamily:"oswald", fontSize:18 , textAlign:"justify"}}>
We take reasonable measures to protect the personal information we collect and store, including using encryption and other security technologies to protect against unauthorized access, disclosure, or use.
</Typography>
<Typography sx={{ marginTop: 2, fontFamily: "Oswald", fontSize: 24, fontWeight:"bold"}}>
Children's Privacy
</Typography>
<Typography sx={{marginTop: 1,color:"black", fontFamily:"oswald", fontSize:18 , textAlign:"justify"}}>
Our website and services are not intended for use by children under the age of 18. We do not knowingly collect personal information from children under the age of 18.
</Typography>
<Typography sx={{ marginTop: 2, fontFamily: "Oswald", fontSize: 24, fontWeight:"bold"}}>
Changes to this Privacy Policy
</Typography>
<Typography sx={{marginTop: 1,color:"black", fontFamily:"oswald", fontSize:18 , textAlign:"justify"}}>
We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify users of any material changes to this Privacy Policy by posting a notice on our website or by sending an email to registered users.
</Typography>
<Typography sx={{ marginTop: 2, fontFamily: "Oswald", fontSize: 24, fontWeight:"bold"}}>
Contact Us
</Typography>
<Typography sx={{marginTop: 1,color:"black", fontFamily:"oswald", fontSize:18 , textAlign:"justify"}}>
If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at <b>support@ryecruit.com</b>.
</Typography>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleClose}><CloseIcon sx={{color:"green"}}/></IconButton>
        </DialogActions>
      </Dialog>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between">
      <Grid item>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#000",
            fontSize: 20,
            fontFamily: "Oswald",
            fontWeight: "bolder",
            marginTop: 1,
          }}
        >
          <Avatar src={logo512} alt="logo" sx={{ width: "35px", height: "35px" }} /> Royecruit
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: "Oswald", color: "#666", marginTop:1 }}>
          Copyright © 2023 Royecruit, Inc. All rights reserved
        </Typography>
      </Grid>
      <Grid item sx={{marginRight: 30 }}>
     
      <input
        type="email"
        name="newsletter"
        placeholder="       Our Newsletter"
        fullWidth
        style={{
            borderColor: "white",
            borderRadius: 25,
            height: '5vh', 
            width: '200px'  
          }}
      />
      <IconButton aria-label="delete" size='lg'>
            <FcFeedback />
        </IconButton>

        
      </Grid>
    </Grid>
        </Container>
        </Box>
       
  );
}
