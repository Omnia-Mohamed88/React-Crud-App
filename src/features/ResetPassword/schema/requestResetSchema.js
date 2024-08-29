// src/features/reset_password/schema/requestResetSchema.js

import * as Yup from 'yup';

const requestResetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
});

export default requestResetSchema;
