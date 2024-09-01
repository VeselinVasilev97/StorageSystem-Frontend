import React, { useState } from "react";
import classes from "./LoginComponent.module.css";
import { Link, useNavigate } from "react-router-dom";
import appConfig from '../../../appConfig.json';
type FormType = {
  username: string;
  password: string;
};

const LoginComponent = () => {
  const url = appConfig.environment[appConfig.environment.env as 'LOCAL' | 'PROD'].url;

  
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
      sessionStorage.setItem("authToken", result.token);
      localStorage.removeItem("authToken")
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
        <p className={classes.loginText}>Login</p>
        <div className={classes.errorTextDiv}>
          {error && <p className={classes.error}>{error}</p>}
        </div>
        <div className={classes.rowLogin}>
          <input
            autoComplete="off"
            className={classes.credentialsInput}
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className={classes.rowLogin}>
          <input
            autoComplete="off"
            className={classes.credentialsInput}
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className={classes.rowLogin}>
          <button className={classes.loginButton} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <Link to="/register">Register now</Link>
      </form>
    </div>
  );
};

export default LoginComponent;
