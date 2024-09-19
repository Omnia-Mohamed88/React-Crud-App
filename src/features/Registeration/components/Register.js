import { useContext, useState } from "react";
import { Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RegisterForm from "features/Registeration/forms/RegisterForm";
import Swal from "sweetalert2";
import ServerSideValidationMessagesWrapper from "components/ServerSideValidationMessagesWrapper";
import axios from "api/axios";
import Cookies from "js-cookie";
import AuthContext from "context/AuthContext";

const RegisterComponent = () => {
  const { setAuth } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [serverSideErrors, setServerSideErrors] = useState("");
  const navigate = useNavigate();
  
  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    setServerSideErrors("");
    try {
      const response = await axios.post("/register", values);
      Cookies.set("token", response.data.data.token);
      Cookies.set("name", response.data.data.name);
      Cookies.set("email", response.data.data.email);
      Cookies.set("role_id", response.data.data.role_id);
      Cookies.set("role_name", response.data.data.role_name);
      setAuth({
        token: response.data.data.token,
        role_id: response.data.data.role_id,
        role_name: response.data.data.role_name,
        isAuth: true,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      if (error.response.status === 422) {
        setServerSideErrors(error.response.data.errors);
      }
    }finally {
      setSubmitting(false); 
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <ServerSideValidationMessagesWrapper error={serverSideErrors} />
      <Paper
        elevation={3}
        style={{
          padding: "16px",
        }}
      >
        <Typography variant="h5" style={{ paddingBottom: "16px" }}>
          Register
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <RegisterForm onSubmit={handleRegister} />
      </Paper>
    </Container>
  );
};

export default RegisterComponent;
