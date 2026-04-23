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
    desc: "Common in tidal flats. High adaptability."
  },
  {
    name: "Sonneratia alba",
    type: "Apple Mangrove",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Sonneratia_alba.jpg",
    desc: "Found in estuarine zones with strong wave exposure."
  }
];

const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const img = document.getElementById("img");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const google = document.getElementById("google");
const close = document.getElementById("close");

// render cards
data.forEach(d => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${d.img}">
    <h3>${d.name}</h3>
    <div class="tag">${d.type}</div>
  `;

  card.onclick = () => {
    img.src = d.img;
    title.innerText = d.name;
    desc.innerText = d.desc;
    google.href = `https://www.google.com/search?tbm=isch&q=${d.name}`;
    modal.classList.remove("hidden");
  };

  grid.appendChild(card);
});

// close modal
close.onclick = () => modal.classList.add("hidden");

window.onclick = (e) => {
  if (e.target === modal) modal.classList.add("hidden");
};
