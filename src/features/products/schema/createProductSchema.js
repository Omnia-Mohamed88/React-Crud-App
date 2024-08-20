import * as yup from 'yup';

const createProductSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .typeError('Price must be a number'),
  category_id: yup.number().required('Category is required'),
  image: yup.mixed().required('Image is required'),
});

export default createProductSchema;
