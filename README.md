# Virus Vault

Virus Vault is a cross-platform desktop antivirus application built with **React**, **Electron**, and a custom **Java** backend for scanning and threat detection.  
It provides a modern UI for scanning folders, viewing scan results, managing quarantined files, and reviewing logs.

---

## Features

- **Scan Folders:** Select any folder on your system and scan it for threats using the integrated Java backend.
- **AI-Powered Executable Detection:** Advanced machine learning algorithms analyze executable files (.exe, .dll, .bat, etc.) to detect potential malware and suspicious behavior patterns.
- **Real-time Output:** View real-time scan progress and results in the app.
- **Quarantine Management:** List, review, and delete quarantined files.
- **Log Management:** Save and view detailed scan logs.
- **Profile Management:** Update your user profile and profile picture.
- **Modern UI:** Built with React and styled for a clean, responsive experience.

---

## AI Detection Capabilities

### Executable File Analysis
- **Static Analysis:** Examines file structure, headers, and metadata without executing the file
- **Behavioral Pattern Recognition:** Uses machine learning models to identify suspicious code patterns
- **Heuristic Detection:** Analyzes file characteristics and code signatures to detect zero-day threats
- **PE (Portable Executable) Analysis:** Deep inspection of Windows executable file formats
- **Entropy Analysis:** Detects packed or obfuscated malware through entropy calculations

### Supported File Types
- Windows Executables (.exe)
- Dynamic Link Libraries (.dll)
- Batch Files (.bat, .cmd)
- PowerShell Scripts (.ps1)
- JavaScript Files (.js, .jse)
- Visual Basic Scripts (.vbs, .vbe)

### Detection Methods
- **Signature-based Detection:** Traditional hash-based malware identification
- **Machine Learning Classification:** AI models trained on malware datasets
- **Anomaly Detection:** Identifies files that deviate from normal executable patterns
- **Behavioral Analysis:** Predicts potential malicious actions before execution

---

## Tech Stack

- **Frontend:** React (with Vite)
- **Desktop Shell:** Electron
- **Backend:** Java (for scanning and detection logic)
- **AI/ML:** Custom machine learning models for executable analysis
- **IPC:** Electron contextBridge and IPC for secure communication between frontend and backend

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [Java JDK](https://adoptopenjdk.net/) (v8 or higher)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd virus-vault-final
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the React development server:**
   ```sh
   npm run dev
   ```

4. **Start the Electron app (in a new terminal):**
   ```sh
   npm run electron
   ```
   > This will launch the Electron shell and connect to the running React app.

---

## Project Structure

```
virus-vault-final/
├── electron/           # Electron main process, preload, and Java integration scripts
│   ├── main.js
│   ├── preload.js
│   ├── run-java.js
│   └── ... (Java source files and folders)
├── src/                # React frontend source code
│   ├── components/
│   ├── App.jsx
│   └── ...
├── public/
├── package.json
├── README.md
└── ...
```

---

## AI Model Information

The AI detection system uses:
- **Training Data:** Curated datasets of known malware and benign executables
- **Model Architecture:** Ensemble of classification algorithms optimized for real-time scanning
- **Performance:** Low false-positive rates with high detection accuracy
- **Updates:** Models can be updated independently of the main application

---

## Documentation

- **Frontend:** JSDoc comments are included in React components.  
  You can generate HTML docs using [documentation.js](https://documentation.js.org/).
- **Electron/Backend:** All Electron and Java integration scripts are documented with JSDoc.
- **Java:** Java source files are documented with Javadoc comments.  
  Generate docs using:
  ```sh
  javadoc -d docs *.java scanner/*.java quarantine/*.java detection/*.java
  ```

---

## Scripts

| Command            | Description                       |
|--------------------|-----------------------------------|
| `npm run dev`      | Start React development server    |
| `npm run electron` | Start Electron app                |
| `npm run build`    | Build React app for production    |

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is for educational purposes.

---

## Credits

- React, Electron, Java, and open-source libraries used in this project.
- Machine learning frameworks and malware research datasets used for AI model training.
