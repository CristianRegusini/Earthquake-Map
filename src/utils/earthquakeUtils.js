/**
 * earthquakeUtils.js
 * Funzioni di utilità per la trasformazione e la classificazione dei dati sismici.
 */

/**
 * Restituisce il colore del marker in base alla magnitudo.
 * @param {number} mag - Magnitudo del terremoto
 * @returns {string} - Codice colore CSS
 */
export function getMagnitudeColor(mag) {
  if (mag < 5.0) return '#10b981';  // verde  — leggero/moderato
  if (mag < 7.0) return '#f59e0b';  // ambra  — forte
  return '#ef4444';                  // rosso  — molto forte / cataclisma
}

/**
 * Restituisce la categoria testuale della magnitudo.
 * @param {number} mag
 * @returns {string}
 */
export function getMagnitudeLabel(mag) {
  if (mag < 5.0) return 'Leggero/Moderato';
  if (mag < 7.0) return 'Forte';
  return mag >= 8.0 ? 'Cataclisma' : 'Molto Forte';
}

/**
 * Trasforma un feature GeoJSON dell'USGS nel formato interno dell'app.
 * @param {Object} feature - Feature GeoJSON USGS
 * @returns {Object} - Earthquake record normalizzato
 */
export function normalizeUSGSFeature(feature) {
  const { id, properties, geometry } = feature;
  const [longitude, latitude] = geometry.coordinates;
  return {
    usgs_id:   id,
    magnitudo: properties.mag,
    luogo:     properties.place || 'Sconosciuto',
    // Data&Ora come stringa ISO per PocketBase (Datetime)
    dataOra:   new Date(properties.time).toISOString(),
    latitudine:  String(latitude),
    longitudine: String(longitude),
  };
}

/**
 * Formatta una data ISO in formato leggibile (it-IT).
 * @param {string} iso
 * @returns {string}
 */
export function formatDate(iso) {
  return new Date(iso).toLocaleString('it-IT', {
    day:    '2-digit',
    month:  '2-digit',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  });
}

/**
 * Calcola il raggio del marker in pixel proporzionale alla magnitudo.
 * @param {number} mag
 * @returns {number}
 */
export function getMarkerRadius(mag) {
  return Math.max(5, mag * 3.5);
}
