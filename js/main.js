
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x909090);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

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
// scene.add(cube);

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
// scene.add(alpha);


const group1 = new THREE.Object3D();
// group1.add(alpha);
// group1.add(beta);
// group1.add(gamma);
group1.translateY(-0.75);
// scene.add(group1);

const flipIndexes = []; // indexes of where to perform pancake flip, for animation

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// a mutative function
const flip = (arr, end) => {
  let temp = undefined; // holds a value from the array
  let start = 0;

  flipIndexes.push(end); // build list of actions for animation

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

      // while nextMaxIndex = i - 1, decrement the 2nd arg for next flip call, since it's already correct

      flip(arr, (i - 1));
    }
  }

  return arr;
};

// console.log('original: ' + JSON.stringify(arr, '', 2));
// console.log('sorted: ' + JSON.stringify(pancakeSort(arr), '', 2));
// console.log('arr: ' + JSON.stringify(arr, '', 2));

const sizes = [2, 3, 5, 7, 1, 9, 8, 6, 4]; // different sizes of elements to sort
//                                            the order here is the order they will be created in

console.log('original: ' + JSON.stringify(sizes, '', 2));
console.log('sorted: ' + JSON.stringify(pancakeSort(sizes), '', 2));
console.log('sizes: ' + JSON.stringify(sizes, '', 2));


const squares = []; // array to hold the Three js objects

// create boxes with sizes from the sizes array
for (let i = 0; i < sizes.length; i++) {
  const size = sizes[i];

  const geometry = new THREE.BoxGeometry(size, size, 1);
  // geometry.center();
  // TODO: get this color from a pre-set array
  const material = new THREE.MeshBasicMaterial({ color: '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6) });
  const square = new THREE.Mesh(geometry, material);

  square.translateY(-i * 1.5 + 6);
  square.rotation.x = Math.PI / 2;
  // square.rotation.z = Math.PI / 2;
  // square.rotation.y = Math.PI / 2;

  squares.push(square);
  scene.add(squares[i]);
}

// TODO: Add every element in squares to a group, rotate the group for an optimal viewing angle, then dissolve the group, so the elements can be added to some other group

const flipping = {
  rotationIncrement: Math.PI / 4, // how much the animate function rotates a group by per function call
  animationIndex: 0, // index for flipIndexes for animation
  rotationAmount: 0, // ranges from 0 to 180, then gets reset
  rotationLimit: Math.PI
};

function animate() {
  // requestAnimationFrame(animate);

  // flipping logic here
  if (false && flipping.animationIndex < flipIndexes.length) { // perform a flip
    requestAnimationFrame(animate);

    if (flipping.rotationAmount < flipping.rotationLimit) { // continue the current rotation
      const flipIndex = flipIndexes[flipping.animationIndex];
      const reverses = new THREE.Object3D(); // squares to be reversed
      // create group of blocks 0 - flipIndexes[flipping.animationIndex]
      for (let i = 0; i < flipIndex; i++) {
        reverses.add(squares[i]);
      }

      // reverse their positions graphically
      reverses.rotation.x += flipping.rotationIncrement; // Note: Y might be the wrong axis
      // reverses.rotation.y += flipping.rotationIncrement;
      // reverses.rotation.z += flipping.rotationIncrement;
      flipping.rotationAmount += flipping.rotationIncrement;

      // try doing the individual squares about a point (that would be the center of the group)

      // reverse their positions in the squares array
      //   otherwise, there'll be no way to keep track of which square objects are to be added to the group

      // delete reverses
      //   possibly need to re-add the squares to the scene
      scene.add(reverses);
      // delete reverses;
      // for (let i = 0; i < squares.length; i++) {
      //   scene.add(squares[i]);
      // }

      console.log('flipIndex: ' + flipIndex);
      console.log('flipping.rotationAmount: ' + flipping.rotationAmount);
      // console.log('reversal');
    } else { // prepare for next flip
      // re-add all of the squares to the scene, else it will not update squares that were previously in the reverses array
      for (let i = 0; i < squares.length; i += 2) {
        scene.add(squares[i]);
      }

      flipping.rotationAmount = 0;
      flipping.animationIndex++;

      console.log('preparing for reversal');
    }
  } else {
    // console.log('done!');
  }

  renderer.render(scene, camera);
}
// animate();
renderer.render(scene, camera);
setTimeout(animate, 100);

const groupCount = 3;
const group = new THREE.Object3D();
for (let i = 0; i < groupCount; i++) {
  group.add(squares[i]);
}

// group.matrixAutoUpdate = true;
// group.center();
group.translateY(-(groupCount / 2) * 1.5 + 6);
scene.add(group);

let foo = 0;
const flipGroup = () => {
  // group.translateY(-1 * (-(~~(groupCount / 2)) * 1.5 + 6));
  group.rotation.x += Math.PI / 16;
  foo += Math.PI / 16;
  group.translateZ(-0.5);
  // group.translateY(-8 * Math.sin(foo));
  // group.translateZ(-8 * Math.sin(foo));
  // group.translateY(-(~~(groupCount / 2)) * 1.5 + 6);


  renderer.render(scene, camera);
  if (foo < Math.PI) {
    setTimeout(flipGroup, 500);
  }
};

setTimeout(flipGroup, 500);

