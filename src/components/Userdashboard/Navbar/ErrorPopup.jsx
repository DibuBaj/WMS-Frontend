import React, { useEffect } from 'react';
import './Popup.css';

const ErrorPopup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
<<<<<<< HEAD
    }, 2000); 
=======
    }, 2000); // Auto-close after 5 seconds
>>>>>>> caf6b3c (Issue in pickup)

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