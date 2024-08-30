import React, { useState } from "react";
import classes from "./LoginComponent.module.scss";
import { redirect, useNavigate } from "react-router-dom";

type FormType = {
  username: string;
  password: string;
};

const LoginComponent = () => {
  const navigate = useNavigate();
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
      const response = await fetch("http://localhost:8001/api/login", {
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
      localStorage.setItem("authToken", result.token);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.formStyle} onSubmit={handleSubmit}>
        <h4>Login</h4>
        <div className={classes.errorTextDiv}>
          {error && <p className={classes.error}>{error}</p>}
        </div>
        <div>
          <input
            className={classes.credentialsInput}
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            className={classes.credentialsInput}
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
