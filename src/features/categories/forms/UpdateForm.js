import React from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UpdateForm = ({ category, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: category.title || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        margin="normal"
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Update
      </Button>
    </form>
  );
};

export default UpdateForm;
