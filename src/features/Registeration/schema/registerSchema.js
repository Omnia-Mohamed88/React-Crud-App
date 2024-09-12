import * as Yup from 'yup';

const registerSchema = Yup.object({
  name: Yup.string().required("Name is required").max(50),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export default registerSchema;
