
document.addEventListener("DOMContentLoaded", function () {

    const map = L.map('map').setView([51.505, -0.09], 13);

 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

 
    const marker = L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A marker on the map.')
        .openPopup();

 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 13);

            L.marker([latitude, longitude]).addTo(map)
                .bindPopup('You are here.')
                .openPopup();
        });
    } else {
        console.warn("Geolocation is not supported by this browser.");
    }

    map.on('click', function (e) {
        const { lat, lng } = e.latlng;
        L.marker([lat, lng]).addTo(map)
            .bindPopup(`Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
            .openPopup();
    });
});
