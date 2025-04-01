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

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      return await response.json(); // Return API response
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
  
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
  
    try {
      // Ensure only required fields are sent
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };
  
      await registerUser(userData);
      setSuccessMessage("Account created successfully! Redirecting...");
  
      setTimeout(() => {
        navigate("/signin"); // Navigate to sign-in page
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || "Registration failed");
    }
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

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <form onSubmit={handleSubmit} className="form">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="input"
              required
            />

            <label className="input-label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />

            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
            />

            <label className="input-label">Confirm Password</label>
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








