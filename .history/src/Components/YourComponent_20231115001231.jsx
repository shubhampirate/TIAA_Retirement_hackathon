import React from 'react';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material';

// Component for the first box
const InvestmentsBox = () => (
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant="h6">Total Investments</Typography>
    <Typography variant="h4">$120,000</Typography>
    <Typography variant="subtitle1">+ $120 (0.1%)</Typography>
    {/* Options to choose from */}
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
      <div>
        <Typography variant="subtitle2">1 Day</Typography>
      </div>
      <div>
        <Typography variant="subtitle2">1 Month</Typography>
      </div>
      <div>
        <Typography variant="subtitle2">1 Year</Typography>
      </div>
    </div>
    {/* Chart (replace with your actual chart component) */}
    <div style={{ marginTop: '20px', width: '100%', height: '150px', backgroundColor: '#f0f0f0' }}>
      {/* Replace this div with your actual chart component */}
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Chart Placeholder
      </div>
    </div>
  </Paper>
);

// Component for the second box
const EquityMarketsBox = () => (
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <Typography variant="h6">Equity Markets</Typography>
    <Typography variant="subtitle1">BSE Sensex: 40,000</Typography>
    <Typography variant="subtitle1">Dow Jones: 35,000</Typography>
    <Typography variant="subtitle1">Nasdaq: 15,000</Typography>
    {/* Include date and increase values here */}
  </Paper>
);

// Component for the third box
const CreditScoreBox = () => (
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant="h6">Credit Score Rating</Typography>
    {/* Circular Progress Bar */}
    <CircularProgress variant="determinate" value={75} size={80} />
    {/* Display the percentage in the center of the circular progress bar */}
    <Typography variant="h5" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      75%
    </Typography>
  </Paper>
);

// Main component
const YourComponent = () => (
  <Grid container spacing={3} style={{ height: '100vh' }}>
    <Grid item xs={12} md={4} lg={4}>
      <InvestmentsBox />
    </Grid>
    <Grid item xs={12} md={4} lg={4}>
      <EquityMarketsBox />
    </Grid>
    <Grid item xs={12} md={4} lg={4}>
      <CreditScoreBox />
    </Grid>
  </Grid>
);

export default YourComponent;
