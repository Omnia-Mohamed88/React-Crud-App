import React, { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateForm from '../forms/CreateForm';
import { createCategory } from '../../../services/categoryServices';

const CreateCategory = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateCategory = async (category) => {
    try {
      await createCategory(category);
      setSuccess('Category created successfully!');
      setError('');
      setTimeout(() => {
        navigate('/categories');
      }, 2000); 
    } catch (err) {
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
