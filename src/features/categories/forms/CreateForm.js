import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Typography } from '@mui/material';
import { createCategorySchema } from '../schema/createCategorySchema';

const CreateForm = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: createCategorySchema,
    onSubmit: (values) => {
      if (typeof onSubmit === 'function') {
        onSubmit(values);
      } else {
        console.error('onSubmit is not a function');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Category Title"
        name="title"
        autoComplete="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Create Category
      </Button>
    </form>
  );
};

export default CreateForm;
