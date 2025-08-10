
// Unlit shading toggle (default: true)
let useUnlit = true;
window.useUnlit = useUnlit;
window.toggleUnlitShading = function() {
    useUnlit = !useUnlit;
    window.useUnlit = useUnlit;
    updateAllMaterials(scene, useUnlit);
};

function updateAllMaterials(obj, unlit) {
    obj.traverse(child => {
        if (child.isMesh) {
            const color = child.material.color ? child.material.color.getHex() : 0xffffff;
            child.material = unlit
                ? new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
                : new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide });
        }
    });
}

// Wire up the button
document.getElementById('toggle-shading').onclick = window.toggleUnlitShading;
// Set initial mode to unlit
window.addEventListener('DOMContentLoaded', () => {
    updateAllMaterials(scene, useUnlit);
});
import { createCamera } from './Camera.js';
import { createRenderer } from './Renderer.js';
import { addLighting } from './Lighting.js';
import { setupControls } from './Controls.js';
import { createSceneFromRecipe } from '../ParametricObject.js';
// import { createParametricObject } from '../ParametricObject.js';
import { elevatorRecipe } from '../recipes/elevator_recipe.js';
import { interpolateRecipes, createInterpolatedScene } from './SceneInterpolator.js';

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
let interpInstanced = [];
const domeRecipe = greatDomeMITRecipe();
const canyonRecipe = grandCanyonRecipe();

function loadDomeScene() {
    scene.clear();
    // Use instanced geometry scene for MIT Dome
    // Remove previous instanced references
    interpInstanced = [];
    // Create instanced geometry for MIT Dome and Canyon, keep references
    function createInterpInstanced(recipeA, recipeB) {
        // Both recipes must have the same structure for morphing
        // We'll batch by type: box, sphere, cylinder
        const types = ['box', 'sphere', 'cylinder'];
        for (const type of types) {
            const arrA = [];
            const arrB = [];
            function collect(objA, objB) {
                if (objA.type === type && objB.type === type) {
                    arrA.push(objA);
                    arrB.push(objB);
                }
                if (objA.children && objB.children && objA.children.length === objB.children.length) {
                    for (let i = 0; i < objA.children.length; ++i) {
                        collect(objA.children[i], objB.children[i]);
                    }
                }
            }
            collect(recipeA, recipeB);
            if (arrA.length > 0) {
                // Create instanced mesh
                let geometry;
                switch (type) {
                    case 'box': geometry = new THREE.BoxGeometry(...(arrA[0].size || [1,1,1])); break;
                    case 'sphere': geometry = new THREE.SphereGeometry((arrA[0].size||[1])[0], 32, 32); break;
                    case 'cylinder': geometry = new THREE.CylinderGeometry(...(arrA[0].size||[1,1,1]), 32); break;
                }
                const unlit = (typeof window !== 'undefined' && window.useUnlit !== undefined) ? window.useUnlit : false;
                const baseColor = arrA[0].color || 0xffffff;
                const material = unlit
                    ? new THREE.MeshBasicMaterial({ color: baseColor, side: THREE.DoubleSide })
                    : new THREE.MeshPhongMaterial({ color: baseColor, side: THREE.DoubleSide });
                const instanced = new THREE.InstancedMesh(geometry, material, arrA.length);
                scene.add(instanced);
                interpInstanced.push({ instanced, arrA, arrB });
            }
        }
        // Add plane as a regular mesh (no morphing)
        if (recipeA.type === 'plane' && recipeB.type === 'plane') {
            let geometry = new THREE.PlaneGeometry(...(recipeA.size||[1,1]));
            const unlit = (typeof window !== 'undefined' && window.useUnlit !== undefined) ? window.useUnlit : false;
            const material = unlit
                ? new THREE.MeshBasicMaterial({ color: recipeA.color || 0xffffff, side: THREE.DoubleSide })
                : new THREE.MeshPhongMaterial({ color: recipeA.color || 0xffffff, side: THREE.DoubleSide });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(...(recipeA.position||[0,0,0]));
            mesh.rotation.set(...(recipeA.rotation||[0,0,0]));
            mesh.scale.set(...(recipeA.scale||[1,1,1]));
            scene.add(mesh);
        }
    }
    createInterpInstanced(domeRecipe, canyonRecipe);
    // Elevator
    elevator = createSceneFromRecipe(elevatorRecipe({ position: [0, 5, 10], height: 8, width: 4, depth: 4 }));
    elevatorMesh = elevator;
    scene.add(elevatorMesh);
    camera.position.y = 5;
    currentScene = 'dome';
}

function loadCanyonScene() {
    scene.clear();
    // Use instanced geometry scene for Grand Canyon
    interpInstanced = [];
    function createInterpInstanced(recipeA, recipeB) {
        const types = ['box', 'sphere', 'cylinder'];
        for (const type of types) {
            const arrA = [];
            const arrB = [];
            function collect(objA, objB) {
                if (objA.type === type && objB.type === type) {
                    arrA.push(objA);
                    arrB.push(objB);
                }
                if (objA.children && objB.children && objA.children.length === objB.children.length) {
                    for (let i = 0; i < objA.children.length; ++i) {
                        collect(objA.children[i], objB.children[i]);
                    }
                }
            }
            collect(recipeA, recipeB);
            if (arrA.length > 0) {
                let geometry;
                switch (type) {
                    case 'box': geometry = new THREE.BoxGeometry(...(arrA[0].size || [1,1,1])); break;
                    case 'sphere': geometry = new THREE.SphereGeometry((arrA[0].size||[1])[0], 32, 32); break;
                    case 'cylinder': geometry = new THREE.CylinderGeometry(...(arrA[0].size||[1,1,1]), 32); break;
                }
                const unlit = (typeof window !== 'undefined' && window.useUnlit !== undefined) ? window.useUnlit : false;
                const baseColor = arrA[0].color || 0xffffff;
                const material = unlit
                    ? new THREE.MeshBasicMaterial({ color: baseColor, side: THREE.DoubleSide })
                    : new THREE.MeshPhongMaterial({ color: baseColor, side: THREE.DoubleSide });
                const instanced = new THREE.InstancedMesh(geometry, material, arrA.length);
                scene.add(instanced);
                interpInstanced.push({ instanced, arrA, arrB });
            }
        }
        if (recipeA.type === 'plane' && recipeB.type === 'plane') {
            let geometry = new THREE.PlaneGeometry(...(recipeA.size||[1,1]));
            const unlit = (typeof window !== 'undefined' && window.useUnlit !== undefined) ? window.useUnlit : false;
            const material = unlit
                ? new THREE.MeshBasicMaterial({ color: recipeA.color || 0xffffff, side: THREE.DoubleSide })
                : new THREE.MeshPhongMaterial({ color: recipeA.color || 0xffffff, side: THREE.DoubleSide });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(...(recipeA.position||[0,0,0]));
            mesh.rotation.set(...(recipeA.rotation||[0,0,0]));
            mesh.scale.set(...(recipeA.scale||[1,1,1]));
            scene.add(mesh);
        }
    }
    createInterpInstanced(domeRecipe, canyonRecipe);
    // Elevator
    elevator = createSceneFromRecipe(elevatorRecipe({ position: [0, 5, 10], height: 8, width: 4, depth: 4, color: 0x8844ff }));
    elevatorMesh = elevator;
    scene.add(elevatorMesh);
    camera.position.y = 5;
    currentScene = 'canyon';
}

// Start in MIT Dome
loadDomeScene();

// Listen for 'E' key to enter elevator and start moving
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e' && !elevatorMoving && !playerInElevator) {
        playerInElevator = true;
        elevatorMoving = true;
        // Set direction based on current scene
        elevatorDirection = (currentScene === 'dome') ? 1 : -1;
    }
});

// Controls
const updateMovement = setupControls(renderer, camera);

// Animation loop



function animate() {
    requestAnimationFrame(animate);
    let t = (elevatorMesh.position.y - 5) / (elevatorTargetY - 5);
    t = Math.max(0, Math.min(1, t));
    if (elevatorMoving && playerInElevator) {
        // Move elevator and player up or down
        let arrived = false;
        if (elevatorDirection === 1 && elevatorMesh.position.y < elevatorTargetY) {
            elevatorMesh.position.y += 0.1;
            if (elevatorMesh.position.y >= elevatorTargetY) {
                elevatorMesh.position.y = elevatorTargetY;
                arrived = true;
            }
            camera.position.y = elevatorMesh.position.y;
        } else if (elevatorDirection === -1 && elevatorMesh.position.y > 5) {
            elevatorMesh.position.y -= 0.1;
            if (elevatorMesh.position.y <= 5) {
                elevatorMesh.position.y = 5;
                arrived = true;
            }
            camera.position.y = elevatorMesh.position.y;
        } else {
            arrived = true;
        }
        // Interpolate all instanced meshes
        for (const { instanced, arrA, arrB } of interpInstanced) {
            const color = new THREE.Color();
            for (let i = 0; i < arrA.length; ++i) {
                const objA = arrA[i], objB = arrB[i];
                // Interpolate transform
                const pos = objA.position.map((a, j) => a + (objB.position[j] - a) * t);
                const rot = objA.rotation.map((a, j) => a + (objB.rotation[j] - a) * t);
                const scl = objA.scale.map((a, j) => a + (objB.scale[j] - a) * t);
                const m = new THREE.Matrix4();
                m.compose(
                    new THREE.Vector3(...pos),
                    new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)),
                    new THREE.Vector3(...scl)
                );
                instanced.setMatrixAt(i, m);
                // Interpolate color
                color.set(objA.color);
                color.lerp(new THREE.Color(objB.color), t);
                instanced.setColorAt(i, color);
            }
            instanced.instanceMatrix.needsUpdate = true;
            if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
        }
        if (arrived) {
            elevatorMoving = false;
            playerInElevator = false;
            if (elevatorDirection === 1) {
                currentScene = 'canyon';
            } else {
                currentScene = 'dome';
            }
        }
    } else {
        updateMovement();
        // Snap to correct state
        let snapT = (currentScene === 'dome') ? 0 : 1;
        for (const { instanced, arrA, arrB } of interpInstanced) {
            const color = new THREE.Color();
            for (let i = 0; i < arrA.length; ++i) {
                const objA = arrA[i], objB = arrB[i];
                const pos = objA.position.map((a, j) => a + (objB.position[j] - a) * snapT);
                const rot = objA.rotation.map((a, j) => a + (objB.rotation[j] - a) * snapT);
                const scl = objA.scale.map((a, j) => a + (objB.scale[j] - a) * snapT);
                const m = new THREE.Matrix4();
                m.compose(
                    new THREE.Vector3(...pos),
                    new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)),
                    new THREE.Vector3(...scl)
                );
                instanced.setMatrixAt(i, m);
                color.set(objA.color);
                color.lerp(new THREE.Color(objB.color), snapT);
                instanced.setColorAt(i, color);
            }
            instanced.instanceMatrix.needsUpdate = true;
            if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
        }
    }
    renderer.render(scene, camera);
}
animate();
