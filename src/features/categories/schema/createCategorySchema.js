// src/features/categories/schema/createCategorySchema.js
import * as Yup from 'yup';

const createCategorySchema = Yup.object({
  name: Yup.string()
    .required('Category name is required')
    .max(50, 'Category name must be 50 characters or less'),
});

export default createCategorySchema;
