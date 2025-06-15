import React, { useState } from "react";
import profile from "../assets/images/profile.svg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import toast from "react-hot-toast";
import API_URL from "../environment";

/**
 * Component for updating the user's profile
 * @param {{setProfileVisible: function}} props - properties passed to the component
 * @returns {JSX.Element} - the component
 */
const UpdateProfile = ({ setProfileVisible }) => {
  const [name, setName] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).name
      : "John Doe"
  );
  const [email, setEmail] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).id
      : "johndoe@gmail.com"
  );
  const [isNameDisabled, setIsNameDisabled] = useState(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).profilePic
      : ""
  );

  /**
   * Updates the user's profile in the database
   * @returns {void} - nothing
   */
  const updateUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.name = name;
    user.id = email;
    user.profilePic = profilePic;

    fetch(`${API_URL}/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) =>
        toast.success("Profile Updated Successfully", { duration: 2000 })
      );

    localStorage.setItem("user", JSON.stringify(user));

    setIsNameDisabled(true);
    setIsEmailDisabled(true);
    setIsSaveDisabled(true);
  };

  /**
   * Handles the change in the profile picture input field
   * @param {InputEvent} e - the input event
   * @returns {void} - nothing
   */
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfilePic(base64String);

      // Update user in localStorage immediately
      const user = JSON.parse(localStorage.getItem("user"));
      user.profilePic = base64String;
      localStorage.setItem("user", JSON.stringify(user));

      setIsSaveDisabled(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center items-center gap-8 px-6">
      <div className="">
        <img src={profile} alt="" className="w-full max-w-md" />
      </div>

      <form
        className="form flex flex-col items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="rounded-full m-2 bg-gray-200 p-2 h-32 w-32">
          <div className="rounded-full bg-[var(--myprimary-color)] h-full w-full flex items-center justify-center relative">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <i className="fa-solid fa-user text-6xl text-white m-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
            )}

            <label
              htmlFor="profilePic"
              className="absolute bottom-0 right-0 text-3xl text-[var(--mytertiary-color)] cursor-pointer"
            >
              <i className="fa-solid fa-camera"></i>
            </label>

            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicChange} // You should define this handler
            />
          </div>
        </div>

        <div className="my-2 flex flex-col">
          <h1 className="my-2">Name</h1>
          <div>
            <InputText
              disabled={isNameDisabled}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="mr-2 py-2 px-3 border border-2 border-[var(--mysecondary-color)] bg-[#effcfa] text-[#147567]"
            />
            <i
              className="fa-solid fa-pencil text-[var(--myprimary-color)] hover:cursor-pointer hover:text-[var(--mytertiary-color)]"
              onClick={() => {
                setIsNameDisabled((prev) => !prev);
                setIsSaveDisabled(false);
              }}
            ></i>
          </div>
        </div>

        <div className="my-2 flex flex-col">
          <h1 className="my-2">Email</h1>
          <div>
            <InputText
              disabled={isEmailDisabled}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="mr-2 py-2 px-3 border border-2 border-[var(--mysecondary-color)] bg-[#effcfa] text-[#147567]"
            />
            <i
              className="fa-solid fa-pencil text-[var(--myprimary-color)] hover:cursor-pointer hover:text-[var(--mytertiary-color)]"
              onClick={() => {
                setIsEmailDisabled((prev) => !prev);
                setIsSaveDisabled(false);
              }}
            ></i>
          </div>
        </div>
        <br />

        <div className="flex space-x-4 text-white self-end mt-4">
          <Button
            type="button"
            disabled={isSaveDisabled}
            label="Save"
            className="py-2 px-3 bg-[var(--mysecondary-color)] hover:bg-teal-600"
            onClick={() => updateUser()}
          />
          <Button
            type="button"
            label="Close"
            className="py-2 px-3 bg-[var(--mytertiary-color)] hover:bg-pink-600"
            onClick={() => setProfileVisible(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
