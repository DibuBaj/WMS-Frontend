import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Otp.css";
import Otpp from "../assets/Otpp.png";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your@email.com";

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Auto focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    // Call API or verification logic here
    if (enteredOtp.length === 4) {
      alert(`OTP Verified: ${enteredOtp}`);
      navigate("/signin");
    } else {
      alert("Please enter the 4-digit OTP.");
    }
  };

  return (
    <div className="otp-container">
      <img src={Otpp} alt="OTP" className="otp-image" />

      <h2 className="otp-title">OTP Verification</h2>
      <p className="otp-subtitle">
        Enter the OTP sent to <strong>{email}</strong>
      </p>

      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            className="otp-box"
          />
        ))}
      </div>

      <p className="resend-code">Resend code</p>

      <button className="verify-btn" onClick={handleSubmit}>
        Verify & Proceed
      </button>
    </div>
  );
};

export default Otp;
