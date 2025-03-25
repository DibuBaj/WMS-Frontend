import React from "react";
import Sidebar from "../components/Userdashboard/Navbar/Sidebar.jsx";
import Pickup from "../components/Userdashboard/Dashboard/Pickup.jsx";
import Recentpickup from "../components/Userdashboard/Dashboard/Recentpickup.jsx";


const Userdashboard =()=>{
  return (
    <>
    <Sidebar/>
    <Pickup/>
    <Recentpickup/>
    </>

  
  )
};

export default Userdashboard;
