import React from "react";
import logo from "../assets/images/logo.png";

const About = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      {/* Shield Icon */}
      <div className="mb-4">
        <img src={logo} alt="Shield Icon" className="w-20 h-auto" />
      </div>

      {/* Title */}
      <span className="text-3xl font-bold text-[var(--myprimary-color)]">
        VIRUS <span className="text-[var(--mytertiary-color)]">VAULT</span>
      </span>
      <span className="text-sm">v1.0.1</span>

      {/* Description */}
      <p className="mt-6 max-w-2xl leading-relaxed">
        Virus Vault is a cross-platform desktop antivirus application built with
        React, Electron, and a custom Java back-end for scanning and threat
        detection. It provides a modern user interface for scanning folders,
        viewing scan results, managing quarantined files, and reviewing logs.
      </p>

      <p className="mt-4 max-w-2xl leading-relaxed">
        Our mission is to offer fast scanning capabilities, secure updates, and
        a user-friendly interface and AI powered threat detection helping in
        protection against evolving threats.
      </p>

      {/* Documentation Links */}
      <div className="mt-8 text-left w-full max-w-2xl">
        <div className="flex items-center gap-2 font-semibold mb-4">
          <i className="fa-solid fa-link"></i>
          Documentation Links
        </div>

        <div className="flex gap-4 flex-wrap">
          <a
            href="https://reactdocs-eight.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            React Docs
            <i className="fas fa-external-link"></i>
          </a>

          <a
            href="https://electronjsdocs.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            Electron JS Docs
            <i className="fas fa-external-link"></i>
          </a>

          <a
            href="https://javadocs-nu.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            Java Docs
            <i className="fas fa-external-link"></i>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-gray-600 text-sm">
        All Rights Reserved © 2025{" "}
        <span className="font-semibold">Virus Vault</span>
      </div>
    </div>
  );
};

export default About;
