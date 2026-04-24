// --------------------
// INIT MAP (LEAFLET)
// --------------------
const map = L.map('map').setView([7.07, 125.6], 10);

// OpenStreetMap tiles (FREE)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// --------------------
// DATA
// --------------------
let mangroveData = [];
let markers = [];

// LOAD DATA
fetch('data/mangrove_points.json')
  .then(res => res.json())
  .then(data => {
    mangroveData = data;
    renderMangroves();
  });

// --------------------
// MANGROVE MARKERS
// --------------------
function renderMangroves() {
  clearMarkers();

  mangroveData.forEach(p => {
    const marker = L.circleMarker([p.lat, p.lon], {
      radius: 6,
      color: "#FFCC00",
      fillColor: "#FFCC00",
      fillOpacity: 0.9
    }).addTo(map);

    marker.on('click', () => openInspector(p));

    markers.push(marker);
  });
}

function clearMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
}

// --------------------
// INSPECTOR (OPTION A + C)
// --------------------
function openInspector(data) {
  document.getElementById("inspector").classList.remove("hidden");

  document.getElementById("speciesName").innerText = data.species;
  document.getElementById("speciesInfo").innerText =
    "Mangrove species adapted to intertidal coastal ecosystems with salinity tolerance.";

  document.getElementById("salinity").innerText = data.salinity;

  document.getElementById("speciesImage").src =
    "https://upload.wikimedia.org/wikipedia/commons/5/5f/Mangrove_forest.jpg";
}

// --------------------
// MAP CLICK (nearest logic preserved)
// --------------------
map.on('click', (e) => {
  const { lat, lng } = e.latlng;

  let closest = null;
  let minDist = Infinity;

  mangroveData.forEach(p => {
    const dx = p.lon - lng;
    const dy = p.lat - lat;
    const d = dx*dx + dy*dy;

    if (d < minDist) {
      minDist = d;
      closest = p;
    }
  });

  if (closest) openInspector(closest);
});

// --------------------
// LAYER CONTROLS
// --------------------
document.getElementById("layerMangrove").addEventListener("change", (e) => {
  if (e.target.checked) renderMangroves();
  else clearMarkers();
});

// Fake salinity overlay (visual heat layer)
let salinityLayer = null;

document.getElementById("layerSalinity").addEventListener("change", (e) => {
  if (e.target.checked) {
    salinityLayer = L.circle([7.07, 125.6], {
      radius: 30000,
      color: "#00B3FF",
      fillColor: "#00B3FF",
      fillOpacity: 0.2
    }).addTo(map);
  } else {
    if (salinityLayer) map.removeLayer(salinityLayer);
  }
});
