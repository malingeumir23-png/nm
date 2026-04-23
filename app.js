function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// Simulated sensor values
function generateSensors() {
  return {
    pH: rand(5.5, 8),
    salinity: rand(5, 40),
    moisture: rand(30, 90),
    temp: rand(25, 35),
    orp: rand(100, 400)
  };
}

// Hydrological model (from Chapter 3 logic)
function hydrology(sensor) {
  const inundation = 1 / (1 + Math.exp(0.7 * (sensor.temp - 30)));
  const coast = rand(0.4, 1);
  const river = rand(0.3, 1);

  const hpi =
    inundation * 0.5 +
    coast * 0.25 +
    river * 0.25;

  return { inundation, coast, river, hpi };
}

// Simple ML rule engine (Random Forest simulation logic)
function classify(hpi, sensor) {

  let score =
    hpi * 0.5 +
    (sensor.pH > 6 && sensor.pH < 7.5 ? 0.2 : 0.1) +
    (sensor.salinity < 25 ? 0.2 : 0.05) +
    (sensor.moisture > 50 ? 0.1 : 0.05);

  let label = "Unsuitable";

  if (score > 0.75) label = "Suitable";
  else if (score > 0.45) label = "Marginal";

  return { score, label };
}

function runSimulation() {

  const sensor = generateSensors();
  const hydro = hydrology(sensor);
  const ml = classify(hydro.hpi, sensor);

  // UI update
  document.getElementById("sensors").innerHTML = `
    pH: ${sensor.pH.toFixed(2)}<br>
    Salinity: ${sensor.salinity.toFixed(2)}<br>
    Moisture: ${sensor.moisture.toFixed(2)}<br>
    Temperature: ${sensor.temp.toFixed(2)}<br>
    ORP: ${sensor.orp.toFixed(2)}
  `;

  document.getElementById("hydro").innerHTML = `
    Inundation: ${hydro.inundation.toFixed(2)}<br>
    Coast Influence: ${hydro.coast.toFixed(2)}<br>
    River Influence: ${hydro.river.toFixed(2)}<br>
    HPI: ${hydro.hpi.toFixed(2)}
  `;

  document.getElementById("result").innerHTML = `
    <h3>${ml.label}</h3>
    Confidence: ${(ml.score * 100).toFixed(1)}%
  `;

  document.getElementById("explain").innerHTML = `
    • Hydrology contributes strongly to classification<br>
    • Soil pH and salinity influence suitability<br>
    • Higher HPI increases mangrove viability<br>
    • Model simulates Random Forest logic (Chapter 3)
  `;
}

// auto-run once
runSimulation();
