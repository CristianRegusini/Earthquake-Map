import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');
pb.autoCancellation(false);

const COLLECTION = 'earthquakes';

/**
 * Recupera tutti i record dalla collezione PocketBase.
 * @returns {Promise<Object[]>}
 */
export async function fetchFromPocketBase() {
  const records = await pb.collection(COLLECTION).getFullList({
    sort: '-DataandOra', /**ordina i terremoti per data decrescente */
    batch: 500 /**recupera fino a 500 record in un'unica chiamata, per performance */
  });
  return records;
}

/**
 * Salva un nuovo terremoto normalizzato in PocketBase.
 * @param {Object} earthquake - Record normalizzato da normalizeUSGSFeature()
 * @returns {Promise<Object|null>} - Record creato oppure null se già esistente
 */
export async function saveToPocketBase(earthquake) {
  // 1. Controlla se il record esiste già tramite usgs_id
  try {
    await pb.collection(COLLECTION).getFirstListItem(`usgs_id="${earthquake.usgs_id}"`);
    return null; // già presente, skip silenzioso
  } catch {
    // non esiste, procedi con l'inserimento
  }

  // 2. Converti la data nel formato accettato da PocketBase: "YYYY-MM-DD HH:mm:ss.sssZ"
  let isoDate = '';
  if (earthquake.dataOra) {
    const d = new Date(
      typeof earthquake.dataOra === 'string'
        ? earthquake.dataOra.replace(' UTC', 'Z').replace(' ', 'T')
        : earthquake.dataOra
    );
    if (!isNaN(d.getTime())) {
      isoDate = d.toISOString().replace('T', ' ');
    }
  }

  const body = {
    magnitudo:  Number(earthquake.magnitudo),
    DataandOra: isoDate,
    latitudine: String(earthquake.latitudine),
    longitudine: String(earthquake.longitudine),
    luogo:      String(earthquake.luogo),
    usgs_id:    String(earthquake.usgs_id),
  };

  // 3. Validazione campi obbligatori
  for (const [k, v] of Object.entries(body)) {
    if (v === undefined || v === null || v === '' || (k === 'magnitudo' && isNaN(v))) {
      console.error(`Campo mancante o non valido: ${k}`, body);
      throw new Error(`Campo mancante o non valido: ${k}`);
    }
  }

  // 4. Inserimento
  try {
    const record = await pb.collection(COLLECTION).create(body);
    return record;
  } catch (err) {
    console.error('PocketBase save error:', JSON.stringify(err?.data?.data, null, 2));
    console.error('Body inviato:', JSON.stringify(body, null, 2));
    throw err;
  }
}

/**
 * Sincronizza un array di terremoti USGS normalizzati con PocketBase.
 * Inserisce solo i record non ancora presenti (basandosi su usgs_id).
 * @param {Object[]} earthquakes
 * @returns {Promise<{saved: number, skipped: number, errors: number}>}
 */
export async function syncEarthquakes(earthquakes) {
  let saved = 0, skipped = 0, errors = 0;

  for (const eq of earthquakes) {
    try {
      const result = await saveToPocketBase(eq);
      result ? saved++ : skipped++;
    } catch (err) {
      console.error('Errore su:', eq?.usgs_id, err?.message);
      errors++;
    }
  }

  console.log(`Sync completato → salvati: ${saved}, già presenti: ${skipped}, errori: ${errors}`);
  return { saved, skipped, errors };
}
