function runSimulation() {

  const salinity = parseFloat(document.getElementById("salinity").value);
  const ph = parseFloat(document.getElementById("ph").value);
  const moisture = parseFloat(document.getElementById("moisture").value);
  const elevation = parseFloat(document.getElementById("elevation").value);

  // SIMPLE SCORING MODEL (fast, no lag)
  let score = 0;

  if (salinity > 20 && salinity < 45) score += 30;
  if (ph >= 6 && ph <= 8) score += 25;
  if (moisture > 50) score += 25;
  if (elevation < 5) score += 20;

  let result = "";
  let species = [];

  if (score >= 75) {
    result = "🟢 Highly Suitable";
    species = ["Rhizophora mucronata", "Avicennia marina"];
  } else if (score >= 50) {
    result = "🟡 Moderately Suitable";
    species = ["Sonneratia alba", "Bruguiera gymnorrhiza"];
  } else {
    result = "🔴 Unsuitable";
    species = ["Limited mangrove survival"];
  }

  document.getElementById("output").innerHTML = `
    Score: ${score}/100 <br/>
    Status: ${result}
  `;

  renderSpecies(species);
}

function renderSpecies(list) {
  const container = document.getElementById("speciesList");
  container.innerHTML = "";

  list.forEach(name => {

    const div = document.createElement("div");
    div.className = "species-card";

    div.innerHTML = `
      🌿 <b>${name}</b><br/>
      <small>Click to view images</small>
    `;

    div.onclick = () => {
      window.open(
        `https://www.google.com/search?tbm=isch&q=${name}`,
        "_blank"
      );
    };

    container.appendChild(div);
  });
}
