import * as Yup from 'yup';

export const createCategorySchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters long')
    .max(50, 'Title must be at most 50 characters long'),
});
