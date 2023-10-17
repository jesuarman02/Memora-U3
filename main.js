const imagenes = [
  "imagen1.jpg",
  "imagen2.jpg",
  "imagen3.jpg",
  "imagen4.jpg",
  "imagen5.jpg",
  "imagen6.jpg",
  "imagen7.jpg",
  "imagen8.jpg",
  "imagen9.jpg",
  "imagen0.jpg",
];

let cartas = [...imagenes, ...imagenes];
let movimientos = 0;
let selecccionCartas = [];
let pares = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function creaCarta(image) {
  const carta = document.createElement("div");
  carta.classList.add("carta");
  carta.style.backgroundImage = `url(fondo.jpg)`;
  carta.style.backgroundSize = "cover";
  carta.dataset.imagen = image;
  carta.addEventListener("click", cartaClic);
  return carta;
}

function cartaClic() {
  if (selecccionCartas.length === 2) {
    return;
  }
  const carta = this;
  carta.style.backgroundImage = `url(${carta.dataset.imagen})`;
  carta.style.transform = "rotateY(360deg)";
  selecccionCartas.push(carta);

  if (selecccionCartas.length === 2) {
    setTimeout(partida, 1000);
    movimientos++;
    document.getElementById("Contamovi").textContent = movimientos;
  }
}

function partida() {
  const [primerCarta, segundaCarta] = selecccionCartas;
  const imagen1 = primerCarta.dataset.imagen;
  const imagen2 = segundaCarta.dataset.imagen;

  if (imagen1 === imagen2) {
    pares++;
    if (pares === imagenes.length) {
      document.getElementById("mensaje").textContent = "¡Ganaste!";
      document.getElementById("reiniciar").style.display = "block";
    }
  } else {
    primerCarta.style.backgroundImage = `url(fondo.jpg)`;
    segundaCarta.style.backgroundImage = `url(fondo.jpg)`;
    primerCarta.style.transform = "rotateY(0deg)";
    segundaCarta.style.transform = "rotateY(0deg)";
  }

  selecccionCartas = [];
}

function juego() {
  pares = 0;
  movimientos = 0;
  selecccionCartas = [];
  cartas = shuffle(cartas);
  const contenCartas = document.getElementById("cartas");
  contenCartas.innerHTML = "";
  cartas.forEach((imagen) => {
    const carta = creaCarta(imagen);
    contenCartas.appendChild(carta);
  });
  document.getElementById("Contamovi").textContent = movimientos;
  document.getElementById("mensaje").textContent = "";
  document.getElementById("reiniciar").style.display = "none";
}

function reiniciarJuego() {
  juego();
}

juego();
