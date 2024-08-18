// src/features/categories/forms/CreateForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Container, Paper } from '@mui/material';

const CreateForm = ({ initialValues, validationSchema, onSubmit }) => (
  <Container component="main" maxWidth="xs">
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="name"
              label="Category Name"
              variant="outlined"
              margin="normal"
              fullWidth
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Category
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  </Container>
);

export default CreateForm;
