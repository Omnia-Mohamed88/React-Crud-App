import * as Yup from 'yup';

const updateCategorySchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters long')
    .max(50, 'Title must be at most 50 characters long'),
  image: Yup.mixed()
    .optional()
    .test('fileSize', 'File too large', value => !value || (value && value.size <= 2 * 1024 * 1024)) // Limit to 2MB
    .test('fileType', 'Unsupported File Format', value => !value || (value && ['image/jpeg', 'image/png'].includes(value.type))),
});

export default updateCategorySchema;
