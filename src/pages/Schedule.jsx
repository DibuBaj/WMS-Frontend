import React from "react";
import Sidebar from "../components/Userdashboard/Navbar/Sidebar";
import Userschedule from "../components/Userdashboard/Schedule/Userschedule.jsx";
import Header from "../components/Userdashboard/Navbar/Header.jsx";

const Schedule = () => {
  return(
    <>
    <Header />
    <div className="user-schedule">
      <Sidebar />
      <div className="schedule-wrapper">
        <Userschedule/>
      </div>
    </div>
  </>
  )
};

export default Schedule;
