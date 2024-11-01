document.addEventListener("DOMContentLoaded", function () {

    var map = L.map('map').setView([51.505, -0.09], 13); 


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A marker on the map.')
        .openPopup();
});