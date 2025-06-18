import React, { useState } from "react";
import settings from "../assets/images/settings.svg";
import { Dialog } from "primereact/dialog";
import UpdateSubscription from "./UpdateSubscription";
import UpdateProfile from "./UpdateProfile";
import Exit from "./Exit";
import ChangePassword from "./ChangePassword";
import { InputSwitch } from "primereact/inputswitch";

/**
 * The Settings component renders a panel with multiple sections for managing user settings.
 *
 * The component includes sections for managing the user profile, changing the password, and updating the subscription.
 * Additionally, the component includes a section for managing the app settings, such as enabling dark mode and downloading the full scan log.
 * The component also includes an exit button to exit the app.
 *
 * The component uses the Dialog component from PrimeReact to render the various sections and options.
 *
 * @component
 * @example
 * <Settings />
 */
const Settings = () => {
  const [visible, setVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [exitVisible, setExitVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checked, setChecked] = useState(localStorage.getItem("theme") === "dark" ? true : false);

  /**
   * Sets the dark theme for the application by updating the href attribute of the theme-tag and theme-link elements.
   * @function
   * @returns {void} - nothing
   */
  const setDarkTheme = () => {
    document.getElementById("theme-tag").href = "./src/themes/darkTheme.css";
    document.getElementById("theme-link").href =
      "https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css";
      localStorage.setItem('theme', 'dark');
  };

  /**
   * Sets the light theme for the application by updating the href attribute of the theme-tag and theme-link elements.
   * @function
   * @returns {void} - nothing
   */
  const setLightTheme = () => {
    document.getElementById("theme-tag").href = "./src/themes/lightTheme.css";
    document.getElementById("theme-link").href =
      "https://unpkg.com/primereact/resources/themes/lara-light-blue/theme.css";
      localStorage.setItem('theme', 'light');
  };

  /**
   * Downloads the full log of scan activities to a file named "virus-vault-log.txt".
   * 
   * This function calls the getFullLog function from the fileAPI to retrieve the
   * log contents.  If the call is successful, it creates a blob from the log
   * contents and creates an "a" element to download the blob as a file.  If the
   * call fails, it displays an alert with the error message.
   */
  const handleDownloadFullLog = async () => {
    const result = await window.fileAPI.getFullLog();
    if (result.success) {
      const blob = new Blob([result.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "virus-vault-log.txt";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl h-full">
      {/* <!-- Left Illustration --> */}
      <div className="flex items-center justify-center">
        <img src={settings} alt="Settings-rafiki" className="w-full max-w-md" />
      </div>

      {/* <!-- Right Settings Panel --> */}
      <div className="flex flex-col gap-8 justify-between">
        <h1 className="text-4xl font-bold">Settings</h1>

        {/* <!-- Account Section --> */}
        <div>
          <h2 className="text-xl mb-3">
            <span className="text-2xl font-bold">A</span>ccount
          </h2>
          <button
            className="flex items-center justify-between bg-[#ac91eb] w-56 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 cursor-pointer duration-300"
            onClick={() => setProfileVisible(true)}
          >
            <span className="mr-2">Profile</span>
            <i className="fa-solid fa-user"></i>
          </button>
          <Dialog
            header="User Profile"
            visible={profileVisible}
            onHide={() => {
              if (!profileVisible) return;
              setProfileVisible(false);
            }}
          >
            <UpdateProfile setProfileVisible={setProfileVisible}></UpdateProfile>
          </Dialog>
        </div>

        {/* <!-- Privacy Section --> */}
        <div>
          <h2 className="text-xl mb-3">
            <span className="text-2xl font-bold">P</span>rivacy
          </h2>
          <div className="space-y-3">
            <button
              className="flex items-center justify-between bg-[#de3b40] w-56 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 cursor-pointer duration-300"
              onClick={() => setPasswordVisible(true)}
            >
              <span className="mr-2">Change Password</span>
              <i className="fa-solid fa-key"></i>
            </button>
            <Dialog
              header="Change Password"
              visible={passwordVisible}
              onHide={() => {
                if (!passwordVisible) return;
                setPasswordVisible(false);
              }}
              className="w-full md:w-1/2"
            >
              <ChangePassword setPasswordVisible={setPasswordVisible}></ChangePassword>
            </Dialog>

            <button
              className="flex items-center justify-between bg-[var(--mysecondary-color)] w-56 text-black px-4 py-2 rounded-lg shadow hover:bg-teal-600 cursor-pointer duration-300"
              onClick={() => setVisible(true)}
            >
              <span className="mr-2">Update Subscription</span>
              <i className="fa-solid fa-shield-halved"></i>
            </button>
            <Dialog
              visible={visible}
              onHide={() => {
                if (!visible) return;
                setVisible(false);
              }}
            >
              <UpdateSubscription />
            </Dialog>
          </div>
        </div>

        {/* <!-- App Section --> */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            <span className="text-2xl font-bold">A</span>pp
          </h2>

          {/* <!-- Dark Mode --> */}
          <div className="flex items-center mb-4 w-fit relative">
            <span className="mr-2">Dark Mode</span>
            <InputSwitch
              checked={checked}
              onClick={checked ? setLightTheme : setDarkTheme}
              onChange={(e) => setChecked((prev) => !prev)}
            ></InputSwitch>
            <i className="fa-solid fa-sun text-xs absolute right-7"></i>
            <i className="fa-solid fa-moon text-xs absolute right-2"></i>
          </div>

          {/* <!-- Scan History --> */}
          <button onClick={() => handleDownloadFullLog()} className="flex items-center justify-between bg-[#7cc6ff] w-56 text-[#094b7c] px-4 py-2 rounded-lg shadow hover:bg-blue-400 cursor-pointer duration-300">
            <span className="mr-2">Scan History</span>
            <i className="fa-solid fa-history"></i>
          </button>
        </div>

        {/* <!-- Exit App Button --> */}
        <button
          className="flex items-center justify-between bg-[#de3b40] w-56 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 cursor-pointer duration-300"
          onClick={() => setExitVisible(true)}
        >
          <span className="mr-2">Exit App</span>
          <i className="fa-solid fa-close"></i>
        </button>
        <Dialog
          visible={exitVisible}
          onHide={() => {
            if (!exitVisible) return;
            setExitVisible(false);
          }}
        >
          <Exit></Exit>
        </Dialog>
        <div className="text-sm self-end">Version 1.0.1</div>
      </div>
    </div>
  );
};

export default Settings;
