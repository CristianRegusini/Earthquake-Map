/**
 * pocketbaseService.js
 * Servizio per l'integrazione con PocketBase.
 * Usa l'API REST nativa di PocketBase senza SDK esterno.
 *
 * Campi della collezione "earthquakes":
 *   id (PK), magnitudo (Number), Data&Ora (Datetime),
 *   latitudine (Text), longitudine (Text), luogo (Text), usgs_id (Text)
 */

// ─── Configurazione ──────────────────────────────────────────
// Imposta l'URL del tuo server PocketBase qui o in .env
const PB_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090';
const COLLECTION = 'earthquakes';

/** Endpoint base della collezione */
const endpoint = (path = '') =>
  `${PB_URL}/api/collections/${COLLECTION}/records${path}`;

/**
 * Recupera tutti i record dalla collezione PocketBase.
 * @returns {Promise<Object[]>}
 */
export async function fetchFromPocketBase() {
  const res = await fetch(`${endpoint()}?perPage=500&sort=-Data&Ora`);
  if (!res.ok) throw new Error(`PocketBase fetch error: ${res.status}`);
  const data = await res.json();
  return data.items || [];
}

/**
 * Salva un nuovo terremoto normalizzato in PocketBase.
 * @param {Object} earthquake - Record normalizzato da normalizeUSGSFeature()
 * @returns {Promise<Object>} - Record creato
 */
export async function saveToPocketBase(earthquake) {
  // Mappa i campi del formato interno ai campi della collezione PocketBase
  const body = {
    magnitudo:  earthquake.magnitudo,
    'Data&Ora': earthquake.dataOra,    // campo con nome speciale
    latitudine: earthquake.latitudine,
    longitudine: earthquake.longitudine,
    luogo:      earthquake.luogo,
    usgs_id:    earthquake.usgs_id,
  };

  const res = await fetch(endpoint(), {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    // 400 con codice di validità univoca = record già esistente
    if (res.status === 400 && err?.data?.usgs_id) return null;
    throw new Error(`PocketBase save error: ${res.status}`);
  }
  return res.json();
}

/**
 * Sincronizza un array di terremoti USGS normalizzati con PocketBase.
 * Inserisce solo i record non ancora presenti (basandosi su usgs_id).
 * @param {Object[]} earthquakes
 * @returns {Promise<{saved: number, skipped: number}>}
 */
export async function syncEarthquakes(earthquakes) {
  let saved = 0, skipped = 0;
  for (const eq of earthquakes) {
    try {
      const result = await saveToPocketBase(eq);
      result ? saved++ : skipped++;
    } catch {
      skipped++;
    }
  }
  return { saved, skipped };
}
