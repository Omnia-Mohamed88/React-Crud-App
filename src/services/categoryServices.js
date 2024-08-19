const API_URL = 'http://localhost:8000/api/categories'; 

// Fetch all categories
export const getCategories = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log('Fetched categories:', result); 
    return result.data || []; 
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return []; 
  }
};

// Create a new category
// export const createCategory = async (category) => {
//   try {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(category),
//     });

//     if (!response.ok) {
//       const errorResponse = await response.text(); 
//       console.error(`HTTP error! Status: ${response.status}, Response: ${errorResponse}`);
//       throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorResponse}`);
//     }

//     return response.json();
//   } catch (error) {
//     console.error('Failed to create category:', error.message);
//     throw error;
//   }
// };

export const createCategory = async (category) => {
    try {
      const formData = new FormData();
      formData.append('title', category.title);
  
      // Append multiple files if they exist
      if (category.images && category.images.length > 0) {
        for (let i = 0; i < category.images.length; i++) {
          formData.append('attachments[]', category.images[i]);
        }
      }
  
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorResponse = await response.text();
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
      const errorResponse = await response.text(); 
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
      const errorResponse = await response.text(); 
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
    console.log('Fetched category by ID:', result); 
    return result.data || {};
  } catch (error) {
    console.error('Failed to fetch category by ID:', error);
    return {}; 
  }
};
