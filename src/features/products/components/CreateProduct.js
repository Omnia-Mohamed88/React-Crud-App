import React, { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateProductForm from 'features/products/forms/CreateProductForm';
import { createProduct } from 'services/productServices';
import Swal from 'sweetalert2';

const CreateProduct = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateProduct = async (formData) => {
    console.log('Submitting product: in comp', formData);
    try {
      await createProduct(formData); 
      setSuccess('Product created successfully!');
      setError('');

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
      setError('Failed to create product. Please try again.');
      setSuccess('');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5">Create Product</Typography>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <CreateProductForm onSubmit={handleCreateProduct} error={error} />
      </Paper>
    </Container>
  );
};

export default CreateProduct;