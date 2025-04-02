// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/signup.css";
// import Logo from "../assets/Logo.svg";
// import Background from "../assets/Background.png";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agreedToTerms: false,
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const registerUser = async (userData) => {
//     try {
//       const response = await fetch("http://localhost:3000/api/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to register user");
//       }

//       return await response.json(); 
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");
  
//     if (formData.password !== formData.confirmPassword) {
//       setErrorMessage("Passwords do not match!");
//       return;
//     }
  
//     try {
//       const userData = {
//         fullName: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//       };
  
//       await registerUser(userData);
//       setSuccessMessage("Account created successfully! Redirecting...");
  
//       setTimeout(() => {
//         navigate("/signin"); 
//       }, 2000);
//     } catch (error) {
//       setErrorMessage(error.message || "Registration failed");
//     }
//   };
  
  
//   return (
//     <div
//       className="signup-container"
//       style={{
//         backgroundImage: `url(${Background})`, 
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div className="background-container">
//         <div className="logo-wrapper">
//           <img src={Logo} alt="GreenBin Logo" className="logo-imgg" />
//         </div>
//         <div className="form-box">
//           <h2 className="title">Create your account</h2>
//           <p className="subtitle">Enter your details to get started</p>

//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           {successMessage && <p className="success-message">{successMessage}</p>}

//           <form onSubmit={handleSubmit} className="form">
//             <label className="input-label">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="input"
//               required
//             />

//             <label className="input-label">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email address"
//               value={formData.email}
//               onChange={handleChange}
//               className="input"
//               required
//             />

//             <label className="input-label">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="input"
//               required
//             />

//             <label className="input-label">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="input"
//               required
//             />

//             <div className="checkbox-container">
//               <input
//                 type="checkbox"
//                 name="agreedToTerms"
//                 checked={formData.agreedToTerms}
//                 onChange={handleChange}
//                 className="checkbox"
//                 required
//               />
//               <label>I agree to the Terms of Service and Privacy Policy</label>
//             </div>

//             <button type="submit" className="submit-btn">
//               Create Account
//             </button>
//           </form>

//           <p className="signin-text">
//             Already have an account? <a href="/signin" className="signin-link">Sign in</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;








import React, { useState } from "react";
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

  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear password error when either field changes
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

    // Validate passwords match
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
              <label className="input-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="inputt-groupp">
              <label className="input-label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="inputt-groupp">
              <label className="input-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="inputt-groupp">
              <label className="input-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input"
                required
              />
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

      {/* Popup Components */}
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