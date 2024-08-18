const API_URL = 'http://localhost:8000/api/categories'; // Replace with your API URL

// Fetch all categories
export const getCategories = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log('Fetched categories:', result); // Log the entire result
    return result.data || []; // Ensure it returns an array
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return []; // Return an empty array in case of an error
  }
};

// Create a new category
export const createCategory = async (category) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      // Attempt to parse the response body for more error details
      const errorResponse = await response.text(); // or response.json() if the server sends JSON errors
      console.error(`HTTP error! Status: ${response.status}, Response: ${errorResponse}`);
      throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorResponse}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to create category:', error.message);
    throw error;
  }
};

// Update an existing category by ID
export const updateCategory = async (id, category) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      // Attempt to parse the response body for more error details
      const errorResponse = await response.text(); // or response.json() if the server sends JSON errors
      console.error(`HTTP error! Status: ${response.status}, Response: ${errorResponse}`);
      throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorResponse}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to update category:', error);
    throw error;
  }
};

// Delete a category by ID
export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      // Attempt to parse the response body for more error details
      const errorResponse = await response.text(); // or response.json() if the server sends JSON errors
      console.error(`HTTP error! Status: ${response.status}, Response: ${errorResponse}`);
      throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorResponse}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to delete category:', error.message);
    throw error;
  }
};

// Fetch a category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log('Fetched category by ID:', result); // Log the result
    return result.data || {}; // Ensure it returns an object
  } catch (error) {
    console.error('Failed to fetch category by ID:', error);
    return {}; // Return an empty object in case of an error
  }
};
