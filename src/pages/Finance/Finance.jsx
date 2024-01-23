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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from "@mui/material"
import { TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import useAlan from '../../Hooks/useAlan';
import Swal from 'sweetalert2';
import { Bar, Line } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip, PointElement, LineElement } from "chart.js";
import GoogleTranslateComponent from '../../Components/GoogleTranslateComponent';
import { BarChart } from '@mui/x-charts';
import financeplan from "../../media/financeplan.png"
import portfolio1 from "../../media/portfolio1.png"
import portfolio2 from "../../media/portfolio2.png"
import portfolio3 from "../../media/portfolio3.png"
import portfolio4 from "../../media/portfolio4.png"

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

    const [openDia, setOpenDia] = useState(false);
    const handleClickOpenDia = () => { setOpenDia(true); };
    const handleCloseDia = () => { setOpenDia(false); };

    const [openDia2, setOpenDia2] = useState(false);
    const handleClickOpenDia2 = () => { setOpenDia2(true); };
    const handleCloseDia2 = () => { setOpenDia2(false); };

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
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={2} style={{ paddingLeft: "0.75rem" }}>
                                                    <Grid item xs={12}>
                                                        <div style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "1.75rem", fontWeight: "650" }}>
                                                            Discover your optimal retirement plan</div>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
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
                                                    <Grid item xs={12} md={4}>
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
                                                    <Grid item xs={12} md={4}>
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
                                                    <Grid item xs={12} md={4}>
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
                                                    <Grid item xs={12} md={4}>
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
                                                    <Grid item xs={12} md={4}>
                                                        <Button variant="contained" type="submit"
                                                            sx={{
                                                                width: "100%", height: "2.5rem", fontSize: "1.1rem",
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
                                            <Grid item xs={12} onClick={handleClickOpenDia}>
                                                <div style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "1.5rem", fontWeight: "650" }}>
                                                    Your Next Expenditure Breakdown</div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <BarChart
                                                    xAxis={[{ label: 'Years', scaleType: 'band', data: ["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12", "Y13", "Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Y20", "Y21", "Y22", "Y23", "Y24", "Y25", "Y26", "Y27", "Y28", "Y29", "Y30"] }]}
                                                    series={[{
                                                        data: [
                                                            51000,
                                                            53246.2109017865,
                                                            53959.7785645849,
                                                            56732.7764702336,
                                                            62223.8257534944,
                                                            63080.4261408155,
                                                            63873.8688690985,
                                                            70384.49463113,
                                                            75057.5681525709,
                                                            75581.0913117252,
                                                            79814.2072253925,
                                                            80409.8730832142,
                                                            80875.7631308425,
                                                            84067.2978872135,
                                                            78381.8580287842,
                                                            73227.835867506,
                                                            72072.7552522883,
                                                            69018.8998546766,
                                                            70195.968428858,
                                                            67014.6225854029,
                                                            61758.1313725417,
                                                            65019.5258637524,
                                                            63122.8276522056,
                                                            61753.5374462927,
                                                            55398.8101379207,
                                                            51055.5498554405,
                                                            47818.37796665484,
                                                            40962.81324670685,
                                                            36677.54299649183,
                                                            29817.1481334547
                                                        ], label: 'Expenses'
                                                    }, {
                                                        data: [
                                                            0,
                                                            4120,
                                                            4243,
                                                            4370.08,
                                                            4502.3524,
                                                            4637.962972,
                                                            4776.09186116001,
                                                            4919.95461699481,
                                                            5067.80325550465,
                                                            5219.9273531698,
                                                            5375.65517376489,
                                                            5536.354828977834,
                                                            5703.435473847174,
                                                            5874.34853806259,
                                                            6050.588994204474,
                                                            6231.696664030605,
                                                            6418.25756395153,
                                                            6611.90529087007,
                                                            6809.32244959618,
                                                            7014.24212308407,
                                                            7224.4493867766,
                                                            7441.78286837989,
                                                            7664.13635443129,
                                                            7894.46044506424,
                                                            8131.76425841617,
                                                            8375.11718616865,
                                                            8626.65070175371,
                                                            8885.56022280632,
                                                            9151.10702949051,
                                                            9426.62024037524
                                                        ], label: 'Savings'
                                                    }]}
                                                    yAxis={[
                                                        {
                                                            min: value[0],
                                                            max: 99999
                                                        },
                                                    ]}
                                                    height={300}
                                                />
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
                                        <div style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "650" }}
                                            onClick={handleClickOpenDia2} >
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
                <Dialog
                    open={openDia}
                    maxWidth="sm"
                    fullWidth
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
                        {"Retirement Planning"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <img src={financeplan} style={{ width: "35rem", height: "32rem" }} />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDia}>Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openDia2}
                    maxWidth="lg"
                    fullWidth
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
                        {"Portfolio Optimization"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <img src={portfolio4} style={{ width: "99%", height: "10rem" }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <img src={portfolio3} style={{ width: "99%", height: "22rem" }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <img src={portfolio1} style={{ width: "99%", height: "16rem" }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <img src={portfolio2} style={{ width: "99%", height: "16rem" }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>

                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDia2}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}