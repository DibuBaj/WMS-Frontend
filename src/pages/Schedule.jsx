import React from "react";
import Sidebar from "../components/Userdashboard/Navbar/Sidebar";
import Header from "../components/Userdashboard/Navbar/Header.jsx";
import Userschedule from "../components/Userdashboard/Schedule/Userschedule.jsx";
import Header from "../components/Userdashboard/Navbar/Header.jsx";

const Schedule = () => {
  return (
    <>
      <Header/>
      <div className="user-schedule">
        <Sidebar />
        <Userschedule/>
      </div>
    </>
  );
};


export default Schedule;
