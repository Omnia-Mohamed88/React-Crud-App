import React, { useState, useEffect } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { getCategories } from 'services/categoryServices';
import { updateProduct } from 'services/productServices'; 
import UpdateProductForm from 'features/products/forms/UpdateProductForm';

const UpdateProduct = ({ open, onClose, product, onUpdate }) => {
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

  const handleUpdateProduct = async (values) => {
    try {
      if (product) {
        const updatedProduct = await updateProduct(product.id, values);
        console.log('Product updated:', updatedProduct);
        onUpdate();
        onClose();
      } else {
        console.error('No product selected for update');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: '8px', width: '400px', margin: 'auto', marginTop: '10%' }}>
        {product ? (
          <UpdateProductForm
            product={product}
            categories={categories}
            onSubmit={handleUpdateProduct}
          />
        ) : (
          <div>No product selected for update</div>
        )}
      </Box>
    </Modal>
  );
};

export default UpdateProduct;
