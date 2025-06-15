import React, { useState } from "react";
import password from "../assets/images/password.svg";
import API_URL from "../environment";
import toast from "react-hot-toast";

/**
 * The ChangePassword component renders a modal asking the user to change their password.
 * The component renders a form with input fields for the current password, new password, and confirm password.
 * It also includes two buttons, one for saving the new password and one for closing the modal.
 * The component uses the useState hook to keep track of the values of the input fields.
 * The component also uses the useEffect hook to update the password in the local storage and database.
 * The component renders a toast message if the password is successfully changed, or if there is an error.
 * @param {Function} setPasswordVisible - Function to update the visibility of the password change modal
 * @returns {JSX.Element} - The rendered ChangePassword component
 */
const ChangePassword = ({setPasswordVisible}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Changes the user's password
   * @returns {void} - nothing
   */
  const changePassword = () => {
    const currentPassword = document
      .getElementById("currentPassword")
      .value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New and Confirm Passwords do not match.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`${API_URL}/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.password !== currentPassword) {
          toast.error("Current Password is incorrect.");
          return;
        } else {
          fetch(`${API_URL}/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: newPassword }),
          })
            .then((res) => res.json())
            .then((data) => toast.success("Password Changed Successfully"))
            .catch(() => toast.error("Failed to change password"));
        }
      })
      .catch(() => toast.error("Failed to change password"));

    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
  };

  return (
    <div className="flex px-4 w-full">
      {/* <!-- Left Illustration --> */}
      <div className="flex items-center justify-center w-1/2">
        <img src={password} alt="Change Password" className="w-full max-w-md" />
      </div>

      {/* <!-- Right Form Section --> */}
      <div className="space-y-6 p-4 flex flex-col w-1/2">
        {/* <!-- Password Note --> */}
        <div className="bg-gray-100 border-l-4 border-red-500 py-2 px-4 rounded shadow-sm">
          <p className="text-red-600 font-semibold">NOTE:</p>
          <p className="text-sm text-red-600 mt-1">
            At least 8 characters long, one uppercase letter (A-Z), one
            lowercase letter (a-z), one number (0-9), one special character
            <br />
            (e.g., ! @ # $ % ^ &amp; *)
          </p>
        </div>

        {/* <!--Current Password Input --> */}
        <div className="ml-4">
          <label className="block font-semibold mb-1">Current Password</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="border-2 border-teal-400 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Enter your current password"
              id="currentPassword"
            />
            <span className="cursor-pointer">
              <i
                className={
                  showCurrentPassword
                    ? "fa-solid fa-eye ml-[-30px]"
                    : "fa-solid fa-eye-slash ml-[-30px]"
                }
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              ></i>
            </span>
          </div>
        </div>
        {/* <!-- Password Input --> */}
        <div className="ml-4">
          <label className="block font-semibold mb-1">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="border-2 border-teal-400 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Enter your new password"
              id="newPassword"
            />
            <span className="cursor-pointer">
              <i
                className={
                  showNewPassword
                    ? "fa-solid fa-eye ml-[-30px]"
                    : "fa-solid fa-eye-slash ml-[-30px]"
                }
                onClick={() => setShowNewPassword(!showNewPassword)}
              ></i>
            </span>
          </div>
        </div>

        {/* <!-- Confirm Password Input --> */}
        <div className="ml-4">
          <label className="block font-semibold mb-1">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="border-2 border-teal-400 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Confirm your new password"
              id="confirmPassword"
            />
            <span className="cursor-pointer">
              <i
                className={
                  showConfirmPassword
                    ? "fa-solid fa-eye ml-[-30px]"
                    : "fa-solid fa-eye-slash ml-[-30px]"
                }
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></i>
            </span>
          </div>
        </div>

        {/* <!-- Buttons --> */}
        <div className="flex space-x-4 self-end">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded font-semibold mt-4"
            onClick={changePassword}
          >
            Save
          </button>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded font-semibold mt-4"
          onClick={() => setPasswordVisible(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
