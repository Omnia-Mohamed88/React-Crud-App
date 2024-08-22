// src/features/register/schema/registerSchema.js
import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

export default registerSchema;
