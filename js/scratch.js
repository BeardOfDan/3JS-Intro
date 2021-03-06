
// var renderer, scene, camera, distance, raycaster, projector;
//get our <DIV> container
// var container = document.getElementById('container');

const container = document.getElementById('container');

// Helper var which we will use as a additional correction coefficient for objects and camera
const distance = 400;


const spheres = new THREE.Object3D(); // needs to be global scope
const createSpheres = () => {
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

const diamondsGroup = new THREE.Object3D(); // needs to be global scope
const createDiamonds = () => {
  const loader = new THREE.JSONLoader();
  const numDiamonds = 60;

  // ('https://raw.githubusercontent.com/PavelLaptev/test-rep/master/threejs-post/diamond.json',
  loader.load('../json/diamond.json', (geometry) => {
    for (let i = numDiamonds; i++;) {
      const material = new THREE.MeshPhongMaterial({
        color: (Math.random() * 0xff0000) - 0xff0000,
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

const createSpaces = () => {
  const dots = new THREE.Object3D();

  const numDots = 720;
  for (let i = 0; i < numDots; i++) {
    const circleGeometry = new THREE.SphereGeometry(2, Math.random() * 5, Math.random() * 5);
    const material = new THREE.MeshBasicMaterial({
      color: (Math.random() * 0xff0000) - 0xff0000,
      shading: THREE.FlatShading
    });
    const circle = new THREE.Mesh(circleGeometry, material);
    material.side = THREE.DoubleSide;

    circle.position.x = Math.random() * -distance * 60;
    circle.position.y = Math.random() * -distance * 6;
    circle.position.z = Math.random() * distance * 3;
    circle.rotation.y = Math.random() * 2 * Math.PI;
    circle.scale.x = circle.scale.y = circle.scale.z = Math.random() * 6 + 5;
    dots.add(circle);
  }

  dots.position.x = 7000;
  dots.position.y = 900;
  dots.position.z = -2000;
  dots.rotation.y = Math.PI * 600;
  dots.rotation.z = Math.PI * 500;

  scene.add(dots);
}; // end of createSpaces

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
createSpaces();

renderer.render(scene, camera);
// }; // end of init


// Event Handlers

const onMouseMove = (e) => {
  mouseX = e.clientX - (window.innerWidth / 2);
  mouseY = e.clientY - (window.innerHeight / 2);
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (mouseY - camera.position.y) * 0.05;

  // camera.lookAt(scene.position);
};

document.addEventListener('mousemove', onMouseMove, false);

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize, false);

// animation loop

const render = () => {
  const timer = 0.0001 * Date.now();

  let rotationAmount = Math.PI / 500;
  for (let i = 0; i < diamondsGroup.children.length; i++) {
    const object = diamondsGroup.children[i];
    object.position.y = 500 * Math.cos(timer + i);
    object.rotation.y += rotationAmount;
  }

  rotationAmount = Math.PI / 60;
  for (let i = 0; i < spheres.children.length; i++) {
    spheres.children[i].rotation.y += (i < 20) ? rotationAmount : -rotationAmount;
  }

  renderer.render(scene, camera);
}

const animate = () => {
  requestAnimationFrame(animate);
  render();
};

animate();

