/**
 * Handles compilation and execution of Java code from the Electron main process.
 * Listens for the "run-java" IPC event, compiles all Java files in the current and scanner directories,
 * and runs the AntivirusMain class with the selected folder as an argument.
 * Sends real-time output and errors back to the renderer process via "java-output" events.
 */

import { ipcMain } from "electron";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * IPC event listener for "run-java".
 * Compiles all Java files in the current and scanner directories, then runs the AntivirusMain class.
 * Sends compilation and execution output/errors to the renderer process.
 *
 * @event
 * @param {Electron.IpcMainEvent} event - The IPC event object.
 * @param {string} selectedFolder - The folder path to scan, passed as an argument to the Java process.
 */
ipcMain.on("run-java", (event, selectedFolder) => {
  const javaDir = __dirname;
  const scannerDir = path.join(javaDir, "scanner");

  // Get all .java files in current directory and scanner directory
  const mainJavaFiles = fs
    .readdirSync(javaDir)
    .filter((f) => f.endsWith(".java"))
    .map((f) => path.join(javaDir, f));
  const scannerJavaFiles = fs.existsSync(scannerDir)
    ? fs
        .readdirSync(scannerDir)
        .filter((f) => f.endsWith(".java"))
        .map((f) => path.join(scannerDir, f))
    : [];

  const allJavaFiles = [...mainJavaFiles, ...scannerJavaFiles];

  if (allJavaFiles.length === 0) {
    event.sender.send("java-output", "No Java files found to compile.");
    return;
  }

  // Compile all Java files
  const compileCommand = `javac ${allJavaFiles.map((f) => `"${f}"`).join(" ")}`;
  // Run the AntivirusMain class with the selected folder as argument
  const runCommand = `java -cp "${javaDir}" AntivirusMain "${selectedFolder}"`;

  console.log("Compile command:", compileCommand);
  console.log("Run command:", runCommand);

  exec(
    compileCommand,
    { cwd: javaDir, shell: true },
    (compileErr, compileStdout, compileStderr) => {
      if (compileErr) {
        event.sender.send(
          "java-output",
          `Compilation error:\n${compileStderr}`
        );
        return;
      }

      // Start the Java process
      const javaProcess = exec(runCommand, { cwd: javaDir, shell: true });

      /**
       * Sends standard output from the Java process to the renderer.
       * @param {string} data - Output data from Java process.
       */
      javaProcess.stdout.on("data", (data) => {
        event.sender.send("java-output", data);
      });

      /**
       * Sends standard error from the Java process to the renderer.
       * @param {string} data - Error data from Java process.
       */
      javaProcess.stderr.on("data", (data) => {
        event.sender.send("java-output", `Execution error:\n${data}`);
      });

      /**
       * Sends process exit code to the renderer.
       * @param {number} code - Exit code of the Java process.
       */
      javaProcess.on("close", (code) => {
        event.sender.send(
          "java-output",
          `Java process exited with code ${code}`
        );
      });
    }
  );
});