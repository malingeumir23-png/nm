mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: [125.6, 7.07],
  zoom: 10
});

let mangroveData = [];

fetch('data/mangrove_points.json')
  .then(res => res.json())
  .then(data => {
    mangroveData = data;
  });

// SAME FUNCTION (unchanged)
function findNearest(lat, lon) {
  let closest = null;
  let minDist = Infinity;

  mangroveData.forEach(point => {
    const dx = point.lon - lon;
    const dy = point.lat - lat;
    const dist = dx * dx + dy * dy;

    if (dist < minDist) {
      minDist = dist;
      closest = point;
    }
  });

  return closest;
}

// CLICK EVENT (same logic, upgraded UI only)
map.on('click', (e) => {
  const { lng, lat } = e.lngLat;

  const result = findNearest(lat, lng);

  if (result) {
    document.getElementById('info').innerHTML = `
      <strong style="color:#FFCC00">${result.species}</strong><br/>
      <span>Salinity: ${result.salinity}</span><br/>
      <span>Location analyzed ✔</span>
    `;

    new mapboxgl.Popup({
      closeButton: false,
      className: 'popup'
    })
      .setLngLat([result.lon, result.lat])
      .setHTML(`
        <div style="
          font-family: system-ui;
          padding:6px;
          color:black;
        ">
          <b style="color:#0B3D2E">${result.species}</b><br/>
          <small>Mangrove Node</small>
        </div>
      `)
      .addTo(map);
  }
});
