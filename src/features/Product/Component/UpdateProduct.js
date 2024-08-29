import React, { useState, useEffect } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { getCategories } from 'services/categoryServices';
import { updateProduct } from 'services/productServices';
import UpdateProductForm from 'features/Product/forms/UpdateProductForm';

const UpdateProduct = ({ open, onClose, product, onUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [serverErrors, setServerErrors] = useState({});

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

  const handleUpdateProduct = async (values) => {
    try {
      await updateProduct(product.id, values);
      console.log('Product updated successfully');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setServerErrors(error.response.data.errors);
      } else {
        setServerErrors({ general: 'Failed to update product. Please try again.' });
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: '8px', width: '400px', margin: 'auto', marginTop: '10%' }}>
        <UpdateProductForm
          product={product}
          categories={categories}
          onSubmit={handleUpdateProduct}
          serverErrors={serverErrors}
        />
      </Box>
    </Modal>
  );
};

export default UpdateProduct;
