// src/features/categories/components/Update.js
import React, { useEffect, useState } from 'react';
import CreateForm from '../forms/CreateForm';
import createCategorySchema from '../schema/createCategorySchema';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCategory, getCategoryById } from '../../../services/categoryService';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoryById(id);
      setCategory(data);
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (values) => {
    await updateCategory(id, values);
    navigate('/categories');
  };

  if (!category) return <div>Loading...</div>;

  return (
    <CreateForm
      initialValues={category}
      validationSchema={createCategorySchema}
      onSubmit={handleSubmit}
    />
  );
};

export default Update;
