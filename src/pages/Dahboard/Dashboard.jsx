import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {
  LinearProgress, ListItem, CircularProgress, Checkbox, ListItemText, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, ListItemIcon, ListItemButton
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from '../../Components/listItems';
import axios from 'axios';
import Button from '@mui/material/Button';
import CommentIcon from '@mui/icons-material/Comment';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import GoogleTranslateComponent from '../../Components/GoogleTranslateComponent';
import csacc from "../../media/csacc.png"
import creditscoremodel from "../../media/creditscoremodel.png"
import creditflow from "../../media/creditflowchart.png"
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

var currentDate = new Date();

// Define months array
var months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Format date
var formattedDate = months[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear();

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
    indexAxis: 'x',
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
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      }
    },
  };

  const dataexpense = {
    labels: getLabels(),
    datasets: [
      {
        label: 'Revenue',
        data: getData('income'),
        backgroundColor: '#2196f3',
      },
      {
        label: 'Spendings',
        data: getData('expense'),
        backgroundColor: '#ff9100',
      },
      {
        label: 'Savings',
        data: getData('savings'),
        backgroundColor: '#00e676',
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

  const data = [
    { id: 0, value: 12500, label: 'Car Servicing', color: '#03a9f4' },
    { id: 1, value: 13520, label: 'Travelling', color: "#3d5afe" },
    { id: 2, value: 25250, label: 'Daily Essentials', color: "#008394" },
    { id: 3, value: 35480, label: 'Rentals', color: "#00e676" },
    { id: 4, value: 10050, label: 'Cinema', color: "#ff9100" },
    { id: 5, value: 47025, label: 'Personal', color: "#d32f2f" },
  ];

  const size = {
    width: 400,
    height: 200,
  };

  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 18,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const [openDia, setOpenDia] = useState(false);
  const handleClickOpenDia = () => { setOpenDia(true); };
  const handleCloseDia = () => { setOpenDia(false); };


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
          <Grid container spacing={2} marginTop="0.02rem" paddingLeft={3} paddingRight={2}>
            <Grid item xs={12}>
              <div style={{ fontSize: "2rem", fontWeight: "500" }}>Welcome Jenil</div>
            </Grid>
            <Grid item xs={12} marginTop="-0.5rem">
              <div>See your activities - {formattedDate} </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop="1rem" paddingLeft={5} paddingRight={2}>
            <Grid item xs={12} md={3} style={{ backgroundColor: "white", padding: "10px", marginRight: "15px", borderRadius: "0.5rem" }}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={5}><div>Total Revenue</div></Grid>
                  <Grid item xs={4}><TrendingUpIcon sx={{ color: "#2196f3" }} /></Grid>
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress variant="determinate" value={70} sx={{ color: "#2196f3", borderRadius: "10%", margin: "12px 10px 12px 0px" }} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={5}>
                      {!loadList ? <><div style={{ fontSize: "1.5rem", fontWeight: "550" }}>
                        ₹ {expensedata[0].income + expensedata[1].income + expensedata[2].income + expensedata[3].income + expensedata[4].income + expensedata[5].income}</div>
                      </> : <div style={{ fontSize: "1.5rem", fontWeight: "550" }}>₹ 714230</div>}
                    </Grid>
                    <Grid item xs={3.5} style={{ backgroundColor: "#2196f3", color: "white", borderRadius: "5px", height: "1.65rem" }}>
                      <ArrowDropUpIcon /> <sup>+3.17%</sup>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} style={{ backgroundColor: "white", padding: "10px", marginRight: "15px", borderRadius: "0.5rem" }}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}><div>Total Spendings</div></Grid>
                  <Grid item xs={4}><TrendingDownIcon sx={{ color: "#ff9100" }} /></Grid>
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress variant="determinate" value={70} color='warning' sx={{ borderRadius: "10%", margin: "12px 0px" }} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={5}>
                      {!loadList ? <><div style={{ fontSize: "1.5rem", fontWeight: "550" }}>
                        ₹ {expensedata[0].income + expensedata[1].income + expensedata[2].income + expensedata[3].income + expensedata[4].income + expensedata[5].income}</div>
                      </> : <div style={{ fontSize: "1.5rem", fontWeight: "550" }}>₹ 235710</div>}
                    </Grid>
                    <Grid item xs={3.5} style={{ backgroundColor: "#ff9100", color: "white", borderRadius: "5px", height: "1.65rem" }}>
                      <ArrowDropDownIcon /> <sup>+3.17%</sup>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} style={{ backgroundColor: "white", padding: "10px", marginRight: "15px", borderRadius: "0.5rem" }}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={5}><div>Total Savings</div></Grid>
                  <Grid item xs={4}><TrendingUpIcon sx={{ color: "#00e676" }} /></Grid>
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress variant="determinate" value={70} color="success" style={{ borderRadius: "10%", margin: "12px 0px" }} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={5}>
                      {!loadList ? <><div style={{ fontSize: "1.5rem", fontWeight: "550" }}>
                        ₹ {expensedata[0].income + expensedata[1].income + expensedata[2].income + expensedata[3].income + expensedata[4].income + expensedata[5].income}</div>
                      </> : <div style={{ fontSize: "1.5rem", fontWeight: "550" }}>₹ 105030</div>}
                    </Grid>
                    <Grid item xs={3.5} style={{ backgroundColor: "#00e676", borderRadius: "5px", height: "1.65rem" }}>
                      <ArrowDropUpIcon /> <sup>+5.03%</sup>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2.5} style={{ backgroundColor: "white", padding: "10px", borderRadius: "0.5rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>Today's Savings Deal</Grid>
                <Grid item xs={12}>
                  <LinearProgress variant="determinate" value={0} color='secondary' sx={{ borderRadius: "10%", margin: "3px 0px" }} />
                </Grid>
                <Grid item xs={12} sx={{ fontWeight: "550", marginTop: "-10px" }}>Buy Doctor Shoes from Amazon and save over <br />₹ 1500</Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop="1rem" paddingLeft={5} paddingRight={2} marginBottom={2}>
            <Grid item xs={7} sx={{ backgroundColor: "white", padding: "5px", marginRight: "1rem" }}>
              <Grid container spacing={2} padding={1}>
                <Grid xs={7}></Grid>
                <Grid xs={1.5}><Button style={{
                  borderColor: "#2196f3", color: "#2196f3", height: "1.5rem", textTransform: "capitalize",
                  fontSize: "0.9rem", border: "2px solid", textAlign: "left"
                }}>Week</Button></Grid>
                <Grid xs={1.5}><Button style={{
                  backgroundColor: "#2196f3", color: "white", height: "1.75rem", textTransform: "capitalize",
                  fontSize: "0.9rem", border: "2px solid", textAlign: "left"
                }}>Month</Button></Grid>
                <Grid xs={1}><Button style={{
                  borderColor: "#2196f3", color: "#2196f3", height: "1.5rem", textTransform: "capitalize",
                  fontSize: "0.9rem", border: "2px solid", textAlign: "left"
                }}>Year</Button></Grid>
                <Grid xs={12} marginTop={2}>
                  <Bar options={optionsexpense} data={dataexpense} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4.75} onClick={handleClickOpenDia}>
              <Grid container spacing={2} >
                <Grid item xs={5.5} style={{ marginRight: "1.2rem" }}>
                  <Grid container spacing={2} sx={{ backgroundColor: "white", marginBottom: "0.5rem" }}>
                    <Grid item xs={12} style={{
                      textAlign: "center", marginLeft: "-0.75rem",
                      fontWeight: "600", fontSize: "1.25rem"
                    }}>Credit Score</Grid>
                    <Grid item xs={12} style={{ marginLeft: "2.75rem", marginBottom: "4.8rem" }}>
                      <CircularProgress variant="determinate" value={creditscore} size={105} color='warning' />
                      <div style={{ marginLeft: "1.6rem", marginTop: "-4.5rem", fontSize: "1.15rem" }}> {creditscore} %
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2} sx={{ backgroundColor: "white", marginBottom: "0.5rem" }}>
                    <Grid item xs={12} style={{ textAlign: "center", marginLeft: "-0.75rem", fontWeight: "600" }}>Today's Events</Grid>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {[0, 1, 2].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;
                        return (
                          <ListItem
                            key={value}
                            secondaryAction={
                              <IconButton edge="end" aria-label="comments">
                                <CommentIcon />
                              </IconButton>
                            }
                            disablePadding
                          >
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} style={{ marginLeft: "-0.75rem" }} primary={`Scheduled Event ${value + 1}`} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ backgroundColor: "white", padding: "1rem" }}>
                  <PieChart series={[{ data, innerRadius: 80 }]} slotProps={{
                    legend: {
                      labelStyle: {
                        fontSize: 11,
                      },
                    },
                  }} {...size}>
                    <PieCenterLabel sx={{ fontSize: "0.5rem" }}>Spendings</PieCenterLabel>
                  </PieChart>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "1rem", overflow: "hidden", height: "620px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ marginTop: "-10rem", }}>
                <iframe src="https://telerik.github.io/kendo-react-finance-portfolio/#/stocks"
                  title="Remote Page"
                  style={{ position: "relative", width: "100%", height: "810px", overflow: "hidden" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Dialog
            open={openDia}
            maxWidth="lg"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
              {"Credit Score Model"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={4.5}>
                        <img src={creditflow} style={{ height: "18rem", marginTop: "7rem" }} />
                      </Grid>
                      <Grid item xs={1.5}>
                        <img src={csacc} style={{ height: "32rem" }} />
                      </Grid>
                      <Grid item xs={6}>
                        <img src={creditscoremodel} style={{ width: "35rem", height: "32rem" }} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDia}>Close</Button>
            </DialogActions>
          </Dialog>
          {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                      <Grid item xs={12}>
                        <Box sx={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          position: 'relative', backgroundColor: 'transparent'
                        }}>
                          <div style={{
                            fontSize: '1.35rem', fontWeight: '600', marginBottom: "1rem",
                            alignItems: "left"
                          }}>Your Credit Risks</div>
                          <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: "35px", marginLeft: "-1em" }}>
                            <CircularProgress variant="determinate" value={creditscore} size={100} />
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
                          }}>We have planned your next Savings Plan</div>
                          <div style={{
                            fontSize: '1rem', fontWeight: '500', marginBottom: "1rem",
                            alignItems: "center", textAlign: "center"
                          }}>Choosing a furniture set from IKEA instead of Pepperfry.com could have resulted in an extra 15% in savings on their overall expenses.</div>
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
              <Grid item xs={12} style={{ marginTop: "1rem", overflow: "hidden", height: "620px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ marginTop: "-10rem", }}>
                    <iframe src="https://telerik.github.io/kendo-react-finance-portfolio/#/stocks"
                      title="Remote Page"
                      style={{ position: "relative", width: "100%", height: "800px", overflow: "hidden" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container> */}
        </Box>
      </Box >
    </ThemeProvider >
  );
}