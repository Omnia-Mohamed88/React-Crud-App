import React, { useState, useEffect } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { getCategories } from 'services/categoryServices';
import { uploadImage, deleteImage } from 'services/productServices';

const CreateProductForm = ({ onSubmit, error }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category_id: '',
        image_url: ''
    });
    const [categories, setCategories] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);

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

    const handleChange = async (event) => {
        const { name, value, files } = event.target;

        if (name === 'images' && files && files.length > 0) {
            try {
                let imageUrl = await uploadImage(files[0]);
                console.log('Uploaded image URL:', imageUrl);

                if (!imageUrl.startsWith('http')) {
                    imageUrl = `http://localhost:8000${imageUrl}`;
                }

                setUploadedImages([...uploadedImages, imageUrl]);
                setFormData({
                    ...formData,
                    image_url: imageUrl,
                });
            } catch (error) {
                console.error('Failed to upload image:', error);
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleViewImage = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    const handleDeleteImage = async (imageUrl) => {
        try {
            await deleteImage(imageUrl);
            setUploadedImages(uploadedImages.filter(image => image !== imageUrl));
            setFormData({
                ...formData,
                image_url: '', 
            });
        } catch (error) {
            console.error('Failed to delete image:', error.message);
        }
    };

    const handleDownloadImage = (imageUrl) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = imageUrl.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await onSubmit(formData);
            setFormData({
                title: '',
                description: '',
                price: '',
                category_id: '',
                image_url: '',
            });
            setUploadedImages([]);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            label="Category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </Grid>

                {uploadedImages.map((imageUrl, index) => (
                    <Grid item xs={12} key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <img
                            src={imageUrl}
                            alt={`Uploaded ${index}`}
                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                        />
                        <IconButton onClick={() => handleViewImage(imageUrl)} color="primary">
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteImage(imageUrl)} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDownloadImage(imageUrl)}>
                            <DownloadIcon />
                        </IconButton>
                    </Grid>
                ))}

                <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        Create Product
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CreateProductForm;
