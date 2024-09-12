import { Container, Paper, Typography } from '@mui/material';
import RequestResetForm from 'features/ResetPassword/forms/RequestResetForm'; 
import Swal from 'sweetalert2';
import axios from 'api/axios'; 

const RequestResetComponent = () => {
  const handleRequestReset = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        '/new-password/email', 
        { email: values.email }
      );
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message || 'Reset link sent',
      });
    } catch (err) {
      setErrors({ email: err.response?.data.message || 'An error occurred' });
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data.message || 'An error occurred',
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
