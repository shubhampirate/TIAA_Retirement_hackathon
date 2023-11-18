import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const YoutubeSearchSection = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
    console.log(body);
    setSearchResults(body.items.filter((item) => item.type === 'video'));
  };

  const search = (e) => {
    e.preventDefault();
    searchYouTube(query);

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

      {/* Display search results */}
      {searchResults && (
        <div>
          {searchResults.length === 0 ? (
            <p>No results</p>
          ) : (
            <ul>
              {searchResults.map((item) => (
                <li key={item.id}>
                  <div>
                    <b>
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </b>
                    <p>{item.description}</p>
                  </div>
                  <ul>
                    <li>
                      By:{' '}
                      <a href={item.author.ref} target="_blank" rel="noopener noreferrer">
                        {item.author.name}
                      </a>
                    </li>
                    <li>Views: {item.views}</li>
                    <li>Duration: {item.duration}</li>
                    <li>Uploaded: {item.uploaded_at}</li>
                  </ul>
                  <img alt="" src={item.thumbnail} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Paper>
  );
};

export default YoutubeSearchSection;
