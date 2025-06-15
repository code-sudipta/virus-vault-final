import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";

/**
 * OpeningBanner
 * 
 * This component renders the opening banner of the application and displays the application name and a loading bar
 * that fills up to 100% in ~3 seconds.
 * 
 * @returns {JSX.Element} - The rendered opening banner
 */
const OpeningBanner = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // 100% in ~4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wrapper w-full h-screen flex flex-col items-center justify-center">
      <div className="container w-full max-w-md text-center">
        <img
          src={logo}
          alt="Logo"
          className="logo animate-spin [animation-duration:3s]"
        />
        <h1 className="text-2xl font-semibold">
          <span className="text-[var(--myprimary-color)]">VIRUS</span>
          <span className="text-[var(--mytertiary-color)]">VAULT</span>
        </h1>
      </div>
      <div className="progress pt-4 pb-4 w-full flex flex-col items-center">
        <div className="progress-bar w-2/3 rounded-full h-6 bg-white">
          <div
            className="progress-fill bg-[#7F55E0] h-full rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-text font-semibold mt-4">
          Loading...{progress}%
        </p>
      </div>
    </div>
  );
};

export default OpeningBanner;
