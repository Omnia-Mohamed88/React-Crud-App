import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, MenuItem } from '@mui/material';
import { updateProduct } from '../../../services/productServices';
import { getCategories } from '../../../services/categoryServices';

const UpdateProduct = ({ open, onClose, product, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category_id: '',
    attachments: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        category_id: product.category_id || '',
        attachments: null, 
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachments') {
      setFormData({
        ...formData,
        attachments: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('description', formData.description);
    updatedData.append('price', formData.price);
    updatedData.append('category_id', formData.category_id);

    if (formData.attachments) {
      for (let i = 0; i < formData.attachments.length; i++) {
        updatedData.append('attachments[]', formData.attachments[i]);
      }
    }

    try {
      await updateProduct(product.id, updatedData);
      onUpdate();  
      onClose();   
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: '8px', width: '400px', margin: 'auto', marginTop: '10%' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Category"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" component="label" fullWidth margin="normal">
            Upload Attachments
            <input
              type="file"
              multiple
              hidden
              name="attachments"
              onChange={handleChange}
            />
          </Button>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Product
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateProduct;
