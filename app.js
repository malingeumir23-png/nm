function val(id) {
  return parseFloat(document.getElementById(id).value);
}

function hpi(elev, moist) {
  const inundation = 1 / (1 + Math.exp(0.7 * (elev - 4)));
  return inundation * 0.5 + (1 - elev / 10) * 0.25 + moist / 100 * 0.25;
}

function csi(ph, sal, moist, h) {
  const soil =
    (ph / 7) * 0.3 +
    (1 - sal / 40) * 0.3 +
    (moist / 100) * 0.4;

  return soil * 0.5 + h * 0.5;
}

function classify(x) {
  if (x > 0.75) return "SUITABLE";
  if (x > 0.35) return "MARGINAL";
  return "UNSUITABLE";
}

/* 🌱 clickable species */
function speciesList(type) {

  const map = {
    SUITABLE: [
      "Rhizophora mucronata",
      "Avicennia marina"
    ],
    MARGINAL: [
      "Sonneratia alba",
      "Bruguiera gymnorhiza"
    ],
    UNSUITABLE: [
      "No dominant mangrove species"
    ]
  };

  return map[type].map(name => {

    if (name === "No dominant mangrove species") {
      return `<div class="species">${name}</div>`;
    }

    return `
      <div class="species"
        onclick="window.open('https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name + ' mangrove')}', '_blank')">
        🌿 ${name}
      </div>
    `;
  }).join("");
}

function runModel() {

  const elev = val("elevation");
  const ph = val("ph");
  const sal = val("salinity");
  const moist = val("moisture");

  const h = hpi(elev, moist);
  const x = csi(ph, sal, moist, h);
  const cls = classify(x);

  document.getElementById("hpi").innerText = h.toFixed(3);
  document.getElementById("csi").innerText = x.toFixed(3);
  document.getElementById("class").innerText = cls;

  document.getElementById("conf").innerText =
    (x * 100).toFixed(1) + "%";

  document.getElementById("species").innerHTML =
    speciesList(cls);

  document.getElementById("values").innerHTML =
    `E:${elev} | pH:${ph} | Sal:${sal} | M:${moist}`;
}

runModel();
