import { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Grid, Typography } from '@mui/material';
import resetPasswordSchema from 'features/ResetPassword/schema/resetPasswordSchema';
import ServerSideValidationMessagesWrapper from 'components/ServerSideValidationMessagesWrapper';

const ResetPasswordForm = ({ onSubmit, token }) => {
  const [serverSideErrors, setServerSideErrors] = useState("");
  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirmation: '',
      token: token || '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setStatus, setErrors }) => {
      setServerSideErrors(""); 
      try {
        await onSubmit(values.password, values.password_confirmation, values.token);
        setStatus({ success: 'Password reset successfully!' });
      } catch (error) {
        setStatus({ error: error.message || 'An error occurred during password reset.' });
        if (error.response?.status === 422) {
          setServerSideErrors(error.response.data.errors); 
        } else {
          setErrors({ apiError: error.message || 'An error occurred' });
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ServerSideValidationMessagesWrapper error={serverSideErrors} />
        </Grid>

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
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={formik.isSubmitting}>
            Reset Password
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ResetPasswordForm;
