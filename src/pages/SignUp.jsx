import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import Logo from "../assets/Logo.svg";


const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
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
    // Handle form submission logic here
    console.log("Form Submitted", formData);
    navigate("/signin"); // Navigate to sign-in page
  };

  return (
    <div className="container">
      <div className="background-container">
        <div className="logo-wrapper">
          <img src={Logo} alt="GreenBin Logo" className="logo-imgg" />
        </div>
      <div className="form-box">
        <h2 className="title">Create your account</h2>
        <p className="subtitle">Enter your details to get started</p>
        <form onSubmit={handleSubmit} className="form">

        <label className="input-label-name">Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="input"
            required
          />

        <label className="input-label-email">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
          <label className="input-label-password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />

        <label className="input-label-re-password">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input"
            required
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              className="checkbox"
              required
            />
            <label>I agree to the Terms of Service and Privacy Policy</label>
          </div>
          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
        <p className="signin-text">
          Already have an account? <a href="/signin" className="signin-link">Sign in</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
