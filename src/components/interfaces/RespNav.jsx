import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,

  Tab
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";




const RespNav = () => {
  const [openDrawer, setOpenDrawer] = useState(false);


  return (
    <React.Fragment>
      <Drawer
        anchor="top"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText sx={{textAlign: "justify", marginLeft: "35vw"}} href="/"><Tab label="Home"  href="/" sx={{color:"#000", fontWeight: "bold"}}/></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText sx={{textAlign: "justify", marginLeft: "35vw"}}><Tab label="Interview"  href="/" sx={{color:"#000", fontWeight: "bold"}}/></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText sx={{textAlign: "justify", marginLeft: "35vw"}}><Tab label="Service"  href="/service" sx={{color:"#000", fontWeight: "bold"}}/></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText sx={{textAlign: "justify", marginLeft: "35vw"}}><Tab label="About"  href="/about" sx={{color:"#000", fontWeight: "bold"}}/></ListItemText>
              </ListItemIcon>
            </ListItemButton>
        </List>

        <List>
         
            <ListItemButton sx={{
                display: 'flex',
                alignItems: 'flex-end',
                marginTop: '10px',
                marginLeft: "23vw",
                width: "250px"
            }} >
                <Button sx={{ borderRadius: "10px", backgroundColor: "#000" , fontSize: "15px",
                    fontFamily: "monospace", paddingBottom: 1 , paddingTop: 1 , paddingRight: 3.2, paddingLeft: 3.2 , '&:hover': {backgroundColor: "#fff", color: "#000"} }} variant="contained" href="/signin"> 
                    <Typography sx={{
                        textAlign: "center", 
                        fontSize: "15px",
                        fontFamily: "monospace"
                    }}>
                    Login
                    </Typography> </Button>
                    <Button sx={{ marginLeft: "10px", border: "none", borderRadius: "10px", backgroundColor: "#eee" , color: "#000", fontSize: "15px", paddingRight: "15px" ,
                    fontFamily: "Oswald", '&:hover': {backgroundColor: "#fff", border: "none", color: "#000"} }} variant="outlined" href="/moderator"> Contact</Button>
                   
                   
            
            
            </ListItemButton>
          
        </List>

      </Drawer>
      <IconButton
        sx={{ color: "black", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default RespNav;