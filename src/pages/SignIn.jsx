import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signin.css";
import Logo from "../assets/Logo.svg";
// import LoadingImage from "../assets/loading.png"; // Import the image

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading

    setTimeout(async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/users/login", {
          email: formData.email,
          password: formData.password,
        });

        console.log("Signed In", response.data);
        localStorage.setItem("token", response.data.token);

        navigate("/userdashboard");
      } catch (err) {
        setError(err.response?.data?.message || "Invalid credentials");
      } finally {
        setLoading(false); // Stop loading
      }
    }, 2000); // 2-second delay
  };

  return (
    <div className="container">
      <div className="logo-wrapper">
        <img src={Logo} alt="GreenBin Logo" className="logo-img" />
      </div>
      <div className="form-box">
        <h2 className="title">Welcome to GreenBin</h2>
        <p className="subtitle">Sign in to your account</p>
        {error && <p className="error-message">{error}</p>}
        
        {loading && (
          <div className="loading-container">
            <img src={LoadingImage} alt="Loading..." className="loading-img" />
            <p>Signing in...</p>
          </div>
        )}

        {!loading && (
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
        )}

        <p className="signup-text">
          Don't have an account? <a href="/signup" className="signup-link">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
