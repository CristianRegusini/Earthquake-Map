/**
 * EarthquakeContext.jsx
 * Context globale per la gestione dello stato dell'applicazione.
 * Fornisce: dati USGS, filtri, terremoto selezionato, layer corrente.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { normalizeUSGSFeature } from '../utils/earthquakeUtils';
import { syncEarthquakes } from '../services/pocketbaseService';

// ─── URL dell'API USGS (ultimi 7 giorni, tutte le magnitudo) ──
const USGS_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

/* ─── Definizione del Context ────────────────────────────── */
const EarthquakeContext = createContext(null);

/**
 * Hook custom per consumare il context.
 * Lancia un errore se usato fuori dal Provider.
 */
export function useEarthquake() {
  const ctx = useContext(EarthquakeContext);
  if (!ctx) throw new Error('useEarthquake deve essere usato dentro EarthquakeProvider');
  return ctx;
}

/* ─── Provider ───────────────────────────────────────────── */
export function EarthquakeProvider({ children }) {
  // Lista completa di terremoti normalizzati
  const [earthquakes, setEarthquakes]     = useState([]);
  // Terremoto attualmente selezionato (per fly-to sulla mappa)
  const [selected, setSelected]           = useState(null);
  // Range di magnitudo per il filtro [min, max]
  const [magFilter, setMagFilter]         = useState([0, 8]);
  // Stato caricamento e errori API
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  // Layer della mappa corrente
  const [mapLayer, setMapLayer]           = useState('osm');
  // Stato della sincronizzazione PocketBase
  const [syncStatus, setSyncStatus]       = useState(null);

  /**
   * Fetch dei dati dall'API USGS.
   * Normalizza i feature GeoJSON e aggiorna lo stato.
   */
  const fetchEarthquakes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(USGS_URL);
      if (!res.ok) throw new Error(`USGS API error: ${res.status}`);
      const geojson = await res.json();

      // Filtra feature con geometria e magnitudo validi
      const normalized = geojson.features
        .filter(f => f.geometry && f.properties.mag != null)
        .map(normalizeUSGSFeature);

      setEarthquakes(normalized);

      // Sincronizzazione opzionale con PocketBase in background
      syncEarthquakes(normalized)
        .then(({ saved, skipped }) =>
          setSyncStatus(`Sync PocketBase: +${saved} salvati, ${skipped} già presenti`)
        )
        .catch(() => setSyncStatus('Sync PocketBase non disponibile'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch iniziale al mount del Provider
  useEffect(() => {
    fetchEarthquakes();
  }, [fetchEarthquakes]);

  /**
   * Lista filtrata in base al range di magnitudo corrente.
   * Usata da Map, EarthquakeList e MagnitudeFilter.
   */
  const filtered = earthquakes.filter(
    eq => eq.magnitudo >= magFilter[0] && eq.magnitudo <= magFilter[1]
  );

  /* ─── Valore del Context ─────────────────────────────── */
  const value = {
    earthquakes,   // Lista completa
    filtered,      // Lista filtrata
    selected,      // Terremoto selezionato
    setSelected,
    magFilter,     // [min, max] range corrente
    setMagFilter,
    loading,
    error,
    mapLayer,
    setMapLayer,
    syncStatus,
    refetch: fetchEarthquakes,
  };

  return (
    <EarthquakeContext.Provider value={value}>
      {children}
    </EarthquakeContext.Provider>
  );
}
