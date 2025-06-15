package scanner;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class PEChecker {
    /**
     * Runs a Python script to check if a file is a valid PE file.
     * <p>
     * The script is given as an argument the file path to check, and it outputs "true" if the file is a valid
     * PE file and "false" otherwise.
     * <p>
     * If there is an error running the script, the method will return "false" and print a stack trace.
     * @param file_path the path of the file to be checked
     * @return "true" if the file is a valid PE file, "false" otherwise
     */
    String checkPe(String file_path) {
        String result = "false";
        try {
            // Pass arguments after the Python file name
            ProcessBuilder pb = new ProcessBuilder(
                    "python",
                    "d:\\Final Year Project\\Virus Vault Final\\virus-vault-final\\electron\\pythonscripts\\check_pe.py",
                    file_path);

            Process process = pb.start();

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));

            // int exitCode = process.waitFor();
            // System.out.println("Exited with code: " + exitCode);

            result = reader.readLine();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
