import React from "react";
import { Link } from "react-router-dom";

/**
 * SidebarOptions component
 * 
 * This component renders a navigation link with an icon and title.
 * It applies styles based on the active state and whether the link
 * is disabled, including disabling pointer events and adjusting
 * opacity when disabled.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.icon - The icon class name for display.
 * @param {string} props.link - The route path for the link.
 * @param {string} props.title - The display title of the link.
 * @param {boolean} props.active - Determines if the link is active.
 * @param {boolean} props.disabled - Determines if the link is disabled.
 * 
 * @returns {JSX.Element} - The rendered link component.
 */
const SidebarOptions = ({ icon, link, title, active, disabled }) => {
  return (
    <Link
      to={link}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-200 ${
        active
          ? "bg-[var(--myprimary-color)] text-white"
          : "text-gray-500 hover:text-[var(--myprimary-color)] hover:bg-purple-100"
      } `}
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span>
        <i className={icon}></i>
      </span>
      <span>{title}</span>
    </Link>
  );
};

export default SidebarOptions;
