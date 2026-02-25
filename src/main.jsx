/**
 * main.jsx — Entry point dell'applicazione.
 * Avvolge l'app nell'EarthquakeProvider per la gestione globale dello stato.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { EarthquakeProvider } from './context/EarthquakeContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EarthquakeProvider>
      <App />
    </EarthquakeProvider>
  </React.StrictMode>
);
