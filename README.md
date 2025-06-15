# Virus Vault

Virus Vault is a cross-platform desktop antivirus application built with **React**, **Electron**, and a custom **Java** backend for scanning and threat detection.  
It provides a modern UI for scanning folders, viewing scan results, managing quarantined files, and reviewing logs.

---

## Features

- **Scan Folders:** Select any folder on your system and scan it for threats using the integrated Java backend.
- **Real-time Output:** View real-time scan progress and results in the app.
- **Quarantine Management:** List, review, and delete quarantined files.
- **Log Management:** Save and view detailed scan logs.
- **Profile Management:** Update your user profile and profile picture.
- **Modern UI:** Built with React and styled for a clean, responsive experience.

---

## Tech Stack

- **Frontend:** React (with Vite)
- **Desktop Shell:** Electron
- **Backend:** Java (for scanning and detection logic)
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
