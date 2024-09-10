// LoginForm.jsx
import { useFormik } from 'formik';
import { TextField, Button, Grid, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import loginSchema from 'features/Login/Schema/login';

const LoginForm = ({ onSubmit, error }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        await onSubmit(values, { setErrors });
        navigate('/home');
      } catch (err) {
      }
    },
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography color="error" align="center">
              {error}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Link 
              component="button" 
              variant="body2" 
              onClick={() => navigate('/register')}
            >
              Register
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            Forget your password?{' '}
            <Link 
              component="button" 
              variant="body2" 
              onClick={() => navigate('/request-reset')}
            >
              Request reset
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
