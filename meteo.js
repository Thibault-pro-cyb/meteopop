// Coordonnées de Lyon
const lat = 45.7640;
const lon = 4.8357;

// Appel à l'API open-meteo
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const current = data.current_weather;
        const temperature = current.temperature;
        const windspeed = current.windspeed;
        const weathercode = current.weathercode;

        // Interprétation du code météo
        let description = "";
        if (weathercode === 0) description = "Ciel dégagé";
        else if (weathercode === 1 || weathercode === 2) description = "Partiellement nuageux";
        else if (weathercode === 3) description = "Nuageux";
        else if (weathercode >= 51 && weathercode <= 67) description = "Pluie";
        else if (weathercode >= 71 && weathercode <= 77) description = "Neige";
        else description = "Météo variable";

        // Mise à jour du DOM
        document.getElementById('weatherDesc').textContent = description;
        document.getElementById('temperature').textContent = `${temperature}°C`;
        document.getElementById('wind').textContent = `Vent: ${windspeed} km/h`;

        // Changer la couleur de la barre de navigation selon la température
        const nav = document.querySelector('nav');
        if (temperature < 10) {
            nav.style.backgroundColor = '#32ec16'; // froid : vert
        } else if (temperature >= 10 && temperature <= 25) {
            nav.style.backgroundColor = '#f6e609'; // modéré : jaune
        } else {
            nav.style.backgroundColor = '#e62222'; // chaud : rouge
        }
    })
    .catch(error => {
        console.error('Erreur météo:', error);
        document.getElementById('weatherDesc').textContent = 'Indisponible';
    });