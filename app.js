const speciesData = [
  { name: "Rhizophora mucronata", salinity: "High" },
  { name: "Avicennia marina", salinity: "Medium" },
  { name: "Sonneratia alba", salinity: "Low" }
];

function findNearest(lat, lon) {
  return speciesData[Math.floor(Math.random() * speciesData.length)];
}

function runScan() {
  const lat = parseFloat(document.getElementById("lat").value);
  const lon = parseFloat(document.getElementById("lon").value);

  if (!lat || !lon) {
    document.getElementById("result").innerHTML =
      "Enter valid coordinates to analyze site.";
    return;
  }

  const result = findNearest(lat, lon);

  document.getElementById("result").innerHTML = `
    <div style="font-size:18px; color:#FFCC00; font-weight:600;">
      ${result.name}
    </div>
    <div>Salinity Tolerance: ${result.salinity}</div>
    <div>Suitability: <b>Recommended</b></div>
  `;
}

function openSpecies(name) {
  const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name)}`;
  window.open(url, "_blank");
}
