import { useFormik } from "formik";
import { TextField, Button, Grid, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import registerSchema from "features/Registeration/schema/registerSchema";

const RegisterForm = ({ onSubmit, error }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        await onSubmit(values, { setErrors });
      } catch (err) {}
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            {...formik.getFieldProps("name")}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            {...formik.getFieldProps("password_confirmation")}
            error={
              formik.touched.password_confirmation &&
              Boolean(formik.errors.password_confirmation)
            }
            helperText={
              formik.touched.password_confirmation &&
              formik.errors.password_confirmation
            }
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography color="error" align="center">
              {error}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Registering..." : "Register"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/login")}
            >
              Login
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
