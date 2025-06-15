package scanner;

import detection.SignatureDetection;
import quarantine.Quarantine;
import java.io.BufferedReader;
import java.io.File;
import java.nio.file.*;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.MessageDigest;

class FileScanner {

    /**
     * Scans a file and returns its SHA-256 checksum as a string. If there is an error reading the file, prints an error message and returns null.
     *
     * @param filePath the path of the file to be scanned
     * @return SHA-256 checksum of the file as a string, or null if there is an error reading the file
     */
    public String scanFile(String filePath) {
        try {
            return getFileChecksum(Paths.get(filePath));
        } catch (IOException e) {
            System.out.println("Error reading the file: " + e.getMessage());
            return null;
        }
    }

    /**
     * Computes the SHA-256 checksum of a given file.
     *
     * Reads the entire file and calculates its SHA-256 checksum, returning
     * the checksum as a hexadecimal string. If the file is blocked by
     * system antivirus, an error message is printed and a FileSystemException
     * is thrown. An IOException is thrown if there is an error generating
     * the checksum.
     *
     * @param file the Path to the file to compute the checksum for
     * @return SHA-256 checksum of the file as a string
     * @throws IOException if an error occurs while reading the file
     *         or generating the checksum
     */
    private String getFileChecksum(Path file) throws IOException {
        MessageDigest md;
        byte[] data;
        try {
            data = Files.readAllBytes(file);
        } catch (FileSystemException fse) {
            System.out.println("The file is being blocked by system antivirus: " + fse.getMessage());
            throw fse; // Or handle the exception here
        }

        try {
            md = MessageDigest.getInstance("SHA-256"); // You can use SHA-256 as well
        } catch (Exception e) {
            throw new IOException("Error generating checksum", e);
        }

        byte[] digest = md.digest(data);
        StringBuilder sb = new StringBuilder();
        for (byte b : digest) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}

public class DirectoryScanner {

    /**
     * Scans a directory and all its subdirectories for virus signatures.
     *
     * Walks through all files and subdirectories in the given directory and
     * scans each file for virus signatures. If a file is a directory, this method
     * is called recursively to scan all its subdirectories.
     *
     * @param directoryPath the path of the directory to scan
     */
    public void scanDirectory(String directoryPath) {
        File dir = new File(directoryPath);
        if (!dir.exists() || !dir.isDirectory()) {
            System.out.println("Invalid directory path.");
            return;
        }

        File[] files = dir.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    // Recursively scan subdirectories
                    scanDirectory(file.getAbsolutePath());
                } else {
                    // Scan individual files
                    scanFile(file.getAbsolutePath());
                }
            }
        }
    }

    /**
     * Scans a file for potential viruses by performing multiple checks.
     *
     * This method first checks if the file is a valid PE file using the PEChecker.
     * If it is, it extracts features using a Python script and then predicts
     * potential viruses using another Python script. If a virus is detected, the
     * file is moved to a quarantine directory.
     *
     * If the file is not a valid PE file, it computes the file's SHA-256 checksum
     * and checks against known virus signatures. If a virus is detected, the file
     * is moved to a quarantine directory.
     *
     * @param filePath the path of the file to be scanned
     */
    private void scanFile(String filePath) {

        try {
            PEChecker pec = new PEChecker();
            String result = pec.checkPe(filePath);
            if (result.equalsIgnoreCase(("true"))) {
                ProcessBuilder pb = new ProcessBuilder(
                        "python",
                        "d:\\Final Year Project\\Virus Vault Final\\virus-vault-final\\electron\\pythonscripts\\extract_features.py",
                        filePath);

                Process process = pb.start();

                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(process.getInputStream()));
                String result2 = reader.readLine();
                System.out.println("File Features:" + result2);

                ProcessBuilder pb2 = new ProcessBuilder(
                        "python",
                        "d:\\Final Year Project\\Virus Vault Final\\virus-vault-final\\electron\\pythonscripts\\predict.py",
                        result2);

                Process process2 = pb2.start();

                BufferedReader reader2 = new BufferedReader(
                        new InputStreamReader(process2.getInputStream()));

                String result3 = reader2.readLine();

                if ("1".equalsIgnoreCase(result3)) {
                    System.out.println("Virus detected in file: " + filePath);
                    Quarantine.quarantineFile(filePath, "d:\\Final Year Project\\Quarantine Folder\\");
                } else {
                    System.out.println("File is clean: " + filePath);
                }

            } else {
                FileScanner scanner = new FileScanner();
                String fileHash = scanner.scanFile(filePath);

                SignatureDetection detection = new SignatureDetection();
                if (detection.isVirus(fileHash)) {
                    System.out.println("Virus detected in file: " + filePath);
                    Quarantine.quarantineFile(filePath, "d:\\Final Year Project\\Quarantine Folder\\");
                } else {
                    System.out.println("File is clean: " + filePath);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
