// src/services/productServices.js
import axios from 'axios';

// Use environment variable for the API URL
const API_URL = process.env.REACT_APP_API_URL + '/products';

// Fetch all products with pagination
export const getProducts = async (page = 1, perPage = 5) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        per_page: perPage
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { data: [], meta: {} };
  }
};

// Create a new product
export const createProduct = async (product) => {
  try {
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);

    if (product.images && product.images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        formData.append('attachments[]', product.images[i]);
      }
    }

    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error('Failed to create product:', error.message);
    throw error;
  }
};

// Update an existing product by ID
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(`Failed to update product with ID ${id}:`, error.message);
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete product with ID ${id}:`, error.message);
    throw error;
  }
};

// Get a product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data || {};
  } catch (error) {
    console.error(`Failed to fetch product by ID ${id}:`, error.message);
    return {};
  }
};
