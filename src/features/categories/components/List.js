// src/pages/CategoryListPage.js
import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory, getCategoryById } from '../../../services/categoryServices'; 
import ReusableTable from '../../../components/ReusableTable';
import { Container, Paper } from '@mui/material';
import Update from './Update'; 
import ConfirmationModal from '../../../components/ConfirmationModal'; 

const List = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false); 
  const [categoryToDelete, setCategoryToDelete] = useState(null); 

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryUpdate = async () => {
    await fetchCategories(); 
    handleCloseUpdateModal(); 
  };

  const handleDelete = async () => {
    try {
      if (categoryToDelete !== null) {
        await deleteCategory(categoryToDelete);
        fetchCategories(); 
        setConfirmationOpen(false);
        setCategoryToDelete(null);
      }
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

  const handleCloseUpdateModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  const handleOpenConfirmation = (id) => {
    setCategoryToDelete(id);
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <ReusableTable
          headers={['ID', 'Title', 'Image', 'Actions']} // Added 'Image' header
          rows={categories}
          onEdit={handleUpdate}
          onDelete={handleOpenConfirmation} 
        />
        {modalOpen && selectedCategory && (
          <Update
            open={modalOpen}
            onClose={handleCloseUpdateModal}
            category={selectedCategory}
            onUpdate={handleCategoryUpdate} 
          />
        )}
        <ConfirmationModal
          open={confirmationOpen}
          onClose={handleCloseConfirmation}
          onConfirm={handleDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this category?"
        />
      </Paper>
    </Container>
  );
};

export default List;
