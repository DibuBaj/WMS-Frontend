import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log("Signed In", formData);
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="title">Welcome back</h2>
        <p className="subtitle">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
          <div className="options-container">
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="checkbox"
              />
              <label>Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="submit-btn">
            Sign in
          </button>
        </form>
        <p className="signup-text">
          Don't have an account? <a href="/signup" className="signup-link">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
