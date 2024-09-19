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
      
        if (status === 400) {
          setServerErrors(data.errors);
        } else if (status === 401) { 
          setServerErrors({ message: data.message }); 
        } else if (status === 422) {
          setServerErrors(data.errors);
        } else if (status === 500) {
          setServerErrors({ message: 'A server error occurred. Please try again later.' });
        }
      } 
    }}

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
