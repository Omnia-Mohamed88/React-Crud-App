import { useLocation } from 'react-router-dom'; 
import { Container, Paper, Typography } from '@mui/material';
import ResetPasswordForm from 'features/ResetPassword/forms/ResetPasswordForm'; 
import axios from 'api/axios'; 
import Swal from 'sweetalert2';

const ResetPasswordComponent = () => {
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); 

  const handleResetPassword = async (email, password, password_confirmation) => {
    try {
      const response = await axios.post('/new-password/reset', {
        email,
        password,
        password_confirmation,
        token, 
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
