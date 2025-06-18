import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import logo from "../assets/images/logo.png";
import toast from "react-hot-toast";

/**
 * Scan component that manages the scanning of a selected folder for threats.
 * Provides UI for folder selection, scanning initiation, and displays scan results.
 *
 * @param {Function} setDisabled - Function to set the disabled state of UI components.
 *
 * @returns {ReactElement} The UI for scanning a folder and displaying scan results.
 */
const Scan = ({ setDisabled }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [javaOutput, setJavaOutput] = useState("");
  const [scanComplete, setScanComplete] = useState(false);

  // Refs to hold latest values
  const javaOutputRef = useRef("");
  const hasLoggedOutputRef = useRef(false);

  useEffect(() => {
    javaOutputRef.current = javaOutput;
  }, [javaOutput]);

  useEffect(() => {
  /**
   * Handles output from the Java process. Updates the UI with the output and
   * saves the full log when the process exits.
   * @param {object} _event - unused event object
   * @param {string} data - the output from the Java process
   * @returns {Promise<void>}
   */
    const handleJavaOutput = async (_event, data) => {
      setJavaOutput((prev) => {
        javaOutputRef.current = prev + data;
        return javaOutputRef.current;
      });

      if (!hasLoggedOutputRef.current && data.includes("Java process exited")) {
        setDisabled(false);
        setIsScanning(false);
        setScanComplete(true);
        hasLoggedOutputRef.current = true;
        const fullOutput = javaOutputRef.current;
        const result = await window.fileAPI?.saveLog(fullOutput);
        if (result?.success) {
          console.log("Log saved at:", result.path);
        } else {
          console.error("Log save failed:", result?.error);
        }
      }
    };

    if (window.javaRunner?.onOutput) {
      window.javaRunner.onOutput(handleJavaOutput);
    }
    return () => {
      if (window.javaRunner?.offOutput) {
        window.javaRunner.offOutput(handleJavaOutput);
      }
    };
  }, [setDisabled]);

/**
 * Initiates the scanning process for the selected folder.
 *
 * Resets the Java output, sets the scanning state to true, disables UI components,
 * and ensures the scan complete status is set to false. Then, triggers the Java
 * process to start scanning the selected folder.
 */
  const handleStartScan = () => {
    setJavaOutput("");
    setIsScanning(true);
    setDisabled(true);
    hasLoggedOutputRef.current = false;
    setScanComplete(false);
    window.javaRunner?.runJava(selectedFolder);
  };

/**
 * Handles the folder selection process by prompting the user to choose a folder.
 * If a folder is selected, it updates the selected folder state and retrieves the
 * list of files within the folder to update the files state.
 * Displays an error message if folder selection fails.
 * @returns {Promise<void>}
 */
  const handleSelectFolder = async () => {
    try {
      const folder = await window.electronAPI.selectFolder();
      if (folder) {
        setSelectedFolder(folder);
        const files = await window.electronAPI.readFolderFiles(folder);
        setFiles(files);
      }
    } catch (error) {
      console.error("Error selecting folder:", error);
      toast.error("Failed to select folder.");
    }
  };

  if (!selectedFolder) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-6">Select Folder to Scan</h2>
        <button
          onClick={handleSelectFolder}
          className="bg-[var(--myprimary-color)] px-6 py-3 text-white rounded-full shadow hover:bg-[var(--mytertiary-color)] transition"
        >
          Choose Folder
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col md:flex-row w-full justify-center items-start md:items-center">
      {/* Left Side: Progress Circle + Button + Steps */}
      <div className="flex flex-col items-center gap-6 justify-center w-1/2">
        {!isScanning && !scanComplete ? (
          <button
            onClick={handleStartScan}
            className="flex items-center gap-2 px-6 py-2 bg-[var(--myprimary-color)] text-white text-lg font-bold rounded-full shadow cursor-pointer hover:brightness-90 transition duration-200"
          >
            <i className="fa-solid fa-bug text-xl"></i>
            Start Scan
          </button>
        ) : (
          <>
            <div
              className={`w-24 h-24 mb-8 rounded-full bg-[var(--bg-color)] shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee,0_0_60px_#22d3ee] ${
                isScanning ? "animate-pulse-glow" : ""
              }`}
            >
              <img src={logo} alt="Logo" />
            </div>

            {scanComplete ? (
              <>
                <p className="text-lg font-semibold">Scan is Completed</p>
                <div className="flex flex-row items-center justify-center mt-4 w-full">
                  <div className="w-8 h-8 bg-[var(--myprimary-color)] rounded-full flex items-center justify-center z-10">
                    <i className="fa-solid fa-check text-white text-sm"></i>
                  </div>
                  <div className="w-[10rem] h-2 bg-gray-300 ml-[-.1rem] mr-[-.1rem]"></div>
                  <div className="w-8 h-8 border-2 border-[var(--myprimary-color)] rounded-full z-10"></div>
                  <div className="w-[10rem] h-2 bg-gray-300 ml-[-.1rem] mr-[-.1rem]"></div>
                  <div className="w-8 h-8 border-2 border-[var(--myprimary-color)] rounded-full z-10"></div>
                </div>
                <div className="flex flex-row items-center w-full">
                  <div className="w-1/3 text-center">
                    <span className="text-xs mt-1">Scan Complete</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-xs mt-1">Quarantine</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-xs mt-1">Delete</span>
                  </div>
                </div>
              </>
            ) : (
              <>Virus Vault is doing its work</>
            )}
          </>
        )}
      </div>

      {/* Right Side: Scan Info */}
      <div className="bg-[var(--sidebar-bg-color)] p-10 rounded shadow-md w-[35rem] flex flex-col items-center">
        <div className="flex items-center gap-2 text-xl font-semibold mb-4 self-start">
          <span className="text-4xl px-4">
            <i className="fa-solid fa-hourglass-start"></i>
          </span>
          <p className="w-80 break-words whitespace-normal">
            Detecting Threats in {selectedFolder}...
          </p>
        </div>

        <div className="w-full rounded-xl">
          <DataTable
            style={{ borderRadius: "1rem", overflow: "hidden" }}
            value={files}
            stripedRows
            size="small"
            scrollable
            scrollHeight="400px"
          >
            <Column field="name" header="Name"></Column>
            <Column field="path" header="Path"></Column>
          </DataTable>
        </div>

        <div className="w-[30rem] bg-gray-900 text-green-300 p-4 mt-8 rounded h-64 overflow-y-scroll word-wrap break-words">
          <pre>{javaOutput}</pre>
        </div>
      </div>
    </div>
  );
};

export default Scan;