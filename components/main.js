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
let elevator, elevatorMesh, elevatorY = 0, elevatorTargetY = 20, elevatorMoving = false, elevatorDirection = 1;
let dome, canyon, playerInElevator = false;

function loadDomeScene() {
    scene.clear();
    dome = createSceneFromRecipe(greatDomeMITRecipe());
    scene.add(dome);
    elevator = createSceneFromRecipe(elevatorRecipe({ position: [0, 5, 10], height: 8, width: 4, depth: 4 }));
    elevatorMesh = elevator;
    scene.add(elevatorMesh);
    camera.position.set(0, 5, 10);
    currentScene = 'dome';
}

function loadCanyonScene() {
    scene.clear();
    canyon = createSceneFromRecipe(grandCanyonRecipe());
    scene.add(canyon);
    elevator = createSceneFromRecipe(elevatorRecipe({ position: [0, 5, 10], height: 8, width: 4, depth: 4, color: 0x8844ff }));
    elevatorMesh = elevator;
    scene.add(elevatorMesh);
    camera.position.set(0, 5, 10);
    currentScene = 'canyon';
}

// Start in MIT Dome
loadDomeScene();

// Listen for 'E' key to enter elevator and start moving
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e' && !elevatorMoving && !playerInElevator) {
        // Check if player is close to elevator (simple distance check)
        const dx = camera.position.x - elevatorMesh.position.x;
        const dz = camera.position.z - elevatorMesh.position.z;
        const dist = Math.sqrt(dx*dx + dz*dz);
        if (dist < 4) {
            playerInElevator = true;
            elevatorMoving = true;
            // Set direction based on current scene
            elevatorDirection = (currentScene === 'dome') ? 1 : -1;
        }
    }
});

// Controls
const updateMovement = setupControls(renderer, camera);

// Animation loop


function animate() {
    requestAnimationFrame(animate);
    if (elevatorMoving && playerInElevator) {
        // Move elevator and player up or down
        if (elevatorDirection === 1 && elevatorMesh.position.y < elevatorTargetY) {
            elevatorMesh.position.y += 0.1;
            camera.position.y += 0.1;
        } else if (elevatorDirection === -1 && elevatorMesh.position.y > 5) {
            elevatorMesh.position.y -= 0.1;
            camera.position.y -= 0.1;
        } else {
            // Arrived at destination
            elevatorMoving = false;
            playerInElevator = false;
            if (elevatorDirection === 1 && currentScene === 'dome') {
                // Switch to Grand Canyon
                loadCanyonScene();
            } else if (elevatorDirection === -1 && currentScene === 'canyon') {
                // Switch to MIT Dome
                loadDomeScene();
            }
        }
    } else {
        updateMovement();
    }
    renderer.render(scene, camera);
}
animate();
