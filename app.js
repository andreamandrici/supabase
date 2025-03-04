const SUPABASE_URL = "https://gbmmegvgzgkepqtghydb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdibW1lZ3ZnemdrZXBxdGdoeWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMDQxNjUsImV4cCI6MjA1NjY4MDE2NX0.t7qcyV3T7xH-746lNR8YqdtKhGTNmPBTy82uhWs9S64";

async function fetchCategories() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
        headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        }
    });

    const data = await response.json();
    const menu = document.getElementById("category-menu");
    
    menu.innerHTML = ""; // Pulisce il menu prima di aggiungere i dati

    data.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        menu.appendChild(option);
    });
}

fetchCategories();
