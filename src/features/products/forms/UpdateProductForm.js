import React from 'react';
import { TextField, Button, Input } from '@mui/material';
import { useFormik } from 'formik';
import updateProductSchema from '../schema/updateProductSchema';

const UpdateProductForm = ({ product, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: product.title || '',
      description: product.description || '',
      price: product.price || '',
      category_id: product.category_id || '',
      images: [],
    },
    validationSchema: updateProductSchema,
    onSubmit: (values) => {
      const updatedProduct = {
        ...values,
        images: values.images ? Array.from(values.images) : [],
      };
      onSubmit(updatedProduct);
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
      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        margin="normal"
      />
      <TextField
        fullWidth
        id="price"
        name="price"
        label="Price"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
        margin="normal"
      />
      <TextField
        fullWidth
        id="category_id"
        name="category_id"
        label="Category ID"
        type="number"
        value={formik.values.category_id}
        onChange={formik.handleChange}
        error={formik.touched.category_id && Boolean(formik.errors.category_id)}
        helperText={formik.touched.category_id && formik.errors.category_id}
        margin="normal"
      />
      <Input
        id="images"
        name="images"
        type="file"
        inputProps={{ multiple: true }}
        onChange={(event) => formik.setFieldValue('images', event.currentTarget.files)}
        margin="normal"
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Update
      </Button>
    </form>
  );
};

export default UpdateProductForm;
