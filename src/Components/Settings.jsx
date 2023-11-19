// import * as React from 'react';
import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import Swal from 'sweetalert2';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { blue, indigo } from '@mui/material/colors';
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
import heroImg_5 from "../media/img_5.jpeg";
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';

// import YourComponent from './YourComponent';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InputBase from '@mui/material/InputBase';
import useAlan from '../Hooks/useAlan';


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

export default function Settings() {

  useAlan();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState([]
    //   {
    //   username: 'Dummy Username',
    //   dob: '01/01/1990',
    //   firstName: 'Dummy First Name',
    //   lastName: 'Dummy Last Name',
    //   email: 'dummy@email.com',
    //   password: '********',
    // }
  );

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const result = await axios.get(`https://wixstocle.pythonanywhere.com/api/user/tony@gmail.com`, {
      headers: { "Authorization": `Token 11c868750d92deda81638c5a9a59177bdc7ae41a` },
    });
    console.log(result.data.data);
    setUserData(result.data.data);
  }


  const handleChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEdit = async () => {
    fetch(`https://wixstocle.pythonanywhere.com/api/user/tony@gmail.com`, {
      method: 'PUT',
      headers: {
        "Authorization": `Token 11c868750d92deda81638c5a9a59177bdc7ae41a`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.status == true) {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Edited the details',
            showConfirmButton: false,
            timer: 3000
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: data.message,
            showConfirmButton: false,
            timer: 3000
          })
        }
        loadList();
      });
  }

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
                <MenuIcon />
              </IconButton>

              {/* Search tab */}
              {/* <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', padding: '4px' }}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search..."
          sx={{ ml: 1 }}
        />
      </Box> */}

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

          <Box style={{ margin: "0.5rem 1rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Grid container spacing={1}>
                  <Grid item xs={12} style={{ marginLeft: "30%" }}>
                    <Avatar alt={userData.first_name} sx={{ width: 150, height: 150, bgcolor: blue[500], fontSize: "2rem" }} > RM</Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <Grid container spacing={2} >
                  <Grid item xs={12}>
                    <div style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "2rem", fontWeight: "650" }}>
                      Welcome to TIAA !!</div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div style={{ textAlign: "left", fontSize: "0.78rem" }}>First Name</div>
                    <TextField
                      id="first_name"
                      name="first_name"
                      color='success'
                      value={userData.first_name}
                      onChange={(e) => handleChange('first_name', e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Last Name</div>
                    <TextField
                      id="last_name"
                      name="last_name"
                      color='success'
                      value={userData.last_name}
                      onChange={(e) => handleChange('last_name', e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Email</div>
                    <TextField
                      id="email"
                      type='email'
                      name="email"
                      color='success'
                      value={userData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Password</div>
                    <TextField
                      id="password"
                      type='password'
                      name="password"
                      color='success'
                      disabled
                      value={userData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Phone Number</div>
                    <TextField
                      id="phone_number"
                      name="phone_number"
                      color='success'
                      value={userData.phone_number}
                      onChange={(e) => handleChange('phone_number', e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Date of Birth</div>
                    <TextField
                      id="dob"
                      type="date"
                      name="dob"
                      color='success'
                      value={userData.dob}
                      onChange={(e) => handleChange('dob', e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Address</div>
                    <TextField
                      id="address"
                      name="address"
                      color='success'
                      value={userData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Spouse Name</div>
                    <TextField
                      id="spouse_name"
                      name="spouse_name"
                      color='success'
                      value={userData.spouse_name}
                      onChange={(e) => handleChange('spouse_name', e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Spouse DOB</div>
                    <TextField
                      id="spouse_dob"
                      type="date"
                      name="spouse_dob"
                      color='success'
                      value={userData.spouse_dob}
                      onChange={(e) => handleChange('spouse_dob', e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Gender</div>
                    <TextField
                      id="gender"
                      name="gender"
                      color='success'
                      value={userData.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Spouse Gender</div>
                    <TextField
                      id="spouse_gender"
                      name="spouse_gender"
                      color='success'
                      value={userData.spouse_gender}
                      onChange={(e) => handleChange('spouse_gender', e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button variant="contained" type="submit"
                      sx={{
                        width: "100%", height: "3.5rem", fontSize: "1.1rem",
                        backgroundColor: "#2196F3", boxShadow: "none", color: "white", marginTop: "1rem",
                        textTransform: "capitalize"
                        , "&:hover": {
                          backgroundColor: "#2196F3", boxShadow: "none", color: "white",
                          fontSize: "1.3rem", cursor: "pointer"
                        }
                      }} onClick={handleEdit}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      {/* </Box> */}
    </ThemeProvider>
  );
}