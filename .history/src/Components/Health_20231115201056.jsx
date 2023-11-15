// import * as React from 'react';
import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { mainListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import heroImg_4 from "../media/img_4.jpeg";
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
// import YourComponent from './YourComponent';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InputBase from '@mui/material/InputBase';


  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "25px",
    color: "#042A57",
    fontWeight: "bold",
    textAlign: "left",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
  }));
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

  
const ProgressBarBox = ({ title, value }) => {
    let indicatorText = '';
    let color = '';
  
    if (value <= 30) {
      indicatorText = 'Less';
      color = '#BDFF7B';
    } else if (value <= 70) {
      indicatorText = 'Nearby Full';
      color = '#FFE779';
    } else {
      indicatorText = 'Completely Full';
      color = '#FC8965';
    }
  
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '16px',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: "#0066FF" }}>
            {title}
          </Typography>
          <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            width: '100%',
            height: '12px',
            borderRadius: '8px',
            backgroundColor: '#f0f0f0',
            marginBottom: '8px',
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
            },
          }}
        />
         
          <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
           
          }}
        >
          <Typography variant="body2">{indicatorText}</Typography>
          <Typography variant="body2">{value}%</Typography>
        </Box>
        </Paper>
      </Grid>
    );
  };
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Health() {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
      username: 'Dummy Username',
      dob: '01/01/1990',
      firstName: 'Dummy First Name',
      lastName: 'Dummy Last Name',
      email: 'dummy@email.com',
      password: '********',
    });
  
    const handleEdit = (field) => {
      setIsEditing(!isEditing);
    };
  
    const handleChange = (field, value) => {
      setUserData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };
  
    const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', borderRadius: '16px', overflow: 'hidden', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }} >
        <CssBaseline />
  
<AppBar position="absolute" open={open} sx={{ backgroundColor: "whitesmoke", boxShadow: 'none' }}>
  <Toolbar
    sx={{
      pr: '24px', // keep right padding when drawer closed
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        edge="start"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: '36px',
          ...(open && { display: 'none' }),
          backgroundColor: "#fff"
        }}
      >
        <MenuIcon  />
      </IconButton>

      {/* Search tab */}
      <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', padding: '4px' }}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search..."
          sx={{ ml: 1 }}
        />
      </Box>

    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#B9D2FD', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '40px', padding: '8px' }}>
      {/* User profile image */}
      <img
        src={heroImg_4}
        alt="User Profile"
        style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '10px' }}
      />
      
      {/* Settings button */}
      <IconButton>
        <SettingsIcon />
      </IconButton>
    </Box>
  </Toolbar>
</AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            {/* <Divider sx={{ my: 1 }} /> */}
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            
          }}
        >
          <Toolbar />
          {/* </Container> */}

          
          {/* Start Here */}
          <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#fff',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    {/* Language Button */}
    <Button variant="contained" >
      English (default) <ArrowDropDownIcon/>
    </Button>
    {/* Logout Button */}
    <Button variant="contained" >
      Logout  <LogoutIcon/>     </Button>
  </Box>
          <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Single Column for Upload Picture, Username, and DOB */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: '16px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                  type="file"
                  accept="image/*"
                  style={{
                    display: 'none',
                  }}
                  id="account-pic-input"
                />
                <label htmlFor="account-pic-input">
                  <Button variant="outlined" component="span">
                    Upload Picture
                  </Button>
                </label>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    endAdornment: (
                      <IconButton color="primary" onClick={handleEdit}>
                        <EditIcon />
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  label="Date of Birth"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userData.dob}
                  onChange={(e) => handleChange('dob', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    endAdornment: (
                      <IconButton color="primary" onClick={handleEdit}>
                        <EditIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Single Column for First Name, Last Name, Email, and Password */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: '16px' }}>
              <Box>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    endAdornment: (
                      <IconButton color="primary" onClick={handleEdit}>
                        <EditIcon />
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    endAdornment: (
                      <IconButton color="primary" onClick={handleEdit}>
                        <EditIcon />
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  label="Email ID"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    endAdornment: (
                      <IconButton color="primary" onClick={handleEdit}>
                        <EditIcon />
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    endAdornment: (
                      <IconButton color="primary" onClick={handleEdit}>
                        <EditIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
        </Box>
        </Box>
      {/* </Box> */}
    </ThemeProvider>
  );
}