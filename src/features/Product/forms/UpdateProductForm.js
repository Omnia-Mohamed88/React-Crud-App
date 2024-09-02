import { useState } from 'react';
import { TextField, Button, MenuItem, Grid, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { useFormik } from 'formik';
import { updateProductSchema } from 'features/Product/schema/updateProductSchema';
import { uploadImage, deleteImage } from 'services/productServices';

const UpdateProductForm = ({ product, categories, onSubmit, serverErrors }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
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
        const newImageUrls = [];

        for (let i = 0; i < selectedFiles.length; i++) {
          const imageUrl = await uploadImage(selectedFiles[i]);
          newImageUrls.push(imageUrl.replace('http://localhost:8000', ''));
        }

        const existingImageUrls = uploadedImages.map(img => 
          img.file_path.replace('http://localhost:8000', '') 
        );

        const updatedProduct = {
          ...values,
          image_url: [...existingImageUrls, ...newImageUrls],
        };

        await onSubmit(updatedProduct);
        setUploadedImages([...uploadedImages, ...newImageUrls.map(url => ({ file_path: `http://localhost:8000${url}` }))]);
        setSelectedFiles([]); 
      } catch (error) {
        console.error('Failed to update product:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleViewImage = (imageUrl) => {
    const viewUrl = imageUrl.file_path.startsWith('http://localhost:8000') 
      ? imageUrl.file_path 
      : `http://localhost:8000${imageUrl.file_path}`;
    
    window.open(viewUrl, '_blank');
  };

  const handleDeleteImage = async (imageUrl) => {
    try {
      await deleteImage(imageUrl.file_path);
      setUploadedImages(uploadedImages.filter(image => image.file_path !== imageUrl.file_path));
    } catch (error) {
      console.error('Failed to delete image:', error.message);
    }
  };

  const handleDownloadImage = (imageUrl) => {
    const downloadUrl = imageUrl.file_path.startsWith('http://localhost:8000') 
      ? imageUrl.file_path 
      : `http://localhost:8000${imageUrl.file_path}`;
    
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
        multiple
      />
      <Grid container spacing={2}>
        {uploadedImages.map((attachment, index) => (
          <Grid item xs={12} key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <IconButton onClick={() => handleViewImage(attachment)} color="primary">
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteImage(attachment)} color="secondary">
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleDownloadImage(attachment)}>
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
