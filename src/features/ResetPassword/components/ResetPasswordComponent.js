import { useLocation } from 'react-router-dom'; // Use useLocation to get the token from the query string
import { Container, Paper, Typography } from '@mui/material';
import ResetPasswordForm from 'features/ResetPassword/forms/ResetPasswordForm'; 
import axios from 'api/axios'; // Import Axios directly
import Swal from 'sweetalert2';

const ResetPasswordComponent = () => {
  const location = useLocation(); // Get the current location
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); // Extract the token from the query string

  const handleResetPassword = async (email, password, password_confirmation) => {
    try {
      const response = await axios.post('/new-password/reset', {
        email,
        password,
        password_confirmation,
        token, // Include the token in the request payload
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message || 'Password has been reset',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'An error occurred',
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5">Reset Password</Typography>
        <ResetPasswordForm onSubmit={handleResetPassword} token={token} />
      </Paper>
    </Container>
  );
};

export default ResetPasswordComponent;
