
# sundai-elevator

## Overview

**sundai-elevator** is a concept-driven 3D web application that simulates an elevator journey between iconic locations (e.g., MIT and the Grand Canyon) using [Three.js](https://threejs.org/). The project demonstrates modular software design using the Concept Design methodology, where each core feature is specified and implemented as an independent "concept".

## Features

- Immersive 3D scenes rendered in the browser
- WASD first-person controls with pointer lock
- Modular elevator system that can move between scenes
- Scene interpolation for smooth transitions
- Toggleable shading (lit/unlit) for visual exploration
- Extensible via recipes for new locations or objects

## How It Works

### Architecture

The application is built around **Concept Design**, where each major feature (Elevator, Scene, Player, Controls, Lighting, etc.) is specified in a `.concept` file (see `specs/`). Each concept is implemented as a standalone JavaScript class in `components/` or `concepts/`, and synchronizations between concepts are handled by dedicated sync modules in `syncs/`.

#### Key Directories

- `components/` – Core implementation of camera, controls, lighting, renderer, and main app logic
- `concepts/` – Concept classes implementing the formal specifications
- `syncs/` – Synchronization logic between concepts
- `recipes/` and `scenes/` – Scene and object definitions ("recipes")
- `specs/` – Formal concept specifications
- `rules/` – Methodology and design rules for concept-driven development

### Main Flow

1. **Entry Point**: `index.html` loads Three.js and starts the app via `components/main.js`.
2. **App Initialization**: `main.js` creates the scene, camera, renderer, controls, and concept instances. It wires up synchronizations and UI (e.g., shading toggle).
3. **Scene Generation**: Scenes are built from recipes (see `sceneFactory.js` and `recipes/`). Instanced geometry is used for performance.
4. **Elevator Logic**: The elevator is a concept with its own state and actions (see `ElevatorConcept.js` and `specs/Elevator.concept`). It can move, start, stop, and synchronize with the player.
5. **Controls**: WASD and mouse look are handled by the `Controls` class, which updates the camera and player state.
6. **Lighting & Shading**: Lighting is managed by the `Lighting` concept/class. Shading can be toggled between lit and unlit modes.
7. **Scene Interpolation**: The `SceneInterpolator` enables smooth transitions between scenes (e.g., MIT to Grand Canyon) by interpolating object properties.

## Crucial Parts of the Implementation

### Concept-Driven Design

- **Concepts**: Each feature is specified in a `.concept` file (see `specs/`). For example, `Elevator.concept` defines the elevator's state and actions. Implementations in `concepts/` follow these specs.
- **Synchronizations**: Sync modules (e.g., `ElevatorPlayerSync.js`) declaratively connect actions and state between concepts, ensuring modularity and separation of concerns.

### Scene Generation & Recipes

- **sceneFactory.js**: Builds Three.js scenes from recipe objects, supporting instanced geometry for performance.
- **recipes/**: Contains parameterized functions that generate scene or object definitions (e.g., `elevatorRecipe`).

### Controls & Player

- **Controls.js**: Implements WASD and mouse look, pointer lock, and camera updates.
- **PlayerConcept.js**: Represents the user's position and state in the scene.

### Elevator

- **ElevatorConcept.js**: Manages elevator state (position, direction, movement, player presence) and actions (move, start, stop, set target/direction).
- **ElevatorPlayerSync.js**: Synchronizes player and elevator actions (e.g., entering/exiting elevator).

### Scene Interpolation

- **SceneInterpolator.js**: Interpolates between two scene recipes for smooth transitions, used for moving between locations.

### Lighting & Shading

- **Lighting.js**: Adds ambient and hemisphere lights for visibility.
- **ShadingConcept.js**: Manages shading mode and material updates.

## Extending the Project

To add new locations or objects:

1. Create a new recipe in `recipes/` or `scenes/`.
2. Update the UI or main app logic to allow switching to the new scene.
3. (Optional) Define new concepts or synchronizations as needed, and specify them in `specs/`.

## References

- [Three.js Documentation](https://threejs.org/docs/)
- [The Essence of Software](https://essenceofsoftware.com/) by Daniel Jackson (Concept Design methodology)

---
For more details, see the `specs/` and `rules/` folders.