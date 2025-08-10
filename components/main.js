import { createCamera } from './Camera.js';
import { createRenderer } from './Renderer.js';
import { addLighting } from './Lighting.js';
import { setupControls } from './Controls.js';
import { createSceneFromRecipe } from '../ParametricObject.js';
import { elevatorRecipe } from '../recipes/elevator_recipe.js';

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
// const canyon = createSceneFromRecipe(grandCanyonRecipe());
// scene.add(canyon);
// To use the MIT Dome scene, comment above and uncomment below:
let currentScene = 'dome';
let elevator, elevatorMesh, elevatorY = 0, elevatorTargetY = 20, elevatorMoving = false;

// Add MIT Dome scene
const dome = createSceneFromRecipe(greatDomeMITRecipe());
scene.add(dome);

// Add elevator to the MIT Dome
elevator = createSceneFromRecipe(elevatorRecipe({ position: [0, 5, 10], height: 8, width: 4, depth: 4 }));
elevatorMesh = elevator;
scene.add(elevatorMesh);

// Listen for 'E' key to enter elevator and start moving
let playerInElevator = false;
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e' && !elevatorMoving && !playerInElevator) {
        // Check if player is close to elevator (simple distance check)
        const dx = camera.position.x - elevatorMesh.position.x;
        const dz = camera.position.z - elevatorMesh.position.z;
        const dist = Math.sqrt(dx*dx + dz*dz);
        if (dist < 4) {
            playerInElevator = true;
            elevatorMoving = true;
        }
    }
});

// Controls
const updateMovement = setupControls(renderer, camera);

// Animation loop

function animate() {
    requestAnimationFrame(animate);
    if (elevatorMoving && playerInElevator && currentScene === 'dome') {
        // Move elevator and player up
        if (elevatorMesh.position.y < elevatorTargetY) {
            elevatorMesh.position.y += 0.1;
            camera.position.y += 0.1;
        } else {
            // Arrived at top, switch to Grand Canyon
            elevatorMoving = false;
            playerInElevator = false;
            // Remove MIT Dome scene and elevator
            scene.clear();
            // Add Grand Canyon scene
            const canyon = createSceneFromRecipe(grandCanyonRecipe());
            scene.add(canyon);
            // Place player at new location (elevator exit)
            camera.position.set(0, 5, 10);
            currentScene = 'canyon';
        }
    } else {
        updateMovement();
    }
    renderer.render(scene, camera);
}
animate();
