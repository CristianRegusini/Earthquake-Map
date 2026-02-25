# 🌍 EarthquakeMap — Seismic Monitor

> ⚡ **Questa applicazione è stata interamente generata con un singolo prompt all'intelligenza artificiale.**
> Abbiamo descritto ciò che volevamo e l'AI ha prodotto l'intera codebase — componenti, servizi, stili e configurazione — senza alcun intervento manuale sul codice.

Applicazione React per la visualizzazione in tempo reale dei terremoti globali,
alimentata dall'API USGS e integrata con PocketBase come backend.

---

## 🚀 Avvio rapido

```bash
# 1. Installa le dipendenze
npm install

# 2. Configura le variabili d'ambiente
cp .env.example .env
# Modifica .env con l'URL del tuo server PocketBase

# 3. Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173) nel browser.

---

## 🗂️ Struttura del progetto

```
src/
├── context/
│   └── EarthquakeContext.jsx   # State globale (useState + useContext)
├── components/
│   ├── Map.jsx                 # Mappa Leaflet con marker sismici
│   ├── LayerSelector.jsx       # Dropdown selezione tile layer
│   ├── EarthquakeList.jsx      # Lista terremoti con click&show
│   ├── Legend.jsx              # Legenda magnitudo a colori
│   └── MagnitudeFilter.jsx     # Filtro range con slider + +/-
├── services/
│   └── pocketbaseService.js    # CRUD verso PocketBase REST API
├── utils/
│   └── earthquakeUtils.js      # Funzioni di normalizzazione e utilità
├── App.jsx                     # Layout principale
├── main.jsx                    # Entry point React
└── index.css                   # Stile globale + override Leaflet/DaisyUI
```

---

## 🗄️ Schema PocketBase

Crea una collezione `earthquakes` con i seguenti campi:

| Campo        | Tipo        | Note                             |
|--------------|-------------|----------------------------------|
| `id`         | PK auto     | Generato da PocketBase           |
| `magnitudo`  | Number      | Es. 6.1                          |
| `Data&Ora`   | Datetime    | ISO 8601                         |
| `latitudine` | Plain Text  | Coordinata decimale (es. "37.5") |
| `longitudine`| Plain Text  | Coordinata decimale              |
| `luogo`      | Plain Text  | Descrizione luogo USGS           |
| `usgs_id`    | Plain Text  | ID univoco USGS (indexed)        |

> ⚠️ Il campo `usgs_id` dovrebbe essere **unico** per evitare duplicati durante la sync.

---

## ✨ Funzionalità

| Feature                | Descrizione                                                      |
|------------------------|------------------------------------------------------------------|
| **API USGS**           | Fetch automatica al mount, ultimi 7 giorni, tutte le magnitudo  |
| **Mappa interattiva**  | Leaflet con 4 layer (geografica, satellitare, dark, topografica) |
| **Click & Show**       | Click dalla lista → fly-to + popup sulla mappa                  |
| **Legenda**            | Dropdown con classificazione cromatica della magnitudo           |
| **Filtro magnitudo**   | Dropdown Top + dual slider + pulsanti ±0.5                      |
| **Sync PocketBase**    | Salvataggio in background di tutti gli eventi USGS              |

---

## 🛠️ Stack tecnico

- **React 19** — componenti funzionali, hooks moderni
- **Leaflet 1.9** — mappa interattiva (caricata via npm)
- **Tailwind CSS 3** + **DaisyUI 4** — UI moderna e responsive
- **Vite 6** — bundler e dev server
- **PocketBase** — backend REST (nessun SDK, solo `fetch`)

---

## 🎨 Design

Tema **Seismic Monitor** — ispirato alle console di monitoraggio sismico:

- Sfondo: navy scuro `#080c18`
- Accenti: ambra `#f59e0b` (energia sismica)
- Marker: verde/ambra/rosso in base alla magnitudo
- Font: Orbitron (display) + IBM Plex Mono (dati) + Exo 2 (UI)

---

## 🤖 Generato con AI — One Prompt

L'intera applicazione è nata da **un solo prompt**. Nessuna iterazione, nessuna correzione manuale: abbiamo descritto il progetto all'intelligenza artificiale e lei ha generato tutto — architettura, componenti React, integrazione API, stili e configurazione — in una singola risposta.

> *Un esempio concreto di come l'AI generativa stia cambiando il modo di costruire software.*

