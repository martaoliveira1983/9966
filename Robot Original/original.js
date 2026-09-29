import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// =====================================================
// SCENE
// =====================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x0f172a);


// =====================================================
// CAMERA
// =====================================================

const camera = new THREE.PerspectiveCamera(
  55,
  innerWidth / innerHeight,
  0.1,
  100
);

camera.position.set(0, 1, 11);


// =====================================================
// RENDERER
// =====================================================

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(innerWidth, innerHeight);

document.body.appendChild(renderer.domElement);


// =====================================================
// GROUP DO ROBÔ
// =====================================================

// O Group permite controlar todas as peças ao mesmo tempo.
// Quando o grupo roda, todo o robô roda.
const robo = new THREE.Group();

scene.add(robo);


// =====================================================
// FUNÇÃO PARA CRIAR PEÇAS
// =====================================================

function mesh(geometria, cor) {
  return new THREE.Mesh(
    geometria,
    new THREE.MeshBasicMaterial({
      color: cor
    })
  );
}


// =====================================================
// CORPO PEQUENO
// =====================================================

const corpo = mesh(
  new THREE.BoxGeometry(1.1, 1.2, 0.7),
  0xef4444
);

robo.add(corpo);


// =====================================================
// CABEÇA MUITO GRANDE
// =====================================================

const cabeca = mesh(
  new THREE.BoxGeometry(2.4, 1.8, 1.8),
  0x22c55e
);

cabeca.position.y = 1.5;

robo.add(cabeca);


// =====================================================
// BRAÇOS MUITO COMPRIDOS
// =====================================================

const bracoE = mesh(
  new THREE.BoxGeometry(0.4, 3.2, 0.5),
  0xf472b6
);

bracoE.position.set(-1.6, -0.1, 0);

const bracoD = bracoE.clone();

bracoD.position.x = 1.6;

robo.add(bracoE, bracoD);


// =====================================================
// PERNAS CURTAS
// =====================================================

const pernaE = mesh(
  new THREE.BoxGeometry(0.55, 0.8, 0.6),
  0x4ade80
);

pernaE.position.set(-0.4, -1, 0);

const pernaD = pernaE.clone();

pernaD.position.x = 0.4;

robo.add(pernaE, pernaD);


// =====================================================
// OLHOS GRANDES
// =====================================================

const olhoE = mesh(
  new THREE.SphereGeometry(0.35, 16, 8),
  0x111111
);

olhoE.position.set(-0.6, 1.75, 0.91);

const olhoD = olhoE.clone();

olhoD.position.x = 0.6;

robo.add(olhoE, olhoD);


// =====================================================
// BOCA
// =====================================================

const boca = mesh(
  new THREE.BoxGeometry(0.9, 0.2, 0.12),
  0x111111
);

boca.position.set(0, 1.15, 0.93);

robo.add(boca);


// =====================================================
// ANTENA EXAGERADAMENTE ALTA
// =====================================================

const haste = mesh(
  new THREE.CylinderGeometry(0.08, 0.08, 2.5, 12),
  0xe2e8f0
);

haste.position.y = 3.65;

const ponta = mesh(
  new THREE.SphereGeometry(0.25, 16, 8),
  0xef4444
);

ponta.position.y = 5;

robo.add(haste, ponta);


// =====================================================
// VARIÁVEIS PARA MOVIMENTO E BOTÕES
// =====================================================

let velocidade = 1.5;
let pausado = false;
let acenar = false;
let tempo = 0;


// =====================================================
// ANIMAÇÃO
// =====================================================

function animar() {
  requestAnimationFrame(animar);

  if (!pausado) {
    // Rotação mais visível
    robo.rotation.y += 0.02 * velocidade;

    // Tempo usado para o movimento do braço
    tempo += 0.05 * velocidade;

    // Braço direito acena com movimento muito amplo
    if (acenar) {
      bracoD.rotation.z = Math.sin(tempo) * 1.5;
    }
  }

  renderer.render(scene, camera);
}


// =====================================================
// BOTÕES
// =====================================================

// Pausa ou retoma a animação
document.querySelector("#pausa").onclick = function () {
  pausado = !pausado;

  this.textContent = pausado
    ? "Continuar"
    : "Pausar";
};

// Velocidade lenta
document.querySelector("#lento").onclick = () => {
  velocidade = 0.4;
};

// Velocidade normal
document.querySelector("#normal").onclick = () => {
  velocidade = 1.5;
};

// Velocidade rápida
document.querySelector("#rapido").onclick = () => {
  velocidade = 3;
};

// Movimento de acenar
document.querySelector("#acenar").onclick = function () {
  acenar = !acenar;

  this.textContent = acenar
    ? "Parar braço"
    : "Acenar";

  // Quando deixas de acenar, o braço volta à posição normal
  if (!acenar) {
    bracoD.rotation.z = 0;
  }
};

// Repõe a rotação, velocidade e braço
document.querySelector("#reset").onclick = () => {
  velocidade = 1.5;
  pausado = false;
  acenar = false;
  tempo = 0;

  robo.rotation.set(0, 0, 0);
  bracoD.rotation.set(0, 0, 0);

  document.querySelector("#pausa").textContent = "Pausar";
  document.querySelector("#acenar").textContent = "Acenar";
};


// =====================================================
// REDIMENSIONAR A JANELA
// =====================================================

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
});


// =====================================================
// INICIAR
// =====================================================

animar();