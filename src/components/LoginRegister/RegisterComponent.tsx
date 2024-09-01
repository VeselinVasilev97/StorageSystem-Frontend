import React, { useEffect, useState } from "react";
import classes from "./LoginComponent.module.css";
import { Link, useNavigate } from "react-router-dom";
import appConfig from '../../../appConfig.json';

type FormType = {
  username: string;
  password: string;
  passwordConfirmation: string,
  email: string
};

const RegisterComponent = () => {
  const url = appConfig.environment[appConfig.environment.env as 'LOCAL' | 'PROD'].url;
  const navigate = useNavigate();
  const [data, setData] = useState<FormType>({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: ""
  });
  const [passCheck, setPassCheck] = useState(false)
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
      const response = await fetch(`${url}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            "username": data.username,
            "password": data.password,
            "email": data.email
          }
        ),
      });
      // if (!response.ok) {
      //   throw new Error("Register failed!");
      // }
      if (response.status === 409) {
        throw new Error("Username or email already exists");
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




  useEffect(() => {
    if (data.password !== data.passwordConfirmation) {
      setPassCheck(true)
    } else {
      setPassCheck(false)
    }
  }, [data])


  return (
    <div className={classes.wrapper}>
      <form className={classes.formStyle} onSubmit={handleSubmit}>
        <p className={classes.loginText}>Register</p>
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
          <input
            autoComplete="off"
            className={classes.credentialsInput}
            type="password"
            name="passwordConfirmation"
            value={data.passwordConfirmation}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />
        </div>
        <div className={classes.rowLogin}>
          <input
            autoComplete="off"
            className={classes.credentialsInput}
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className={classes.rowLogin}>
          <button type="submit" disabled={loading || passCheck}>
            {loading ? "Processing..." : "Create account"}
          </button>
        </div>
        <Link to="/login">Login from here</Link>
      </form>
    </div>
  );
};

export default RegisterComponent;
