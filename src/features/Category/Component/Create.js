import { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateCategoryForm from 'features/Category/Form/Create'; 
import useAxiosPrivate from 'hooks/useAxiosPrivate'; 
import Swal from 'sweetalert2';

const CreateCategory = () => {
  const [serverErrors, setServerErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate(); 

  const handleCreateCategory = async (formData) => {
    console.log('Submitting category:', formData);

    try {
      await axiosPrivate.post('/categories', formData, {
      });
      setSuccess('Category created successfully!');
      setServerErrors({});

      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Category created successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/categories');
    } catch (err) {
      console.error('Error creating category:', err);
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
        <Typography variant="h5">Create Category</Typography>
        {success && <Typography color="primary">{success}</Typography>}
        <CreateCategoryForm onSubmit={handleCreateCategory} serverErrors={serverErrors} />
      </Paper>
    </Container>
  );
};

export default CreateCategory;
