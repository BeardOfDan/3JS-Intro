
// var renderer, scene, camera, distance, raycaster, projector;
//get our <DIV> container
// var container = document.getElementById('container');

const container = document.getElementById('container');

// Helper var which we will use as a additional correction coefficient for objects and camera
let distance = 400;


const createSpheres = () => {
  const spheres = new THREE.Object3D();

  // randomly generate spheres
  const numSpheres = 80;
  for (let i = 0; i < numSpheres; i++) {
    const sphere = new THREE.SphereGeometry(4, Math.random() * 12, Math.random() * 12);
    const material = new THREE.MeshPhongMaterial({
      color: (Math.random() * 0xff0000) - 0xff0000,
      shading: THREE.FlatShading
    });

    const particle = new THREE.Mesh(sphere, material);
    // TODO: Use ratio of screen width to height to create a more optimal spread of positions
    particle.position.x = Math.random() * distance * 10;
    particle.position.y = Math.random() * -distance * 6;
    particle.position.z = Math.random() * distance * 4;
    particle.rotation.y = Math.random() * 2 * Math.PI;
    particle.scale.x = particle.scale.y = particle.scale.z = Math.random() * 12 + 5;

    spheres.add(particle);
  }

  spheres.position.y = 500;
  spheres.position.x = -2000;
  spheres.position.z = -100;
  spheres.rotation.y = Math.PI * 600;

  scene.add(spheres);
}; // end of createSpheres

const createDiamonds = () => {
  const diamondsGroup = new THREE.Object3D();
  const loader = new THREE.JSONLoader();
  const numDiamonds = 60;

  // ('https://raw.githubusercontent.com/PavelLaptev/test-rep/master/threejs-post/diamond.json',
  loader.load('../json/diamond.json', (geometry) => {
    for (let i = numDiamonds; i++;) {
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xff0000 - 0xff0000,
        shading: THREE.FlatShading
      });
      const diamond = new THREE.Mesh(geometry, material);
      diamond.position.x = Math.random() * -distance * 6;
      diamond.position.y = Math.random() * -distance * 2;
      diamond.position.z = Math.random() * distance * 3;
      diamond.rotation.y = Math.random() * 2 * Math.PI;
      diamond.scale.x = diamond.scale.y = diamond.scale.z = Math.random() * 50 + 10;
      diamondsGroup.add(diamond);
    }

    diamondsGroup.position.x = 1400;
    scene.add(diamondsGroup);
  });
}; // end of createDiamonds


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

createSpheres();
createDiamonds();
// createSpaces();

renderer.render(scene, camera);
// }; // end of init






