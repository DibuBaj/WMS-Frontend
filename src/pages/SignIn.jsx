import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";
import Logo from "../assets/Logo.svg";

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
      <div className="logo-wrapper">
        <img src={Logo} alt="GreenBin Logo" className="logo-img" />
      </div>
      <div className="form-box">
        <h2 className="title">Welcome to GreenBin</h2>
        <p className="subtitle">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
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
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="submit-btn">
            Sign in
          </button>
        </form>
        <p className="signup-text">
          Don't have an account? <a href="/" className="signup-link">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;