// src/features/login/schema/loginSchema.js

import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Required'),
});

export default loginSchema;
