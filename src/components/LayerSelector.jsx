/**
 * LayerSelector.jsx
 * Dropdown DaisyUI per la selezione del tile layer della mappa.
 */

import { useEarthquake } from '../context/EarthquakeContext';
import { TILE_LAYERS } from './Map';

const LAYER_ICONS = {
  osm:       '🗺️',
  satellite: '🛰️',
  dark:      '🌑',
  topo:      '⛰️',
};

export default function LayerSelector() {
  const { mapLayer, setMapLayer } = useEarthquake();

  const currentLabel = TILE_LAYERS[mapLayer]?.label ?? 'Layer';
  const currentIcon  = LAYER_ICONS[mapLayer] ?? '🗺️';

  return (
    <div className="dropdown dropdown-end">
      {/* ── Trigger button ── */}
      <label
        tabIndex={0}
        className="btn btn-sm gap-2 border-seismic-border"
        style={{
          background:  'rgba(13,18,36,0.92)',
          borderColor: '#1e2a45',
          color:       '#e2e8f0',
          fontFamily:  '"Exo 2", sans-serif',
          fontSize:    '12px',
        }}
      >
        <span>{currentIcon}</span>
        <span>{currentLabel}</span>
        <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </label>

      {/* ── Dropdown content ── */}
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-lg rounded-box w-44 mt-1"
        style={{
          background:  'rgba(13,18,36,0.97)',
          border:      '1px solid #1e2a45',
          fontFamily:  '"IBM Plex Mono", monospace',
          fontSize:    '12px',
        }}
      >
        {Object.entries(TILE_LAYERS).map(([key, cfg]) => (
          <li key={key}>
            <button
              onClick={() => setMapLayer(key)}
              className={`flex items-center gap-2 rounded-md px-3 py-2 transition-all ${
                mapLayer === key
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              <span>{LAYER_ICONS[key]}</span>
              <span>{cfg.label}</span>
              {mapLayer === key && (
                <span className="ml-auto text-amber-400">✓</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
