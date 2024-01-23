import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const YoutubeSearchSection = () => {
  const [query, setQuery] = useState('Finances');
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
          "x-rapidapi-key": "7c6ea047ffmsh052597ca6ce30e6p127754jsn40c703c8ae73" /* Paste your RapidAPI key here. */,
        },
      }
    );
    const body = await response.json();
    setSearchResults(body.videos || []);
  };

  // useEffect(() => {
  //   const initialQuery = 'finances';
  //   searchYouTube(initialQuery);
  // }, []);



  const extractLinks = () => {
    // Extract links from videos and set the array
    if (searchResults.length === 0) return "dnd";
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
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ textAlign: "left", fontWeight: "750", fontSize: "1.5rem", marginBottom: "0.5rem", paddingTop: "2rem" }}>
            Discover the latest YouTube videos </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <TextField
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                size='small'
                sx={{ height: "50%", width: "100%" }}
              />
            </Grid>
            <Grid item xs={1} style={{ marginTop: "0.2rem" }}>
              <SearchIcon sx={{ fontSize: 35, cursor: 'pointer' }} onClick={search} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} style={{ paddingRight: "1rem" }}>
                {linksArray.map((link, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <a href={link.link} target="_blank" rel="noopener noreferrer">
                          <img
                            src={link.thumbnail}
                            alt={`Thumbnail ${index + 1}`}
                            style={{ width: '100%', height: '10rem', objectFit: 'cover', borderRadius: '10px' }}
                          />
                        </a>
                        <div style={{
                          textAlign: "left", marginBottom: "0.75rem", fontWeight: "650",
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}> {link.title}</div>
                      </Grid>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default YoutubeSearchSection;
