import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { useFormik } from 'formik';
import { updateProductSchema } from 'features/Products/schema/updateProductSchema';
import { uploadImage, deleteImage } from 'services/productServices';

const UpdateProductForm = ({ product, categories, onSubmit, serverErrors }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(product.attachments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: product.title || '',
      description: product.description || '',
      price: product.price || '',
      category_id: product.category.id || '',
    },
    validationSchema: updateProductSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        let imageUrl = product.image_url || '';

        if (selectedFile) {
          imageUrl = await uploadImage(selectedFile);
          setUploadedImages([...uploadedImages, imageUrl]);
        }

        const updatedProduct = {
          ...values,
          image_url: imageUrl,
          images: selectedFile ? [selectedFile] : [],
        };

        await onSubmit(updatedProduct);
      } catch (error) {
        console.error('Failed to update product:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleViewImage = (imageUrl) => {
    const viewUrl = imageUrl.startsWith('http://localhost:8000') ? imageUrl : `http://localhost:8000${imageUrl}`;
    window.open(viewUrl, '_blank');
  };

  const handleDeleteImage = async (imageUrl) => {
    try {
      await deleteImage(imageUrl);
      setUploadedImages(uploadedImages.filter(image => image.file_path !== imageUrl));
    } catch (error) {
      console.error('Failed to delete image:', error.message);
    }
  };

  const handleDownloadImage = (imageUrl) => {
    const downloadUrl = imageUrl.startsWith('http://localhost:8000') ? imageUrl : `http://localhost:8000${imageUrl}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downloadUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title || serverErrors.title)}
        helperText={formik.touched.title && (formik.errors.title || serverErrors.title)}
        margin="normal"
      />
      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description || serverErrors.description)}
        helperText={formik.touched.description && (formik.errors.description || serverErrors.description)}
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
        error={formik.touched.price && Boolean(formik.errors.price || serverErrors.price)}
        helperText={formik.touched.price && (formik.errors.price || serverErrors.price)}
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
        error={formik.touched.category_id && Boolean(formik.errors.category_id || serverErrors.category_id)}
        helperText={formik.touched.category_id && (formik.errors.category_id || serverErrors.category_id)}
        margin="normal"
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.title}
          </MenuItem>
        ))}
      </TextField>
      <input
        type="file"
        name="images"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Grid container spacing={2}>
        {uploadedImages.map((attachment, index) => (
          <Grid item xs={12} key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <IconButton onClick={() => handleViewImage(attachment.file_path)} color="primary">
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteImage(attachment.file_path)} color="secondary">
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleDownloadImage(attachment.file_path)}>
              <DownloadIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update Product'}
      </Button>
    </form>
  );
};

export default UpdateProductForm;
