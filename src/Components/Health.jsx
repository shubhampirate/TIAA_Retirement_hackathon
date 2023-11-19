// import * as React from 'react';
import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SettingsIcon from '@mui/icons-material/Settings';
import { mainListItems } from './listItems';
import heroImg_4 from "../media/img_4.jpeg";
import LinearProgress from '@mui/material/LinearProgress';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Doctormap from '../Hooks/Doctormap';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const healthTopics = [
  {
    label: 'Calculate Health Insurance',
    content: 'Content for calculating health insurance...',
  },
  {
    label: 'Mediclaim Coverage',
    content: 'Content for determining mediclaim coverage...',
  },
  {
    label: 'Find Nearby Hospitals',
    content: 'Content for finding nearby hospitals...',
  },
];

const HealthTabContent = ({ label, content }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5" mb={2}>{label}</Typography>
    <Typography>{content}</Typography>
  </Box>
);
const CalculateMediclaimTabContent = ({ label, content }) => {
  const [roomCharges, setRoomCharges] = useState(0);
  const [doctorCharges, setDoctorCharges] = useState(0);
  const [bills, setBills] = useState([]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [roomChargesDeduction, setRoomChargesDeduction] = useState(0);
  const [doctorChargesDeduction, setDoctorChargesDeduction] = useState(0);
  const [savedAmount, setSaveAmount] = useState(0);
  const [calculations, setCalculations] = useState([]);
  const [calculationId, setCalculationId] = useState(1);

  const handleAddBill = () => {
    setBills([...bills, { amount: 0, pdf: null }]);
  };

  const handleDeleteBill = (index) => {
    const updatedBills = [...bills];
    updatedBills.splice(index, 1);
    setBills(updatedBills);
  };


  const handleBillAmountChange = (index, amount) => {
    const updatedBills = [...bills];
    updatedBills[index].amount = parseFloat(amount) || 0;
    setBills(updatedBills);
  };

  const handlePdfUpload = (index, file) => {
    const updatedBills = [...bills];
    updatedBills[index].pdf = file;
    setBills(updatedBills);
  };

  const handleCalculate = () => {

    const roomChargesValue = parseFloat(roomCharges);
    const doctorChargesValue = parseFloat(doctorCharges);
    const healthinsurance = 500000;

    const total = roomChargesValue + doctorChargesValue;
    const totalBills = total + bills.reduce((total, bill) => total + bill.amount, 0)

    const totalBillamount = bills.reduce((total, bill) => total + bill.amount, 0)

    setRoomChargesDeduction((15 / 100) * healthinsurance);
    setDoctorChargesDeduction((25 / 100) * healthinsurance)

    // Check if room charges exceed 15%
    const roomChargesExceed = roomCharges > roomChargesDeduction;
    // Check if doctor charges exceed 25%
    const doctorChargesExceed = doctorCharges > doctorChargesDeduction;

    // Calculate surplus amounts for room charges and doctor charges
    const roomChargesSurplus = roomChargesExceed ? roomCharges - roomChargesDeduction : 0;
    const doctorChargesSurplus = doctorChargesExceed ? doctorCharges - doctorChargesDeduction : 0;

    // Deduct surplus amounts from the total bills
    const finalAmount = totalBills - roomChargesSurplus - doctorChargesSurplus;

    setSaveAmount(roomChargesDeduction + doctorChargesDeduction);

    const calculationDetails = {
      id: calculationId,
      roomCharges,
      doctorCharges,
      totalBillamount,
      finalAmount: finalAmount.toFixed(2),
    };

    setCalculations([...calculations, calculationDetails]);
    setCalculationId(calculationId + 1);

    // You can use the calculated values as needed, such as displaying them or further processing.
    console.log("Total Room and Doctor Charges:", total);
    console.log("Total Bills:", totalBills);
    console.log("Room Charges Surplus Deduction:", roomChargesSurplus);
    console.log("Doctor Charges Surplus Deduction:", doctorChargesSurplus);
    console.log("Final Amount after Deductions:", finalAmount);
    setFinalAmount(finalAmount);


  };

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h5" mb={2}>{label}</Typography>

      {/* Hospital room charges */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>Transactions History</div>
          <div className="center-table">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '4%', textAlign: "left" }}>Sr.No</th>
                  <th style={{ width: '24%', textAlign: "left" }}>Room Charges</th>
                  <th style={{ width: '24%', textAlign: "left" }}>Doctor Charges</th>
                  <th style={{ width: '24%', textAlign: "left" }}>Bill Amount</th>
                  <th style={{ width: '24%', textAlign: "left" }}>Final Amount</th>
                </tr>
              </thead>
              <tbody>
                {calculations?.map((doc) => {
                  return (
                    <tr>
                      <td style={{ textAlign: 'left' }}>{doc?.id}</td>
                      <td style={{ textAlign: 'left' }}>{doc?.roomCharges}</td>
                      <td style={{ textAlign: 'left' }}>{doc?.doctorCharges}</td>
                      <td style={{ textAlign: 'left' }}>{doc?.totalBillamount}</td>
                      <td style={{ textAlign: 'left' }}>{doc?.finalAmount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={7}>
                  <div style={{ textAlign: "left", marginBottom: "0.5rem" }}>Hospital Room Charges</div>
                  <TextField
                    type="text"
                    value={roomCharges}
                    size='small'
                    sx={{ height: "50%", width: "100%" }}
                    onChange={(e) => setRoomCharges(e.target.value)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <div style={{ textAlign: "left", marginBottom: "0.5rem" }}>After 15% Deduction</div>
                  <TextField
                    disabled
                    size='small'
                    value={(roomChargesDeduction).toFixed(2)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={7}>
                  <div style={{ textAlign: "left", marginBottom: "0.5rem" }}>Doctor Charges</div>
                  <TextField
                    type="text"
                    value={doctorCharges}
                    size='small'
                    onChange={(e) => setDoctorCharges(e.target.value)}
                    sx={{ height: "50%", width: "100%" }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <div style={{ textAlign: "left", marginBottom: "0.5rem" }}>After 25% Deduction</div>
                  <TextField
                    disabled
                    size='small'
                    value={(doctorChargesDeduction).toFixed(2)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Billing Transactions /
                <span onClick={handleAddBill} style={{ cursor: "pointer" }}>Add Bills</span></div>
              <Grid container spacing={2} alignItems="center">
                {bills.map((bill, index) => (
                  <Grid item xs={12} key={index}>
                    <Grid container spacing={1}>
                      <Grid item xs={8}>
                        <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>{`Bill ${index + 1} Amount:`}</div>
                        <TextField
                          type="number"
                          value={bill.amount}
                          size='small'
                          onChange={(e) => handleBillAmountChange(index, e.target.value)}
                          sx={{ height: '50%', width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={1} style={{ marginTop: '2rem' }}>
                        <UploadFileIcon
                          sx={{ fontSize: 35, cursor: 'pointer' }}
                          type="file"
                          size='small'
                          accept=".pdf"
                          onChange={(e) => handlePdfUpload(index, e.target.files[0])}
                        />
                      </Grid>
                      <Grid item xs={1} style={{ marginTop: '2rem' }}>
                        <DeleteIcon sx={{ fontSize: 35, cursor: 'pointer' }} onClick={() => handleDeleteBill(index)} />
                      </Grid>
                      <Grid item xs={1} style={{ marginTop: '2rem' }}>
                        <NoteAddIcon sx={{ fontSize: 35, cursor: 'pointer' }} onClick={handleAddBill} />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Button onClick={handleCalculate}
                    sx={{ backgroundColor: "#387FF5", color: "white", textDecoration: "none", padding: "10px 20px", width: "100%" }}
                  >Calculate </Button>
                </Grid>
                <Grid item xs={8}>
                  <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                    Your Final Amount is ₹ {finalAmount.toFixed(2)}<br />
                    You have Saved ₹ {savedAmount.toFixed(2)}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box >
  );
};

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

  const [open, setOpen] = React.useState(true);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
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

          {isSmallScreen ? (
            <Tabs value={selectedTabIndex} onChange={handleTabChange} centered>
              {healthTopics.map((topic, index) => (
                <Tab key={index} label={topic.label} />
              ))}
            </Tabs>
          ) : (
            <Tabs value={selectedTabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
              {healthTopics.map((topic, index) => (
                <Tab key={index} label={topic.label} />
              ))}
            </Tabs>
          )}
          {/* Health-related content based on the selected tab */}
          {healthTopics.map((topic, index) => (
            selectedTabIndex === index && (
              topic.label === 'Mediclaim Coverage' ? (
                <CalculateMediclaimTabContent key={index} />
              ) : (
                topic.label === 'Find Nearby Hospitals' ? (
                  <Doctormap key={index} />
                ) : (
                  <HealthTabContent key={index} label={topic.label} content={topic.content} />
                )
              )
            )
          ))}

        </Box>
      </Box>
      {/* </Box> */}
    </ThemeProvider>
  );
}