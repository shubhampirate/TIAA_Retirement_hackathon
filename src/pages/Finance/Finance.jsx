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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from '../../Components/listItems';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import useAlan from '../../Hooks/useAlan';
import Swal from 'sweetalert2';
import { Bar, Line } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip, PointElement, LineElement } from "chart.js";
import GoogleTranslateComponent from '../../Components/GoogleTranslateComponent';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement,);

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

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Questions() {

    useAlan()
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [loadList, setLoadlist] = useState([]);
    const [userData, setUserData] = useState(
        {
            years: '',
            current_savings: '',
            annual_expense: '',
            return_on_investments: '',
            inflation_rate: 0.03,
            other_earnings: ''
        }
    );

    const handleChangeplan = (field, value) => {
        setUserData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        console.log(userData)
    };

    const handlePost = async () => {
        console.log(userData)
        fetch(`https://wixstocle.pythonanywhere.com/api/retirement-simulation/`, {
            method: 'POST',
            body: userData,
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
            });
    }

    const options = {
        indexAxis: 'y',
        scales: {
            y: {
                type: 'category',
                labels: ["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12", "Y13", "Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Y20", "Y21", "Y22", "Y23", "Y24", "Y25", "Y26", "Y27", "Y28", "Y29", "Y30"],
            },
            x: {
                beginAtZero: 200000,
            },
        },
        elements: {
            bar: {
                borderWidth: 1,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Expenses and Savings Plannings',
            },
        },
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Expenses and Savings Plannings',
            },
        },
        scales: {
            y: {
                beginAtZero: 200000,
            },
        },

    }

    const data = {
        labels: ["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12", "Y13", "Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Y20", "Y21", "Y22", "Y23", "Y24", "Y25", "Y26", "Y27", "Y28", "Y29", "Y30"],
        datasets: [
            {
                label: "Savings",
                data: [
                    510000,
                    532466.2109017865,
                    539595.7785645849,
                    567320.7764702336,
                    622234.8257534944,
                    630802.4261408155,
                    638735.8688690985,
                    703849.49463113,
                    750571.5681525709,
                    755819.0913117252,
                    798148.2072253925,
                    804099.8730832142,
                    808754.7631308425,
                    840673.2978872135,
                    783814.8580287842,
                    732276.835867506,
                    720728.7552522883,
                    690188.8998546766,
                    701954.968428858,
                    670140.6225854029,
                    617588.1313725417,
                    650193.5258637524,
                    631228.8276522056,
                    617539.5374462927,
                    553989.8101379207,
                    510558.5498554405,
                    478182.37796665484,
                    409629.81324670685,
                    366770.54299649183,
                    298170.1481334547
                ],
                borderColor: "green",
                backgroundColor: "green",
            },
            {
                label: 'Expenses',
                data: [
                    0,
                    41200,
                    42436,
                    43709.08,
                    45020.3524,
                    46370.962972,
                    47762.09186116001,
                    49194.95461699481,
                    50670.80325550465,
                    52190.9273531698,
                    53756.65517376489,
                    55369.354828977834,
                    57030.435473847174,
                    58741.34853806259,
                    60503.588994204474,
                    62318.696664030605,
                    64188.25756395153,
                    66113.90529087007,
                    68097.32244959618,
                    70140.24212308407,
                    72244.4493867766,
                    74411.78286837989,
                    76644.13635443129,
                    78943.46044506424,
                    81311.76425841617,
                    83751.11718616865,
                    86263.65070175371,
                    88851.56022280632,
                    91517.10702949051,
                    94262.62024037524
                ],
                borderColor: "blue",
                backgroundColor: 'blue',
            },
        ],
    };

    const calculations = [
        { id: 1, savings: 510000, expenses: 0 },
        { id: 2, savings: 532466.2109017865, expenses: 41200 },
        { id: 3, savings: 539595.7785645849, expenses: 42436 },
        { id: 4, savings: 567320.7764702336, expenses: 43709.08 },
        { id: 5, savings: 622234.8257534944, expenses: 45020.3524 },
        { id: 6, savings: 630802.4261408155, expenses: 46370.962972 },
        { id: 7, savings: 638735.8688690985, expenses: 47762.09186116001 },
        { id: 8, savings: 703849.49463113, expenses: 49194.95461699481 },
        { id: 9, savings: 750571.5681525709, expenses: 50670.80325550465 },
        { id: 10, savings: 755819.0913117252, expenses: 52190.9273531698 },
        { id: 11, savings: 798148.2072253925, expenses: 53756.65517376489 },
        { id: 12, savings: 804099.8730832142, expenses: 55369.354828977834 },
        { id: 13, savings: 808754.7631308425, expenses: 57030.435473847174 },
        { id: 14, savings: 840673.2978872135, expenses: 58741.34853806259 },
        { id: 15, savings: 783814.8580287842, expenses: 60503.588994204474 },
        { id: 16, savings: 732276.835867506, expenses: 62318.696664030605 },
        { id: 17, savings: 720728.7552522883, expenses: 64188.25756395153 },
        { id: 18, savings: 690188.8998546766, expenses: 66113.90529087007 },
        { id: 19, savings: 701954.968428858, expenses: 68097.32244959618 },
        { id: 20, savings: 670140.6225854029, expenses: 70140.24212308407 },
        { id: 21, savings: 617588.1313725417, expenses: 72244.4493867766 },
        { id: 22, savings: 650193.5258637524, expenses: 74411.78286837989 },
        { id: 23, savings: 631228.8276522056, expenses: 76644.13635443129 },
        { id: 24, savings: 617539.5374462927, expenses: 78943.46044506424 },
        { id: 25, savings: 553989.8101379207, expenses: 81311.76425841617 },
        { id: 26, savings: 510558.5498554405, expenses: 83751.11718616865 },
        { id: 27, savings: 478182.37796665484, expenses: 86263.65070175371 },
        { id: 28, savings: 409629.81324670685, expenses: 88851.56022280632 },
        { id: 29, savings: 366770.54299649183, expenses: 91517.10702949051 },
        { id: 30, savings: 298170.1481334547, expenses: 94262.62024037524 },
    ]


    const groupedData = [];
    for (let i = 0; i < calculations.length; i += 3) {
        groupedData.push(calculations.slice(i, i + 3));
    }

    const dataRecommmend = {
        "recommendations": {
            "AEP Adjusted": 1754.3859649122808,
            "DFSVX Adjusted": 2631.5789473684213,
            "DFLVX Adjusted": 3508.7719298245615,
            "FSAGX Adjusted": 2105.2631578947367
        },
        "return": "20.23%",
        "risk": "11.93%"
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
                                }}
                            >
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
                    <Container>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Financial Dashboard" {...a11yProps(0)} />
                                <Tab label="Retirement Planning" {...a11yProps(1)} />
                                <Tab label="Portfolio Optimization" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <iframe title="Report Section" width="100%" height="590"
                                src="https://app.powerbi.com/view?r=eyJrIjoiOGE5NWMyNTYtZWE4ZS00MmU5LWI2ZmItN2RkMDUwZmRhZjI5IiwidCI6ImQxZjE0MzQ4LWYxYjUtNGEwOS1hYzk5LTdlYmYyMTNjYmM4MSIsImMiOjEwfQ%3D%3D" frameborder="0" allowFullScreen="true">
                            </iframe>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Grid container spacing={2} style={{ paddingLeft: "0.75rem" }}>
                                            <Grid item xs={12}>
                                                <div style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "1.75rem", fontWeight: "650" }}>
                                                    Allow us to assist you in discovering the optimal retirement planning</div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Years</div>
                                                <TextField
                                                    id="years"
                                                    name="years"
                                                    color='success'
                                                    value={userData.years}
                                                    size='small'
                                                    onChange={(e) => handleChangeplan('years', e.target.value)}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Current Savings</div>
                                                <TextField
                                                    id="current_savings"
                                                    name="current_savings"
                                                    color='success'
                                                    size='small'
                                                    value={userData.current_savings}
                                                    onChange={(e) => handleChangeplan('current_savings', e.target.value)}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Annual Expenses</div>
                                                <TextField
                                                    id="annual_expense"
                                                    name="annual_expense"
                                                    color='success'
                                                    size='small'
                                                    value={userData.annual_expense}
                                                    onChange={(e) => handleChangeplan('annual_expense', e.target.value)}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Return of Investment</div>
                                                <TextField
                                                    id="return_on_investments"
                                                    name="return_on_investments"
                                                    size='small'
                                                    color='success'
                                                    value={userData.return_on_investments}
                                                    onChange={(e) => handleChangeplan('return_on_investments', e.target.value)}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Other Earnings</div>
                                                <TextField
                                                    id="other_earnings"
                                                    name="other_earnings"
                                                    size='small'
                                                    color='success'
                                                    value={userData.other_earnings}
                                                    onChange={(e) => handleChangeplan('other_earnings', e.target.value)}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <Button variant="contained" type="submit"
                                                    sx={{
                                                        width: "100%", height: "2.6rem", fontSize: "1.1rem",
                                                        backgroundColor: "#2196F3", boxShadow: "none", color: "white", marginTop: "1.1rem",
                                                        textTransform: "capitalize"
                                                        , "&:hover": {
                                                            backgroundColor: "#2196F3", boxShadow: "none", color: "white",
                                                            fontSize: "1.3rem", cursor: "pointer"
                                                        }
                                                    }} onClick={handlePost}>
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={6} style={{ paddingLeft: "3rem" }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Bar options={options} data={data} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Line options={lineOptions} data={data} />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Grid container spacing={2} style={{ paddingLeft: "0.75rem" }}>
                                            <Grid item xs={12}>
                                                <div style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "1.75rem", fontWeight: "650" }}>
                                                    Allow us to assist you in discovering the Portfolio Management</div>
                                            </Grid>
                                            <Grid item xs={12}  >
                                                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>AEP Adjusted</div>
                                                <TextField
                                                    id="years"
                                                    name="years"
                                                    color='success'
                                                    value={userData.years}
                                                    size='small'
                                                    onChange={(e) => handleChangeplan('years', e.target.value)}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>DFSVX Adjusted</div>
                                                <TextField
                                                    id="current_savings"
                                                    name="current_savings"
                                                    color='success'
                                                    size='small'
                                                    value={userData.current_savings}
                                                    onChange={(e) => handleChangeplan('current_savings', e.target.value)}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>DFLVX Adjusted</div>
                                                <TextField
                                                    id="annual_expense"
                                                    name="annual_expense"
                                                    color='success'
                                                    size='small'
                                                    value={userData.annual_expense}
                                                    onChange={(e) => handleChangeplan('annual_expense', e.target.value)}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>FSAGX Adjusted</div>
                                                <TextField
                                                    id="return_on_investments"
                                                    name="return_on_investments"
                                                    size='small'
                                                    color='success'
                                                    value={userData.return_on_investments}
                                                    onChange={(e) => handleChangeplan('return_on_investments', e.target.value)}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <div style={{ textAlign: "left", fontSize: "0.78rem" }}>Total Amount</div>
                                                <TextField
                                                    id="other_earnings"
                                                    name="other_earnings"
                                                    size='small'
                                                    color='success'
                                                    value={userData.other_earnings}
                                                    onChange={(e) => handleChangeplan('other_earnings', e.target.value)}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <Button variant="contained" type="submit"
                                                    sx={{
                                                        width: "100%", height: "2.6rem", fontSize: "1.1rem",
                                                        backgroundColor: "#2196F3", boxShadow: "none", color: "white", marginTop: "1.1rem",
                                                        textTransform: "capitalize"
                                                        , "&:hover": {
                                                            backgroundColor: "#2196F3", boxShadow: "none", color: "white",
                                                            fontSize: "1.3rem", cursor: "pointer"
                                                        }
                                                    }} onClick={handlePost}>
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={6} style={{ paddingLeft: "2rem" }}>
                                        <div style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "650" }}>
                                            Our Proposed Investment Recommendations</div>
                                        <div style={{ textAlign: "justify", marginBottom: "0.5rem", fontSize: "1rem", marginBottom: "2rem" }}>
                                            AEP, DFSVX, DFLVX, and FSAGX are financial symbols representing specific mutual funds or
                                            investment products. AEP Adjusted, DFSVX Adjusted, DFLVX Adjusted, and FSAGX
                                            Adjusted likely refer to adjusted values or metrics related to these financial
                                            instruments, potentially reflecting modified performance indicators or recommendations
                                            in the context of financial analysis or investment strategies.</div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <div>
                                                    <h5 style={{ fontWeight: "650" }}>Adjusted Recommendations</h5>
                                                    <Grid container spacing={2}>
                                                        {Object.entries(dataRecommmend.recommendations).map(([key, value]) => (
                                                            <Grid item xs={6} key={key}>
                                                                <div>
                                                                    <p>
                                                                        {key}: {value.toFixed(2)}
                                                                    </p>
                                                                </div>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <div>
                                                    <h5 style={{ fontWeight: "650" }}>Return and Risk:</h5>
                                                    <div>
                                                        <p>Return: {dataRecommmend.return}</p>
                                                        <p>Risk: {dataRecommmend.risk}</p>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CustomTabPanel>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}