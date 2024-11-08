// Initialize the map
const map = L.map('map').setView([56.946, 24.105], 3); // Set the zoom level to 3 to show the entire world, centered on Riga

// Add the tile layer (background map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define the projection for EPSG:3301 (Latvia) to WGS84 (Leaflet's standard)
const proj4def = '+proj=tmerc +lat_0=56.0 +lon_0=24.0 +k=1.0 +x_0=0.0 +y_0=0.0 +datum=WGS84 +units=m +no_defs';
const latLon = proj4(proj4def, proj4.WGS84); // Create a conversion function

// Function to load and display markers from the dati.json file
function loadMarkers() {
    // Log the entire dati object to check if it's being loaded correctly
    if (typeof dati !== 'undefined') {
        console.log('Markers data loaded:', dati);  // Check if dati is being loaded correctly
        if (Array.isArray(dati)) {
            console.log('Valid markers array found.');
            dati.forEach(markerData => {
                const { geometry, properties } = markerData;

                // Extract the coordinates and convert from EPSG:3301 to EPSG:4326 (WGS84)
                const [x, y] = geometry.coordinates;
                const [longitude, latitude] = latLon.forward([x, y]);

                // Log the transformed coordinates for debugging
                console.log(`Converted coordinates for ${properties.PLACENAME}: [${longitude}, ${latitude}]`);

                // Check if the transformed coordinates are valid before placing the marker
                if (latitude && longitude) {
                    const title = properties.PLACENAME;
                    const description = `Code: ${properties.REG_CODE}, LVM District: ${properties.LVM_DISTRI}, Block: ${properties.BLOCKKEY}`;

                    // Add marker to the map
                    const marker = L.marker([latitude, longitude]).addTo(map);

                    // Bind a popup to the marker (display title and description)
                    marker.bindPopup(`<b>${title}</b><br>${description}`);
                } else {
                    console.warn(`Invalid coordinates for marker: ${properties.PLACENAME}`);
                }
            });
        } else {
            console.error('Invalid format for dati, expected an array of features.');
        }
    } else {
        console.error('dati.json is not loaded.');
    }
}

// Call the function to load markers when the map is ready
map.on('load', loadMarkers);
