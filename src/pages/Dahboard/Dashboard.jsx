import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { CircularProgress, LinearProgress } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from '../../Components/listItems';
import axios from 'axios';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import GoogleTranslateComponent from '../../Components/GoogleTranslateComponent';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


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

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [expensedata, setExpensedata] = useState([])

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const result = await axios.get(`https://wixstocle.pythonanywhere.com/api/expense/`, {
      headers: { "Authorization": `Token 11c868750d92deda81638c5a9a59177bdc7ae41a` },
    });
    console.log(result.data.data);
    setExpensedata(result.data.data);
  }

  const getLabels = () => expensedata.slice(-5).map(data => data.date);

  const getData = (key) => expensedata.slice(-5).map(data => data[key]);

  const optionsexpense = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Your Expenses',
      },
    },
  };

  const dataexpense = {
    labels: getLabels(),
    datasets: [
      {
        label: 'Income',
        data: getData('income'),
        backgroundColor: 'green',
      },
      {
        label: 'Expense',
        data: getData('expense'),
        backgroundColor: 'blue',
      },
      {
        label: 'Savings',
        data: getData('savings'),
        backgroundColor: 'orange',
      },
    ],
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');

  const todayDate = `${year}-${month}-${day}`;

  const [userData, setUserData] = React.useState({
    income: '',
    savings: '',
    expense: '',
    date: todayDate,
    user: "tony@gmail.com"
  });

  const handleChangePlan = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };
  const creditscore = 87.4;

  const handlePostData = () => {
    console.log(userData);
    fetch(`https://wixstocle.pythonanywhere.com/api/expense/`, {
      method: 'POST',
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
            title: 'Successfully Saved the details',
            showConfirmButton: false,
            timer: 3000
          })
          setExpensedata([...expensedata, userData]);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: data.message,
            showConfirmButton: false,
            timer: 3000
          })
        }
      });
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
            }}
          ><GoogleTranslateComponent />
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <div style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "2rem", fontWeight: "650" }}>
                  Welcome Jenil</div>
                <div style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "1rem" }}>
                  Retire AI is the right platform to check and plan your expenses and investments</div>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Bar options={optionsexpense} data={dataexpense} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={7}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1}>
                      {/* <Grid item xs={12} style={{ marginLeft: "-1rem" }}>
                        <div style={{ textAlign: "center", marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "600" }}>Expenses History</div>
                        <div className="center-table">
                          <table>
                            <thead>
                              <tr>
                                <th style={{ width: '40%', textAlign: "left" }}>Income</th>
                                <th style={{ width: '30%', textAlign: "left" }}>Expenses</th>
                                <th style={{ width: '30%', textAlign: "left" }}>Savings</th>
                              </tr>
                            </thead>
                            <tbody>
                              {expensedata?.map((doc) => {
                                return (
                                  <tr>
                                    <td style={{ textAlign: 'left' }}>{doc?.income}</td>
                                    <td style={{ textAlign: 'left' }}>{doc?.expense}</td>
                                    <td style={{ textAlign: 'left' }}>{doc?.savings}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </Grid> */}
                      <Grid item xs={12}>
                        <Box sx={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          position: 'relative', backgroundColor: 'transparent'
                        }}>
                          <div style={{
                            fontSize: '1.35rem', fontWeight: '600', marginBottom: "1rem",
                            alignItems: "left"
                          }}>Your Credit Risks</div>

                          {/* Circular Progress Bar */}
                          <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: "35px", marginLeft: "-1em" }}>
                            <CircularProgress variant="determinate" value={creditscore} size={100} />
                            {/* Display the percentage in the center of the circular progress bar */}
                            <div
                              style={{
                                position: 'absolute',
                                top: '60%',
                                left: '60%',
                                transform: 'translate(-45%, -50%)',
                                color: '#000', // Adjust text color as needed
                                fontSize: '1.2rem', // Adjust font size as needed
                                fontWeight: 'bold', // Adjust font weight as needed
                              }}>
                              {creditscore}%
                            </div>
                          </div>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          position: 'relative', backgroundColor: 'transparent'
                        }}>
                          <div style={{
                            fontSize: '1.2rem', fontWeight: '600', marginBottom: "1rem",
                            alignItems: "center", textAlign: "center"
                          }}>We have planned your next Savings Plan for next 3 Months</div>

                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                      </Grid>
                      <Grid item xs={12}>
                        <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Income</div>
                        <TextField
                          id="income"
                          name="income"
                          color='success'
                          value={userData.income}
                          size='small'
                          onChange={(e) => handleChangePlan('income', e.target.value)}
                          sx={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Savings</div>
                        <TextField
                          id="savings"
                          name="savings"
                          color='success'
                          size='small'
                          value={userData.savings}
                          onChange={(e) => handleChangePlan('savings', e.target.value)}
                          sx={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Expense</div>
                        <TextField
                          id="expense"
                          name="expense"
                          color='success'
                          size='small'
                          value={userData.expense}
                          onChange={(e) => handleChangePlan('expense', e.target.value)}
                          sx={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button sx={{
                          width: "100%", height: "2.3rem", fontSize: "1.1rem",
                          backgroundColor: "#2196F3", boxShadow: "none", color: "white", marginTop: "0.5rem",
                          textTransform: "capitalize"
                          , "&:hover": {
                            backgroundColor: "#2196F3", boxShadow: "none", color: "white",
                            fontSize: "1.3rem", cursor: "pointer"
                          }
                        }}
                          onClick={handlePostData}>
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "1rem" }}>
                <iframe src="http://localhost:3001/react-stock-dashboard" title="Remote Page" width="100%" height="700px"></iframe>
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}