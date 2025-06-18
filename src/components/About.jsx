import React from 'react'

const About = () => {
  return (
     <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10 text-center">
      {/* Shield Icon */}
      <div className="mb-4">
        <img
          src="/shield-check.png"
          alt="Shield Icon"
          className="w-20 h-20"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2">
        VIRUS VAULT
      </h1>
      <span className="text-lg font-semibold text-gray-900">v1.0.1</span>

      {/* Description */}
      <p className="mt-6 max-w-2xl text-gray-700 leading-relaxed">
        Virus Vault is a cross-platform desktop antivirus application built with React, Electron, and a custom Java back-end for scanning and threat detection. It provides a modern user interface for scanning folders, viewing scan results, managing quarantined files, and reviewing logs.
      </p>

      <p className="mt-4 max-w-2xl text-gray-700 leading-relaxed">
        Our mission is to offer fast scanning capabilities, secure updates, and a user-friendly interface and AI powered threat detection helping in protection against evolving threats.
      </p>

      {/* Documentation Links */}
      <div className="mt-8 text-left w-full max-w-2xl">
        <div className="flex items-center gap-2 text-black font-semibold mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h6.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V18a2 2 0 01-2 2z"
            />
          </svg>
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
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://electronjsdocs.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            Electronjsdocs
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://javadocs-nu.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            Java Docs 
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-gray-600 text-sm">
        All Rights Reserved © 2025 <span className="font-semibold">Virus Vault</span>
      </div>
    </div>
  );
}

export default About
