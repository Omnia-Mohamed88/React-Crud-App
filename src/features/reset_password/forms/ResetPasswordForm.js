// src/features/reset_password/forms/ResetPasswordForm.js

import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Grid } from '@mui/material';
import resetPasswordSchema from 'features/reset_password/schema/resetPasswordSchema'; 

const ResetPasswordForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit,
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset Password
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ResetPasswordForm;
