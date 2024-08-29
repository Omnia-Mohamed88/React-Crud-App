import React from 'react';
import ProductList from 'features/Product/Component/ProductList'; 
import ReusableButton from 'components/ReusableButton'; 
import { Box, Typography } from '@mui/material';

const ListProductPage = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="100vh"
      p={2}
    >
      <Typography variant="h3" gutterBottom>
        Product List
      </Typography>
      <ReusableButton
        label="Create Product"
        to="/products/create"
        variant="contained"
        color="primary"
      />
      <ProductList />
    </Box>
  );
};

export default ListProductPage;
