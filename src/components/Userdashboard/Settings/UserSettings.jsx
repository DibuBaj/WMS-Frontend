import React, { useState, useEffect } from "react";
import "./UserSettings.css";
import Adminlogo from "../../../assets/Adminlogo.svg";
import Camera from "../../../assets/Camera.svg";
import LogoutIcon from "../../../assets/Logouticon.svg";
import DeleteIcon from "../../../assets/Delete.svg";

const UserSettings = () => {
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || Adminlogo);
  const [userInfo, setUserInfo] = useState({ fullName: "", email: "" });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserInfo({
          fullName: parsedUser.fullName || "",
          email: parsedUser.email || "",
        });
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }
  }, []);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        localStorage.setItem("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const closePopups = () => {
    setIsLogoutPopupOpen(false);
    setIsDeletePopupOpen(false);
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
                  style={{ display: "none" }}
                />
                <img
                  src={Camera}
                  alt="Change Avatar"
                  className="camera-icon"
                  onClick={() => document.getElementById("avatarInput").click()}
                />
              </div>
              <div className="profile-info">
                <h2>Profile Settings</h2>
                <p>Update your personal information</p>
              </div>
            </div>

            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="username">Full Name</label>
                <input
                  id="username"
                  type="text"
                  value={userInfo.fullName}
                  onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="input-field"
                />
              </div>

              <button className="save-button">Save Changes</button>
            </div>
          </div>

          <div className="account-actions">
            <h3>Account Actions</h3>
            <button className="action-button logout" onClick={() => setIsLogoutPopupOpen(true)}>
              <img src={LogoutIcon} alt="Logout" className="action-icon" /> Logout
            </button>
            <button className="action-button delete" onClick={() => setIsDeletePopupOpen(true)}>
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
              <button className="popupp-cancels" onClick={closePopups}>
                No
              </button>
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
              <button className="popupp-cancels" onClick={closePopups}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;

