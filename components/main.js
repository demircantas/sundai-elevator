import { createCamera } from './Camera.js';
import { createRenderer } from './Renderer.js';
import { addLighting } from './Lighting.js';
import { setupControls } from './Controls.js';
import { createGround, createCube, createSphere, createCylinder } from '../SceneObjects.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x20232a);

// Camera
const camera = createCamera();

// Renderer
const renderer = createRenderer();

// Lighting
addLighting(scene);

// Objects
scene.add(createGround());
scene.add(createCube());
scene.add(createSphere());
scene.add(createCylinder());

// Controls
const updateMovement = setupControls(renderer, camera);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    updateMovement();
    renderer.render(scene, camera);
}
animate();
