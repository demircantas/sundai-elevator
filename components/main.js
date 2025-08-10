import { createCamera } from './Camera.js';
import { createRenderer } from './Renderer.js';
import { addLighting } from './Lighting.js';
import { setupControls } from './Controls.js';
import { createGround, createCube, createSphere, createCylinder } from '../SceneObjects.js';
import { createSceneFromJSON } from '../ParametricObject.js';

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
// scene.add(createGround());
// scene.add(createCube());
// scene.add(createSphere());
// scene.add(createCylinder());

// Load cartoon scene from JSON (Grand Canyon example)
fetch('../grand_canyon_scene.json')
    .then(response => response.json())
    .then(data => {
        const canyon = createSceneFromJSON(data);
        scene.add(canyon);
    });

// Controls
const updateMovement = setupControls(renderer, camera);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    updateMovement();
    renderer.render(scene, camera);
}
animate();
