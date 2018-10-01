
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x909090);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
let geometry = new THREE.BoxGeometry(3, 2.5, 1);
let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5
  // wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
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
alpha.translateX(-1);
scene.add(alpha);


const group1 = new THREE.Object3D();
group1.add(alpha);
// group1.add(beta);
// group1.add(gamma);
group1.translateY(-0.75);
scene.add(group1);

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// a mutative function
const flip = (arr, end) => {
  let temp = undefined; // holds a value from the array
  let start = 0;

  while (start < end) {
    temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
};

// a non-mutative function
const pancakeSort = (original) => {
  const arr = original.slice();

  for (let i = arr.length; i > 1; i--) {
    const maxIndex = arr.reduce((iterator, value, index, arr) => {
      return (arr[iterator] > arr[index]) ? iterator : index;
    }, 0);

    if (maxIndex !== (i - 1)) {
      flip(arr, maxIndex);
      flip(arr, (i - 1));
    }
  }

  return arr;
};

console.log('original: ' + JSON.stringify(arr, '', 2));
console.log('sorted: ' + JSON.stringify(pancakeSort(arr), '', 2));
console.log('arr: ' + JSON.stringify(arr, '', 2));

function animate() {
  requestAnimationFrame(animate);

  // flipping logic here

  renderer.render(scene, camera);
}
animate();



