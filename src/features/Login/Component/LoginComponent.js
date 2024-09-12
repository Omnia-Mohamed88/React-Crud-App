import { useState, useContext } from "react";
import { Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "features/Login/Form/Login";
import Swal from "sweetalert2";
import ServerSideValidationMessagesWrapper from "components/ServerSideValidationMessagesWrapper";
import Cookies from "js-cookie";
import axios from "api/axios";
import AuthContext from "context/AuthContext";

const LoginComponent = () => {
  const [serverSideErrors, setServerSideErrors] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async (values, { setSubmitting }) => {
    setServerSideErrors("");
    try {
      const { data } = await axios.post("/login", values);
      const { token, name, email, role_id, role_name } = data.data;

      Cookies.set("token", token);
      Cookies.set("name", name);
      Cookies.set("email", email);
      Cookies.set("role_id", role_id);
      Cookies.set("role_name", role_name);
      // setAuth({ token, roles: [{ id: role.id, name: role.name }], isAuth: true });
      setAuth({
        token,
        role_id: role_id,
        role_name: role_name,
        isAuth: true,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      if (error.response?.status === 422) {
        setServerSideErrors(error.response.data.errors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <ServerSideValidationMessagesWrapper error={serverSideErrors} />
      <Paper elevation={3} sx={{ padding: "16px" }}>
        <Typography variant="h5" sx={{ paddingBottom: "16px" }}>
          Login
        </Typography>
        <LoginForm onSubmit={handleLogin} />
      </Paper>
    </Container>
  );
};

export default LoginComponent;
