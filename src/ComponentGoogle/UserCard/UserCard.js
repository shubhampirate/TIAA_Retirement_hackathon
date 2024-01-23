import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UserCard = (props) => {
  const style = {
    backgroundColor: '#fff',
    color: '#000',
    margin: '8px', // Simulates Bootstrap's mb-2 class
    textAlign: 'center',
    boxShadow:"none"
  };

  return (
    <Card style={style}>
      <CardContent>
        <div style={{fontSize:"1.25rem", fontWeight:"500"}}>
          Your Google Fit Stats are aggregated below!
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
