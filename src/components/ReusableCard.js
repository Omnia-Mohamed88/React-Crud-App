// src/components/ReusableCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ReusableCard = ({ title, description }) => {
  return (
    <Card sx={{ mt: 2 }}> 
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReusableCard;
