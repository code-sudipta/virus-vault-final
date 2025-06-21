/**
 * Main process script for the Electron application.
 * Handles window creation, IPC communication, file system operations,
 * and integration with the Java backend.
 *
 * @module main
 */

import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import "./run-java.js";
import { ipcMain, dialog } from "electron";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Opens a dialog for the user to select a folder.
 * @returns {Promise<string>} The selected folder path.
 */
ipcMain.handle("dialog:selectFolder", async () => {
  const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  return result.filePaths[0];
});

/**
 * Reads all files in the specified folder.
 * @param {Electron.IpcMainInvokeEvent} _event - The IPC event.
 * @param {string} folderPath - The path to the folder.
 * @returns {Array<{name: string, path: string}>} List of files with names and paths.
 */
ipcMain.handle("read-folder-files", async (_event, folderPath) => {
  const files = fs.readdirSync(folderPath);
  return files.map((file) => ({
    name: file,
    path: path.join(folderPath, file),
  }));
});

/**
 * Lists files in the quarantine directory with metadata.
 * @param {Electron.IpcMainInvokeEvent} event - The IPC event.
 * @param {string} quarantinePath - The path to the quarantine directory.
 * @returns {Array<Object>} List of file metadata objects.
 */
ipcMain.handle("list-files", async (event, quarantinePath) => {
  try {
    const files = fs.readdirSync(quarantinePath);
    return files.map((fileName, index) => {
      const fullPath = path.join(quarantinePath, fileName);
      const stats = fs.statSync(fullPath);
      return {
        id: index + 1,
        fileName,
        filePath: fullPath,
        fileSize: `${(stats.size / 1024).toFixed(2)} KB`,
        lastModified: stats.mtime.toLocaleDateString("en-GB"),
      };
    });
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
});

/**
 * Deletes the specified files from the file system.
 * @param {Electron.IpcMainInvokeEvent} event - The IPC event.
 * @param {string[]} filePaths - Array of file paths to delete.
 * @returns {Object} Success status and error message if any.
 */
ipcMain.handle("delete-files", async (event, filePaths) => {
  try {
    filePaths.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
    return { success: true };
  } catch (err) {
    console.error("Error deleting files:", err);
    return { success: false, error: err.message };
  }
});

/**
 * Appends a log entry to the virus-vault-log.txt file.
 * @param {Electron.IpcMainInvokeEvent} _event - The IPC event.
 * @param {string} logText - The log text to save.
 * @returns {Object} Success status and file path or error message.
 */
ipcMain.handle("save-log-file", async (_event, logText) => {
  try {
    const logsDir = path.join(__dirname, "logging");
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

    const logFilePath = path.join(logsDir, "virus-vault-log.txt");
    const timestamp = new Date().toLocaleString();

    const logEntry = `\n\n==================== [${timestamp}] ====================\n${logText}\n`;

    fs.appendFileSync(logFilePath, logEntry, "utf-8");

    return { success: true, path: logFilePath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

/**
 * Retrieves the full contents of the virus-vault-log.txt file.
 * @returns {Object} Success status and log content or error message.
 */
ipcMain.handle("get-full-log", async () => {
  const logFilePath = path.join(__dirname, "logging", "virus-vault-log.txt");
  try {
    if (!fs.existsSync(logFilePath))
      return { success: false, error: "Log file not found" };

    const content = fs.readFileSync(logFilePath, "utf-8");
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

/**
 * Creates a new browser window with specified dimensions and loads the 
 * application from the local Vite development server. The window is 
 * configured with context isolation and without Node.js integration 
 * for improved security. The preload script is specified to enable 
 * communication between the renderer and main processes.
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL("http://localhost:5173"); // Default Vite dev server port
  // win.webContents.openDevTools();
}

// App lifecycle events
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on('quit-app', () => {
  app.quit();
});
