
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x909090);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
let geometry = new THREE.BoxGeometry(3, 2.5, 1);
let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.25
  // wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

// alpha
geometry = new THREE.BoxGeometry(1, 1, 1);
material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  transparent: false,
  wireframe: true
  // opacity: 0.5
});
const alpha = new THREE.Mesh(geometry, material);
alpha.position.set(-1, 0, 0);
scene.add(alpha);

// beta
const beta = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: false,
  wireframe: true
  // opacity: 0.5
}));
beta.position.set(0, 0, 0);
scene.add(beta);

// gamma
const gamma = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  transparent: false,
  wireframe: true
  // opacity: 0.5
}));
gamma.position.set(1, 0, 0);
scene.add(gamma);


const group1 = new THREE.Object3D();
group1.add(alpha);
group1.add(beta);
group1.add(gamma);
group1.position.y -= 0.75;
scene.add(group1);

const group2 = group1.clone();
group2.position.y += 1.5;
scene.add(group2);

const hallway = new THREE.Mesh(new THREE.BoxGeometry(3, 0.5, 1), new THREE.MeshBasicMaterial({
  color: 0x800080,
  transparent: false,
  wireframe: true
  // opacity: 0.5
}));
scene.add(hallway);

function animate() { // runs with frequency of frame rate
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
