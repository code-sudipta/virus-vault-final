package quarantine;

import java.io.File;
import java.util.UUID;

public class Quarantine {
/**
 * Moves a specified file to a quarantine directory, ensuring the quarantine directory
 * exists and appending a unique identifier to the file name to avoid conflicts.
 *
 * @param filePath The path of the file to be quarantined.
 * @param quarantineDir The directory where the file will be moved to quarantine.
 */
    public static void quarantineFile(String filePath, String quarantineDir) {
        File file = new File(filePath);
        File quarantineDirectory = new File(quarantineDir);

        // Create quarantine directory if it doesn't exist
        if (!quarantineDirectory.exists()) {
            if (quarantineDirectory.mkdirs()) {
                System.out.println("Quarantine directory created at: " + quarantineDir);
            } else {
                System.out.println("Failed to create quarantine directory.");
                return;
            }
        }

        // Move the file to the quarantine directory
        String fileName = file.getName();
        String uniqueId = UUID.randomUUID().toString();
        fileName = fileName.substring(0, fileName.lastIndexOf('.')) + uniqueId
                + fileName.substring(fileName.lastIndexOf('.'));

        File quarantineFile = new File(quarantineDirectory, fileName);

        if (file.renameTo(quarantineFile)) {
            System.out.println("File successfully moved to quarantine: " + quarantineFile.getAbsolutePath());
        } else {
            System.out.println("Failed to move the file to quarantine.");
        }
    }
}
