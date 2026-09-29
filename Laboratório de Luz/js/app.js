import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// =====================================================
// CENA, CÂMARA E RENDERER
// =====================================================

const scene = new THREE.Scene();

// Fundo azul muito claro
scene.background = new THREE.Color(0xeaf4ff);

const camera = new THREE.PerspectiveCamera(
  55,
  innerWidth / innerHeight,
  0.1,
  100
);

camera.position.set(6, 4, 8);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);


// =====================================================
// MATERIAIS
// =====================================================

// Cubo azul-claro e pouco metálico
const azul = new THREE.MeshStandardMaterial({
  color: 0x7dd3fc,
  roughness: 0.45,
  metalness: 0.15
});

// Esfera rosa-claro
const rosa = new THREE.MeshStandardMaterial({
  color: 0xfbcfe8,
  roughness: 0.3,
  metalness: 0.25
});

// Toro verde-claro
const verde = new THREE.MeshStandardMaterial({
  color: 0x86efac,
  roughness: 0.5,
  metalness: 0.1
});


// =====================================================
// OBJETOS
// =====================================================

const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(1.6, 1.6, 1.6),
  azul
);

cubo.position.set(-2.2, 1, 0);

const esfera = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 16),
  rosa
);

esfera.position.set(0, 1, 0);

const toro = new THREE.Mesh(
  new THREE.TorusGeometry(0.85, 0.3, 20, 64),
  verde
);

toro.position.set(2.3, 1.1, 0);
toro.rotation.x = Math.PI / 2;

scene.add(cubo, esfera, toro);


// =====================================================
// CHÃO
// =====================================================

const chao = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 8),

  new THREE.MeshStandardMaterial({
    color: 0xdbeafe,
    roughness: 0.9
  })
);

chao.rotation.x = -Math.PI / 2;
chao.receiveShadow = true;

scene.add(chao);


// =====================================================
// SOMBRAS DOS OBJETOS
// =====================================================

[cubo, esfera, toro].forEach((obj) => {
  obj.castShadow = true;
  obj.receiveShadow = true;
});


// =====================================================
// LUZES
// =====================================================

// Iluminação ambiente suave
const luzAmbiente = new THREE.AmbientLight(
  0xffffff,
  0.8
);

scene.add(luzAmbiente);

// Luz direcional branca
const luz = new THREE.DirectionalLight(
  0xffffff,
  2
);

luz.position.set(4, 7, 5);
luz.castShadow = true;
luz.shadow.mapSize.set(1024, 1024);

scene.add(luz);


// =====================================================
// AJUDANTE VISUAL DA LUZ
// =====================================================

const helper = new THREE.DirectionalLightHelper(
  luz,
  0.8
);

scene.add(helper);


// =====================================================
// VARIÁVEIS DE CONTROLO
// =====================================================

let rodar = true;
let sombras = true;
let intensidadeAmbiente = 0.8;
let focoDireita = true;


// =====================================================
// ANIMAÇÃO
// =====================================================

function animar() {
  requestAnimationFrame(animar);

  if (rodar) {
    cubo.rotation.y += 0.008;
    esfera.rotation.y += 0.006;
    toro.rotation.z += 0.008;
  }

  helper.update();
  renderer.render(scene, camera);
}

animar();


// =====================================================
// BOTÃO: LUZ AMBIENTE
// =====================================================

document.querySelector("#ambiente").onclick = () => {
  intensidadeAmbiente =
    intensidadeAmbiente === 0.8 ? 0.3 : 0.8;

  luzAmbiente.intensity = intensidadeAmbiente;
};


// =====================================================
// BOTÃO: MOVER FOCO
// =====================================================

document.querySelector("#foco").onclick = () => {
  focoDireita = !focoDireita;

  if (focoDireita) {
    luz.position.set(4, 7, 5);
  } else {
    luz.position.set(-4, 3, 2);
  }

  helper.update();
};


// =====================================================
// BOTÃO: SOMBRAS
// =====================================================

document.querySelector("#sombras").onclick = () => {
  sombras = !sombras;

  renderer.shadowMap.enabled = sombras;
  renderer.shadowMap.needsUpdate = true;
  luz.castShadow = sombras;

  [cubo, esfera, toro].forEach((obj) => {
    obj.castShadow = sombras;
  });
};


// =====================================================
// BOTÃO: RODAR OBJETOS
// =====================================================

document.querySelector("#rodar").onclick = () => {
  rodar = !rodar;
};


// =====================================================
// BOTÃO: RESET
// =====================================================

document.querySelector("#reset").onclick = () => {
  // Voltar às cores claras
  scene.background.set(0xeaf4ff);

  azul.color.set(0x7dd3fc);
  azul.roughness = 0.45;
  azul.metalness = 0.15;

  rosa.color.set(0xfbcfe8);
  rosa.roughness = 0.3;
  rosa.metalness = 0.25;

  verde.color.set(0x86efac);
  verde.roughness = 0.5;
  verde.metalness = 0.1;

  chao.material.color.set(0xdbeafe);
  chao.material.roughness = 0.9;

  // Voltar à iluminação inicial desta versão
  luzAmbiente.intensity = 0.8;
  intensidadeAmbiente = 0.8;

  luz.color.set(0xffffff);
  luz.intensity = 2;
  luz.position.set(4, 7, 5);
  focoDireita = true;

  helper.update();

  // Reativar as sombras
  sombras = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.needsUpdate = true;
  luz.castShadow = true;
  chao.receiveShadow = true;

  [cubo, esfera, toro].forEach((obj) => {
    obj.castShadow = true;
    obj.receiveShadow = true;
  });

  // Voltar a rodar
  rodar = true;
};


// =====================================================
// REDIMENSIONAR A JANELA
// =====================================================

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
});