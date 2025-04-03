// import React from "react";
// import Sidebar from "../components/Userdashboard/Navbar/Sidebar";
// import Header from "../components/Userdashboard/Navbar/Header.jsx";
// import UserSettings from "../components/Userdashboard/Settings/UserSettings.jsx";

// const Settings = () => {
//   return(
//     <>
//       <Header/>
//       <div className="user-setings">
//         <Sidebar />
//         {/* <div className="settings-wrapper"> */}
//           <UserSettings/>
//         </div>
//       {/* </div> */}
//     </>
//   );
// };

// export default Settings;


import React from "react";
import Sidebar from "../components/Userdashboard/Navbar/Sidebar";
import Header from "../components/Userdashboard/Navbar/Header.jsx";
import UserSettings from "../components/Userdashboard/Settings/UserSettings.jsx";
import  "../components/Userdashboard/Settings/UserSettings.css";

const Settings = () => {
  return(
    <div className="settings-page">
      <Header/>
      <div className="settings-layout">
        <Sidebar />
        <main className="settings-main-content">
          <UserSettings/>
        </main>
      </div>
    </div>
  );
};

export default Settings;
