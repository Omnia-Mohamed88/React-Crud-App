import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Typography, Input } from '@mui/material';
import { createCategorySchema } from 'features/Category/Schemas/createCategorySchema';

const CreateForm = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      images: [],
    },
    validationSchema: createCategorySchema,
    onSubmit: (values) => {
      const formValues = {
        title: values.title,
        images: values.images,
      };
      if (typeof onSubmit === 'function') {
        onSubmit(formValues);
      } else {
        console.error('onSubmit is not a function');
      }
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    formik.setFieldValue('images', files);
  };

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
      
      <Input
        type="file"
        id="images"
        name="images"
        onChange={handleFileChange}
        inputProps={{ accept: 'image/*', multiple: true }}
      />
      
      <Button type="submit" fullWidth variant="contained" color="primary">
        Create Category
      </Button>
    </form>
  );
};

export default CreateForm;
