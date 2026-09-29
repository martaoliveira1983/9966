import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// 1. Criar a cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Luz ambiente: ilumina suavemente todos os objetos
const luzAmbiente = new THREE.AmbientLight(0x101827, 1);
scene.add(luzAmbiente);

// Sol: luz direcional que cria sombras
const sol = new THREE.DirectionalLight(0xffffff, 3);

sol.position.set(5, 10, 7.5);
sol.castShadow = true;

// Corrigido: era "widh", tem de ser "width"
sol.shadow.mapSize.width = 1024;
sol.shadow.mapSize.height = 1024;

sol.shadow.camera.near = 0.5;
sol.shadow.camera.far = 25;

// Área onde a luz calcula as sombras
sol.shadow.camera.left = -10;
sol.shadow.camera.right = 10;
sol.shadow.camera.top = 10;
sol.shadow.camera.bottom = -10;

scene.add(sol);

// 2. Criar a câmara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 3, 10);
camera.lookAt(0, 0, 0);

// 3. Criar o renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

// Ativar sombras no renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

// 4. Criar o cubo
const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({
    color: 0x1e90ff
  })
);

cubo.position.set(-3, 0, 0);
cubo.castShadow = true;

scene.add(cubo);

// 5. Criar a esfera
const esfera = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 16),
  new THREE.MeshStandardMaterial({
    color: 0xd1cf97,
    metalness: 0.5,
    roughness: 0.5
  })
);

esfera.position.set(0, 0, 0);
esfera.castShadow = true;

scene.add(esfera);

// 6. Criar o cone
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(1, 2, 32),
  new THREE.MeshStandardMaterial({
    color: 0x00cf00
  })
);

cone.position.set(3, 0, 0);
cone.castShadow = true;

scene.add(cone);

// 7. Criar o chão
const chao = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({
    color: 0x808080,
    roughness: 0.8,
    metalness: 0
  })
);

// Coloca o plano na horizontal
chao.rotation.x = -Math.PI / 2;

// O cubo e o cone têm 2 unidades de altura.
// Como o centro dos objetos está em y = 0,
// o fundo está em y = -1.
// Por isso o chão fica em y = -1.
chao.position.y = -1;

// O chão não projeta sombras, apenas recebe-as
chao.receiveShadow = true;

scene.add(chao);

// 8. Variáveis da animação
let velocidade = 1;
let pausado = false;

// 9. Função de animação
function animar() {
  requestAnimationFrame(animar);

  if (!pausado) {
    cubo.rotation.x += 0.01 * velocidade;
    cubo.rotation.y += 0.014 * velocidade;

    esfera.rotation.x += 0.012 * velocidade;
    esfera.rotation.y += 0.014 * velocidade;
    esfera.rotation.z += 0.018 * velocidade;

    cone.rotation.y += 0.01 * velocidade;
    cone.rotation.z += 0.018 * velocidade;
  }

  renderer.render(scene, camera);
}

// Inicia a animação
animar();

// Ajusta a cena se a janela for redimensionada
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 7. Adicionar esfera e cone


// 8. Implementar os botões
