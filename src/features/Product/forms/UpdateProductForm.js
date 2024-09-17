import { useState, useEffect } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { Formik, Form, Field } from 'formik';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { updateProductSchema } from 'features/Product/schema/updateProductSchema';

const UpdateProductForm = ({ product, categories = [], onSubmit, serverErrors }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (product) {
      setUploadedImages(product.attachments || []);
    }
  }, [product]);

  const handleImageUpload = async (event, setFieldValue) => {
    const files = Array.from(event.target.files);
  
    if (files.length === 0) return;  
    
    const formData = new FormData();
    files.forEach((file, index) => formData.append(`files[${index}]`, file));  
  
    try {
      const response = await axiosPrivate.post('/attachments', formData, {
      });
  
      const { urls } = response.data.data;
  
      if (urls && urls.length > 0) {
        const updatedImages = [...uploadedImages, ...urls];
        setUploadedImages(updatedImages);
        setFieldValue('attachments.create', urls.map(url => ({
          file_path: url,
          original_name: url.split('/').pop() 
        })));
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleViewImage = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  const handleDeleteImage = (imageId, setFieldValue) => {
    setUploadedImages((prev) => prev.filter((image) => image.id !== imageId));
    setImagesToDelete((prev) => {
      const updatedImagesToDelete = [...prev, imageId];
      setFieldValue('attachments.delete', updatedImagesToDelete);
      return updatedImagesToDelete;
    });
  };

  const handleDownloadImage = (imageUrl) => {
    const downloadUrl = imageUrl.startsWith('http://localhost:8000')
      ? imageUrl
      : `http://localhost:8000${imageUrl}`;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downloadUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    const formattedValues = {
      ...values,
      attachments: {
        create: values.attachments.create || [],
        delete: imagesToDelete
      },
    };
  
    setIsSubmitting(true);
  
    try {
      await onSubmit(formattedValues);  
      resetForm();
      setUploadedImages([]);  
      setImagesToDelete([]);  
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        title: product?.title || '',
        description: product?.description || '',
        price: product?.price || '',
        category_id: product?.category?.id || '',
        attachments: {
          create: [],
          delete: [],
        },
      }}
      validationSchema={updateProductSchema}
      enableReinitialize
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        isValid,
      }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                name="title"
                as={TextField}
                fullWidth
                label="Title"
                required
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="description"
                as={TextField}
                fullWidth
                label="Description"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="price"
                as={TextField}
                fullWidth
                label="Price"
                type="number"
                required
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Field
                  name="category_id"
                  as={Select}
                  label="Category"
                  error={touched.category_id && Boolean(errors.category_id)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Field>
                {touched.category_id && errors.category_id && (
                  <div style={{ color: 'red' }}>
                    {errors.category_id}
                  </div>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={(event) => handleImageUpload(event, setFieldValue)}
                multiple
              />
              <Grid container spacing={2} style={{ marginTop: '16px' }}>
                {uploadedImages
                  .filter((image) => !imagesToDelete.includes(image.id))
                  .map((image, index) => (
                    <Grid item key={index}>
                      <IconButton onClick={() => handleViewImage(image)}>
                      <img 
                      src={image} 
                      alt={`uploaded ${index}`} 
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    />
                        <VisibilityIcon />
                        
                      </IconButton>
                      <IconButton onClick={() => handleDownloadImage(image.file_path)}>
                        <DownloadIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteImage(image.id, setFieldValue)}
                        disabled={imagesToDelete.includes(image.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Submitting...' : 'Update Product'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProductForm;
