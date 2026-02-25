# 🌍 Earthquake Map & Seismic Monitor

Benvenuti in **Earthquake Map**, una piattaforma interattiva per il monitoraggio in tempo reale dei terremoti globali. Il progetto visualizza i dati sismici forniti dall'API **USGS**, integrandoli con un backend **PocketBase** per la persistenza dei dati e l'autenticazione.

Il repository è strutturato in due versioni distinte, ospitate su branch differenti, per esplorare diversi approcci allo sviluppo web:

---

## 🛠️ Scegli la tua versione

Il progetto è stato sviluppato con due tecnologie diverse. Scegli la branch più adatta alle tue esigenze:

| Versione | Tecnologia | Caratteristiche Principali | Link alla Branch |
| --- | --- | --- | --- |
| **Vanilla JS** | `.js` + Leaflet | Leggera, imperativa, ideale per capire l'integrazione diretta di Leaflet. | [🔗 Vai alla Branch JS]([https://www.google.com/search?q=%23](https://github.com/CristianRegusini/Earthquake-Map/tree/JavaScript-Earthquake-map)) |
| **React UI** | `.jsx` + React 19 | Componenti moderni, Context API, interamente generata tramite AI. | [🔗 Vai alla Branch React]([https://www.google.com/search?q=%23](https://github.com/CristianRegusini/Earthquake-Map/tree/One-Prompt-Earthquake-Map)) |

---

## ✨ Funzionalità Comuni

Indipendentemente dalla versione scelta, l'applicazione offre:

* **Mappa Interattiva**: Visualizzazione tramite Leaflet con cerchi dinamici (colore e raggio) basati sulla magnitudo.
* **Dati Real-time**: Fetch automatico degli ultimi eventi sismici dall'API USGS.
* **Sincronizzazione Backend**: Salvataggio e aggiornamento automatico dei terremoti su database PocketBase.
* **Filtri Avanzati**: Filtraggio per magnitudo e ricerca testuale per luogo.
* **UI Responsive**: Interfaccia moderna basata su **Tailwind CSS** e **DaisyUI**.
* **Multi-Layer**: Switch tra mappe satellitari, geografiche e dark mode.

---

## 🗄️ Setup del Backend (PocketBase)

Entrambe le versioni richiedono un'istanza di **PocketBase** attiva.

1. Scarica ed esegui PocketBase: [pocketbase.io](https://pocketbase.io/docs/).
2. Avvia il server: `./pocketbase serve`.
3. **Schema Database**: Crea una collezione (chiamata `terremoti` o `earthquakes` a seconda della branch) con i seguenti campi:

| Campo | Tipo | Descrizione |
| --- | --- | --- |
| `usgs_id` | Text (Unique) | ID univoco del terremoto |
| `magnitudo` | Number | Intensità sismica |
| `luogo` | Text | Descrizione geografica |
| `latitudine` | Number/Text | Coordinata decimale |
| `longitudine` | Number/Text | Coordinata decimale |
| `DateTime` | Date/ISO | Data e ora dell'evento |

> **Tip:** Puoi importare il file `pb_schema.json` (se presente nella branch) direttamente nel pannello admin di PocketBase per configurare tutto in un click.

---

## 🚀 Avvio Rapido (Locale)

Una volta scelta la branch e configurato PocketBase:

```bash
# Installa le dipendenze
npm install

# Configura l'endpoint PocketBase (es. in src/main.js o .env)
# URL predefinito: http://localhost:8090

# Avvia il server di sviluppo
npm run dev

```

L'app sarà disponibile su `http://localhost:5173`.

---

## 🧪 Stack Tecnologico

* **Frontend**: [Vite](https://vitejs.dev/) + [Leaflet](https://leafletjs.com/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
* **Backend as a Service**: [PocketBase](https://pocketbase.io/)
* **Data Source**: [USGS Earthquake Catalog](https://www.google.com/search?q=https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

---

## 🤖 Nota sulla Versione React

La versione presente nella branch **React** si distingue per essere stata generata interamente tramite **intelligenza artificiale** con un singolo prompt, dimostrando le capacità attuali di automazione nella creazione di architetture software complesse (Context, Services, Hooks).

---

> **Vuoi approfondire il codice?** Scegli una delle branch sopra per leggere i dettagli tecnici specifici di implementazione!
