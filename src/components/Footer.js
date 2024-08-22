// src/components/Footer.js

import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: '#f1f1f1',
          padding: '16px',
          marginTop: 'auto',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} eTax. All rights reserved.
          </Typography>
         
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
