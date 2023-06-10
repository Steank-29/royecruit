import React, {useEffect, useState} from 'react';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth'

import { AppBar , Toolbar , Tabs , Tab ,  Typography , Button , useMediaQuery , useTheme ,Tooltip , Avatar , Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    TextField,
    IconButton,
    Divider,
    ListItemIcon,
    MenuItem,
    Menu,
    Backdrop,
    CircularProgress,
    } from '@mui/material'
  import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
  import RespNav from '../interfaces/RespNav';
  import logo512 from '../assets/logo512.png';
  import SendIcon from '@mui/icons-material/Send';
  import { styled } from '@mui/material/styles';
import axios from 'axios';
  
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

function Lognavbar() {

  
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    }

    const handleprofile = () => {
      navigate('/profile')
      }
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const [overture, setOverture] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    const handleFerme = () => {
        setOverture(false);
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, email, message});



    };


    const token = localStorage.getItem('usersdatatoken');
    const [showBackdrop, setShowBackdrop] = useState(false);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
      
      if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      }
      }, []);
      
      const [user, setUser] = useState(null);
      
      useEffect(() => {
        setShowBackdrop(true);
      
      axios.get(`http://localhost:5000/royecruit/getUser/${userId}`)
        .then(response => {
          setUser(response.data);
          setShowBackdrop(false);
        })
        .catch(error => {
          console.error(error);
          setShowBackdrop(false);
        });
      }, [userId]);
      
      if (!user) {
      return <>
      <Backdrop open={showBackdrop}>
        <CircularProgress color="inherit" sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} />
      </Backdrop>
      </>;
      }

      const handleOUT = () => {
        logout(token)
        window.location.href='/'
      }

      const handleOUTaccount = () => {
        logout(token)
        window.location.href='/signin'
      }

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
                }} href="/lmain"/>
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
                }} href="/lmain"/> 
                <Tab label="Home"  href="/lmain" sx={{ marginTop: "8px", marginLeft: "20px" , '&:hover': { color: "#000"}}}/>
                <Tab label="Offers" href="/jobOffers" sx={{ marginTop: "8px" , '&:hover': { color: "#000"}}}/>
                <Tab label="Interview" href="/linterview" sx={{ marginTop: "8px" , '&:hover': { color: "#000"}}}/>
                <Tab label="About" href="/labout" sx={{ marginTop: "8px" , '&:hover': { color: "#000"}}}/>
                <Tab label="Service" href="/lservice" sx={{ marginTop: "8px" , '&:hover': { color: "#000"}}}/>

                </Tabs>

                     <Tooltip title="Account settings" >
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 ,marginLeft: "43%" }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={user.image} sx={{ width: 42, height: 42 }}/>
          </IconButton>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleprofile}>
          <Avatar src={user.image} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleOUTaccount}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleprofile}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleOUT}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
                    <Dialog open={overture} onClose={handleClose}>
        <DialogTitle sx={{fontFamily: "Oswald", fontSize: 22 , fontWeight: "bold"}}>Do not hesitate to inform us of any issues</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            fontFamily: "Oswald", fontSize: 18
          }} >
            Please fill out the form below and we will get back to you as soon as possible.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Fullname"
              type="text"
              fullWidth
              required
              value={name}
              onChange={(event) => setName(event.target.value)}            
            />
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="dense"
              label="What's in your mind"
              multiline
              rows={4}
              fullWidth
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <DialogActions>
              <Button onClick={handleFerme} sx={{borderColor: "#000", color: "#000", fontFamily: "Oswald" , '&:hover': { color: "#000", backgroundColor: "#EAEBED" , borderColor: "#000"} }} variant="outlined" >
                Cancel
              </Button>
              <Button type="submit" sx={{borderColor: "#000", color: "#000", fontFamily: "Oswald" , '&:hover': { color: "#000", backgroundColor: "#EAEBED" , borderColor: "#000"} }} variant="outlined" endIcon={<SendIcon />}>
                Send
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
                    </>
                )}
            </Toolbar>
        </AppBar>
       
    </React.Fragment>
  )
}

export default Lognavbar