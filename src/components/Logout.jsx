import React from "react";

/**
 * Logout component
 *
 * This component renders a modal asking the user if they want to log out.
 * It includes a sad emoji icon, a message, and two buttons for user interaction.
 * The "Yes" button will log the user out by removing the user data from localStorage
 * and setting the login state to false. The "No" button will close the modal
 * by setting the logout visibility state to false.
 *
 * @param {Object} props - Component properties
 * @param {Function} props.setLogin - Function to update the login state
 * @param {Function} props.setLogoutVisible - Function to update the visibility of the logout modal
 * @returns {JSX.Element} - The rendered logout modal component
 */
const Logout = ({ setLogin, setLogoutVisible }) => {

  /**
   * Logs the user out by removing the user data from localStorage and setting the login state to false
   * @returns {void} - nothing
   */
  const logout = () => {
    localStorage.removeItem("user");
    setLogin(false);
  }

  return (
    <div>
      {/* <!-- Sad Emoji Icon --> */}
      <div className="flex justify-center mb-4 mt-1">
        <i className="fa-solid fa-face-sad-tear text-5xl text-[var(--mysecondary-color)]"></i>
      </div>

      {/* <!-- Message --> */}
      <p className="text-xl mb-6">Are you surely want to logout?</p>

      {/* <!-- Buttons --> */}
      <div className="flex justify-center space-x-6">
        <button
          className="bg-[var(--mytertiary-color)] hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg transition"
          onClick={() => logout()}
        >
          Yes
        </button>
        <button className="bg-[var(--mysecondary-color)] hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg transition"
        onClick={() => setLogoutVisible(false)}>
          No
        </button>
      </div>
    </div>
  );
};

export default Logout;
