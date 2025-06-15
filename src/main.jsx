import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import App from './App.jsx'
import './index.css'
// import 'primereact/resources/themes/lara-light-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css';               // Core CSS
import 'primeicons/primeicons.css';                             // Icons


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider>
       <App />
    </PrimeReactProvider>
  </React.StrictMode>
)
