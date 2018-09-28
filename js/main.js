
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x909090);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
let geometry = new THREE.BoxGeometry(3, 3, 3);
let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.25
  // wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

geometry = new THREE.BoxGeometry(1, 1, 1);
material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  transparent: false
  // opacity: 0.5
});
const innerCube = new THREE.Mesh(geometry, material);
scene.add(innerCube);



function animate() { // runs with frequency of frame rate
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  innerCube.rotation.x -= 0.05;
  innerCube.rotation.y -= 0.05;
  innerCube.rotation.z -= 0.05;

  renderer.render(scene, camera);
}
animate();
