// src/features/categories/forms/UpdateForm.js
import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button, Container, Paper } from '@mui/material';
import updateCategorySchema from '../schema/updateCategorySchema';

const UpdateForm = ({ initialValues, onSubmit }) => (
  <Container component="main" maxWidth="xs">
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={updateCategorySchema}
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
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  </Container>
);

export default UpdateForm;
