import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Link, TextField, Button, Switch, CssBaseline } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const API_KEY = "8a6b525c9925801914d2702fe4683567";
const url = 'https://gnews.io/api/v4/search?q=';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchNews('India');
    }, []);

    const fetchNews = async (query) => {
        try {
            const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
            const data = await res.json();
            setArticles(data.articles.slice(0, 5));
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleSearch = () => {
        if (!searchQuery) return;
        fetchNews(searchQuery);
    };

    const handleToggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <CssBaseline>
            <Container>
                <div style={{ textAlign: "left", fontWeight: "550", fontSize: "1.5rem", marginBottom: "0.5rem", paddingTop: "2rem" }}>
                    Current News </div>
                <Grid container spacing={1} style={{ marginTop: "0.5rem" }}>
                    <Grid item xs={10}>
                        <TextField
                            id="search-text"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            size='small'
                            sx={{ height: "50%", width: "100%" }}
                        />
                    </Grid>
                    <Grid item xs={1} style={{ marginTop: "0.2rem" }}>
                        <SearchIcon sx={{ fontSize: 35, cursor: 'pointer' }} onClick={handleSearch} />
                    </Grid>
                    {articles.map((article, index) => (
                        <Grid item key={index} xs={12}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={article.image}
                                    alt="News"
                                />
                                <CardContent sx={{ textAlign: "justify", fontSize: "0.75rem" }}>
                                    <Link href={article.url} target="_blank" rel="noopener noreferrer">
                                        <h5>{article.title}</h5>
                                    </Link>
                                    <p>{article.description}</p>
                                    <p>{`${article.source.name} • ${new Date(article.publishedAt).toLocaleString('en-US', {
                                        timeZone: 'Asia/Jakarta'
                                    })}`}</p>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </CssBaseline>
    );
};

export default News;
