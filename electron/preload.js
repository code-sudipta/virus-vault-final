/**
 * Preload script for Electron.
 * Exposes secure APIs to the renderer process via contextBridge.
 * Provides interfaces for running Java processes, file/folder dialogs,
 * file operations, and log management.
 */

const { contextBridge, ipcRenderer } = require("electron");

/**
 * Exposes Java runner API to the renderer process.
 * - runJava: Starts the Java scan process with the selected folder.
 * - onOutput: Registers a callback for Java process output events.
 * - offOutput: Removes a previously registered output callback.
 */
contextBridge.exposeInMainWorld("javaRunner", {
  /**
   * Sends a request to start the Java process for scanning.
   * @param {string} selectedFolder - The folder to scan.
   */
  runJava: (selectedFolder) => ipcRenderer.send("run-java", selectedFolder),

  /**
   * Registers a callback for Java process output events.
   * @param {function} callback - The function to call with output data.
   */
  onOutput: (callback) => ipcRenderer.on("java-output", callback),

  /**
   * Removes a previously registered output callback.
   * @param {function} callback - The callback to remove.
   */
  offOutput: (callback) => ipcRenderer.removeListener("java-output", callback),
});

/**
 * Exposes Electron file/folder and quarantine APIs to the renderer process.
 * - selectFolder: Opens a dialog to select a folder.
 * - readFolderFiles: Reads files in a folder.
 * - listFiles: Lists files in a quarantine folder.
 * - deleteFiles: Deletes specified files.
 */
contextBridge.exposeInMainWorld("electronAPI", {
  /**
   * Opens a dialog for the user to select a folder.
   * @returns {Promise<string>} The selected folder path.
   */
  selectFolder: () => ipcRenderer.invoke("dialog:selectFolder"),

  /**
   * Reads the contents of a folder and returns a list of files with their absolute paths and names.
   * @param {string} folderPath - The path to the folder to read.
   * @returns {Promise<Array<{name: string, path: string, size: number}>>}
   */
  readFolderFiles: (folderPath) =>
    ipcRenderer.invoke("read-folder-files", folderPath),

  /**
   * Reads the contents of a quarantine folder and returns a list of files with metadata.
   * @param {string} quarantinePath - The path to the quarantine folder to read.
   * @returns {Promise<Array<{name: string, path: string, size: number, lastModified: Date}>>}
   */
  listFiles: (quarantinePath) =>
    ipcRenderer.invoke("list-files", quarantinePath),

  /**
   * Deletes the specified files.
   * @param {string[]} filePaths - Array of file paths to delete.
   * @returns {Promise<Object>} Success status and error message if any.
   */
  deleteFiles: (filePaths) => ipcRenderer.invoke("delete-files", filePaths),
});

/**
 * Exposes log file APIs to the renderer process.
 * - saveLog: Appends a log entry to the log file.
 * - getFullLog: Retrieves the full contents of the log file.
 */
contextBridge.exposeInMainWorld("fileAPI", {
  /**
   * Appends a log entry to the virus-vault-log.txt file.
   * @param {string} text - The log text to save.
   * @returns {Promise<Object>} Success status and file path or error message.
   */
  saveLog: (text) => ipcRenderer.invoke("save-log-file", text),

  /**
   * Retrieves the full contents of the virus-vault-log.txt file.
   * @returns {Promise<Object>} Success status and log content or error message.
   */
  getFullLog: () => ipcRenderer.invoke("get-full-log"),
});
