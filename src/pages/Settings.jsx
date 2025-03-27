import React from "react";
import Sidebar from "../components/Userdashboard/Navbar/Sidebar";
import Header from "../components/Userdashboard/Navbar/Header.jsx";

const Settings = () => {
  return(
    <>
      <Header/>
      <div className="user-setings">
        <Sidebar />
        <div className="settings-wrapper">
          
        </div>
      </div>
    </>
  );
};

export default Settings;
