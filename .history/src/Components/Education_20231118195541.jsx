import * as React from 'react';
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
import Deposits from './Deposits';

import heroImg_4 from "../media/img_4.jpeg";
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import YourComponent from './YourComponent';
import SearchIcon from '@mui/icons-material/Search';

import InputBase from '@mui/material/InputBase';



  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "25px",
    color: "#042A57",
    fontWeight: "bold",
    textAlign: "left",
    margin: theme.spacing(2, 0, 2, 0),
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

export default function Education() {
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
          <Container maxWidth="lg" sx={{ mt: 4 , mb: 4 }} 
        //   sx={{border: '15px solid #fff', borderRadius: '20px'}}
          >
            {/* <Grid container spacing={2}> */}
             
            <Grid item xs={12} md={8} lg={9}>

  <Title variant="h4" sx={{color: "#042A57"}}>
             Recommendations 
            </Title>
            {/* Recommendations */}
    
<Grid container spacing={2}>
  {/* Video 1 */}
  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius:'10px' }}>
      {/* <Typography variant="h6" mb={2}>Video 1</Typography> */}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/Bd89RijKF9I?si=d4g0xoBkujeVX_BY"
        title="Video 1"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </Paper>
  </Grid>

  {/* Video 2 */}
  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* <Typography variant="h6" mb={2}>Video 2</Typography> */}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/pjR3wIGOZsc?si=PnA_FOQh9G2iVRwy  "
        title="Video 2"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </Paper>
  </Grid>

  {/* Video 3 */}
  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* <Typography variant="h6" mb={2}>Video 3</Typography> */}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/ifykklPqqxg?si=AMCgomt-rIGPfYu3"
        title="Video 3"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </Paper>
  </Grid>
{/* </Grid> */}
            {/* <Grid container spacing={3}>
            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/ifykklPqqxg?si=AMCgomt-rIGPfYu3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Bd89RijKF9I?si=d4g0xoBkujeVX_BY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/pjR3wIGOZsc?si=PnA_FOQh9G2iVRwy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/GjfjqfqDzCg?si=risPgT5snaMnKhoB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
      {/* <ProgressBarBox title="Income" value={60} />
      <ProgressBarBox title="Expense" value={30} />
      <ProgressBarBox title="Savings" value={90} /> */}
    {/* </Grid> */} 
</Grid>
<br /><br />

               {/* Recent Deposits */}
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}
              {/* Recent Orders */}
              <Grid item xs={12}>
                {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> */}
                  <YourComponent />
                {/* </Paper> */}
              </Grid>
            </Grid>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}