
// var renderer, scene, camera, distance, raycaster, projector;
//get our <DIV> container
// var container = document.getElementById('container');

const container = document.getElementById('container');

// Helper var which we will use as a additional correction coefficient for objects and camera
let distance = 400;

// const init = () => {
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x140b33, 1);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 25000);
camera.position.set(100, -400, 2000);
scene.add(camera);

const light = new THREE.PointLight(0xffffff, 1, 4000);
light.position.set(50, 0, 0);

const lightTwo = new THREE.PointLight(0xffffff, 1, 4000);
lightTwo.position.set(-100, 800, 800);

const lightAmbient = new THREE.AmbientLight(0x404040);
scene.add(light, lightTwo, lightAmbient);

// createSpheres();
// createDiamond();
// createSpace();

renderer.render(scene, camera);
// }; // end of init


