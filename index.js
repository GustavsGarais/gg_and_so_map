// starts off with the first place to show
var map = L.map('map').setView([56.9467, 24.1203], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var sourceProj = 'EPSG:3059';
var destProj = 'EPSG:4326';

fetch('dati.json')
    .then(response => response.json())
    .then(data => {
        console.log('JSON data:', data); 

        data.features.forEach(function(feature) {

            var coordinates = feature.geometry.coordinates;
            var properties = feature.properties;

            console.log('Original coordinates:', coordinates); 


            var transformedCoordinates = proj4(sourceProj, destProj, coordinates);

            console.log('Transformed coordinates:', transformedCoordinates);


            L.marker([transformedCoordinates[1], transformedCoordinates[0]]).addTo(map)
                .bindPopup(properties.PLACENAME);
        });
    })
    .catch(error => console.error('Error fetching the JSON file:', error));