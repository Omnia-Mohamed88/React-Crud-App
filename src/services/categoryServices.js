import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/categories';

export const getCategories = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        per_page: perPage
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return { data: [], meta: {} };
  }
};

export const createCategory = async (category) => {
  try {
    const formData = new FormData();
    formData.append('title', category.title);

    if (category.images && category.images.length > 0) {
      for (let i = 0; i < category.images.length; i++) {
        formData.append('attachments[]', category.images[i]);
      }
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Failed to create category:', error.message);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, category);
    return response.data;
  } catch (error) {
    console.error(`Failed to update category with ID ${id}:`, error.message);
    throw error;
  }
};


export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete category with ID ${id}:`, error.message);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(`Fetched category by ID ${id}:`, response.data);
    return response.data.data || {};
  } catch (error) {
    console.error(`Failed to fetch category by ID ${id}:`, error.message);
    return {};
  }
};
