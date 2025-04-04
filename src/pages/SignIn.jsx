import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessPopup from "../components/Userdashboard/Navbar/SuccessPopup"; 
import ErrorPopup from "../components/Userdashboard/Navbar/ErrorPopup"; 
import "../styles/signin.css";
import Logo from "../assets/Logo.svg";
import Background from "../assets/Background.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      setPopupMessage("Login successful! Redirecting...");
      setShowSuccessPopup(true);

      setTimeout(() => {
        navigate("/userdashboard");
      }, 2000);
    } catch (err) {
      setPopupMessage(err.response?.data?.message || "Invalid credentials");
      setShowErrorPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="signin-container"
      style={{
        backgroundImage: `url(${Background})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="logo-wrapper">
        <img src={Logo} alt="GreenBin Logo" className="logo-img" />
      </div>
      <div className="form-box">
        <h2 className="title">Welcome to GreenBin</h2>
        <p className="subtitle">Sign in to your account</p>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Signing in...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
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
              <label htmlFor="email" className="label">Email</label>
            </div>

            <div className="input-group">
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
              <label htmlFor="password" className="label">Password</label>
            </div>

            <div className="options-container">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="checkbox"
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="/forgot-password" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        )}

        <p className="signup-text">
          Don't have an account? <a href="/" className="signup-link">Sign up</a>
        </p>
      </div>

      {showSuccessPopup && (
        <SuccessPopup message={popupMessage} onClose={() => setShowSuccessPopup(false)} />
      )}
      
      {showErrorPopup && (
        <ErrorPopup message={popupMessage} onClose={() => setShowErrorPopup(false)} />
      )}
    </div>
  );
};

export default SignIn;
