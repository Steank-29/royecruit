import React from 'react'
import { AppBar , Toolbar , Tabs , Tab ,  Typography , Alert, Snackbar, Button , useMediaQuery , useTheme , Avatar, IconButton ,
  } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import RespNav from '../interfaces/RespNav';
import logo512 from '../assets/logo512.png';
import { styled } from '@mui/material/styles';


import CloseIcon from '@mui/icons-material/Close';




const Home = styled('div')(({ theme }) => ({
    color: "#fff",
    fontSize: "22px",
    fontFamily: "monospace",
    fontWeight: "500",
    marginTop: "-5px",
  [theme.breakpoints.up('xs')]: {
    color: "#fff",
    fontSize: "18px",
    fontFamily: "monospace",
    fontWeight: "500",
    marginTop: "-5px",

  },
}));

const Homei = styled('div')(({ theme }) => ({
    color: "#fff",
    fontSize: "16px",
    fontFamily: "monospace",
    fontWeight: "500",
    marginTop: "-5px",
  [theme.breakpoints.up('xs')]: {
    color: "#fff",
    fontSize: "12px",
    fontFamily: "monospace",
    fontWeight: "500",
    marginTop: "-5px",
  },
}));

const Homer = styled('div')(({ theme }) => ({
    color: "#fff",
    fontSize: "22px",
    fontFamily: "monospace",
    fontWeight: "500",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "-5px",
  [theme.breakpoints.up('xs')]: {
    color: "#fff",
    fontSize: "18px",
    fontFamily: "monospace",
    fontWeight: "500",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "-5px",
  },
}));

export default function Navbar() {

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));


    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (re) => {
      setOpen(false);
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
    <React.Fragment>
        <AppBar sx={{
            backgroundColor: "#000",
            color: "#fff",
            height: "30px",
        }}>
            <Toolbar>
                <Tabs>
                    <Home>
                <Typography sx={{marginTop: "3px"}}> Royal Recruitment </Typography>
                </Home>  <Avatar src={logo512} alt="logo" sx={{width: "35px", height: "35px" , marginTop: "-8px"}} />
                </Tabs>
                <Tabs sx={{ marginLeft: "auto" }}>
                <Homei>
                <Typography> more </Typography>
                </Homei>
                <Homer>
                <Typography> Royal Recruitment </Typography>
                </Homer>
                <Homei>
                <Typography> info </Typography>
                </Homei>
                <ArrowRightAltIcon sx={{marginTop: "-5px"}} />
                </Tabs>
            </Toolbar>
        </AppBar>


        <AppBar sx={{
            background: "#fff",
            marginTop: "30px"
        }}>
            <Toolbar>
            {isMatch ? (
            <>
              <Tab label="Royecruit" sx={{
                    color: "black",
                    fontSize: "20px",
                    fontFamily: "Oswald",
                    fontWeight: "bolder"
                }} href="/"/>
              <RespNav />
            </>
          ) : (
               <>
                <Tabs>
                <Tab label="Royecruit" sx={{
                    color: "#000",
                    fontSize: "20px",
                    fontFamily: "Oswald",
                    fontWeight: "bolder"
                }} href="/"/> 
                <Tab label="Home"  href="/" sx={{ marginTop: "8px", marginLeft: "20px" , '&:hover': { color: "#000"}}}/>
                <Tab label="Interview" onClick={handleClick} sx={{ marginTop: "8px" , '&:hover': { color: "#000"}}}/>
                  <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  action={action}
                >
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          You can not explore intreviews unless you have account
        </Alert>
                  </Snackbar>
                <Tab label="About" href="/about" sx={{ marginTop: "8px" , '&:hover': { color: "#000"}}}/>
                <Tab label="Service" href="/service" sx={{ marginTop: "8px" , '&:hover': { color: "#000"}}}/>

                </Tabs>
                
                <Button sx={{ marginLeft: 'auto', borderRadius: "10px", backgroundColor: "#000" , fontSize: "15px",
                    fontFamily: "Oswald", '&:hover': {backgroundColor: "#fff", color: "#000"} }} variant="contained" href="/Signin"  > Login </Button>
               
                <Button sx={{ marginLeft: "10px", border: "none", borderRadius: "10px", backgroundColor: "#eee" , color: "#000", fontSize: "15px", paddingRight: "15px" ,
                    fontFamily: "Oswald", '&:hover': {backgroundColor: "#fff", border: "none", color: "#000"} }} variant="outlined" href="/moderator"> Contact</Button>
                   
                    </>
                )}
            </Toolbar>
        </AppBar>
    </React.Fragment>
  )
}
