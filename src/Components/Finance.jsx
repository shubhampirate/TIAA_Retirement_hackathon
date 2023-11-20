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
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SettingsIcon from '@mui/icons-material/Settings';
import { mainListItems } from './listItems';
import heroImg_4 from "../media/img_4.jpeg";
import LinearProgress from '@mui/material/LinearProgress';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Accordion, Accordioncurrent_savingsmary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import useAlan from '../Hooks/useAlan';
import Swal from 'sweetalert2';

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
            {...other}
        >
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
                                src="https://app.powerbi.com/view?r=eyJrIjoiNmFhMjA5YWUtNzVlZi00YWE0LTkyNWYtNGM2OTI3MzA4NjhkIiwidCI6ImQxZjE0MzQ4LWYxYjUtNGEwOS1hYzk5LTdlYmYyMTNjYmM4MSIsImMiOjEwfQ%3D%3D" frameborder="0" allowFullScreen="true">
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
                                            <Grid item xs={12}  >
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
                                </Grid>
                            </Box>
                        </CustomTabPanel>

                    </Container>

                </Box>
            </Box>
            {/* </Box> */}
        </ThemeProvider>
    );
}