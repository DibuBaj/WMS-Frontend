import React from 'react';
import './Header.css';

import Logo from "../../../assets/Logo.svg";
import Adminlogo from "../../../assets/Adminlogo.svg"; 


const Header = () => {
  return (
    <div className="header">
          <div className="top-navbar">
            <img src={Logo} alt="GreenBin Logo" className="sidebar-logo" />
            <span className="GreenBinText">GreenBin</span>
    
            <div className="profile-container">
              <img src={Adminlogo} alt="Profile" className="profile-icon" />
            </div>
        </div>
    </div>
  );
};

export default Header;