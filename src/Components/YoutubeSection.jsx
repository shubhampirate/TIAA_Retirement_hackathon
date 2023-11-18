import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const YoutubeSearchSection = () => {
    const [query, setQuery] = useState('finances');
    const [searchResults, setSearchResults] = useState([]);
    const [linksArray, setLinksArray] = useState([]);
  
    const searchYouTube = async (q) => {
      q = encodeURIComponent(q);
      const response = await fetch(
        "https://youtube-search-results.p.rapidapi.com/youtube-search/?q=" + q,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
            "x-rapidapi-key": "9c7a4c6703mshb9d3604341529d1p1c70ddjsnf5506a762ba0" /* Paste your RapidAPI key here. */,
          },
        }
      );
      const body = await response.json();
      setSearchResults(body.videos || []);
    };
  
    const extractLinks = () => {
      // Extract links from videos and set the array
      if (searchResults.length === 0) return "dnd";
    //   const extractedLinks = (searchResults).map((video) => video.thumbnail);
    //   const extractedVideotitles= (searchResults).map((video) => video.title);
    //   const extractedVideolinks= (searchResults).map((video) => video.link);
    //   console.log(extractedLinks)
    //   setLinksArray(extractedLinks);
      const extractedLinks = searchResults.map((video) => ({
        thumbnail: video.thumbnail,
        title: video.title,
        link: video.link,
      }));
      console.log(extractedLinks);
      setLinksArray(extractedLinks);
      
    };
  
    const search = (e) => {
      e.preventDefault();
      searchYouTube(query);
      extractLinks();
    };
  
    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: '#fff',
          border: '20px solid #fff',
          borderRadius: '20px',
          marginTop: '20px',
        }}
      >
        <Typography variant="h6" mb={2}>
          YouTube Search
        </Typography>
        <form onSubmit={search}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '4px',
            }}
          >
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search YouTube</button>
          </Box>
        </form>
        <Grid container spacing={2}>
        {linksArray.slice(0, 6).map((link, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '20px' }}>
              <a href={link.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={link.thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                />
              </a>
            </Paper>
          </Grid>
        ))}
      </Grid>
      

      </Paper>
    );
  };
  
  export default YoutubeSearchSection;
  