import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../../../services/categoryServices'; // Adjust path if needed
import ReusableTable from '../../../components/ReusableTable';
import { Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (Array.isArray(data)) {
          setCategories(data.map(category => ({
            id: category.id,
            title: category.title,
          })));
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

  const handleUpdate = (id) => {
    navigate(`/categories/update/${id}`);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <ReusableTable
          headers={['Title']}
          rows={categories}
          onEdit={handleUpdate}
          onDelete={handleDelete}
        />
      </Paper>
    </Container>
  );
};

export default List;
