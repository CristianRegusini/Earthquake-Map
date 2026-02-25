/**
 * MagnitudeFilter.jsx
 * Filtro magnitudo con DaisyUI Dropdown Top.
 * Contiene uno slider range con step 0.5, tacche e pulsanti +/-.
 */

import { useEarthquake } from '../context/EarthquakeContext';
import { getMagnitudeColor } from '../utils/earthquakeUtils';

/** Tacche visualizzate sotto lo slider */
const TICKS = [
  { value: 0,   label: '0.1' },
  { value: 2,   label: '2.0' },
  { value: 4,   label: '4.0' },
  { value: 6,   label: '6.0' },
  { value: 8,   label: '+8' },
];

const MIN = 0;
const MAX = 8;
const STEP = 0.5;

export default function MagnitudeFilter() {
  const { magFilter, setMagFilter, filtered, earthquakes } = useEarthquake();
  const [minVal, maxVal] = magFilter;

  /* ── Handlers slider min/max ──────────────────────────── */
  const handleMin = e => {
    const v = Math.min(Number(e.target.value), maxVal - STEP);
    setMagFilter([v, maxVal]);
  };
  const handleMax = e => {
    const v = Math.max(Number(e.target.value), minVal + STEP);
    setMagFilter([minVal, v]);
  };

  /* ── Pulsanti +/- (agiscono sul valore max) ───────────── */
  const increment = () =>
    setMagFilter([minVal, Math.min(MAX, parseFloat((maxVal + STEP).toFixed(1)))]);
  const decrement = () =>
    setMagFilter([minVal, Math.max(minVal + STEP, parseFloat((maxVal - STEP).toFixed(1)))]);

  /* ── Colori dinamici in base al max corrente ──────────── */
  const color = getMagnitudeColor(maxVal);

  /* ── Percentuali per il track colorato ───────────────── */
  const pctMin = ((minVal - MIN) / (MAX - MIN)) * 100;
  const pctMax = ((maxVal - MIN) / (MAX - MIN)) * 100;

  return (
    /* DaisyUI Dropdown Top: si apre verso l'alto */
    <div className="dropdown dropdown-top">
      {/* ── Trigger ── */}
      <label
        tabIndex={0}
        className="btn btn-sm gap-2 cursor-pointer"
        style={{
          background:  'rgba(13,18,36,0.92)',
          border:      `1px solid ${color}66`,
          color:       '#e2e8f0',
          fontFamily:  '"Exo 2", sans-serif',
          fontSize:    '12px',
          boxShadow:   `0 0 8px ${color}22`,
        }}
      >
        {/* Icona filtro */}
        <svg className="w-3.5 h-3.5" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>

        <span>Filtro M</span>
        {/* Badge range corrente */}
        <span
          className="badge badge-sm px-2"
          style={{
            background:  `${color}22`,
            color,
            border:      `1px solid ${color}44`,
            fontFamily:  '"IBM Plex Mono", monospace',
            fontSize:    '10px',
          }}
        >
          {minVal.toFixed(1)} – {maxVal === 8 ? '+8.0' : maxVal.toFixed(1)}
        </span>

        {/* Contatore */}
        <span className="text-slate-400 text-[10px]">
          ({filtered.length}/{earthquakes.length})
        </span>

        <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </label>

      {/* ── Dropdown content (apre verso l'alto) ──────────── */}
      <div
        tabIndex={0}
        className="dropdown-content mb-2 rounded-box shadow-2xl p-4"
        style={{
          width:      '300px',
          background: 'rgba(13,18,36,0.98)',
          border:     `1px solid #1e2a45`,
          zIndex:     1001,
        }}
      >
        {/* Titolo */}
        <div
          className="text-[10px] uppercase tracking-widest text-slate-500 mb-4"
          style={{ fontFamily: '"Orbitron", sans-serif' }}
        >
          Filtro Magnitudo
        </div>

        {/* ── Slider MIN ──────────────────────────────────── */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-mono">
            <span>Min</span>
            <span style={{ color }}>{minVal.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={minVal}
            onChange={handleMin}
            className="range range-xs w-full"
            style={{ '--range-shdw': color.replace('#', '') }}
          />
        </div>

        {/* ── Slider MAX con controlli +/- ─────────────── */}
        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-mono">
            <span>Max</span>
            <span style={{ color }}>{maxVal === 8 ? '+8.0' : maxVal.toFixed(1)}</span>
          </div>

          {/* Contenitore slider + bottoni */}
          <div className="flex items-center gap-2">
            {/* Bottone - */}
            <button
              onClick={decrement}
              className="btn btn-xs btn-circle shrink-0"
              style={{
                background:  '#141d35',
                border:      '1px solid #1e2a45',
                color:       '#94a3b8',
                fontWeight:  '700',
                fontSize:    '14px',
                lineHeight:  '1',
              }}
              title="Diminuisci di 0.5"
            >
              −
            </button>

            {/* Slider MAX con track colorato custom */}
            <div className="relative flex-1">
              <input
                type="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={maxVal}
                onChange={handleMax}
                className="range range-xs w-full"
                style={{ '--range-shdw': color.replace('#', '') }}
              />
              {/* Track progress colorato */}
              <div
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-0.5 rounded-full"
                style={{
                  left:       `${pctMin}%`,
                  width:      `${pctMax - pctMin}%`,
                  background: color,
                  opacity:    0.6,
                }}
              />
            </div>

            {/* Bottone + */}
            <button
              onClick={increment}
              className="btn btn-xs btn-circle shrink-0"
              style={{
                background:  '#141d35',
                border:      `1px solid ${color}66`,
                color,
                fontWeight:  '700',
                fontSize:    '14px',
                lineHeight:  '1',
              }}
              title="Aumenta di 0.5"
            >
              +
            </button>
          </div>
        </div>

        {/* ── Tacche etichettate ──────────────────────────── */}
        <div className="flex justify-between px-0.5">
          {TICKS.map(tick => (
            <button
              key={tick.value}
              onClick={() => setMagFilter([minVal, Math.max(minVal + STEP, tick.value === 0 ? 0.1 : tick.value)])}
              className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-100"
              style={{ opacity: 0.55 }}
              title={`Imposta max a ${tick.label}`}
            >
              <div
                className="w-0.5 h-2 rounded"
                style={{ background: '#1e2a45' }}
              />
              <span
                className="text-[9px] text-slate-500"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {tick.label}
              </span>
            </button>
          ))}
        </div>

        {/* ── Reset ───────────────────────────────────────── */}
        <button
          onClick={() => setMagFilter([0, 8])}
          className="w-full mt-3 btn btn-xs btn-ghost text-slate-500 hover:text-slate-300"
          style={{ fontFamily: '"Exo 2", sans-serif', fontSize: '11px' }}
        >
          Ripristina filtro
        </button>
      </div>
    </div>
  );
}
