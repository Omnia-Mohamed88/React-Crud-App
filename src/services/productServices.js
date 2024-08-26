import axios from 'axios';
import { setAuthHeader } from 'services/authServices'; 

const API_URL = process.env.REACT_APP_API_URL + '/products';

export const getProducts = async (page = 1, searchTerm = '', categoryId = '') => {
  try {
    setAuthHeader(); 
    const perPage = 5;

    const response = await axios.get(API_URL, {
      params: {
        page,
        per_page: perPage,
        search: searchTerm || '',
        category_id: categoryId || '',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (product) => {
  try {
    setAuthHeader(); 
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category_id', product.category_id);

    if (product.images && product.images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        formData.append('attachments[]', product.images[i]);
      }
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create product:', error.message);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id, data) => {
  try {
    setAuthHeader(); 
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Update product API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
  try {
    setAuthHeader(); 
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log('Delete product API response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete product with ID ${id}:`, error.message);
    throw error;
  }
};

// Get a product by ID
export const getProductById = async (id) => {
  try {
    setAuthHeader(); 
    const response = await axios.get(`${API_URL}/${id}`);
    console.log('Get product by ID API response:', response.data);
    return response.data.data || {};
  } catch (error) {
    console.error(`Failed to fetch product by ID ${id}:`, error.message);
    return {};
  }
};
