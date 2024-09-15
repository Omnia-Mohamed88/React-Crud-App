import { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  IconButton,
  FormHelperText
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Form, Field } from 'formik';
import useAxiosPrivate from 'hooks/useAxiosPrivate'; 
import { createCategorySchema } from 'features/Category/Schemas/createCategorySchema'; 

const CreateCategoryForm = ({ onSubmit, serverErrors }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const axiosPrivate = useAxiosPrivate(); 

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
      console.error('Error creating category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        title: '',
        image_url: [],
      }}
      validationSchema={createCategorySchema} 
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
        dirty,
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
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={(event) => handleImageUpload(event, setFieldValue)}
                multiple
              />
              {touched.image_url && errors.image_url && (
                <FormHelperText error>
                  {errors.image_url}
                </FormHelperText>
              )}
              <Grid container spacing={2} style={{ marginTop: '16px' }}>
                {uploadedImages.map((imageUrl, index) => (
                  <Grid item key={index}>
                    <IconButton onClick={() => handleViewImage(imageUrl)}>
                      <VisibilityIcon />
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
                disabled={isSubmitting || !isValid || !dirty}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Category'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCategoryForm;
