import React from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import updateCategorySchema from 'features/categories/schema/updateCategorySchema';

const UpdateForm = ({ category = {}, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: category.title || '',
      attachments: [],
    },
    validationSchema: updateCategorySchema,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('title', values.title);

      if (values.attachments && values.attachments.length > 0) {
        values.attachments.forEach((file) => {
          formData.append('attachments[]', file);
        });
      }

      onSubmit(formData);

      resetForm();
      document.getElementById('attachments').value = null;
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
      <input
        id="attachments"
        name="attachments"
        type="file"
        multiple
        onChange={(event) => {
          formik.setFieldValue('attachments', Array.from(event.target.files));
        }}
        style={{ marginTop: 16 }}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Update
      </Button>
    </form>
  );
};

export default UpdateForm;
