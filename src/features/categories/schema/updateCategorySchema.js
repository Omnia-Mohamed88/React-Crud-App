// src/features/categories/schema/updateCategorySchema.js
import * as Yup from 'yup';

const updateCategorySchema = Yup.object({
    title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters long')
    .max(50, 'Title must be at most 50 characters long'),});

export default updateCategorySchema;
