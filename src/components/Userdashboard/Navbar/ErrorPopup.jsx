import React, { useEffect } from 'react';
import './Popup.css';

const ErrorPopup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup-container error-popup">
      <div className="popup-content">
        <span className="popup-icon">✕</span>
        <span className="popupp-messagee">{message}</span>
        <button className="popup-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ErrorPopup;