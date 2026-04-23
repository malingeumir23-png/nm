const data = [
  {
    name: "Rhizophora mucronata",
    type: "Red Mangrove",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Rhizophora_mangle.jpg",
    desc: "High salinity tolerance. Strong coastal protection species."
  },
  {
    name: "Avicennia marina",
    type: "Grey Mangrove",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Avicennia_marina.jpg",
    desc: "Highly adaptive species found in tidal flats."
  },
  {
    name: "Sonneratia alba",
    type: "Apple Mangrove",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Sonneratia_alba.jpg",
    desc: "Thrives in estuarine wave-exposed zones."
  }
];

const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const img = document.getElementById("img");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const google = document.getElementById("google");
const close = document.getElementById("close");

/* RENDER CARDS */
data.forEach(d => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${d.img}">
    <h3>${d.name}</h3>
    <div class="tag">${d.type}</div>
  `;

  card.addEventListener("click", () => {
    modal.classList.add("show");

    img.src = d.img;
    title.textContent = d.name;
    desc.textContent = d.desc;
    google.href = `https://www.google.com/search?tbm=isch&q=${d.name}`;
  });

  grid.appendChild(card);
});

/* CLOSE */
close.onclick = () => modal.classList.remove("show");

modal.onclick = (e) => {
  if (e.target === modal) modal.classList.remove("show");
};
