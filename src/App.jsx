import "./App.css";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Quarantine from "./components/Quarantine";
import Scan from "./components/Scan";
import Settings from "./components/Settings";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SidebarContent from "./components/SidebarContent";
import AppHeader from "./components/AppHeader";
import Authentication from "./components/Authentication";
import logo from "./assets/images/logo.png";
import { Toaster } from "react-hot-toast";
import OpeningBanner from "./components/OpeningBanner";

/**
 * The main App component. It renders the main layout of the application,
 * including the sidebar, header, and main content.
 *
 * It also handles the authentication state and renders the Authentication
 * component if the user is not logged in.
 *
 * @returns {React.ReactElement} The App component.
 */
function App() {
  const [disabled, setDisabled] = useState(false);
  const [login, setLogin] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).name
      : ""
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <OpeningBanner />;
  }

  if (login) {
    return (
      <BrowserRouter>
        <div className="App flex">
          <Toaster position="top-right" />
          <div className="w-[20%] bg-[--sidebar-bg-color] h-screen shadow-md fixed z-20">
            <SidebarContent
              disabled={disabled}
              setLogin={setLogin}
            ></SidebarContent>
          </div>
          <div className="main-content flex-1 ml-[20%] flex flex-col h-screen">
            {/* Header */}
            <div className="fixed w-[80%] z-20 shadow-md">
              <AppHeader userName={userName}></AppHeader>
            </div>

            {/* Main Content */}
            <div className="bg-[--bg-color] p-8 mt-20">
              <Routes>
                <Route
                  path="/"
                  element={<Dashboard setDisabled={setDisabled} />}
                />
                <Route
                  path="/scan"
                  element={<Scan setDisabled={setDisabled} />}
                />
                <Route
                  path="/quarantine"
                  element={<Quarantine setDisabled={setDisabled} />}
                />
                <Route
                  path="/settings"
                  element={<Settings setDisabled={setDisabled} />}
                />
                <Route
                  path="/about"
                  element={<About />}
                  setDisabled={setDisabled}
                />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <div className="w-full bg-[var(--bg-color)] flex flex-col justify-center h-screen">
      <Toaster position="top-right" />
      {/* <!-- Logo & Tabs --> */}
      <div className="w-full flex items-center justify-center gap-4 mb-8">
        <img src={logo} className="w-16 h-16" alt="Virus Vault Logo" />
        <h1 className="text-3xl font-bold">
          <span className="text-[#7F55E0]">VIRUS</span>
          <span className="text-[#E8618C]">VAULT</span>
        </h1>
      </div>

      <Authentication
        setLogin={setLogin}
        setUserName={setUserName}
      ></Authentication>
    </div>
  );
}

export default App;