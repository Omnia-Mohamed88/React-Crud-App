// src/components/ReusableCard.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const ReusableCard = ({ title, description, image }) => {
  return (
    <Card sx={{ mt: 2 }}>
      {image && <CardMedia component="img" height="140" image={image} alt={title} />}
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
