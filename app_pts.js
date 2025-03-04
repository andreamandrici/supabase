const SUPABASE_URL = "https://gbmmegvgzgkepqtghydb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdibW1lZ3ZnemdrZXBxdGdoeWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMDQxNjUsImV4cCI6MjA1NjY4MDE2NX0.t7qcyV3T7xH-746lNR8YqdtKhGTNmPBTy82uhWs9S64";


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
