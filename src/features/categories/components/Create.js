import React, { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateForm from 'features/categories/forms/CreateForm';
import { createCategory } from 'services/categoryServices';

import Swal from 'sweetalert2';

const CreateCategory = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateCategory = async (category) => {
    try {
      await createCategory(category);
      setSuccess('Category created successfully!');
      setError('');
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Category created successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        navigate('/categories');
      }, 2000);
    } catch (err) {
      console.error('Failed to create category:', err);
      setError('Failed to create category. Please try again.');
      setSuccess('');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5">Create Category</Typography>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <CreateForm onSubmit={handleCreateCategory} error={error} />
      </Paper>
    </Container>
  );
};

export default CreateCategory;
