// Seleciona os elementos do HTML
const cubo = document.querySelector("#cubo");
const cenario = document.querySelector("#cenario");

const pausa = document.querySelector("#pausa");
const mais = document.querySelector("#mais");
const menos = document.querySelector("#menos");

const rapido = document.querySelector("#rapido");
const lento = document.querySelector("#lento");
const normal = document.querySelector("#normal");
const reset = document.querySelector("#reset");

// Variáveis que guardam o estado atual
let parado = false;
let perspetiva = 800;
let velocidade = 8;

// Esta função aplica a velocidade atual à animação do cubo
function atualizarVelocidade() {
  cubo.style.animationDuration = `${velocidade}s`;
}

// Pausar ou continuar a rotação
pausa.addEventListener("click", function () {
  parado = !parado;

  cubo.style.animationPlayState = parado
    ? "paused"
    : "running";

  pausa.textContent = parado
    ? "Continuar"
    : "Pausar";
});

// Aumentar a perspetiva:
// o efeito 3D fica mais distante e menos intenso
mais.addEventListener("click", function () {
  perspetiva += 100;
  cenario.style.perspective = `${perspetiva}px`;
});

// Diminuir a perspetiva:
// o efeito 3D fica mais próximo e mais intenso
menos.addEventListener("click", function () {
  perspetiva = Math.max(300, perspetiva - 100);
  cenario.style.perspective = `${perspetiva}px`;
});

// Acelerar gradualmente:
// menos segundos = rotação mais rápida
rapido.addEventListener("click", function () {
  velocidade = Math.max(1, velocidade - 1);
  atualizarVelocidade();
});

// Abrandar gradualmente:
// mais segundos = rotação mais lenta
lento.addEventListener("click", function () {
  velocidade = Math.min(20, velocidade + 1);
  atualizarVelocidade();
});

// Voltar à velocidade normal
normal.addEventListener("click", function () {
  velocidade = 8;
  atualizarVelocidade();
});

// Repor todos os valores iniciais
reset.addEventListener("click", function () {
  parado = false;
  perspetiva = 800;
  velocidade = 8;

  cenario.style.perspective = `${perspetiva}px`;

  cubo.style.animationPlayState = "running";
  pausa.textContent = "Pausar";

  atualizarVelocidade();
});