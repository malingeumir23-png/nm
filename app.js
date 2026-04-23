const map = L.map('map').setView([7.07, 125.6], 10);

// OpenStreetMap base layer (FREE)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// =========================
// 2. MOCK CHAPTER 3 DATASET
// (hydro + soil proxies)
// =========================
const dataset = [
  { lat: 7.07, lon: 125.60, hydro: 0.92, soil: 0.81 },
  { lat: 7.08, lon: 125.61, hydro: 0.65, soil: 0.72 },
  { lat: 7.06, lon: 125.59, hydro: 0.30, soil: 0.40 },
  { lat: 7.10, lon: 125.63, hydro: 0.55, soil: 0.60 },
  { lat: 7.04, lon: 125.58, hydro: 0.20, soil: 0.25 }
];

// =========================
// 3. CSI MODEL (Chapter 3 simplified)
// CSI = weighted hydrology + soil
// =========================
function computeCSI(p) {
  return (p.hydro * 0.6) + (p.soil * 0.4);
}

// Classification logic (Chapter 3 thresholds)
function classify(csi) {
  if (csi > 0.75) return "Suitable";
  if (csi >= 0.35) return "Marginal";
  return "Unsuitable";
}

// =========================
// 4. NEAREST PIXEL SEARCH
// (simple Euclidean proxy)
// =========================
function findNearest(lat, lon) {
  let best = null;
  let bestDist = Infinity;

  for (const p of dataset) {
    const dx = p.lat - lat;
    const dy = p.lon - lon;
    const dist = dx * dx + dy * dy;

    if (dist < bestDist) {
      bestDist = dist;
      best = p;
    }
  }

  return best;
}

// =========================
// 5. MAP CLICK INTERACTION
// =========================
map.on('click', (e) => {
  const { lat, lng } = e.latlng;

  const point = findNearest(lat, lng);
  const csi = computeCSI(point);
  const result = classify(csi);

  // UI update
  document.getElementById("info").innerHTML = `
    <b>Site Analysis Result</b><br/>
    Classification: <b>${result}</b><br/>
    CSI Score: ${csi.toFixed(2)}<br/>
    Hydro Index: ${point.hydro}<br/>
    Soil Index: ${point.soil}
  `;

  // marker output
  L.marker([point.lat, point.lon])
    .addTo(map)
    .bindPopup(`
      <b>${result}</b><br/>
      CSI: ${csi.toFixed(2)}
    `)
    .openPopup();
});

// =========================
// 6. OPTIONAL: PREVIEW MARKERS
// =========================
dataset.forEach(p => {
  const csi = computeCSI(p);
  const label = classify(csi);

  L.circleMarker([p.lat, p.lon], {
    radius: 6
  })
    .addTo(map)
    .bindPopup(`${label} (CSI: ${csi.toFixed(2)})`);
});
