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
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import heroImg_3 from "../media/img_3.jpeg";
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
// import RetirementSavings from './RetirementSavings';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const retirementSavingsProgress = 65;
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "25px",
    color: "#000336",
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
const InvestmentsBox = () => (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6">Total Investments</Typography>
      <Typography variant="h4">$120,000</Typography>
      <Typography variant="subtitle1">+ $120 (0.1%)</Typography>
      {/* Options to choose from */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div>
          <Typography variant="subtitle2">1 Day</Typography>
        </div>
        <div>
          <Typography variant="subtitle2">1 Month</Typography>
        </div>
        <div>
          <Typography variant="subtitle2">1 Year</Typography>
        </div>
      </div>
      {/* Chart (replace with your actual chart component) */}
      <div style={{ marginTop: '20px', width: '100%', height: '150px', backgroundColor: '#f0f0f0' }}>
        {/* Replace this div with your actual chart component */}
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Chart Placeholder
        </div>
      </div>
    </Paper>
  );
  
  // Component for the second box
  const EquityMarketsBox = () => (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">Equity Markets</Typography>
      <Typography variant="subtitle1">BSE Sensex: 40,000</Typography>
      <Typography variant="subtitle1">Dow Jones: 35,000</Typography>
      <Typography variant="subtitle1">Nasdaq: 15,000</Typography>
      {/* Include date and increase values here */}
    </Paper>
  );
  
  // Component for the third box
  const CreditScoreBox = () => (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6">Credit Score Rating</Typography>
      {/* Circular Progress Bar */}
      <CircularProgress variant="determinate" value={75} size={80} />
      {/* Display the percentage in the center of the circular progress bar */}
      <Typography variant="h5" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        75%
      </Typography>
    </Paper>
  );
  
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

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ backgroundColor: "#fff", boxShadow: 'none' }}>
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
        }}
      >
        <MenuIcon />
      </IconButton>

    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '40px', padding: '8px' }}>
  {/* User profile image */}
  <img
    src={heroImg_3}
    alt="User Profile"
    style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '10px' }}
  />
  
  {/* Settings button */}
  <IconButton >

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
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
             
            <Grid item xs={12} md={8} lg={9}>
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '16px', // Adjust the value as needed for more or less curvature
    }}
  >
    {/* Left side content */}
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={7 }>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold'}}>
        👋  Hello Ramesh 
        </Typography>
        <Typography variant="body1" sx={{color:"#748AAB", paddingLeft:"20px"}}>
          Check your expenses and investments
        </Typography>
      </Grid>

      {/* Right side content */}
      <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button variant="contained"  sx={{ width: '100%', backgroundColor: '#0066FF', color: '#fff', mb: { xs: 1, md: 2 } ,mt:{xs:0, md:2}  }}>
        Plan your retirement
        </Button>
        <Button variant="contained"  sx={{ width: '100%', backgroundColor: '#0066FF', color: '#fff', mb:{xs:1, md:2} }}>
        Put your savings to work
        </Button>
      </Grid>
    </Grid>
  </Paper>
  <Title variant="h4" sx={{color: "#042A57"}}>
             Expense Tracker 
            </Title>
            <Grid container spacing={3}>
      <ProgressBarBox title="Income" value={60} />
      <ProgressBarBox title="Expense" value={30} />
      <ProgressBarBox title="Savings" value={90} />
    </Grid>
</Grid>
{/* </Grid> */}


               {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
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
              </Grid>
              </Grid>
              {/* Recent Orders */}
              {/* <Grid container spacing={3}>
    <Grid item xs={18} md={6} lg={3}>
      <InvestmentsBox />
    </Grid>
    <Grid item xs={18} md={6} lg={3}>
      <EquityMarketsBox />
    </Grid>
    <Grid item xs={18} md={6} lg={3}>
      <CreditScoreBox />
    </Grid> */}
  {/* </Grid> */}
  {/* </Grid> */}
           
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}