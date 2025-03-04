const SUPABASE_URL = "https://your-supabase-url.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";

// Inizializza la mappa con Leaflet
const map = L.map("map").setView([41.9028, 12.4964], 6); // Roma come centro

// Aggiunge il layer OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Funzione per ottenere le locations da Supabase
async function fetchLocations() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/locations`, {
        headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        }
    });

    const data = await response.json();
    
    data.forEach(location => {
        const coordinates = location.geom.coordinates;
        const marker = L.marker([coordinates[1], coordinates[0]]).addTo(map);
        marker.bindPopup(`<b>${location.name}</b>`);
    });
}

fetchLocations();
