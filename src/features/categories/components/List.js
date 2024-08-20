import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory, getCategoryById } from '../../../services/categoryServices'; 
import ReusableTable from '../../../components/ReusableTable';
import { Container, Paper } from '@mui/material';
import Update from './Update'; 
import ConfirmationModal from '../../../components/ConfirmationModal';
import PaginationComponent from '../../../components/PaginationComponent'; // Import the pagination component

const List = () => {
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({}); 
  const [page, setPage] = useState(1); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false); 
  const [categoryToDelete, setCategoryToDelete] = useState(null); 

  const fetchCategories = async (page) => {
    try {
      const response = await getCategories(page);
      setCategories(response.data);
      setMeta(response.meta); // Store the pagination meta data
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  const handleCategoryUpdate = async () => {
    await fetchCategories(page); 
    handleCloseUpdateModal(); 
  };

  const handleDelete = async () => {
    try {
      if (categoryToDelete !== null) {
        await deleteCategory(categoryToDelete);
        fetchCategories(page); 
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

  const handlePageChange = (newPage) => {
    setPage(newPage); 
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <ReusableTable
          headers={['ID', 'Title', 'Image', 'Actions']}
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
        <PaginationComponent meta={meta} onPageChange={handlePageChange} /> {/* Add Pagination Component */}
      </Paper>
    </Container>
  );
};

export default List;
