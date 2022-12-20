let turno;
let puntajeX = 0;
let puntajeO = 0;
let empate = 0;
let partidas = 1;

let movimientos = 0;

let spanX = document.getElementById("X");
let spanO = document.getElementById("O");
let spanE = document.getElementById("E");
let spanP = document.getElementById("P");

//sonidos
let clic = new Audio("./sounds/click.wav");
let no = new Audio("./sounds/no.wav");
let wina = new Audio("./sounds/win.wav");

const celdas = new Array(9).fill(null);
const btn = document.querySelectorAll("#celda");
let Twin = document.querySelector(".Turno");
const VolverJugar = document.getElementById("VolverJugar");
const reiniciar = document.getElementById("reiniciar");

function generarTurno() {
  if (partidas == 1) {
    VolverJugar.disabled = true;
  }
  spanP.innerHTML = `Partida N°: ${partidas}`;
  if (Math.random() < 0.5) {
    turno = true;
    Twin.innerHTML = "Es turno de: X";
  } else {
    turno = false;
    Twin.innerHTML = "Es turno de: O";
  }
}

function backgr(A, B, C) {
  let buton = document.querySelector(".tabla").children;

  let bt1 = buton[A];
  let bt2 = buton[B];
  let bt3 = buton[C];

  bt1.style.backgroundColor = "#fff";
  bt2.style.backgroundColor = "#fff";
  bt3.style.backgroundColor = "#fff";
}

function win(a, b, c) {
  if (celdas[a] == celdas[b] && celdas[b] == celdas[c] && celdas[c] != null) {
    backgr(a, b, c);
    return true;
  }
  return false;
}

VolverJugar.addEventListener("click", () => {
  generarTurno();
  partidas++;
  movimientos = 0;
  spanP.innerHTML = `Partida N°: ${partidas}`;
  Twin.style.color = "#fff";
  btn.forEach((boton, index) => {
    boton.innerHTML = " ";
    boton.disabled = false;
    boton.style.backgroundColor = "#000000";
    celdas.fill(null);
  });
});

reiniciar.addEventListener("click", () => {
  generarTurno();
  partidas=1;
  movimientos = 0;
  Twin.style.color = "#fff";
  puntajeX = 0;
  puntajeO = 0;
  empate = 0;
  partidas = 0;
  spanO.innerHTML = `Puntos O: ${puntajeO}`;
  spanX.innerHTML = `Puntos X: ${puntajeX}`;
  spanE.innerHTML = `Empate: ${empate}`;
  spanP.innerHTML = `Partida N°: ${partidas}`;
  btn.forEach((boton, index) => {
    boton.innerHTML = " ";
    boton.disabled = false;
    boton.style.backgroundColor = "#000000";
    celdas.fill(null);
  });
});

btn.forEach((boton, index) => {
  boton.addEventListener("click", (event) => {
    clic.play();
    boton.disabled = true;
    movimientos++;
    event.target.textContent = turno ? "X" : "O";
    if (turno) {
      Twin.innerHTML = "Es turno de: O";
      boton.style.color = "rgb(255, 0, 112)";
    } else {
      boton.style.color = "rgb(0, 187, 255)";
      Twin.innerHTML = "Es turno de: X";
    }
    celdas[index] = turno;
    if (
      win(0, 1, 2) ||
      win(3, 4, 5) ||
      win(6, 7, 8) ||
      win(0, 3, 6) ||
      win(1, 4, 7) ||
      win(2, 5, 8) ||
      win(0, 4, 8) ||
      win(2, 4, 6)
    ) {/**/

      wina.play();
      btn.forEach((boton) => {
        boton.disabled = true;
      });
      VolverJugar.disabled = false;
      Twin.textContent = `Ganador: ${turno ? "X" : "O"}`;
      if (turno) {
        Twin.style.color = "rgb(255, 0, 112)";
        puntajeX++;
        spanX.innerHTML = `Puntos X: ${puntajeX}`;
      } else {
        Twin.style.color = "rgb(0, 187, 255)";
        puntajeO++;
        spanO.innerHTML = `Puntos O: ${puntajeO}`;
      }
    }
    turno = !turno;
    if (movimientos == 9) {
      empate++;
      spanE.innerHTML = `Empate: ${empate}`;
      movimientos = 0;
      VolverJugar.disabled = false;
      no.play();
    }
  });
});
