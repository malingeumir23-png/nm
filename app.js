mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: [125.6, 7.07],
  zoom: 10
});

// DATA
let mangroveData = [];

// LOAD DATA
fetch('data/mangrove_points.json')
  .then(res => res.json())
  .then(data => {
    mangroveData = data;
  });

// MARKERS STORAGE
let markers = [];

// CREATE MARKERS
function renderMangroves() {
  mangroveData.forEach(p => {
    const el = document.createElement('div');
    el.style.width = "10px";
    el.style.height = "10px";
    el.style.background = "#FFCC00";
    el.style.borderRadius = "50%";

    const marker = new mapboxgl.Marker(el)
      .setLngLat([p.lon, p.lat])
      .addTo(map);

    markers.push(marker);
  });
}

// CLEAR MARKERS
function clearMarkers() {
  markers.forEach(m => m.remove());
  markers = [];
}

// INITIAL RENDER
map.on('load', () => {
  renderMangroves();
});

// CLICK INTERACTION (UNCHANGED LOGIC + INSPECTOR)
map.on('click', (e) => {
  const { lng, lat } = e.lngLat;

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

  if (!closest) return;

  document.getElementById("inspector").classList.remove("hidden");

  document.getElementById("speciesName").innerText = closest.species;
  document.getElementById("speciesInfo").innerText =
    "Mangrove species adapted to intertidal coastal ecosystems.";

  document.getElementById("salinity").innerText = closest.salinity;

  document.getElementById("speciesImage").src =
    "https://upload.wikimedia.org/wikipedia/commons/5/5f/Mangrove_forest.jpg";
});

// -------------------------
// LAYER CONTROLS (NEW SYSTEM)
// -------------------------

document.getElementById("layerMangrove").addEventListener("change", (e) => {
  if (e.target.checked) {
    renderMangroves();
  } else {
    clearMarkers();
  }
});

// SALINITY LAYER (visual proxy overlay)
let salinityLayerAdded = false;

document.getElementById("layerSalinity").addEventListener("change", (e) => {
  if (e.target.checked) {
    if (!salinityLayerAdded) {
      map.addSource('salinity', {
        type: 'raster',
        tiles: [
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        ],
        tileSize: 256
      });

      map.addLayer({
        id: 'salinity-layer',
        type: 'raster',
        source: 'salinity',
        paint: {
          'raster-opacity': 0.3
        }
      });

      salinityLayerAdded = true;
    }
  } else {
    if (map.getLayer('salinity-layer')) {
      map.removeLayer('salinity-layer');
      map.removeSource('salinity');
    }
    salinityLayerAdded = false;
  }
});

// HYDROLOGICAL OVERLAY (fake heat visual layer)
document.getElementById("layerHydro").addEventListener("change", (e) => {
  if (e.target.checked) {
    map.setPaintProperty('water', 'fill-color', '#00B3FF');
  } else {
    map.setPaintProperty('water', 'fill-color', '#3b9ddd');
  }
});
