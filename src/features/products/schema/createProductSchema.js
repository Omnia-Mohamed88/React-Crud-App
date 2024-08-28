// features/products/schema/createProductSchema.js
import * as yup from 'yup';

export const createProductSchema = yup.object().shape({
  title: yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters long')
    .max(50, 'Title must be at most 50 characters long'),
  description: yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),
  price: yup.number()
    .required('Price is required')
    .positive('Price must be a positive number')
    .min(0, 'Price must be a positive number'),
  category_id: yup.number()
    .required('Category ID is required')
    .min(1, 'Category ID must be a valid number'),
});
