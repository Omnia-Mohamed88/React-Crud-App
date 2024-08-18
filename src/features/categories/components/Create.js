// src/features/categories/components/Create.js
import React from 'react';
import CreateForm from '../forms/CreateForm';
import createCategorySchema from '../schema/createCategorySchema';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../../services/categoryServices';

const Create = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await createCategory(values);
    navigate('/categories');
  };

  return (
    <CreateForm
      initialValues={{ name: '' }}
      validationSchema={createCategorySchema}
      onSubmit={handleSubmit}
    />
  );
};

export default Create;
