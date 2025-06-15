import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import signup from "../assets/images/signup.svg";
import { toast } from "react-hot-toast";
import API_URL from "../environment";

/**
 * Handles Authentication (Sign Up and Sign In) logic
 * @param {Function} setLogin - sets the login status
 * @param {Function} setUserName - sets the username
 * @returns {ReactElement} - the signup and signin modal
 */
const Authentication = ({ setLogin, setUserName }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function getProperUser(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      // console.log(data)
      return data;
    } catch (error) {
      return null;
    }
  }

  /**
   * Saves a user to the database
   * @param {Object} user - the user object to be saved
   * @returns {Promise} - a promise that resolves when the user is saved
   */
  async function saveUser(user) {
    if ((await getProperUser(user.id)) == null) {
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => toast.success("User Created Successfully"))
        .catch(() => toast.error("Failed to create user"));
    } else {
      toast.error("User is already registered");
    }
  }

  /**
   * Signs up a user
   * @returns {void} - nothing
   */
  const signUp = () => {
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const user = {
      id: email,
      name: name,
      password: password,
    };

    saveUser(user);

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    setIsSignup(false);
  };

  /**
   * Signs in a user
   * @returns {void} - nothing
   */
  async function signIn() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    const data = await getProperUser(email);

    if (data != null && data.password == password) {
      toast.success("Login Successful",{duration:2000});
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";

      setUserName(data.name);
      setLogin(true);

      localStorage.setItem("user", JSON.stringify({ name: data.name, id: data.id, profilePic: data.profilePic }));
    } else {
      toast.error("Invalid Email or Password");
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Toggle Buttons */}
      <div className="mt-4 mb-6 p-[.15rem] inline-flex rounded-full overflow-hidden bg-[#7F55E0]">
        <button
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            isSignup ? "bg-white text-[#7F55E0]" : "text-white"
          }`}
          onClick={() => setIsSignup(true)}
        >
          Sign Up
        </button>
        <button
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            !isSignup ? "bg-white text-[#7F55E0]" : "text-white"
          }`}
          onClick={() => setIsSignup(false)}
        >
          Sign In
        </button>
      </div>

      {/* AnimatePresence handles smooth enter/exit */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isSignup ? "signup" : "signin"}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="p-8 rounded-2xl flex items-center w-full max-w-4xl bg-purple-600 bg-opacity-20 shadow-lg"
        >
          {/* Illustration */}
          <div className="w-2/5 md:block">
            <img
              src={signup}
              className="w-full h-auto"
              alt="Auth Illustration"
            />
          </div>

          {/* Form */}
          <div className="w-full md:w-3/5 flex flex-col items-center p-2 gap-9">
            <div className="w-16 h-16 bg-[#7F55E0] rounded-full mb-6 mx-auto flex items-center justify-center">
              <i className="fa-solid fa-user text-white text-4xl"></i>
            </div>
            {/* Name Field (only for sign up) */}
            {isSignup && (
              <div className="flex items-center border-b border-gray-400 py-1 w-full my-1">
                <span className="text-xl mr-2">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  className="transition-all duration-300 appearance-none bg-transparent border-none w-full px-2 focus:outline-none"
                  type="text"
                  placeholder="Name"
                  id="name"
                />
              </div>
            )}
            <div className="flex items-center border-b border-gray-400 py-1 w-full my-1">
              <span className="text-xl mr-2">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                className="transition-all duration-300 appearance-none bg-transparent border-none w-full px-2 focus:outline-none"
                type="email"
                placeholder="Email Id"
                id="email"
              />
            </div>
            <div className="flex items-center border-b border-gray-400 py-1 w-full my-1">
              <span className="text-xl mr-2">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                className="transition-all duration-300 appearance-none bg-transparent border-none w-full px-2 focus:outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
              />
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={
                    showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                  }
                ></i>
              </span>
            </div>
            {isSignup ? (
              <button
                className="mt-6 w-fit bg-[#7F55E0] text-white py-2 px-4 rounded-md hover:bg-[#6a4dc5] transition-colors duration-300 self-end"
                onClick={() => signUp()}
              >
                Sign Up
              </button>
            ) : (
              <button
                className="mt-6 w-fit bg-[#7F55E0] text-white py-2 px-4 rounded-md hover:bg-[#6a4dc5] transition-colors duration-300 self-end"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Authentication;
