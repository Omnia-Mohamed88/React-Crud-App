// src/features/reset_password/components/RequestResetComponent.js

import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import RequestResetForm from 'features/reset_password/forms/RequestResetForm'; 
import { sendPasswordResetLink } from 'services/authServices'; 
import Swal from 'sweetalert2';

const RequestResetComponent = () => {
  const handleRequestReset = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await sendPasswordResetLink(values.email);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.message || 'Reset link sent',
      });
    } catch (err) {
      setErrors({ email: err.message || 'An error occurred' });
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'An error occurred',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5">Reset Password</Typography>
        <RequestResetForm onSubmit={handleRequestReset} />
      </Paper>
    </Container>
  );
};

export default RequestResetComponent;
