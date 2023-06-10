import React, {useEffect, useState} from 'react';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Clogout , CgetToken} from '../Cauth'
import MailIcon from '@mui/icons-material/Mail';

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
    Box,
    Popover,
    Stack,
    Paper,
    Badge,
    } from '@mui/material'
  import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
  import RespNav from '../interfaces/RespNav';
  import logo512 from '../assets/logo512.png';
  import SendIcon from '@mui/icons-material/Send';
  import { styled } from '@mui/material/styles';
import axios from 'axios';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';




const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#D44638', // Gmail red color
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '12px',
    height: '20px',
    minWidth: '20px',
    borderRadius: '10px',
    padding: '0 6px',
  },
}));

  
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

function CompanyNavbar() {

  const token = CgetToken();
    const [showBackdrop, setShowBackdrop] = useState(false);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
      
      if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      }
      }, []);

  
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElpop, setAnchorElpop] = useState(null);
    const [usersMessages, setUsersMessages] = useState([]);

    
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    }

    const handleprofile = () => {
      navigate('/companyprofile')
      }
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const [overture, setOverture] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [userCount, setUserCount] = useState(0);


    const handleFerme = () => {
        setOverture(false);
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, email, message});

    };

  
      fetch('http://localhost:5000/royecruit/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId })
      })
        .then(response => response.json())
        .then(data => {
          setUserCount(data.count);
          setUsersMessages(data.users)
        })
        .catch(error => {
          console.error('Error:', error);
        });


      
      const [user, setUser] = useState(null);
      
      useEffect(() => {
        setShowBackdrop(true);
      
      axios.get(`http://localhost:5000/royecruit/companyinfo/${userId}`)
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
        Clogout(token)
        window.location.href='/'
      }

      const handleOUTaccount = () => {
        Clogout(token)
        window.location.href='/companysignin'
      }


      const handleClickpop = (event) => {
        setAnchorElpop(event.currentTarget);
      };
    
      const handleClosepop = () => {
        setAnchorElpop(null);
      };
    
      const openpop = Boolean(anchorElpop);
      const idpop = openpop ? 'popover' : undefined;

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
                }} />
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
                }} /> 
                <Tab label="Dashboard"   sx={{ marginTop: "8px", marginLeft: "20px" , '&:hover': { color: "#000"}}}/>
                <Tab label="Upload Job Offer" href="/job" sx={{ marginTop: "8px" , '&:hover': { color: "#000"}}}/>
                <Tab label="Evaluation" href="/evaluation" sx={{ marginTop: "8px" , '&:hover': { color: "#000"}}}/>
                
                <Tab label="Contact Royecruit" href="/royecruit" sx={{ marginTop: "8px" , '&:hover': { color: "#000"}}}/>
                <Tab label={
          <div onClick={handleClickpop}>
            <StyledBadge badgeContent={userCount} color="secondary">
      <MailIcon />
    </StyledBadge> 
          </div>
        }  sx={{ marginTop: "4px" , '&:hover': { color: "#000"}}}/>
        <Popover
        id={idpop}
        open={openpop}
        anchorEl={anchorElpop}
        onClose={handleClosepop}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2} sx={{ width: 450, height:350 }}>
      {usersMessages && usersMessages.length > 0 ? (
        usersMessages.map((user) => (
          <Stack spacing={1} key={user.id}>
            <Paper elevation={0} sx={{mt:2}}>
            <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold"}} >
              {user.email}
            </Typography>
            <Typography sx={{fontFamily:"Oswald", fontSize:18}}>
              {user.problem}
            </Typography>
            <IconButton sx={{float:"right"}} href="/messages"> 
            <ReplyIcon sx={{color:"#2ecc71"}}  />
             </IconButton>
             <IconButton sx={{float:"right"}}> 
            <DeleteIcon sx={{color:"#FF6B6B"}} />
             </IconButton>
             
            </Paper>
            </Stack>
        ))
      ) : (
        <Typography variant="body2" component="p">
          No messages are sent yet.
        </Typography>
      )}
    </Box>
      </Popover>
                </Tabs>

                     <Tooltip title="Account settings" >
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 4 ,marginLeft: "24%" }}
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

export default CompanyNavbar