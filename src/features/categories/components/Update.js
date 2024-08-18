import React from 'react';
import ReusableModal from '../../../components/ReusableModal';
import UpdateForm from '../forms/UpdateForm';
import { updateCategory } from '../../../services/categoryServices'; // Adjust path if needed

const Update = ({ open, onClose, category, onUpdate }) => {

  const handleUpdate = async (values) => {
    try {
      await updateCategory(category.id, values);
      onUpdate(); // Refresh categories list
      onClose(); // Close the modal
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
