import { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateProductForm from 'features/Product/forms/CreateProductForm';
import useAxiosPrivate from 'hooks/useAxiosPrivate';  
import Swal from 'sweetalert2';

const CreateProduct = () => {
  const [serverErrors, setServerErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate(); 

  const handleCreateProduct = async (formData) => {
    console.log('Submitting product:', formData);

    try {
      await axiosPrivate.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Product created successfully!');
      setServerErrors({});

      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product created successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/products');
    } catch (err) {
      console.error('Error creating product:', err);
      setSuccess('');

      if (err.response) {
        const { status, data } = err.response;

        if (status === 400 || status === 422) {
          setServerErrors(data.errors || { general: 'Validation errors occurred. Please check your input.' });
        } else if (status === 500) {
          setServerErrors({ general: 'A server error occurred. Please try again later.' });
        } else {
          setServerErrors({ general: 'Failed to create product. Please try again.' });
        }
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
