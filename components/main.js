import { createCamera } from './Camera.js';
import { createRenderer } from './Renderer.js';
import { addLighting } from './Lighting.js';
import { setupControls } from './Controls.js';
import { createSceneFromRecipe } from '../ParametricObject.js';

// Import recipes
import { grandCanyonRecipe } from '../recipes/grand_canyon_recipe.js';
import { greatDomeMITRecipe } from '../recipes/great_dome_mit_recipe.js';

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

// Load scene from recipe (choose one)
const canyon = createSceneFromRecipe(greatDomeMITRecipe());
scene.add(canyon);
// To use the MIT Dome scene, comment above and uncomment below:
// const dome = createSceneFromRecipe(greatDomeMITRecipe());
// scene.add(dome);

// Controls
const updateMovement = setupControls(renderer, camera);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    updateMovement();
    renderer.render(scene, camera);
}
animate();
