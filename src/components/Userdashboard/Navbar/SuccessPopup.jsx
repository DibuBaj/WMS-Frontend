import React, { useEffect, useState } from 'react';
import './Popup.css';

const SuccessPopup = ({ message, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div className={`popup-container success-popup ${isClosing ? 'closing' : ''}`}>
      <div className="popup-content">
        <span className="popup-icon">✓</span>
        <p className="popupp-messagee">{message}</p>
        <button className="popup-close" onClick={handleClose}>×</button>
      </div>
    </div>
  );
};

export default SuccessPopup;