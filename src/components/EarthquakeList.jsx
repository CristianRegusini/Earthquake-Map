/**
 * EarthquakeList.jsx
 * Menù a tendina con la lista dei terremoti filtrati.
 * Click su una voce → seleziona il terremoto e centra la mappa.
 */

import { useState } from 'react';
import { useEarthquake } from '../context/EarthquakeContext';
import { getMagnitudeColor, getMagnitudeLabel, formatDate } from '../utils/earthquakeUtils';

export default function EarthquakeList() {
  const { filtered, selected, setSelected } = useEarthquake();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Filtra per testo di ricerca nel luogo
  const visible = filtered
    .filter(eq =>
      !search || eq.luogo.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.magnitudo - a.magnitudo) // ordina per magnitudo decrescente
    .slice(0, 120); // limita a 120 voci per performance

  return (
    <div className="relative">
      {/* ── Trigger ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="btn btn-sm gap-2"
        style={{
          background:  'rgba(13,18,36,0.92)',
          border:      '1px solid #1e2a45',
          color:       '#e2e8f0',
          fontFamily:  '"Exo 2", sans-serif',
          fontSize:    '12px',
          minWidth:    '160px',
        }}
      >
        <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span>Scosse ({filtered.length})</span>
        <svg
          className={`w-3 h-3 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ── Dropdown panel ── */}
      {open && (
        <div
          className="absolute top-full left-0 mt-1 rounded-box shadow-2xl z-[1000]"
          style={{
            width:      '320px',
            maxHeight:  '440px',
            background: 'rgba(13,18,36,0.98)',
            border:     '1px solid #1e2a45',
            display:    'flex',
            flexDirection: 'column',
          }}
        >
          {/* Ricerca */}
          <div className="p-2 border-b border-[#1e2a45]">
            <input
              type="text"
              placeholder="Cerca luogo…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input input-sm w-full"
              style={{
                background:  '#141d35',
                border:      '1px solid #1e2a45',
                color:       '#e2e8f0',
                fontFamily:  '"IBM Plex Mono", monospace',
                fontSize:    '11px',
              }}
            />
          </div>

          {/* Lista scorrevole */}
          <ul className="overflow-y-auto flex-1 p-1">
            {visible.length === 0 ? (
              <li className="text-center py-6 text-slate-500 text-xs font-mono">
                Nessun terremoto trovato
              </li>
            ) : (
              visible.map(eq => {
                const color    = getMagnitudeColor(eq.magnitudo);
                const isActive = selected?.usgs_id === eq.usgs_id;
                return (
                  <li key={eq.usgs_id}>
                    <button
                      onClick={() => { setSelected(eq); setOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg transition-all flex items-start gap-3 mb-0.5"
                      style={{
                        background:  isActive ? `${color}18` : 'transparent',
                        border:      isActive ? `1px solid ${color}44` : '1px solid transparent',
                      }}
                    >
                      {/* Badge magnitudo */}
                      <span
                        className="text-sm font-bold shrink-0 w-10 text-center rounded px-1"
                        style={{
                          color,
                          background: `${color}22`,
                          fontFamily: '"Orbitron", sans-serif',
                          fontSize:   '13px',
                          lineHeight: '1.4',
                        }}
                      >
                        {eq.magnitudo?.toFixed(1) ?? '?'}
                      </span>

                      {/* Info */}
                      <div className="min-w-0">
                        <div
                          className="truncate text-xs text-slate-200"
                          style={{ fontFamily: '"Exo 2", sans-serif' }}
                          title={eq.luogo}
                        >
                          {eq.luogo}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                          {formatDate(eq.dataOra)}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          {/* Footer */}
          <div className="px-3 py-1.5 border-t border-[#1e2a45] text-[10px] text-slate-600 font-mono">
            Mostrando {Math.min(visible.length, 120)} di {filtered.length} eventi
          </div>
        </div>
      )}
    </div>
  );
}
