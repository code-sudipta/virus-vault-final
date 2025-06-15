import React, { useState, useEffect } from "react";
import quarantine_shield from "../assets/images/quarantine_shield.png";
import threat from "../assets/images/threat.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DeleteConfirm from "./DeleteConfirm";
import { Dialog } from "primereact/dialog";

/**
 * Quarantine is a React component that displays files that have been
 * quarantined due to detected threats. It provides a user interface
 * to view the list of quarantined files and delete selected files.
 * 
 * The component fetches the list of quarantined files from a specified
 * directory on mount and displays them in a data table. Users can select
 * files to delete, triggering a confirmation modal before proceeding
 * with deletion.
 * 
 * State:
 * - files: Array of file objects representing the quarantined files.
 * - selectedFiles: Array of file objects currently selected for deletion.
 * - rowClick: Boolean indicating if row click selection mode is enabled.
 * - showModal: Boolean indicating if the delete confirmation modal is visible.
 * 
 * Effects:
 * - Fetches files from the quarantine directory on initial render.
 * 
 * Interactions:
 * - Users can select files to delete and confirm deletion through a modal.
 * - Deletion updates the list of files and clears the selection.
 */
const Quarantine = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [rowClick, setRowClick] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  /**
   * Fetches the list of files from the quarantine directory and updates the component state.
   * @returns {Promise<void>}
   */
    const fetchFiles = async () => {
      const files = await window.electronAPI.listFiles(
        "D:\\Final Year Project\\Quarantine Folder\\"
      );
      setFiles(files);
    };

    fetchFiles();
  }, []);

  /**
   * Deletes the selected files and updates the list of files and selected files in the component state.
   * @returns {Promise<void>}
   */
  const confirmDelete = async () => {
    const filePaths = selectedFiles.map((file) => file.filePath);
    const result = await window.electronAPI.deleteFiles(filePaths);

    if (result.success) {
      const remaining = files.filter(
        (file) => !filePaths.includes(file.filePath)
      );
      setFiles(remaining);
      setSelectedFiles([]);
    } else {
      console.error("Delete failed:", result.error);
    }
    setShowModal(false);
  };

  const cancelDelete = () => setShowModal(false);

  return (
    <div className="flex flex-col h-full">

      {/* <!-- Content --> */}
      <div className="flex flex-col h-full md:flex-row w-full justify-evenly items-start md:items-center">
        {/* <!-- Left Side: Progress Circle + Button + Steps --> */}
        <div className="flex flex-col items-center gap-6 justify-center w-2/5">
          {/* <!-- Shield Icon --> */}
          <div className="mb-2 flex items-center justify-center">
            <img
              src={quarantine_shield}
              alt="Shield Icon"
              className="w-24 h-auto"
            />
            <h2 className="text-2xl font-bold">SCAN COMPLETE</h2>
          </div>

          {/* <!-- Alert Icon --> */}
          {files.length > 0 ? (
            <>
              <div className="mt-6 mb-4">
                <img src={threat} alt="Alert Icon" className="w-40 h-auto" />
              </div>
              <h3 className="text-xl font-semibold">THREATS DETECTED !!</h3>
            </>
          ) : (
            <>
              <div className="mt-6 mb-4">
                <i className="fa-solid fa-triangle-exclamation text-5xl text-[var(--mysecondary-color)]"></i>
              </div>
              <h3 className="text-xl font-semibold">NO QUARANTINED FILES DETECTED !!</h3>
            </>
          )}

          {/* <!-- Step Indicator --> */}
          <div className="flex flex-row items-center justify-center mt-4 w-full">
            <div className="w-8 h-8 bg-[var(--myprimary-color)] rounded-full flex items-center justify-center z-10">
              <i className="fa-solid fa-check text-white text-sm"></i>
            </div>
            <div className="w-[10rem] h-2 bg-gray-300 ml-[-.1rem] mr-[-.1rem]"></div>
            <div className="w-8 h-8 bg-[var(--myprimary-color)] rounded-full flex items-center justify-center z-10">
              <i className="fa-solid fa-check text-white text-sm"></i>
            </div>
            <div className="w-[10rem] h-2 bg-gray-300 ml-[-.1rem] mr-[-.1rem]"></div>
            <div className="w-8 h-8 border-2 border-[var(--myprimary-color)] rounded-full z-10"></div>
          </div>

          {/* <!-- Step Description --> */}
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
        </div>

        {/* <!-- Right Side: Scan Info --> */}
        <div className="bg-[var(--sidebar-bg-color)] p-4 rounded shadow-md w-3/5 max-w-3/5 flex flex-col items-center h-fit">
          <div className="flex items-center self-start gap-2 text-xl font-semibold mb-4">
            <span className="text-4xl px-4">
              <i className="fa-solid fa-folder"></i>
            </span>
            <p>Quarantined Files</p>
          </div>

          {/* <!-- Table --> */}
          <div className="shadow-sm w-full rounded-[1rem]">
            <DataTable
              style={{ borderRadius: "1rem", overflow: "hidden" }}
              value={files}
              selectionMode={rowClick ? null : "checkbox"}
              selection={selectedFiles}
              onSelectionChange={(e) => setSelectedFiles(e.value)}
              dataKey="id"
              scrollable
              scrollHeight="400px"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
              ></Column>
              <Column field="fileName" header="File Name"></Column>
              <Column field="filePath" header="File Path"></Column>
              <Column field="fileSize" header="File Size"></Column>
              <Column field="lastModified" header="Last Modified"></Column>
            </DataTable>
          </div>

          {/* <!-- Delete Button --> */}
          <div className="mt-4 text-right">
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer hover:bg-red-700 transition duration-200"
              disabled={selectedFiles.length === 0}
            >
              <i className="fa-solid fa-trash"></i>
              Delete
            </button>
            <Dialog
              visible={showModal}
              onHide={() => {
                if (!showModal) return;
                setShowModal(false);
              }}
            >
              <DeleteConfirm
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quarantine;
