import React from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import { updateProductSchema } from 'features/products/schema/updateProductSchema'; 

const UpdateProductForm = ({ product, categories, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: product.title || '',
      description: product.description || '',
      price: product.price || '',
      category_id: product.category_id || '',
    },
    validationSchema: updateProductSchema,
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
        select
        label="Category"
        value={formik.values.category_id}
        onChange={formik.handleChange}
        error={formik.touched.category_id && Boolean(formik.errors.category_id)}
        helperText={formik.touched.category_id && formik.errors.category_id}
        margin="normal"
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.title}
          </MenuItem>
        ))}
      </TextField>
      <Button color="primary" variant="contained" fullWidth type="submit">
        Update
      </Button>
    </form>
  );
};

export default UpdateProductForm;
