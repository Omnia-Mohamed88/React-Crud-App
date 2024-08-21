import * as Yup from 'yup';

export const updateProductSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters long')
    .max(50, 'Title must be at most 50 characters long'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be a positive number'),
  category_id: Yup.number()
    .required('Category ID is required')
    .min(1, 'Category ID must be a valid number'),
});
