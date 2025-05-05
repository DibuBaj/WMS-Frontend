import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Forgotpassword.css'; 
import formImage from '../assets/Mail.png';

const ForgotOtp = () => {
    const navigate = useNavigate(); 

    const handleContinue = () => {
      navigate('/setpassword'); 
    };
  return (
    <div className="forgot-password-container">
      <div className="forms-section">
        <div className="progress-bar-wrapper">
          <h4>Check your mail</h4>
          <div className="progress-bar">
            <div className="progress-filled step2"></div>
          </div>
          <span className="step-label">Step 2/4</span>
        </div>

        <img src={formImage} alt="Mail icon" className="form-image" />

        <h2>Check your mail!</h2>
        <p className="subtitle">We sent a 6-digit OTP to mario@phamatin.com</p>

        <div className="otp-inputs">
          {[...Array(6)].map((_, i) => (
            <input key={i} type="text" maxLength="1" className="otp-box" />
          ))}
        </div>

        {/* <button>Verify OTP</button> */}
        <button onClick={handleContinue}>Verify OTP</button>
        <a href="/signin" className="back">Back to Sign in</a>
      </div>

      {/* <div className="image-section">
        {/* Optional side image 
      </div> */}
    </div>
  );
};

export default ForgotOtp;
