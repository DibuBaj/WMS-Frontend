import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SuccessPopup from "../components/Userdashboard/Navbar/SuccessPopup";
import ErrorPopup from "../components/Userdashboard/Navbar/ErrorPopup";
import "../styles/signup.css";
import Logo from "../assets/Logo.svg";
import Background from "../assets/Background.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const inputRefs = {
    fullName: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null)
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName) => {
    if (!formData[fieldName]) {
      setFocusedField(null);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    return true;
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register user");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowErrorPopup(false);
    setShowSuccessPopup(false);
    setPasswordError("");

    if (!validatePasswords()) {
      setLoading(false);
      return;
    }

    if (!formData.agreedToTerms) {
      setPopupMessage("You must agree to the terms and conditions");
      setShowErrorPopup(true);
      setLoading(false);
      return;
    }

    try {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };

      await registerUser(userData);
      setPopupMessage("Account created successfully! Redirecting...");
      setShowSuccessPopup(true);

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      setPopupMessage(error.message || "Registration failed");
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
      <div className="background-container">
        <div className="logoo-wrapperr">
          <img src={Logo} alt="GreenBin Logo" className="logo-img" />
        </div>
        <div className="formm-boxx">
          <h2 className="title">Create your account</h2>
          <p className="subtitle">Join our community today</p>

          <form onSubmit={handleSubmit} className="form">
            <div className="inputt-groupp">
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="input"
                required
                onFocus={() => handleFocus('fullName')}
                onBlur={() => handleBlur('fullName')}
                ref={inputRefs.fullName}
              />
              <label 
                className={`input-label ${focusedField === 'fullName' || formData.fullName ? 'focused' : ''}`}
                onClick={() => inputRefs.fullName.current.focus()}
              >
                Full Name
              </label>
            </div>

            <div className="inputt-groupp">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                ref={inputRefs.email}
              />
              <label 
                className={`input-label ${focusedField === 'email' || formData.email ? 'focused' : ''}`}
                onClick={() => inputRefs.email.current.focus()}
              >
                Email
              </label>
            </div>

            <div className="inputt-groupp">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                required
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                ref={inputRefs.password}
              />
              <label 
                className={`input-label ${focusedField === 'password' || formData.password ? 'focused' : ''}`}
                onClick={() => inputRefs.password.current.focus()}
              >
                Password
              </label>
            </div>

            <div className="inputt-groupp">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input"
                required
                onFocus={() => handleFocus('confirmPassword')}
                onBlur={() => handleBlur('confirmPassword')}
                ref={inputRefs.confirmPassword}
              />
              <label 
                className={`input-label ${focusedField === 'confirmPassword' || formData.confirmPassword ? 'focused' : ''}`}
                onClick={() => inputRefs.confirmPassword.current.focus()}
              >
                Confirm Password
              </label>
              {passwordError && (
                <p className="password-error-message">{passwordError}</p>
              )}
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="checkbox"
                required
              />
              <span>I agree to the <a href="/terms" className="terms-link">Terms</a> and <a href="/privacy" className="terms-link">Privacy Policy</a></span>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="signin-text">
            Already have an account? <a href="/signin" className="signin-link">Sign in</a>
          </p>
        </div>
      </div>

      {showSuccessPopup && (
        <SuccessPopup
          message={popupMessage}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
      {showErrorPopup && (
        <ErrorPopup
          message={popupMessage}
          onClose={() => setShowErrorPopup(false)}
        />
      )}
    </div>
  );
};

export default SignUp;