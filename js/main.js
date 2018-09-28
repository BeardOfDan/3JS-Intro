
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x909090);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
let geometry = new THREE.BoxGeometry(3, 1, 1);
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


function animate() { // runs with frequency of frame rate
  requestAnimationFrame(animate);

  if (true) {
    cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cube.rotation.z += 0.01;

    alpha.rotation.x -= 0.05;
    // alpha.rotation.y -= 0.05;
    // alpha.rotation.z -= 0.05;

    beta.rotation.x -= 0.05;
    // beta.rotation.y -= 0.05;
    // beta.rotation.z -= 0.05;

    gamma.rotation.x -= 0.05;
    // gamma.rotation.y -= 0.05;
    // gamma.rotation.z -= 0.05;
  }

  renderer.render(scene, camera);
}
animate();
