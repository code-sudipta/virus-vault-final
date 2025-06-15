import React, { useState } from "react";
import shield from "../assets/images/shield.png";
import update from "../assets/images/update.png";
import { Link } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import UpdateSubscription from "./UpdateSubscription";

/**
 * Dashboard component
 * 
 * This component displays the main dashboard of the application, including:
 * - Status cards for protection, scan, and updates.
 * - Buttons for managing protection, viewing scan history, and checking for updates.
 * - A modal dialog for updating subscriptions.
 * - Links to perform full or quick scans.
 * - A section displaying recent security activity.
 * 
 * It also includes a function to download the full log of scan activities.
 * 
 * @returns {JSX.Element} - The rendered dashboard component
 */
const Dashboard = () => {
  const [visible, setVisible] = useState(false);

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
    <div>
      {/* <!-- Status Cards --> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[var(--mysecondary-color)] rounded-xl shadow flex flex-col p-6 gap-4">
          <div className="flex items-center justify-between flex-1">
            <div className="text-white">
              <h2 className="text-xl font-semibold mb-1">Protection Status</h2>
              <p className="text-xs">You are fully protected.</p>
            </div>
            <div>
              <img src={shield} alt="Shield Icon" className="w-auto h-14" />
            </div>
          </div>
          <Link to="/quarantine">
            <button className="mt-4 w-full bg-[var(--sidebar-bg-color)] text-sm py-2 rounded-lg shadow-md cursor-pointer transition">
              Manage Protection
            </button>
          </Link>
        </div>

        <div className="bg-[var(--mysecondary-color)] p-6 rounded-xl shadow flex flex-col gap-4">
          <div className="flex items-center justify-between flex-1">
            <div className="text-white">
              <h2 className="text-xl font-semibold mb-1">Scan Status</h2>
              <p className="text-xs">No threats detected in last scan.</p>
            </div>
            <div>
              <div className="relative w-12 h-12">
                {/* <!-- Top-left corner --> */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white rounded-tl-xl"></div>
                {/* <!-- Top-right corner --> */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white rounded-tr-xl"></div>
                <i className="fa-solid fa-search text-[1.2rem] text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
                {/* <!-- Bottom-left corner --> */}
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white rounded-bl-xl"></div>
                {/* <!-- Bottom-right corner --> */}
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white rounded-br-xl"></div>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleDownloadFullLog()}
            className="mt-4 w-full bg-[var(--sidebar-bg-color)] text-sm py-2 rounded-lg shadow-md cursor-pointer transition"
          >
            View Scan History
          </button>
        </div>

        <div className="bg-[var(--mysecondary-color)] p-6 rounded-xl shadow flex flex-col gap-4">
          <div className="flex items-center justify-between flex-1">
            <div className="text-white">
              <h2 className="text-xl font-semibold mb-1">Updates</h2>
              <p className="text-xs">Virus definitions are up-to-date.</p>
            </div>
            <div>
              <img src={update} alt="Update Icon" className="w-auto h-14" />
            </div>
          </div>
          <button
            onClick={() => setVisible(true)}
            className="mt-4 w-full bg-[var(--sidebar-bg-color)]  text-sm py-2 rounded-lg shadow-md cursor-pointer transition"
          >
            Check for Updates
          </button>
          <Dialog
            visible={visible}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <UpdateSubscription></UpdateSubscription>
          </Dialog>
        </div>
      </div>

      {/* <!-- Scan Buttons --> */}
      <div className="flex space-x-6 mb-8 items-center justify-center">
        <Link
          to="/scan"
          className="bg-[var(--myprimary-color)] flex items-center text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-700 cursor-pointer"
        >
          <span className="mr-4">
            <div className="relative w-4 h-4">
              {/* <!-- Top-left corner --> */}
              <div className="absolute top-0 left-0 w-1 h-1 border-t-2 border-l-2 border-white rounded-tl-xl"></div>
              {/* <!-- Top-right corner --> */}
              <div className="absolute top-0 right-0 w-1 h-1 border-t-2 border-r-2 border-white rounded-tr-xl"></div>
              <i className="fa-solid fa-eye text-[.5rem] text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
              {/* <!-- Bottom-left corner --> */}
              <div className="absolute bottom-0 left-0 w-1 h-1 border-b-2 border-l-2 border-white rounded-bl-xl"></div>
              {/* <!-- Bottom-right corner --> */}
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b-2 border-r-2 border-white rounded-br-xl"></div>
            </div>
          </span>
          Full Scan Now
        </Link>
        <Link
          to="/scan"
          className="border border-[var(--mytertiary-color)] text-[var(--mytertiary-color)] px-4 py-2 rounded-xl bg-[var(--bg-color)] font-semibold hover:bg-pink-100 cursor-pointer"
        >
          <i className="fa-solid fa-bolt mr-4"></i>
          Quick Scan
        </Link>
      </div>

      {/* <!-- Recent Activity --> */}
      <div className="bg-[var(--sidebar-bg-color)] w-2/3 p-6 rounded-xl shadow-md mx-auto">
        <h3 className="text-lg font-semibold mb-1">Recent Activity</h3>
        <p className="text-xs text-gray-500 mb-8">
          A summary of your latest security events.
        </p>

        <ul className="space-y-4 text-sm flex flex-col gap-6">
          <li className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">
                <i className="fa-solid fa-bolt"></i>
              </span>
              <div>
                <p className="font-semibold">
                  Quick scan completed. No threats found.
                </p>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </div>
            <span className="text-[var(--mysecondary-color)] text-xl">
              <i className="fa-regular fa-circle relative">
                <i className="fa-solid fa-check text-[.6rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
              </i>
            </span>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>
                <i className="fa-solid fa-bug text-red-500"></i>
              </span>
              <div>
                <p className="font-semibold">
                  Potential threat "Trojan.Agent.X" detected and quarantined.
                </p>
                <p className="text-xs text-gray-500">5 mins ago</p>
              </div>
            </div>
            <Link
              to="/quarantine"
              className="text-[var(--mytertiary-color)] border border-[var(--mytertiary-color)] text-sm px-3 py-2 font-semibold rounded cursor-pointer bg-[var(--bg-color)] hover:bg-pink-100 transition"
            >
              View
            </Link>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>
                <i className="fa-solid fa-clock-rotate-left text-[var(--mysecondary-color)]"></i>
              </span>
              <div>
                <p className="font-semibold">
                  Virus definitions updated to version 2024.08.15.
                </p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
