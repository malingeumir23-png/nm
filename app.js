const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v11",
  center: [125.6, 7.07],
  zoom: 9
});

let data = [];

fetch("data/mangrove_points.json")
  .then(res => res.json())
  .then(d => data = d);

// fast local inference (proxy-based CSI logic simplified)
function computeSuitability(point) {
  const score =
    (point.hydro * 0.5) +
    (point.soil * 0.3) +
    (point.water * 0.2);

  if (score > 0.75) return "Suitable";
  if (score > 0.35) return "Marginal";
  return "Unsuitable";
}

// nearest lookup (lightweight)
function nearest(lon, lat) {
  let best = null;
  let bestDist = Infinity;

  for (const p of data) {
    const dx = p.lon - lon;
    const dy = p.lat - lat;
    const d = dx * dx + dy * dy;

    if (d < bestDist) {
      bestDist = d;
      best = p;
    }
  }

  return best;
}

map.on("click", (e) => {
  const { lng, lat } = e.lngLat;

  const p = nearest(lng, lat);

  if (!p) return;

  const status = computeSuitability(p);

  document.getElementById("info").innerHTML = `
    <b>Site Analysis</b><br/>
    Status: ${status}<br/>
    Hydrology: ${p.hydro}<br/>
    Soil: ${p.soil}<br/>
    Water: ${p.water}
  `;

  new mapboxgl.Popup()
    .setLngLat([p.lon, p.lat])
    .setHTML(`<b>${status}</b>`)
    .addTo(map);
});