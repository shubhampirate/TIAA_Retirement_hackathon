import * as React from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';

const RetirementSavingsComponent = ({ progress }) => {
  let statusText = '';
  let statusColor = '';

  if (progress < 50) {
    statusText = 'Falling Short';
    statusColor = 'red';
  } else if (progress < 75) {
    statusText = 'Getting Close';
    statusColor = 'orange';
  } else {
    statusText = 'On Track';
    statusColor = 'green';
  }

  return (
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        <Typography variant="h6">Your Retirement Saving Progress</Typography>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100px',
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            sx={{
              color: statusColor,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              color: statusColor,
            }}
          >
            {statusText}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};
