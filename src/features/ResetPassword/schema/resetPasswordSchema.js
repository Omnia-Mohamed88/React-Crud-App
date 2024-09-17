// src/features/reset_password/schema/resetPasswordSchema.js

import * as Yup from 'yup';

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default resetPasswordSchema;
