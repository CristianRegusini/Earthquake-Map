/**
 * App.jsx
 * Layout principale dell'applicazione EarthquakeMap.
 * Struttura: Header fisso in alto → Mappa fullscreen → Toolbar in basso.
 */

import { useEarthquake } from './context/EarthquakeContext';
import Map              from './components/Map';
import LayerSelector    from './components/LayerSelector';
import EarthquakeList   from './components/EarthquakeList';
import Legend           from './components/Legend';
import MagnitudeFilter  from './components/MagnitudeFilter';

export default function App() {
  const { loading, error, earthquakes, filtered, selected, syncStatus, refetch } =
    useEarthquake();

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: '#080c18' }}
    >
      {/* ── Overlay scanline (effetto monitor) ─────────────── */}
      <div className="scanline pointer-events-none" aria-hidden />

      {/* ════════════════════════════════════════════════════
          HEADER — barra superiore fissa
         ════════════════════════════════════════════════════ */}
      <header
        className="absolute top-0 left-0 right-0 z-[500] flex items-center justify-between px-4 py-2"
        style={{
          background:   'rgba(8,12,24,0.92)',
          borderBottom: '1px solid #1e2a45',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* ── Logo / Titolo ── */}
        <div className="flex items-center gap-3">
          {/* Dot lampeggiante = live */}
          <span
            className="blink w-2 h-2 rounded-full"
            style={{ background: '#ef4444', boxShadow: '0 0 6px #ef444488' }}
          />
          <h1
            className="glow-text text-sm font-black tracking-widest uppercase"
            style={{
              fontFamily: '"Orbitron", sans-serif',
              color:      '#f59e0b',
              letterSpacing: '0.15em',
            }}
          >
            Earthquake<span className="text-slate-400">Map</span>
          </h1>
          <span
            className="hidden sm:block text-[10px] text-slate-600 uppercase tracking-widest"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            USGS · 7 giorni
          </span>
        </div>

        {/* ── Stats centro ── */}
        <div className="hidden md:flex items-center gap-4">
          <Stat label="Totale" value={earthquakes.length} color="#94a3b8" />
          <Stat label="Visibili" value={filtered.length} color="#f59e0b" />
          {selected && (
            <Stat
              label="Selezionato"
              value={`M ${selected.magnitudo?.toFixed(1)}`}
              color="#ef4444"
            />
          )}
        </div>

        {/* ── Controlli destra ── */}
        <div className="flex items-center gap-2">
          {/* Bottone refresh */}
          <button
            onClick={refetch}
            disabled={loading}
            className="btn btn-xs btn-ghost text-slate-400 hover:text-amber-400"
            title="Aggiorna dati USGS"
          >
            <svg
              className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <LayerSelector />
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          MAPPA — occupa tutto lo schermo
         ════════════════════════════════════════════════════ */}
      <main className="absolute inset-0 pt-10 pb-14">
        {error ? (
          <ErrorScreen message={error} onRetry={refetch} />
        ) : (
          <Map />
        )}
      </main>

      {/* ── Overlay caricamento ── */}
      {loading && <LoadingOverlay />}

      {/* ════════════════════════════════════════════════════
          TOOLBAR INFERIORE — controlli sovrapposti alla mappa
         ════════════════════════════════════════════════════ */}
      <footer
        className="absolute bottom-0 left-0 right-0 z-[500] flex items-end justify-between px-4 py-2"
        style={{
          background:  'rgba(8,12,24,0.88)',
          borderTop:   '1px solid #1e2a45',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* ── Sinistra: lista e legenda ── */}
        <div className="flex items-end gap-2">
          <EarthquakeList />
          <Legend />
        </div>

        {/* ── Destra: filtro magnitudo ── */}
        <div className="flex items-end gap-2">
          {/* Sync status badge */}
          {syncStatus && (
            <span
              className="hidden lg:block text-[9px] text-slate-600 max-w-[180px] truncate"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              title={syncStatus}
            >
              {syncStatus}
            </span>
          )}
          <MagnitudeFilter />
        </div>
      </footer>

      {/* ── Dettaglio terremoto selezionato (chip centrale) ── */}
      {selected && <SelectedBadge eq={selected} />}
    </div>
  );
}

/* ─── Sotto-componenti locali ────────────────────────────── */

/** Statistica header */
function Stat({ label, value, color }) {
  return (
    <div className="text-center">
      <div
        className="text-xs font-bold"
        style={{ color, fontFamily: '"IBM Plex Mono", monospace' }}
      >
        {value}
      </div>
      <div className="text-[9px] text-slate-600 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

/** Overlay di caricamento */
function LoadingOverlay() {
  return (
    <div
      className="absolute inset-0 z-[900] flex flex-col items-center justify-center gap-4"
      style={{ background: 'rgba(8,12,24,0.85)', backdropFilter: 'blur(4px)' }}
    >
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full border-2 border-t-amber-400 border-slate-700 animate-spin"
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: '0 0 20px rgba(245,158,11,0.3)' }}
        />
      </div>
      <p
        className="text-xs text-slate-400 tracking-widest"
        style={{ fontFamily: '"IBM Plex Mono", monospace' }}
      >
        Caricamento dati USGS…
      </p>
    </div>
  );
}

/** Schermata di errore */
function ErrorScreen({ message, onRetry }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8">
      <div className="text-red-400 text-4xl">⚠</div>
      <div
        className="text-sm text-red-400 text-center max-w-xs"
        style={{ fontFamily: '"IBM Plex Mono", monospace' }}
      >
        {message}
      </div>
      <button onClick={onRetry} className="btn btn-sm btn-error btn-outline">
        Riprova
      </button>
    </div>
  );
}

/** Badge con info terremoto selezionato (top-center) */
function SelectedBadge({ eq }) {
  const colors = { light: '#10b981', mid: '#f59e0b', high: '#ef4444' };
  const mag = eq.magnitudo ?? 0;
  const color = mag < 5 ? colors.light : mag < 7 ? colors.mid : colors.high;

  return (
    <div
      className="absolute top-14 left-1/2 -translate-x-1/2 z-[400] rounded-xl px-4 py-2 flex items-center gap-3"
      style={{
        background:  'rgba(13,18,36,0.95)',
        border:      `1px solid ${color}55`,
        boxShadow:   `0 0 20px ${color}22`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <span
        className="text-xl font-black"
        style={{ color, fontFamily: '"Orbitron", sans-serif' }}
      >
        M {mag.toFixed(1)}
      </span>
      <div>
        <div
          className="text-xs text-slate-200 max-w-[200px] truncate"
          style={{ fontFamily: '"Exo 2", sans-serif' }}
        >
          {eq.luogo}
        </div>
        <div
          className="text-[10px] text-slate-500"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          {parseFloat(eq.latitudine).toFixed(2)}°, {parseFloat(eq.longitudine).toFixed(2)}°
        </div>
      </div>
    </div>
  );
}
