import React, { useState, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Button, IconButton, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getCategories } from 'services/categoryServices';
import { uploadImage, deleteImage } from 'services/productServices';
import { createProductSchema } from 'features/products/schema/createProductSchema'; 

const CreateProductForm = ({ onSubmit, error }) => {
    const [categories, setCategories] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getCategories();
                setCategories(result.data || []);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleImageUpload = async (event, setFieldValue) => {
        const { files } = event.target;

        if (files && files.length > 0) {
            try {
                let imageUrl = await uploadImage(files[0]);
                const cleanedImageUrl = imageUrl.replace('http://localhost:8000', '');

                setUploadedImages([...uploadedImages, imageUrl]);
                setFieldValue('image_url', cleanedImageUrl); 
            } catch (error) {
                console.error('Failed to upload image:', error);
            }
        }
    };

    const handleViewImage = (imageUrl) => {
        const viewUrl = imageUrl.startsWith('http://localhost:8000') ? imageUrl : `http://localhost:8000${imageUrl}`;
        window.open(viewUrl, '_blank');
    };

    const handleDeleteImage = async (imageUrl, setFieldValue) => {
        try {
            await deleteImage(imageUrl);
            setUploadedImages(uploadedImages.filter(image => image !== imageUrl));
            setFieldValue('image_url', '');
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

    const handleFormSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true);
        try {
            await onSubmit(values);
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
                image_url: '' 
            }}
            validationSchema={createProductSchema} 
            onSubmit={handleFormSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isValid }) => (
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
                                    <div style={{ color: 'red' }}>{errors.category_id}</div>
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
                                {touched.image_url && errors.image_url && (
                                    <div style={{ color: 'red' }}>{errors.image_url}</div>
                                )}

                        </Grid>

                        {uploadedImages.map((imageUrl, index) => (
                            <Grid item xs={12} key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                <IconButton onClick={() => handleViewImage(imageUrl)} color="primary">
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteImage(imageUrl, setFieldValue)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDownloadImage(imageUrl)}>
                                    <DownloadIcon />
                                </IconButton>
                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Create Product'}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default CreateProductForm;
