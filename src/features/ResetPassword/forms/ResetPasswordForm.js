import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Grid, Typography } from '@mui/material';
import resetPasswordSchema from 'features/ResetPassword/schema/resetPasswordSchema'; 

const ResetPasswordForm = ({ onSubmit, token }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password_confirmation: '',
      token: token || '', 
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setStatus, setErrors }) => {
      console.log('Formik values:', values); 
      try {
        await onSubmit(values.email, values.password, values.password_confirmation, values.token);
        setStatus({ success: 'Password reset successfully!' });
      } catch (error) {
        setStatus({ error: error.message || 'An error occurred during password reset.' });
        setErrors({ apiError: error.message || 'An error occurred' });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        {formik.status && formik.status.success && (
          <Grid item xs={12}>
            <Typography variant="h6" color="success.main">
              {formik.status.success}
            </Typography>
          </Grid>
        )}
        {formik.status && formik.status.error && (
          <Grid item xs={12}>
            <Typography variant="h6" color="error.main">
              {formik.status.error}
            </Typography>
          </Grid>
        )}
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
            label="New Password"
            type="password"
            variant="outlined"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            variant="outlined"
            {...formik.getFieldProps('password_confirmation')}
            error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
            helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
          />
        </Grid>
        <Grid item xs={12}>
          <input type="hidden" name="token" value={formik.values.token} />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={formik.isSubmitting}>
            Reset Password
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};


export default ResetPasswordForm;
