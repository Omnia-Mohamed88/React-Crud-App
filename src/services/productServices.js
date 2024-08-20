import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/products';


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

 
export const createProduct = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  
  // Update an existing product by ID
  export const updateProduct = async (id, product) => {
    try {
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
  
      const response = await axios.put(`${API_URL}/${id}`, formData);
      console.log('Update product API response:', response.data); 
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
      console.log('Delete product API response:', response.data); // Log the response
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
      console.log('Get product by ID API response:', response.data); 
      return response.data.data || {};
    } catch (error) {
      console.error(`Failed to fetch product by ID ${id}:`, error.message);
      return {};
    }
  };