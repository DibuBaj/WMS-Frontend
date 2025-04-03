import React, { useState, useEffect } from "react";
import "./UserSettings.css";
import Adminlogo from "../../../assets/Adminlogo.svg";
import Camera from "../../../assets/Camera.svg";
import LogoutIcon from "../../../assets/Logouticon.svg";
import DeleteIcon from "../../../assets/Delete.svg";

const UserSettings = () => {
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || Adminlogo); // Load from localStorage if available

  const handleLogoutClick = () => {
    setIsLogoutPopupOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };

  const closePopups = () => {
    setIsLogoutPopupOpen(false);
    setIsDeletePopupOpen(false);
  };

  // Handle Avatar Change
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Update avatar with the selected image
        localStorage.setItem("avatar", reader.result); // Save the avatar to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings-page">
      <div className={`settings-layout ${isLogoutPopupOpen || isDeletePopupOpen ? "blur-background" : ""}`}>
        <div className="user-settings-container">
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar-container">
                <img src={avatar} alt="User Avatar" className="avatar" />
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }} // Hide the file input element
                />
                <img
                  src={Camera}
                  alt="Change Avatar"
                  className="camera-icon"
                  onClick={() => document.getElementById('avatarInput').click()} // Trigger file input click
                />
              </div>
              <div className="profile-info">
                <h2>Profile Settings</h2>
                <p>Update your personal information</p>
              </div>
            </div>

            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" defaultValue=" " className="input-field" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" defaultValue=" " className="input-field" />
              </div>

              <button className="save-button">Save Changes</button>
            </div>
          </div>

          <div className="account-actions">
            <h3>Account Actions</h3>
            <button className="action-button logout" onClick={handleLogoutClick}>
              <img src={LogoutIcon} alt="Logout" className="action-icon" /> Logout
            </button>
            <button className="action-button delete" onClick={handleDeleteClick}>
              <img src={DeleteIcon} alt="Delete" className="action-icon" /> Delete Account
            </button>
          </div>
        </div>
      </div>

      {isLogoutPopupOpen && (
        <div className="popuppp-overlayyy">
          <div className="popup-boxes">
            <p>Are you sure you want to logout?</p>
            <div className="popuppp-buttonss">
              <button className="popupp-confirms">Yes</button>
              <button className="popupp-cancels" onClick={closePopups}>No</button>
            </div>
          </div>
        </div>
      )}

      {isDeletePopupOpen && (
        <div className="popuppp-overlayyy">
          <div className="popup-boxes">
            <p>Are you sure you want to delete your account?</p>
            <div className="popuppp-buttonss">
              <button className="popupp-confirms">Yes</button>
              <button className="popupp-cancels" onClick={closePopups}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;



