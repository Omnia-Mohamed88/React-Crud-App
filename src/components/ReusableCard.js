// src/components/ReusableCard.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActionArea } from '@mui/material';

const ReusableCard = ({ title, description, image }) => {
  return (
    <Card>
      <CardActionArea>
        {image && (
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={title}
          />
        )}
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ReusableCard;
