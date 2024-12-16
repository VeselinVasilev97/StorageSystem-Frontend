import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert, CircularProgress, Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import appConfig from "../../../appConfig.json";
import { useAuth } from "../Context/AuthContext";
import classes from "./LoginComponent.module.css";

type FormType = {
  username: string;
  password: string;
};

const LoginComponent = () => {
  const url = appConfig.environment[appConfig.environment.env as "LOCAL" | "PROD"].url;
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState<FormType>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed!");
      }
      const result = await response.json();

      login(result);
      sessionStorage.setItem("authToken", result.token);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Username"
          name="username"
          value={data.username}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          // required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          type="password"
          // required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <MuiLink component={Link} to="/forgot-password" underline="hover">
            Forgot Password?
          </MuiLink>
          <MuiLink component={Link} to="/register" underline="hover">
            Create an Account
          </MuiLink>
        </Box>
      </form>
    </Box>
    </div>
  );
};

export default LoginComponent;
