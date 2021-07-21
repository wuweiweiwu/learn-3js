import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import "./style.css";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;

// mesh.scale.x = 2;
// mesh.scale.y = 0.25;
// mesh.scale.z = 0.5;

mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
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
  mesh.rotation.y = elapsedTime;

  // Update objects
  mesh.position.x = Math.cos(elapsedTime);
  mesh.position.y = Math.sin(elapsedTime);

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
