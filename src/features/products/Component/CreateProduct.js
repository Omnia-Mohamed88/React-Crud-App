import React, { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateProductForm from 'features/Products/forms/CreateProductForm';
import { createProduct } from 'services/productServices';
import Swal from 'sweetalert2';

const CreateProduct = () => {
  const [serverErrors, setServerErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateProduct = async (formData) => {
    console.log('Submitting product: in comp', formData);
    try {
      await createProduct(formData); 
      setSuccess('Product created successfully!');
      setServerErrors({});
      
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product created successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      navigate('/products');
    } catch (err) {
      console.error('Error creating product:', err);
      setSuccess('');
      
      if (err.response && err.response.data && err.response.data.errors) {
        setServerErrors(err.response.data.errors);
      } else {
        setServerErrors({ general: 'Failed to create product. Please try again.' });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5">Create Product</Typography>
        {success && <Typography color="primary">{success}</Typography>}
        <CreateProductForm onSubmit={handleCreateProduct} serverErrors={serverErrors} />
      </Paper>
    </Container>
  );
};

export default CreateProduct;
