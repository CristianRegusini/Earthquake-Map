🌿 Leaflet-X-PocketBase

Leaflet-X-PocketBase è un progetto che integra Leaflet con PocketBase per salvare e gestire informazioni di una mappa direttamente in un database. Perfetto per creare applicazioni geospaziali interattive con un backend leggero e potente.

⚡ Panoramica

PocketBase è un backend open-source scritto in Go, che racchiude tutte le funzionalità essenziali in un singolo eseguibile. Ideale per prototipi rapidi, side projects e applicazioni di piccole-medie dimensioni con bassa manutenzione.

Leaflet è una libreria JavaScript leggera e performante per creare mappe interattive su web e dispositivi mobili.

Questo progetto unisce la potenza di PocketBase con la semplicità di Leaflet per creare mappe dinamiche e persistenti.

🗝️ Funzionalità Chiave
PocketBase

Database Embedded in Tempo Reale: SQLite integrato con modalità WAL e sottoscrizioni in tempo reale.

API REST-ish e Admin UI: Accesso immediato ai dati tramite API e dashboard web.

Autenticazione Integrata: Supporto per email/password e provider OAuth2 (Google, GitHub, ecc.).

Gestione File: Archiviazione locale o compatibile S3.

Estendibile: Hooks, rotte personalizzate e logica custom in Go o JavaScript.

Leaflet

Leggera e Veloce: ~42 KB, ottimizzata per performance e animazioni fluide.

Mobile-Friendly: Supporto nativo per pinch-zoom e scroll wheel.

Senza Dipendenze Esterne: Facile integrazione in qualsiasi progetto.

Estensibile con Plugin: Clustering, geocodifica, supporto KML/CSV, e molto altro.

Supporto Tipi di Layer:

Tile Layers (OpenStreetMap, Mapbox, ecc.)

Marker e Popup personalizzati

Polilinee, poligoni, cerchi e rettangoli

GeoJSON per layer interattivi

🛠️ Come Funziona

Inizializzazione della Mappa:

const map = L.map('map').setView([lat, lng], zoom);


Aggiunta dei Tile Layers:

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


Aggiunta di Dati Dinamici:
Marker, poligoni o GeoJSON possono essere caricati e salvati su PocketBase.

const marker = L.marker([lat, lng]).addTo(map);

🔗 Integrazione Leaflet ↔ PocketBase

Salvataggio automatico dei marker e dei layer creati sulla mappa.

Sincronizzazione in tempo reale tra client e database PocketBase.

Gestione utenti e permessi tramite PocketBase.

💻 Installazione
# Clona il repository
git clone https://github.com/tuo-username/Leaflet-X-PocketBase.git

# Installa le dipendenze (es. per frontend JS)
npm install

# Avvia PocketBase
./pocketbase serve

🌟 Esempio d'Uso

Apri l'applicazione nel browser.

Crea un nuovo marker sulla mappa.

Salva automaticamente il marker nel database PocketBase.

Visualizza i marker salvati anche dopo il refresh della pagina.

📂 Struttura del Progetto
Leaflet-X-PocketBase/
├─ public/          # File statici e HTML
├─ src/             # Codice JavaScript per Leaflet
├─ pocketbase/      # Istanza PocketBase e collezioni
├─ README.md
└─ package.json
