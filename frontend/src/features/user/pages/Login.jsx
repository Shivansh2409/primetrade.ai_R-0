import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }
    // Standalone - no API call

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading)
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="logo">PrimeTrade</div>
          <h1 className="title">Loading...</h1>
        </div>
      </div>
    );

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">PrimeTrade</div>
        <h1 className="title">Create Account</h1>
        <p className="subtitle">Join us today</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>
        <p className="signup-link">
          Already have an account? <Link to="/register">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
