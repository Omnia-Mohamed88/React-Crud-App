import React, { useState, useEffect } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { getCategories } from 'services/categoryServices';
import { uploadImage } from 'services/productServices'; 

const CreateProductForm = ({ onSubmit, error }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category_id: '',
        image_url: ''  
    });
    const [categories, setCategories] = useState([]);

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
          console.log('Selected file:', files[0]);
      
          try {
            const imageUrl = await uploadImage(files[0]);
            console.log('Uploaded image URL:', imageUrl);
      
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
      
      
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting product: in form', formData); 
        try {
            await onSubmit(formData);
            setFormData({
                title: '',
                description: '',
                price: '',
                category_id: '',
                image_url: '',
            });
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
