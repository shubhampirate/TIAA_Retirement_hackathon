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
import heroImg_5 from "../media/img_5.jpeg";
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
// import YourComponent from './YourComponent';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InputBase from '@mui/material/InputBase';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const FAQData = [
    {
      question: 'How can I plan for my retirement?',
      answer: 'Planning for retirement involves assessing your financial situation, setting retirement goals, and creating a savings plan. Consider consulting with a financial advisor to develop a comprehensive retirement strategy tailored to your needs and lifestyle.',
    },
    {
      question: 'What are some good investment options for retirees?',
      answer: 'Retirees may consider a mix of low-risk and income-generating investments. Bonds, dividend-paying stocks, and real estate investment trusts (REITs) are popular choices. Diversifying your investment portfolio can help manage risk and provide a steady income stream during retirement.',
    },
    {
      question: 'How can I access health aid programs?',
      answer: 'Accessing health aid programs involves understanding the healthcare services available in your area. Contact your local government health services or explore private healthcare providers. Additionally, check for government-sponsored programs that offer financial assistance for medical expenses.',
    },
    {
      question: 'Are there educational services for retirees?',
      answer: 'Yes, many educational institutions offer programs and courses specifically designed for retirees. Look into local universities, community colleges, and online learning platforms for opportunities to continue learning and pursuing new interests during retirement.',
    },
    {
      question: 'What are the tax implications of retirement withdrawals?',
      answer: 'Withdrawals from retirement accounts may have tax implications. Its crucial to understand the tax rules associated with different retirement accounts, such as 401(k)s and IRAs. Consider consulting with a tax professional to optimize your withdrawal strategy and minimize tax liabilities.',
    },
    {
      question: 'How can I protect my retirement savings from market volatility?',
      answer: 'Protecting your retirement savings from market volatility involves diversifying your investments, regularly reviewing and adjusting your portfolio, and having a long-term investment strategy. Consider consulting with a financial advisor to create a plan that aligns with your risk tolerance and financial goals.',
    },
    {
      question: 'Are there government programs for senior citizens?',
      answer: 'Yes, various government programs provide support and assistance to senior citizens. These programs may include healthcare services, financial aid, and housing assistance. Explore resources offered by federal, state, and local government agencies to determine eligibility and access available benefits.',
    },
  ];
  const FAQItem = ({ question, answer }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6">{question}</Typography>
      <Typography>{answer}</Typography>
    </Box>
  );
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

export default function Questions() {
   
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
          <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Frequently Asked Questions</Typography>
      {FAQData.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${index}`} id={`panel-${index}`}>
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
        </Box>
        </Box>
      {/* </Box> */}
    </ThemeProvider>
  );
}