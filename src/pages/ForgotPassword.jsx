import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Forgotpassword.css';
import formImage from '../assets/forgotpassword.jpg';

const ForgotPassword = () => {
  const navigate = useNavigate(); 

  const handleContinue = () => {
    navigate('/forgototp'); 
  };

  return (
    <div className="forgot-password-container">
      <div className="forms-section">
        <div className="progress-bar-wrapper">
          <h4>Forgot Password</h4>
          <div className="progress-bar">
            <div className="progress-filled"></div>
          </div>
          <span className="step-label">Step 1/4</span>
        </div>

        <img src={formImage} alt="Progress" className="form-image" />

        <h2>Forgot Password</h2>
        <p className="subtitle">No Worries, we'll handle it.</p>

        <label htmlFor="email">Gmail</label>
        <div className="input-box">
          <span>📧</span>
          <input type="email" id="email" placeholder="mario@phamatin.com" />
        </div>

        <button onClick={handleContinue}>Continue</button>
        <a href="/signin" className="back">Back to Sign in</a>
      </div>

      {/* <div className="image-section">
        {/* <img src={sideImage} alt="Person Illustration" /> 
      </div> */}
    </div>
  );
};

export default ForgotPassword;
