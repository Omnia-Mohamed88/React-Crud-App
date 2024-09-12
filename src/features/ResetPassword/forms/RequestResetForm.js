import { useFormik } from 'formik';
import { TextField, Button, Grid } from '@mui/material';
import requestResetSchema from 'features/ResetPassword/schema/requestResetSchema'; 

const RequestResetForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: requestResetSchema,
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={formik.isSubmitting} 
          >
            {formik.isSubmitting ? 'Sending...' : 'Send Reset Link'} 
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RequestResetForm;
