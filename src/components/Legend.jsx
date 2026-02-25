/**
 * Legend.jsx
 * Menù a tendina con la legenda della magnitudo (colori e categorie).
 */

import { useState } from 'react';

const LEGEND_ENTRIES = [
  {
    color:   '#10b981',
    label:   'Leggero / Moderato',
    range:   '0.1 – 4.9',
    desc:    'Raramente causa danni strutturali',
    glow:    'rgba(16,185,129,0.4)',
  },
  {
    color:   '#f59e0b',
    label:   'Forte',
    range:   '5.0 – 6.9',
    desc:    'Possibili danni in aree popolose',
    glow:    'rgba(245,158,11,0.4)',
  },
  {
    color:   '#f97316',
    label:   'Molto Forte',
    range:   '7.0 – 7.9',
    desc:    'Danni gravi su aree estese',
    glow:    'rgba(249,115,22,0.4)',
  },
  {
    color:   '#ef4444',
    label:   'Cataclisma',
    range:   '8.0+',
    desc:    'Distruzione totale, tsunami possibili',
    glow:    'rgba(239,68,68,0.4)',
  },
];

export default function Legend() {
  const [open, setOpen] = useState(false);

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
        }}
      >
        {/* Color dots preview */}
        <span className="flex gap-0.5">
          {LEGEND_ENTRIES.map(e => (
            <span
              key={e.color}
              className="w-2 h-2 rounded-full"
              style={{ background: e.color }}
            />
          ))}
        </span>
        <span>Legenda</span>
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
          className="absolute top-full right-0 mt-1 rounded-box shadow-2xl z-[1000] p-3"
          style={{
            width:      '260px',
            background: 'rgba(13,18,36,0.98)',
            border:     '1px solid #1e2a45',
          }}
        >
          <div
            className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 pb-2 border-b border-[#1e2a45]"
            style={{ fontFamily: '"Orbitron", sans-serif' }}
          >
            Scala Magnitudo
          </div>

          <div className="flex flex-col gap-2.5">
            {LEGEND_ENTRIES.map(entry => (
              <div key={entry.color} className="flex items-start gap-3">
                {/* Indicatore visivo */}
                <div className="shrink-0 flex flex-col items-center gap-1 pt-0.5">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: entry.color,
                      boxShadow:  `0 0 8px ${entry.glow}`,
                    }}
                  />
                </div>
                {/* Testo */}
                <div>
                  <div
                    className="text-xs font-semibold"
                    style={{ color: entry.color, fontFamily: '"Exo 2", sans-serif' }}
                  >
                    {entry.label}
                  </div>
                  <div
                    className="text-[11px] text-slate-400 mt-0.5"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    M {entry.range}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5">
                    {entry.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nota sui dati */}
          <div
            className="mt-3 pt-2 border-t border-[#1e2a45] text-[9px] text-slate-600"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Fonte: USGS — Moment Magnitude Scale (Mw)
          </div>
        </div>
      )}
    </div>
  );
}
