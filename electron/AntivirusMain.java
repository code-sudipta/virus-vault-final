import scanner.DirectoryScanner;

public class AntivirusMain {
/**
 * Main method for the Antivirus application.
 *
 * This method checks if a directory path is provided as a command-line argument.
 * If a path is provided, it creates an instance of DirectoryScanner and initiates
 * scanning of the specified directory for viruses. If no path is provided, it
 * prints a message prompting the user to specify a directory.
 *
 * @param args Command-line arguments, where args[0] is the directory path to scan.
 */
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Please specify a directory to scan.");
            return;
        }
        
        // Specify the directory you want to scan
        String directoryPath = args[0];

        System.out.println(directoryPath);

        // Create an instance of DirectoryScanner and start scanning
        DirectoryScanner directoryScanner = new DirectoryScanner();
        System.out.println("Starting Antivirus...");
        directoryScanner.scanDirectory(directoryPath);

        System.out.println("Scanning completed.");
    }
}
