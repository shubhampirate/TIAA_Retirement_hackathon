import * as React from 'react';
    import {useState, useEffect} from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SettingsIcon from '@mui/icons-material/Settings';
import { mainListItems } from './listItems';
import YoutubeSearchSection from './YoutubeSection';
import heroImg_4 from "../media/img_4.jpeg";

import SearchIcon from '@mui/icons-material/Search';

import InputBase from '@mui/material/InputBase';
const YoutubeSearchSection_1 = () => {
    const [searchQuery, setSearchQuery] = useState('financevideos');
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const fetchYoutubeResults = async () => {
      // Use the fetch code you provided earlier
      const url = `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${encodeURIComponent(searchQuery)}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '9c7a4c6703mshb9d3604341529d1p1c70ddjsnf5506a762ba0',
          'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
        }
      };
  
      try {
        const response = await fetch(url, options);
        const result = await response.json(); 
        console.log(result)// Assuming the API returns JSON
  
        setSearchResults(result.items || []);
      } catch (error) {
        console.error(error);
      }
    };
    const handleSearchButtonClick = () => {
        fetchYoutubeResults();
      };
    
    useEffect(() => {
      if (searchQuery.trim() !== '') {
        // Fetch results only if the search query is not empty
        fetchYoutubeResults();
        // console.log(fetchYoutubeResults);
      } else {
        setSearchResults([]); // Clear results if search query is empty
      }
    }, [searchQuery]);
  
    return (
      <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fff', border: '20px solid #fff', borderRadius: '20px', marginTop: '20px' }}>
        <Typography variant="h6" mb={2}>YouTube Search</Typography>
        {/* <form onSubmit={search}> */}
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', padding: '4px' }}>
          <IconButton onClick={handleSearchButtonClick}>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search on YouTube..."
            sx={{ ml: 1 }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        {/* </form> */}
        {/* Display search results */}
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      </Paper>
    );
  };

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
          <Container maxWidth="lg" sx={{ mt: 4 , mb: 3 }} 
        //   sx={{border: '15px solid #fff', borderRadius: '20px'}}
          >
            {/* <Grid container spacing={2}> */}
             
            <Grid item xs={12} md={8} lg={9}>

  <Title variant="h4" sx={{color: "#042A57"}}>
             Recommendations 
            </Title>
            {/* Recommendations */}
    
<Grid container spacing={2} >
  {/* Video 1 */}
  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius:'20px' }}>
      {/* <Typography variant="h6" mb={2}>Video 1</Typography> */}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/Bd89RijKF9I?si=d4g0xoBkujeVX_BY"
        title="Video 1"
        frameBorder="0"
        allowFullScreen
        style={{ borderRadius: '10px' }}
      ></iframe>
    </Paper>
  </Grid>

  {/* Video 2 */}
  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '20px' }}>
      {/* <Typography variant="h6" mb={2}>Video 2</Typography> */}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/pjR3wIGOZsc?si=PnA_FOQh9G2iVRwy  "
        title="Video 2"
        frameBorder="0"
        allowFullScreen
        style={{ borderRadius: '10px' }}
      ></iframe>
    </Paper>
  </Grid>

  {/* Video 3 */}
  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '20px' }}>
      {/* <Typography variant="h6" mb={2}>Video 3</Typography> */}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/ifykklPqqxg?si=AMCgomt-rIGPfYu3"
        title="Video 3"
        frameBorder="0"
        allowFullScreen
        style={{ borderRadius: '10px' }}
      ></iframe>
    </Paper>
  </Grid>
</Grid>
<br /><br />

         
            </Grid>
            <YoutubeSearchSection_1/>
         {/* Start here    */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}