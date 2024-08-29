import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { Button, Box } from '@mui/material';
import registerSchema from 'features/Registeration/schema/registerSchema';

const RegisterForm = ({ onSubmit, formErrors }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box mb={2}>
            <Field
              component={TextField}
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              error={!!formErrors.name}
              helperText={formErrors.name && formErrors.name[0]}
            />
          </Box>
          <Box mb={2}>
            <Field
              component={TextField}
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              error={!!formErrors.email}
              helperText={formErrors.email && formErrors.email[0]}
            />
          </Box>
          <Box mb={2}>
            <Field
              component={TextField}
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              error={!!formErrors.password}
              helperText={formErrors.password && formErrors.password[0]}
            />
          </Box>
          <Box mb={2}>
            <Field
              component={TextField}
              name="password_confirmation"
              type="password"
              label="Confirm Password"
              variant="outlined"
              fullWidth
              error={!!formErrors.password_confirmation}
              helperText={formErrors.password_confirmation && formErrors.password_confirmation[0]}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
