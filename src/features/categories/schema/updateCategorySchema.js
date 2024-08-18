// src/features/categories/schema/updateCategorySchema.js
import * as Yup from 'yup';

const updateCategorySchema = Yup.object({
  name: Yup.string().required('Category name is required'),
});

export default updateCategorySchema;
