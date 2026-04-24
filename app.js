function updateValues() {
  document.getElementById("salinityVal").innerText =
    document.getElementById("salinity").value;

  document.getElementById("phVal").innerText =
    document.getElementById("ph").value;

  document.getElementById("moistureVal").innerText =
    document.getElementById("moisture").value;

  document.getElementById("elevationVal").innerText =
    document.getElementById("elevation").value;
}

function runSimulation() {

  const salinity = +document.getElementById("salinity").value;
  const ph = +document.getElementById("ph").value;
  const moisture = +document.getElementById("moisture").value;
  const elevation = +document.getElementById("elevation").value;

  let score = 0;

  if (salinity > 20 && salinity < 45) score += 30;
  if (ph >= 6 && ph <= 8) score += 25;
  if (moisture > 50) score += 25;
  if (elevation < 5) score += 20;

  let status = "";
  let species = [];

  if (score >= 75) {
    status = "🟢 Highly Suitable";
    species = ["Rhizophora mucronata", "Avicennia marina"];
  } else if (score >= 50) {
    status = "🟡 Moderate Suitability";
    species = ["Sonneratia alba", "Bruguiera gymnorrhiza"];
  } else {
    status = "🔴 Unsuitable";
    species = ["Low survival probability"];
  }

  document.getElementById("output").innerHTML =
    `Score: ${score}/100<br>${status}`;

  renderSpecies(species);
}

function renderSpecies(list) {
  const container = document.getElementById("speciesList");
  container.innerHTML = "";

  list.forEach(name => {
    const div = document.createElement("div");
    div.className = "species-card";

    div.innerHTML = `🌿 <b>${name}</b><br><small>Tap to view images</small>`;

    div.onclick = () => {
      window.open(
        `https://www.google.com/search?tbm=isch&q=${name}`,
        "_blank"
      );
    };

    container.appendChild(div);
  });
}
