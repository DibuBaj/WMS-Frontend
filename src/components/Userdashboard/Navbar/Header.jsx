// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Sidebar.css";

// import Logo from "../../../assets/Logo.svg";
// import logout from "../../../assets/logout.png";
// import SettingsIcon from "../../../assets/Settings.svg"; 

// const Header = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const navigate = useNavigate();
//   const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "../../../assets/Adminlogo.svg"); // Get avatar from localStorage

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleLogout = async () => {
//     setIsLoggingOut(true); // Start logout animation

//     const token = localStorage.getItem("token");

//     try {
//       await axios.post("http://localhost:3000/api/auth/logout", {}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       localStorage.removeItem("token");

//       // Delay navigation to show animation
//       setTimeout(() => navigate("/signin"), 2000);
//     } catch (err) {
//       console.error("Logout failed:", err);
//       localStorage.removeItem("token");

//       // Even if logout fails, show animation and navigate
//       setTimeout(() => navigate("/signin"), 2000);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".profile-container")) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="header">
//       <div className="top-navbar">
//         <img src={Logo} alt="GreenBin Logo" className="sidebar-logo" />
//         <span className="GreenBinText">GreenBin</span>

//         <div className="profile-container" onClick={toggleDropdown}>
//           <img src={avatar} alt="Profile" className="profile-icon" /> {/* Display avatar from localStorage */}

//           {showDropdown && (
//             <div className="dropdown-menu">
//               <NavLink to="/settings" className="dropdown-item">
//                 <img src={SettingsIcon} alt="Settings" className="dropdown-icon" />
//                 Settings
//               </NavLink>
//               <div className="dropdown-item" onClick={handleLogout}>
//                 <img src={logout} alt="Logout" className="dropdown-icon" />
//                 Logout
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {isLoggingOut && (
//         <div className="logout-overlay">
//           <div className="logout-animation">
//             <span className="loading-spinner"></span>
//             <p>Logging out...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;





import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";

import Logo from "../../../assets/Logo.svg";
import logout from "../../../assets/logout.png";
import SettingsIcon from "../../../assets/Settings.svg";
<<<<<<< HEAD
import Adminlogo from "../../../assets/Adminlogo.svg"; 
=======
>>>>>>> caf6b3c (Issue in pickup)

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
<<<<<<< HEAD
  const [avatar, setAvatar] = useState(Adminlogo); 
  const [username, setUsername] = useState("User");
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.fullName) {
          setUsername(parsed.fullName);
        }
      } catch (err) {
        console.error("Failed to parse user:", err);
      }
    }
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

   
    const storedAvatar = localStorage.getItem("avatar");
    setAvatar(storedAvatar || Adminlogo);
  }, []);
=======
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "../../../assets/Adminlogo.svg");
  const [username, setUsername] = useState(localStorage.getItem("username") || "User");
  const navigate = useNavigate();
>>>>>>> caf6b3c (Issue in pickup)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogout = async () => {
    setIsLoggingOut(true);
<<<<<<< HEAD
=======

>>>>>>> caf6b3c (Issue in pickup)
    const token = localStorage.getItem("token");
  
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
<<<<<<< HEAD
=======

      localStorage.removeItem("token");

      setTimeout(() => navigate("/signin"), 2000);
>>>>>>> caf6b3c (Issue in pickup)
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
<<<<<<< HEAD
      localStorage.removeItem("user");
      setTimeout(() => navigate("/signin"), 1000); // Give a small delay for animation if needed
=======

      setTimeout(() => navigate("/signin"), 2000);
>>>>>>> caf6b3c (Issue in pickup)
    }
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="top-navbar">
        <div className="logo-wrap">
          <img src={Logo} alt="GreenBin Logo" className="sidebar-logo" />
          <span className="GreenBinText">GreenBin</span>
        </div>
        <div className="greeting">
          <span>👋 {greeting}, {username}</span>
        </div>

        {/* Profile Dropdown */}
        <div className="profile-container" onClick={toggleDropdown}>
          <img src={avatar} alt="Profile" className="profile-icon" />

          {showDropdown && (
<<<<<<< HEAD
            <div className="dropdownn-menuu">
=======
            <div className="dropdown-menu">
>>>>>>> caf6b3c (Issue in pickup)
              <div className="dropdown-username">{username}</div>
              <NavLink to="/settings" className="dropdown-item">
                <img src={SettingsIcon} alt="Settings" className="dropdown-icon" />
                Settings
              </NavLink>
              <div className="dropdown-item" onClick={handleLogout}>
                <img src={logout} alt="Logout" className="dropdown-icon" />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      {isLoggingOut && (
        <div className="logout-overlay">
          <div className="logout-animation">
            <span className="loading-spinner"></span>
            <p>Logging out...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
