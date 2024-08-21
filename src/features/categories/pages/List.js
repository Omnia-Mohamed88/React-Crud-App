import React from 'react';
import List from 'features/categories/components/List';
import ReusableButton from 'components/ReusableButton';
import { Box, Typography } from '@mui/material';

const ListCategoryPage = () => {
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
        Category List
      </Typography>
      <ReusableButton
        label="Create Category"
        to="/categories/create"
        variant="contained"
        color="primary"
      />
      <List />
    </Box>
  );
};

export default ListCategoryPage;
