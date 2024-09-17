import { useState, useEffect, useRef } from 'react';
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
import axios from 'api/axios'; 
import { createProductSchema } from 'features/Product/schema/createProductSchema';

const CreateProductForm = ({ onSubmit, serverErrors }) => {
  const [categories, setCategories] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const axiosPrivate = useAxiosPrivate(); 
  const fileInputRef = useRef(null);  

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response?.data?.data?.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageUpload = async (event, setFieldValue) => {
    const files = Array.from(event.target.files); 
  
    if (files.length === 0) return;  
    
    const formData = new FormData();
    files.forEach((file, index) => formData.append(`files[${index}]`, file));  
  
    try {
      const response = await axiosPrivate.post('/attachments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      const { urls } = response.data.data;
  
      if (urls && urls.length > 0) {
        const updatedImages = [...uploadedImages, ...urls];
        setUploadedImages(updatedImages);
        setFieldValue('image_url', updatedImages);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';  
        }
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
    
  };

  const handleViewImage = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  const handleDeleteImage = (imageUrl, setFieldValue) => {
    const updatedImages = uploadedImages.filter((image) => image !== imageUrl);
    setUploadedImages(updatedImages);
    setFieldValue('image_url', updatedImages);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';  
    }
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
      attachments: values.image_url.map((url) => ({ file_path: url })),  
    };
  
    setIsSubmitting(true);
  
    try {
      await onSubmit(formattedValues);  
      resetForm();
      setUploadedImages([]);  
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        price: '',
        category_id: '',
        image_url: [],
      }}
      validationSchema={createProductSchema}
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
                ref={fileInputRef} 
                multiple
              />
              {touched.image_url && errors.image_url && (
                <div style={{ color: 'red' }}>
                  {errors.image_url}
                </div>
              )}
              <Grid container spacing={2} style={{ marginTop: '16px' }}>
                {uploadedImages.map((imageUrl, index) => (
                  <Grid item key={index}>
                    <IconButton onClick={() => handleViewImage(imageUrl)}>
                    <img 
                      src={imageUrl} 
                      alt={`uploaded ${index}`} 
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    />
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDownloadImage(imageUrl)}>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteImage(imageUrl, setFieldValue)}>
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
                {isSubmitting ? 'Submitting...' : 'Submit Product'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProductForm;
