import React from 'react';
import ReusableModal from '../../../components/ReusableModal';
import UpdateForm from '../forms/UpdateForm';
import { updateCategory } from '../../../services/categoryServices'; 

const Update = ({ open, onClose, category, onUpdate }) => {
  const handleUpdate = async (values) => {
    try {
      await updateCategory(category.id, values);
      onUpdate(); 
      onClose(); 
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="Update Category"
    >
      <UpdateForm category={category} onSubmit={handleUpdate} />
    </ReusableModal>
  );
};

export default Update;
