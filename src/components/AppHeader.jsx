import { useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * AppHeader component
 *
 * This component renders the header section of the sidebar
 * and displays the active page name, a bell icon for notifications,
 * the user name, and a dropdown menu.
 *
 * @param {string} userName - The current user's name
 * @returns {JSX.Element} - The rendered header section
 */
const AppHeader = ({ userName }) => {
  const location = useLocation();
  const activeLink = location.pathname;
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).profilePic
      : ""
  );

  let pagename = "";
  if (activeLink === "/") {
    pagename = "Your Security Dashboard";
  } else if (activeLink === "/scan") {
    pagename = "Scan Your Drives";
  } else if (activeLink === "/quarantine") {
    pagename = "Your Quarantined Files";
  } else if (activeLink === "/settings") {
    pagename = "Settings";
  } else if (activeLink === "/about") {
    pagename = "About";
  }

  return (
    <div className="flex justify-between items-center px-6 py-6 bg-[var(--sidebar-bg-color)]">
      <span className="text-2xl font-semibold">{pagename}</span>
      <div className="flex items-center space-x-2">
        <div>
          <i className="fa-solid fa-bell mr-4 text-xl relative cursor-pointer">
            <i className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></i>
          </i>
        </div>
        <span className="text-gray-600 cursor-pointer">{userName}</span>
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        ) : (
          <div className="w-8 h-8 bg-[var(--myprimary-color)] rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="cursor-pointer">
          <i className="fa-solid fa-chevron-down text-gray-600"></i>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
