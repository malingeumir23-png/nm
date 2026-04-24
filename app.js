const salinity = document.getElementById("salinity");
const redox = document.getElementById("redox");
const moisture = document.getElementById("moisture");

const salinityVal = document.getElementById("salinityVal");
const redoxVal = document.getElementById("redoxVal");
const moistureVal = document.getElementById("moistureVal");

const speciesText = document.getElementById("species");

// SIMPLE RULE ENGINE (unchanged concept, optimized)
function computeSpecies(s, r, m) {
  const score = (s + m - r) / 3;

  if (score > 60) return "Rhizophora mucronata";
  if (score > 40) return "Avicennia marina";
  return "Sonneratia alba";
}

function update() {
  const s = +salinity.value;
  const r = +redox.value;
  const m = +moisture.value;

  salinityVal.textContent = s;
  redoxVal.textContent = r;
  moistureVal.textContent = m;

  const species = computeSpecies(s, r, m);
  speciesText.textContent = species;

  document.getElementById("searchBtn").onclick = () => {
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(species + " mangrove")}`;
    window.open(url, "_blank");
  };
}

salinity.oninput = update;
redox.oninput = update;
moisture.oninput = update;

update();
