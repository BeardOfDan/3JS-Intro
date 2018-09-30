
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x909090);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

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
scene.add(alpha);

// beta
const beta = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: false,
  wireframe: true
  // opacity: 0.5
}));
scene.add(beta);

// gamma
const gamma = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  transparent: false,
  wireframe: true
  // opacity: 0.5
}));
gamma.translateX(1);
scene.add(gamma);


const group1 = new THREE.Object3D();
group1.add(alpha);
group1.add(beta);
group1.add(gamma);
group1.translateY(-0.75);
// scene.add(group1);

const group2 = group1.clone();
group2.translateY(1.5);
// scene.add(group2);

const hallway = new THREE.Mesh(new THREE.BoxGeometry(3, 0.5, 1), new THREE.MeshBasicMaterial({
  color: 0x800080,
  transparent: false,
  wireframe: true
  // opacity: 0.5
}));
// scene.add(hallway);


// Above is a single building
// Below is the automation of a building's creation

const createTextLabel = function () {
  var div = document.createElement('div');
  div.className = 'text-label';
  div.style.position = 'absolute';
  div.style.width = 100;
  div.style.height = 100;
  div.innerHTML = "hi there!";
  div.style.top = -1000;
  div.style.left = -1000;

  var _this = this;

  return {
    element: div,
    parent: false,
    position: new THREE.Vector3(0, 0, 0),
    setHTML: function (html) {
      this.element.innerHTML = html;
    },
    setParent: function (threejsobj) {
      this.parent = threejsobj;
    },
    updatePosition: function () {
      if (parent) {
        this.position.copy(this.parent.position);
      }

      var coords2d = this.get2DCoords(this.position, _this.camera);
      this.element.style.left = coords2d.x + 'px';
      this.element.style.top = coords2d.y + 'px';
    },
    get2DCoords: function (position, camera) {
      var vector = position.project(camera);
      vector.x = (vector.x + 1) / 2 * window.innerWidth;
      vector.y = -(vector.y - 1) / 2 * window.innerHeight;
      return vector;
    }
  };
};


const hallHeight = 5;

const makeBuilding = (Horizontal, Vertical, Depth = 1, settings = {}) => {
  const color = settings.color || 0x00ff00; // green
  const numRooms = settings.numRooms || 12;
  // settings.roomSpecs = [] // particular rooms with particular specs
  //   calculates if numRooms > roomSpecs.length, if so, uses default values
  //     based on the remainder of the building (that's still empty), to size the rooms
  const roomNames = settings.roomNames || [];

  const rooms = []; // array of objects
  // ex. {position: {x, y, z}, roomObject}

  const building = new THREE.Object3D(); // the grouping of everything created in this function

  const geometry = new THREE.BoxGeometry(Horizontal, Vertical, Depth);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.5
  });

  const classroomHousing = new THREE.Mesh(geometry, material);
  building.add(classroomHousing);

  // fill with rooms
  // half on one side, half on the other
  //   TODO: roomSpecs
  //   default rooms
  const roomWidth = Horizontal / (numRooms / 2); // 2 is for 2 rows of rooms in each building
  const roomHeight = (Vertical - hallHeight) / 2;
  const halfRoomsNum = numRooms / 2; // Assuming even number of rooms

  for (let i = 0; i < numRooms; i++) {
    const settings = { //      blue       red
      color: ((i % 2) === 0) ? 0x0000ff : 0xff0000
    };
    const translations = {
      x: (roomWidth * i) + (roomWidth / 2) - (Horizontal * 1.5), // (Horizontal / 2) + (roomWidth * i),
      y: (roomHeight + hallHeight) / 2
      // at current level of iteration, depth takes care of z translation
    };

    if (i < halfRoomsNum) { // 2nd row of rooms is across the hall
      translations.x += Horizontal; // halfRoomsNum * roomWidth; // offset
      translations.y *= -1; // simply flip direction
    }

    rooms[i] = makeRoom(roomWidth, roomHeight, Depth, settings);

    rooms[i].translateX(translations.x);
    rooms[i].translateY(translations.y);

    if (roomNames) {
      // const roomName = new THREE.TextGeometry(roomNames[i]);
      // roomName.translateX(translations.x);
      // roomName.translateY(translations.y);
      // building.add(roomName);

      // var loader = new THREE.FontLoader();
      // loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

      // }

      // const loader = new THREE.FontLoader();

      // // loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
      // loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function (font) {
      //   const geometry = new THREE.TextGeometry('Hello three.js!', {
      //     font: font,
      //     size: 80,
      //     height: 5,
      //     curveSegments: 12,
      //     bevelEnabled: true,
      //     bevelThickness: 10,
      //     bevelSize: 8,
      //     bevelSegments: 5
      //   });

      //   const roomName = new THREE.TextGeometry("asdf", geometry);
      // });

      // Consider checking out the code that was used for https://seregpie.github.io/THREE.TextSprite/

      // console.log('made label');
    }

    building.add(rooms[i]);
  }

  // make a hallway
  const hallway = new THREE.Mesh(new THREE.BoxGeometry(Horizontal, hallHeight, Depth), new THREE.MeshBasicMaterial({
    color: 0x800080, // purple
    transparent: false,
    wireframe: true
    // opacity: 0.5
  }));
  // hallway should be centered by default, so it's already good to go
  building.add(hallway);


  return building;
};

const makeRoom = (Horizontal, Vertical, Depth = 1, settings = {}) => {
  const color = settings.color || 0x0000ff; // blue

  const geometry = new THREE.BoxGeometry(Horizontal, Vertical, Depth);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: false,
    wireframe: true
  });

  return new THREE.Mesh(geometry, material);
};



// const building = new THREE.Object3D();
// building.add(cube, group1, group2, hallway);

// const buildings = [];

// for (let i = 0; i < 10; i++) {
//   buildings[i] = building.clone();

//   if (i < 5) {
//     buildings[i].translateX(3 * i - 6);
//     buildings[i].translateY(-5);
//   } else {
//     buildings[i].translateX(3 * i - 15 - 6);
//     buildings[i].translateY(5);
//   }

//   scene.add(buildings[i]);
// }

const building1 = makeBuilding(71, 28, 1, {
  roomNames: [
    'Men\'s Room', '101', '103', '105', '107', '109', '111', '113', '115', 'Women\'s Room', 'ATC 100', 'ATC 102', 'ATC 104', 'ATC 106', 'ATC 108', 'ATC 110', 'ATC 112', 'ATC 114'
  ]
});
// building1.translateX(-50);
// building1.translateY(25);
building1.rotation.z += 0.5 * Math.PI;
scene.add(building1);

// import { SpriteText2D, textAlign } from 'three-text2d';

// const sprite = new SpriteText2D("SPRITE", { align: textAlign.center,  font: '40px Arial', fillStyle: '#000000' , antialias: false });
// scene.add(sprite);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();


// ATC
// 71 (m) = 234 (ft) => horizontal
// 28 (m) = 91 (ft) => vertical

// assuming 6, equally sized rooms (5 classrooms and 1 bathroom)
//   will have to get actual dimensions of bathroom, then subtract that from the total
//   the classrooms are all the same size

// NOTE: At current, am assuming all buildings are 1 story high
// TODO: Make a new MakeBuilding, that makes floors (currently called makeBuilding)

