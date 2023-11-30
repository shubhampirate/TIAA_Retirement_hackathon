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
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from '../../Components/listItems';
import LinearProgress from '@mui/material/LinearProgress';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Swal from 'sweetalert2';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Doctormap from '../../Hooks/Doctormap';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import App from '../../ComponentGoogle/App/App';
import GoogleTranslateComponent from '../../Components/GoogleTranslateComponent';

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
  {
    label: 'Google Fit',
    content: 'Content for finding google fit...'
  }
];

const HealthTabContent = ({ label, content }) => {
  const itemData = [
    {
      img: 'https://www.avivaindia.com/sites/default/files/Retirement.jpg',
      title: 'Breakfast',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://img.etimg.com/thumb/width-640,height-480,imgsize-1313091,resizemode-75,msid-102796114/wealth/plan/retirement-planning-how-to-save-for-your-retirement/retire-lounge.jpg',
      title: 'Burger',
    },
    {
      img: 'https://img.freepik.com/premium-photo/senior-indian-asian-couple-accounting-checking-bills-laptop-calculator-money-desk_466689-95914.jpg',
      title: 'Camera',
    },
    {
      img: 'https://www.dbs.com/in/iwov-resources/media/images/nri-hub/articles/what-is-retirement-planning-1404x630.jpg',
      title: 'Coffee',
      cols: 2,
    },
    {
      img: 'https://lifeinsurancebazaar.com/blog/wp-content/uploads/2021/08/retirementplanning.jpg',
      title: 'Hats',
      cols: 2,
    },
    {
      img: 'https://www.paisabazaar.com/wp-content/uploads/2019/07/Types-of-Financial-planning-1.jpg',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSfOr7k6T-2DZR_CGAMwifLwWK1D09rs-wR_TjLzuXwu71gt7kKElPNFPB994mE66O_HY&usqp=CAU',
      title: 'Basketball',
      cols: 2
    },
  ];

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  const [userData, setUserData] = useState(
    {
      age: '52',
      sum: '45000',
      history: 'No',
      coverage: 'Family',
      duration: '5 years',
      med_history: "None",
      hospital: 'Yes',
      volunteer: "None",
      plan: 'Comprehensive'
    }
  );

  const handleChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const insurancePlans = [
    { name: 'HealthGuard Gold', premium: 1500, rating: 4.5 },
    { name: 'CareShield Plus', premium: 1800, rating: 4.0 },
    { name: 'LifeSaver Pro', premium: 2000, rating: 4.2 },
    { name: 'Wellness Assurance', premium: 1200, rating: 4.8 },
    { name: 'SecureLife Plus', premium: 1600, rating: 3.5 },
    { name: 'MediCare Elite', premium: 1900, rating: 4.0 },
    { name: 'GuardianHealth Platinum', premium: 1700, rating: 4.7 },
    { name: 'FamilyCare Deluxe', premium: 2200, rating: 4.2 },
    { name: 'FutureWell Assurance', premium: 1400, rating: 4.6 },
    { name: 'SeniorCare Gold', premium: 2000, rating: 4.3 },
    { name: 'CarePlus Ultra', premium: 2500, rating: 4.9 },
    { name: 'WellBeing Premier', premium: 1800, rating: 4.5 },
    { name: 'GuardianSecure Platinum', premium: 2100, rating: 4.3 },
    { name: 'LifeGuardian Supreme', premium: 2300, rating: 4.7 },
    { name: 'FamilyWell Complete', premium: 2400, rating: 4.0 },
    { name: 'MediProtect Elite', premium: 2000, rating: 4.6 },
    { name: 'SeniorShield Gold', premium: 2200, rating: 4.2 },
    { name: 'FutureCare Pro', premium: 1900, rating: 4.8 },
    { name: 'GuardianLife Secure', premium: 2600, rating: 4.5 },
    { name: 'HealthAssure Prime', premium: 1700, rating: 4.4 },
  ];


  const [randomPlans, setRandomPlans] = useState([]);
  const [show, setShow] = useState(false);
  const getRandomPlans = () => {
    // Shuffle the array to get a random order
    const shuffledPlans = insurancePlans.sort(() => Math.random() - 0.5);
    const randomPlans = shuffledPlans.slice(0, 5);
    return randomPlans;
  };

  const handleButtonClick = () => {
    setRandomPlans(getRandomPlans());
    console.log(randomPlans);
    setShow(true);
  };

  return (
    <Box>
      <Grid container spacing={2} style={{ paddingTop: "1rem" }}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} style={{ paddingLeft: "0.75rem" }}>
            <Grid item xs={12}>
              <div style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "1.75rem", fontWeight: "650" }}>
                Allow us to assist you in discovering the optimal retirement health claim</div>
            </Grid>
            <Grid item xs={12} md={6} >
              <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Age of the Insured</div>
              <TextField
                id="age"
                name="age"
                color='success'
                value={userData.age}
                size='small'
                onChange={(e) => handleChange('age', e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Sum Insured</div>
              <TextField
                id="sum"
                name="sum"
                color='success'
                size='small'
                value={userData.sum}
                onChange={(e) => handleChange('sum', e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Any Pre-existing Medical Conditions</div>
              <TextField
                id="history"
                name="history"
                color='success'
                size='small'
                value={userData.history}
                onChange={(e) => handleChange('history', e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Coverage Type</div>
              <TextField
                id="coverage"
                type='coverage'
                name="coverage"
                size='small'
                color='success'
                value={userData.coverage}
                onChange={(e) => handleChange('coverage', e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Covergae Duration</div>
              <TextField
                id="duration"
                name="duration"
                color='success'
                size='small'
                value={userData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Medical History Details</div>
              <TextField
                id="med_history"
                name="med_history"
                color='success'
                size='small'
                value={userData.med_history}
                onChange={(e) => handleChange('med_history', e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Preffered Hospital Network</div>
              <TextField
                id="hospital"
                name="hospital"
                color='success'
                size='small'
                value={userData.hospital}
                onChange={(e) => handleChange('hospital', e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Voluntary Deductibles</div>
              <TextField
                id="volunteer"
                name="volunteer"
                color='success'
                size='small'
                value={userData.volunteer}
                onChange={(e) => handleChange('volunteer', e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Type of Plan</div>
              <TextField
                id="plan"
                name="plan"
                color='success'
                size='small'
                value={userData.plan}
                onChange={(e) => handleChange('plan', e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" type="submit"
                sx={{
                  width: "100%", height: "2.6rem", fontSize: "1.1rem",
                  backgroundColor: "#2196F3", boxShadow: "none", color: "white", marginTop: "1.1rem",
                  textTransform: "capitalize"
                  , "&:hover": {
                    backgroundColor: "#2196F3", boxShadow: "none", color: "white",
                    fontSize: "1.3rem", cursor: "pointer"
                  }
                }} onClick={handleButtonClick} >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} style={{ paddingRight: "1rem" }}>
          <div style={{
            textAlign: "left", marginBottom: "2rem", fontSize: "1.2rem", marginTop: "2rem",
            fontWeight: "500", marginLeft: "0.6rem"
          }}>
            Your next Health Insurance can be valued at ₹ 15204.5</div>
          <div style={{ textAlign: "center", marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "600" }}>Health Insurance Polcies</div>
          <div className="center-table">
            <table>
              {show ? <>
                <thead>
                  <tr>
                    <th style={{ width: '40%', textAlign: "left" }}>Health Insurance</th>
                    <th style={{ width: '30%', textAlign: "left" }}>Premium</th>
                    <th style={{ width: '30%', textAlign: "left" }}>Ratings</th>
                  </tr>
                </thead></> : <></>}
              <tbody>
                {randomPlans?.map((doc) => {
                  return (
                    <tr>
                      <td style={{ textAlign: 'left' }}>{doc?.name}</td>
                      <td style={{ textAlign: 'left' }}>₹ {doc?.premium}</td>
                      <td style={{ textAlign: 'left' }}>{doc?.rating}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <ImageList
            sx={{ width: "98%", height: 610, marginLeft: "0.5rem" }}
            variant="quilted"
            cols={4}
            rowHeight={145}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                <img
                  style={{ borderRadius: "2%", width: "100%", height: "99%", objectFit: "cover" }}
                  {...srcset(item.img, 145, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid> */}
      </Grid>
    </Box>)

}

const CalculateMediclaimTabContent = ({ label, content }) => {
  const [roomCharges, setRoomCharges] = useState(0);
  const [doctorCharges, setDoctorCharges] = useState(0);
  const [bills, setBills] = useState([]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [roomChargesDeduction, setRoomChargesDeduction] = useState(0);
  const [doctorChargesDeduction, setDoctorChargesDeduction] = useState(0);
  const [calculations, setCalculations] = useState([]);
  const [show, setShow] = useState(false);

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

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const result = await axios.get(`https://wixstocle.pythonanywhere.com/api/mediclaim/`, {
      headers: { "Authorization": `Token 11c868750d92deda81638c5a9a59177bdc7ae41a` },
    });
    console.log(result.data.data);
    setCalculations(result.data.data);
    setShow(true);

    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/cxllin/Llama2-7b-Finance",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    }

    // Assuming you are calling this function inside a React component or useEffect
    async function fetchData() {
      try {
        const response = await query({ "inputs": "Can you please let us know more details about your " });
        console.log(JSON.stringify(response));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }

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

    handleEdit(roomCharges, doctorCharges, totalBillamount, finalAmount.toFixed(2));

    setFinalAmount(finalAmount);


  };


  const handleEdit = async (roomCharges, doctorCharges, totalBillamount, finalAmount) => {
    fetch(`https://wixstocle.pythonanywhere.com/api/mediclaim/`, {
      method: 'POST',
      headers: {
        "Authorization": `Token 11c868750d92deda81638c5a9a59177bdc7ae41a`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "doctor_charges": doctorCharges,
        "room_charges": roomCharges,
        "bill_amount": totalBillamount,
        "final_amount": finalAmount,
        "user": "tony@gmail.com"
      }),
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

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h5" mb={2}>{label}</Typography>

      {/* Hospital room charges */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <div style={{ textAlign: "center", marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "600" }}>Transactions History</div>
          <div className="center-table">
            <table>
              {show ? <><thead>
                <tr>
                  <th style={{ width: '4%', textAlign: "left" }}>Sr.No</th>
                  <th style={{ width: '24%', textAlign: "left" }}>Room Charges</th>
                  <th style={{ width: '24%', textAlign: "left" }}>Doctor Charges</th>
                  <th style={{ width: '24%', textAlign: "left" }}>Bill Amount</th>
                  <th style={{ width: '24%', textAlign: "left" }}>Final Amount</th>
                </tr>
              </thead></> : <></>}
              <tbody>
                {calculations?.map((doc) => {
                  return (
                    <tr>
                      <td style={{ textAlign: 'left' }}>{doc?.id}</td>
                      <td style={{ textAlign: 'left' }}>₹ {doc?.room_charges}</td>
                      <td style={{ textAlign: 'left' }}>₹ {doc?.doctor_charges}</td>
                      <td style={{ textAlign: 'left' }}>₹ {doc?.bill_amount}</td>
                      <td style={{ textAlign: 'left' }}>₹ {doc?.final_amount}</td>
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
                <Grid item xs={12}>
                  <div style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "2rem", fontWeight: "650" }}>
                    We'll help calculate your medical claim.</div>
                </Grid>
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
                  <div style={{ textAlign: "left", marginBottom: "0.5rem" }}>15% of Health Insurance</div>
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
                  <div style={{ textAlign: "left", marginBottom: "0.5rem" }}>25% Deduction</div>
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
                    size='small'
                    sx={{
                      backgroundColor: "#387FF5", color: "white", textDecoration: "none",
                      padding: "10px 20px", width: "100%", height: "2.5rem"
                    }}
                  >Calculate </Button>
                </Grid>
                <Grid item xs={8}>
                  <div style={{ textAlign: 'left', marginBottom: '0.5rem', marginTop: "0.5rem" }}>
                    Your Final Amount is ₹ {finalAmount.toFixed(2)}<br />
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
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                  backgroundColor: "#fff"
                }}>
                <MenuIcon />
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
            }}><GoogleTranslateComponent />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
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

          }}>
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
                  topic.label === 'Google Fit' ? (
                    <App />
                  ) :
                    <HealthTabContent key={index} label={topic.label} content={topic.content} />
                )))
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}