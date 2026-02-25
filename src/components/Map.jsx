/**
 * Map.jsx
 * Componente mappa principale basato su Leaflet.
 * Gestisce: rendering dei marker sismici, flyTo sul terremoto selezionato,
 * cambio del tile layer e popup informativi.
 */

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useEarthquake } from '../context/EarthquakeContext';
import { getMagnitudeColor, getMarkerRadius, formatDate } from '../utils/earthquakeUtils';

/* ─── Configurazione dei tile layer disponibili ──────────── */
const TILE_LAYERS = {
  osm: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    label: 'Geografica',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri & contributors',
    label: 'Satellitare',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© CARTO',
    label: 'Dark',
  },
  topo: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '© OpenTopoMap',
    label: 'Topografica',
  },
};

/* ─── Crea un'icona circolare personalizzata SVG ─────────── */
function createCircleIcon(color, radius) {
  const size = radius * 2 + 8;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius}"
        fill="${color}" fill-opacity="0.75"
        stroke="${color}" stroke-width="1.5"
        stroke-opacity="0.9"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius * 0.45}"
        fill="${color}" fill-opacity="0.95"/>
    </svg>`;
  return L.divIcon({
    html: `<div style="position:relative;">${svg}</div>`,
    className: '',
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

/* ─── Componente ─────────────────────────────────────────── */
export default function Map() {
  const { filtered, selected, setSelected, mapLayer } = useEarthquake();

  const mapRef      = useRef(null);   // Istanza Leaflet
  const containerRef= useRef(null);   // DOM div
  const layerRef    = useRef(null);   // Tile layer corrente
  const markersRef  = useRef([]);     // Array di marker attivi

  /* ─── Inizializzazione mappa ─────────────────────────── */
  useEffect(() => {
    if (mapRef.current) return; // evita doppio init in StrictMode

    mapRef.current = L.map(containerRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: true,
    });

    // Aggiunge il tile layer di default
    const cfg = TILE_LAYERS['dark'];
    layerRef.current = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: 18,
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  /* ─── Cambio tile layer ──────────────────────────────── */
  useEffect(() => {
    if (!mapRef.current) return;
    const cfg = TILE_LAYERS[mapLayer];
    if (!cfg) return;

    if (layerRef.current) {
      mapRef.current.removeLayer(layerRef.current);
    }
    layerRef.current = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: 18,
    }).addTo(mapRef.current);
  }, [mapLayer]);

  /* ─── Rendering dei marker sismici ───────────────────── */
  useEffect(() => {
    if (!mapRef.current) return;

    // Rimuove i marker precedenti
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    filtered.forEach(eq => {
      const lat = parseFloat(eq.latitudine);
      const lng = parseFloat(eq.longitudine);
      if (isNaN(lat) || isNaN(lng)) return;

      const color  = getMagnitudeColor(eq.magnitudo);
      const radius = getMarkerRadius(eq.magnitudo);
      const icon   = createCircleIcon(color, radius);

      const marker = L.marker([lat, lng], { icon })
        .bindPopup(buildPopup(eq), {
          className: 'custom-popup',
          maxWidth: 280,
        })
        .on('click', () => setSelected(eq));

      marker.addTo(mapRef.current);
      markersRef.current.push(marker);
    });
  }, [filtered, setSelected]);

  /* ─── Fly-to sul terremoto selezionato ───────────────── */
  useEffect(() => {
    if (!selected || !mapRef.current) return;
    const lat = parseFloat(selected.latitudine);
    const lng = parseFloat(selected.longitudine);
    if (isNaN(lat) || isNaN(lng)) return;

    mapRef.current.flyTo([lat, lng], 7, { duration: 1.4, easeLinearity: 0.3 });

    // Apre il popup del marker corrispondente
    markersRef.current.forEach(m => {
      const pos = m.getLatLng();
      if (Math.abs(pos.lat - lat) < 0.0001 && Math.abs(pos.lng - lng) < 0.0001) {
        m.openPopup();
      }
    });
  }, [selected]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ minHeight: '100%' }}
    />
  );
}

/* ─── Helper: costruisce l'HTML del popup ─────────────────── */
function buildPopup(eq) {
  const color = getMagnitudeColor(eq.magnitudo);
  return `
    <div style="
      background:#0d1224; color:#e2e8f0;
      font-family:'IBM Plex Mono',monospace;
      border:1px solid #1e2a45; border-radius:8px;
      padding:12px 14px; min-width:220px;
    ">
      <div style="font-size:22px;font-weight:700;color:${color};
                  text-shadow:0 0 12px ${color}88;">
        M ${eq.magnitudo?.toFixed(1) ?? '?'}
      </div>
      <div style="font-size:11px;color:#94a3b8;margin:4px 0 8px;">
        ${eq.luogo}
      </div>
      <div style="font-size:10px;color:#64748b;">
        🕐 ${formatDate(eq.dataOra)}<br/>
        📍 ${parseFloat(eq.latitudine).toFixed(3)}°,
           ${parseFloat(eq.longitudine).toFixed(3)}°
      </div>
    </div>`;
}

/* Esporta la mappa dei layer per altri componenti */
export { TILE_LAYERS };
