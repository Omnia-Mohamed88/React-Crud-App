import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory, getCategoryById } from '../../../services/categoryServices'; // Adjust path if needed
import ReusableTable from '../../../components/ReusableTable';
import { Container, Paper } from '@mui/material';
import Update from './Update'; // Adjust path if needed

const List = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('Expected an array, but received:', data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const category = await getCategoryById(id);
      setSelectedCategory(category);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  const handleCategoryUpdate = () => {
    setCategories(categories.map(cat => cat.id === selectedCategory.id ? selectedCategory : cat));
    handleCloseModal();
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <ReusableTable
          headers={['ID', 'Title', 'Actions']}
          rows={categories}
          onEdit={handleUpdate}
          onDelete={handleDelete}
        />
        {modalOpen && selectedCategory && (
          <Update
            open={modalOpen}
            onClose={handleCloseModal}
            category={selectedCategory}
            onUpdate={handleCategoryUpdate}
          />
        )}
      </Paper>
    </Container>
  );
};

export default List;
