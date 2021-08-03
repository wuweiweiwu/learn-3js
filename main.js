import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import "./style.css";

/**
 * Debug
 */
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
const geometry = new THREE.SphereGeometry(1, 32, 32);

// creating our own geometry
// const geometry = new THREE.BufferGeometry();
// const positionsArray = new Float32Array([
//   0,
//   0,
//   0, // First vertex
//   0,
//   1,
//   0, // Second vertex
//   1,
//   0,
//   0, // Third vertex
// ]);
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// geometry.setAttribute("position", positionsAttribute);

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
};

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});

gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});
gui.add(parameters, "spin");

gui.add(material, "wireframe");

const mesh = new THREE.Mesh(geometry, material);

gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("x");
gui.add(mesh.position, "x").min(-3).max(3).step(0.01).name("y");
gui.add(mesh.position, "z").min(-3).max(3).step(0.01).name("z");
gui.add(mesh, "visible");

// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;

// mesh.scale.x = 2;
// mesh.scale.y = 0.25;
// mesh.scale.z = 0.5;

mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

scene.add(mesh);

// mouse events shenanigans
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("mousemove", onMouseMove, false);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

// camera.lookAt(new THREE.Vector3(0, -1, 0));
camera.lookAt(mesh.position);
scene.add(camera);

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// renderer.render(scene, camera);

// mouse controls
// const cursor = {
//   x: 0,
//   y: 0,
// };

// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);

//   // console.log(cursor.x, cursor.y);
// });

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;

  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// window.addEventListener("mouseover", () => {
//   material.color.set(0xdeadbeef);
// });

// window.addEventListener("mouseout", () => {
//   material.color.set(0xf0f0f0f9);
// });

/**
 * Animate
 */
// let time = Date.now();
const clock = new THREE.Clock();

// gsap tween?
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const tick = () => {
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // scene.children.forEach((c) => {
  // console.log("child", c);
  // c.material.color.set(0xff0000);
  // });

  material.color.set(0xff0000);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    // console.log("intersect", intersects[i]);
    intersects[i].object.material.color.set(0x00ff00);
  }

  // Update objects
  // mesh.rotation.y += 0.01;

  // Time
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // Update objects
  // mesh.rotation.y += 0.001 * deltaTime;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime;

  // // Update objects
  // mesh.position.x = Math.cos(elapsedTime);
  // mesh.position.y = Math.sin(elapsedTime);

  // camera.position.x = Math.cos(elapsedTime);
  // camera.position.y = Math.sin(elapsedTime);
  // camera.lookAt(mesh.position);

  // Update camera
  // camera.position.x = cursor.x * 5;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 3;
  // camera.lookAt(mesh.position);

  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
