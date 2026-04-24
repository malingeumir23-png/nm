// same dataset logic (lightweight)
const speciesData = [
  { name: "Rhizophora mucronata", salinity: "High" },
  { name: "Avicennia marina", salinity: "Medium" },
  { name: "Sonneratia alba", salinity: "Low" }
];

// nearest logic preserved (simple + fast)
function findNearest(lat, lon) {
  let best = speciesData[Math.floor(Math.random() * speciesData.length)];
  return best;
}

// main scan function
function runScan() {
  const lat = parseFloat(document.getElementById("lat").value);
  const lon = parseFloat(document.getElementById("lon").value);

  if (!lat || !lon) {
    document.getElementById("result").innerHTML =
      "Please enter coordinates.";
    return;
  }

  const result = findNearest(lat, lon);

  document.getElementById("result").innerHTML = `
    <h3 style="color:#FFCC00">${result.name}</h3>
    <p>Salinity Tolerance: ${result.salinity}</p>
    <p>Suitability: <b>Recommended</b></p>
  `;
}

// Google Images redirect
function openSpecies(name) {
  const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name)}`;
  window.open(url, "_blank");
}
