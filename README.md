# 🌍 EarthquakeMap — Seismic Monitor

Applicazione React per la visualizzazione in tempo reale dei terremoti globali,
alimentata dall'API USGS e integrata con PocketBase come backend.

---

## 🤖 Struttura One Prompt utilizzata
---
### "EARTHQUAKE MAP" PROMPT

##### RUOLO E OBIETTIVO

Sei un esperto sviluppatore React/JavaScript. Il tuo obiettivo è creare un'applicazione completa di "Earthquake Map" in una struttura modulare coerente, composta da elementi e componenti indipendenti e riutilizzabili, ognuno deputato ad una funzione specifica.

##### CONTESTO TECNICO

* **Stack**: React 19 (usa i nuovi hook se necessario), JavaScript, Tailwind CSS, DaisyUI.
* **Codice**: Usa solo componenti funzionali (no classi).
* **Tipizzazione**: Usa JavaScript con interfacce rigorose per props e stati.
* **Back-End**: utilizza PocketBase con i seguenti campi e le rispettive tipologie di dato: id (PK), magnitudo (Number), Data\&Ora (Datetime), latitudine (Plain Text), longitudine (Plain Text), luogo (Plain Text), usgs\_id (Plain Text).

##### FUNZIONALITÀ (REQUIREMENTS)

L'applicazione deve includere:

1. **Integrazione Dati**: esegui una fetch di dati da un'API, fornita dal sito "USGS" di terremoti usando useEffect.
2. **Gestione dei dati**: Usa useState e useContext per gestire i dati provenienti dall'API.
3. **Selezione layer**: un dropdown per la scelta della tipologia della mappa (es. satellitare, geografica,...).
4. **Lista terremoti**: una menù a tendina per visualizzare le scosse rappresentate nella mappa.
5. **Funzione "Click&Show"**: Selezione terremoti dalla lista e visualizzazione al centro dello schermo
6. **Legenda**: menù a tendina per visualizzare la legenda della magnitudo in base ai colori (leggero/moderato = 0.1 - 4.9, forte = 5.0 - 6.9, molto forte/cataclisma = 7.0 - +8.0)
7. **Filtro magnitudo**: mostra solo i terremoti all'interno di un certo intervallo (se presenti); sarà composto da un elemento "Dropdown Top" da DaisyUI che rappresenta al suo interno l'elemento "Range Slider with  steps and measure"; quest'ultimo riporterà il range {min,max} da 0 a 8 con le tacche ogni 2 (0.1, 2.0, 4.0, 6.0, +8.0), con uno step di 0.5. Aggiungi anche un pulsante "+" e un pulsante "-" per aumentare o diminuire di 0.5 il filtro della magnitudo desiderato



##### VINCOLI E STILE (CONSTRAINTS)

* **UI/UX**: Usa Tailwind CSS e DaisyUI per uno stile moderno, responsive e pulito.
* **Modularità**: Dividi logicamente il codice in componenti riutilizzabili all'interno della risposta.
* **Librerie**: Non usare librerie esterne oltre a quelle citate nello stack.
* **Approccio**: Segui una struttura logica: definisci prima le interfacce, poi lo stato, poi i componenti e infine lo stile.

##### OUTPUT ATTESO

Fornisci il codice completo pronto all'interno una cartella zip pronta da scaricare. Includi i commenti necessari per spiegare la logica delle funzioni principali.


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

| Campo       | Tipo        | Note                        |
|-------------|-------------|-----------------------------|
| `id`        | PK auto     | Generato da PocketBase      |
| `magnitudo` | Number      | Es. 6.1                     |
| `Data&Ora`  | Datetime    | ISO 8601                    |
| `latitudine`| Plain Text  | Coordinata decimale (es. "37.5") |
| `longitudine`| Plain Text | Coordinata decimale         |
| `luogo`     | Plain Text  | Descrizione luogo USGS      |
| `usgs_id`   | Plain Text  | ID univoco USGS (indexed)   |

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


