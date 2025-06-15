package detection;

import java.nio.file.*;
import java.util.List;
import java.io.IOException;

public class SignatureDetection {
    private static final String SIGNATURE_FILE = "D:\\Final Year Project\\Virus Vault Final\\virus-vault-final\\electron\\resources\\virus_sample_sha256.txt"; // Location of signatures

    /**
     * Checks if a given file hash is present in the list of virus signatures
     * @param fileHash SHA-256 hash of the file
     * @return true if the file hash is present in the signatures, false otherwise
     * @throws IOException if the signatures file cannot be read
     */
    public boolean isVirus(String fileHash) {
        try {
            List<String> signatures = Files.readAllLines(Paths.get(SIGNATURE_FILE));
            return signatures.contains(fileHash);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
