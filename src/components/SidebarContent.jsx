import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import SidebarOptions from "./SidebarOptions";
import { Dialog } from "primereact/dialog";
import Logout from "./Logout";

/**
 * SidebarContent component
 * 
 * This component renders the sidebar of the application, which includes:
 * - A logo at the top.
 * - Navigation options for Home, Scan, Quarantine, Settings, and About Us.
 * - Each navigation option is highlighted based on the active route.
 * - A logout button at the bottom that opens a modal for logging out.
 * 
 * The component uses `useLocation` to determine the active link.
 * 
 * @param {Object} props - Component properties
 * @param {boolean} props.disabled - Determines if the options and logout button are disabled.
 * @param {Function} props.setLogin - Function to update the login state.
 * 
 * @returns {JSX.Element} - The rendered sidebar component.
 */
const SidebarContent = ({ disabled, setLogin }) => {
  const location = useLocation();
  const activeLink = location.pathname;
  const [logoutVisible, setLogoutVisible] = useState(false);

  return (
    <div className="bg-[--sidebar-bg-color] h-screen p-4 flex flex-col justify-between">
      <div>
        {/* Logo Placeholder  */}
        <div className="flex items-center mb-8 space-x-2">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <span className="text-xl font-bold text-[var(--myprimary-color)]">
            VIRUS <span className="text-[var(--mytertiary-color)]">VAULT</span>
          </span>
        </div>

        {/* Nav Menu  */}
        <nav className="space-y-4">
          <SidebarOptions
            icon="fa-solid fa-house"
            link="/"
            title="Home"
            active={activeLink === "/"}
            id="home-link"
            disabled={disabled}
          ></SidebarOptions>
          <SidebarOptions
            icon="fa-solid fa-search"
            link="/scan"
            title="Scan"
            active={activeLink === "/scan"}
            id="scan-link"
          ></SidebarOptions>
          <SidebarOptions
            icon="fa-solid fa-folder-closed"
            link="/quarantine"
            title="Quarantine"
            active={activeLink === "/quarantine"}
            id="quarantine-link"
            disabled={disabled}
          ></SidebarOptions>
          <SidebarOptions
            icon="fa-solid fa-gear"
            link="/settings"
            title="Settings"
            active={activeLink === "/settings"}
            id="settings-link"
            disabled={disabled}
          ></SidebarOptions>
          <SidebarOptions
            icon="fa-solid fa-circle-info"
            link="/about"
            title="About Us"
            active={activeLink === "/about"}
            id="about-link"
            disabled={disabled}
          ></SidebarOptions>
        </nav>
      </div>

      {/* <!-- Logout Button --> */}
      <button
        className="flex items-center mx-auto w-fit space-x-4 px-4 py-2 bg-[var(--myprimary-color)] text-white rounded-lg hover:bg-purple-600 duration-200 cursor-pointer"
        onClick={() => setLogoutVisible(true)}
        disabled={disabled}
      >
        <span className="text-sm">Log Out</span>
        <span className="flex items-center justify-between">
          <i className="fa-solid fa-arrow-right-from-bracket text-md"></i>
        </span>
      </button>
      <Dialog
        visible={logoutVisible}
        onHide={() => {
          if (!logoutVisible) return;
          setLogoutVisible(false);
        }}
      >
        <Logout setLogin={setLogin} setLogoutVisible={setLogoutVisible}></Logout>
      </Dialog>
    </div>
  );
};

export default SidebarContent;
