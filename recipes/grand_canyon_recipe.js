// Simpler, rescaled Grand Canyon scene for debugging and elevator scale
export function grandCanyonRecipe() {
    // Add more primitives for richness — types and ordering match greatDomeMITRecipe exactly
    const children = [
        // 1) box  — wide plateau base
        { type: 'box', size: [60, 0.2, 60], position: [0, 0.1, 0], color: 0xB8794F, rotation: [0, 0, 0], scale: [1, 1, 1] },
        // 2) box  — inner mesa shelf
        { type: 'box', size: [40, 0.6, 38], position: [0, 0.5, -4], color: 0xC97E4B, rotation: [0, 0.03, 0], scale: [1, 1, 1] },
        // 3) box  — river terrace (broad)
        { type: 'box', size: [36, 0.4, 6], position: [0, 0.9, -12], color: 0xA86B49, rotation: [0.05, 0.02, 0], scale: [1, 1, 1] },

        // 4) box  — strata step 1
        { type: 'box', size: [30, 0.6, 3], position: [0, 1.4, -6.5], color: 0xE2B07A, rotation: [0.08, 0, 0.02], scale: [1, 1, 1] },
        // 5) box  — strata step 2
        { type: 'box', size: [28, 0.6, 3], position: [0, 2.0, -3.7], color: 0xD69A62, rotation: [0.06, 0, -0.01], scale: [1, 1, 1] },
        // 6) box  — strata step 3
        { type: 'box', size: [26, 0.6, 3], position: [0, 2.6, -1.0], color: 0xC88957, rotation: [0.04, 0, 0], scale: [1, 1, 1] },

        // 7–18) 12 cylinders — hoodoos/spires around a basin (same radii/height schema)
        { type: 'cylinder', size: [0.5, 0.8, 7.2], position: [ 12.000, 3.6,  0.000],  color: 0x9F5F3A, rotation: [0, 1.5708, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.8, 6.5], position: [ 10.392, 3.2,  6.000],  color: 0xA9683E, rotation: [0, 2.0944, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.8, 8.0], position: [  6.000, 4.0, 10.392],  color: 0xB37043, rotation: [0, 2.6179, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.8, 6.2], position: [  0.000, 3.1, 12.000],  color: 0x8E5635, rotation: [0, 3.1416, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.8, 7.5], position: [ -6.000, 3.8, 10.392],  color: 0xAA6A3F, rotation: [0, -2.6179,0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.8, 6.9], position: [-10.392, 3.45,  6.000], color: 0xB97846, rotation: [0, -2.0944,0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.8, 7.8], position: [-12.000, 3.9,  0.000],  color: 0x8C4F32, rotation: [0, -1.5708,0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.8, 6.1], position: [-10.392, 3.05, -6.000], color: 0xA1603A, rotation: [0, -1.0472,0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.8, 7.0], position: [ -6.000, 3.5, -10.392], color: 0xB07244, rotation: [0, -0.5236,0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.8, 6.6], position: [  0.000, 3.3, -12.000], color: 0x9B5C37, rotation: [0, 0.0000, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.8, 7.4], position: [  6.000, 3.7, -10.392], color: 0xA7653D, rotation: [0, 0.5236, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.8, 6.3], position: [ 10.392, 3.15,-6.000],  color: 0x935636, rotation: [0, 1.0472, 0], scale: [1, 1, 1] },

        // 19) cylinder — rim belt (flattened "ring" slab)
        { type: 'cylinder', size: [12.6, 12.6, 0.8], position: [0, 6.9, 0], color: 0xA86B49, rotation: [1.5708, 0, 0], scale: [1, 0.12, 1] },

        // 20–21) cylinders — stacked mesa core + cap layer
        { type: 'cylinder', size: [10.0, 10.0, 4.2], position: [0, 9.0, 0], color: 0xC97E4B, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [10.8, 10.8, 0.5], position: [0, 11.1, 0], color: 0xD69A62, rotation: [0, 0, 0], scale: [1, 1, 1] },

        // 22) sphere — rounded butte crown
        { type: 'sphere', size: [7.6], position: [0, 14.2, 0], color: 0xB37043, rotation: [0, 0, 0], scale: [1.0, 0.7, 1.0] },

        // 23) cylinder — small caprock puck
        { type: 'cylinder', size: [1.6, 1.6, 0.6], position: [0, 18.8, 0], color: 0x9F6A41, rotation: [0, 0, 0], scale: [1, 1, 1] },

        // 24–31) 8 spheres — river boulders along the channel bend
        { type: 'sphere', size: [0.34], position: [-6.0, 1.2, -14.0],  color: 0x7E5A44, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.30], position: [-3.5, 1.1, -12.8],  color: 0x6F513E, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.32], position: [-1.0, 1.0, -12.0],  color: 0x7B5843, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.28], position: [ 1.8, 1.0, -11.5],  color: 0x6A4C3B, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.36], position: [ 4.2, 1.0, -12.2],  color: 0x7D5944, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.31], position: [ 6.1, 1.05,-13.4],  color: 0x6D4F3D, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.29], position: [ 7.8, 1.1, -15.0],  color: 0x75533F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.33], position: [ 9.2, 1.2, -16.4],  color: 0x805A45, rotation: [0,0,0], scale: [1,1,1] },

        // 32–36) 5 boxes — rock slabs near the riverbank
        { type: 'box', size: [4.2, 0.8, 2.2], position: [-9.2, 1.0, -9.8],  color: 0xB37A4D, rotation: [0.04, 0.05, 0.02], scale: [1,1,1] },
        { type: 'box', size: [3.6, 0.7, 1.9], position: [-4.6, 0.9, -10.6], color: 0xA86B49, rotation: [0.02,-0.03,-0.01], scale: [1,1,1] },
        { type: 'box', size: [3.2, 0.7, 2.0], position: [ 0.0, 0.9, -11.2], color: 0x8E5635, rotation: [0.03, 0.00, 0.00], scale: [1,1,1] },
        { type: 'box', size: [3.8, 0.7, 1.8], position: [ 4.6, 0.9, -10.4], color: 0x9B5C37, rotation: [0.02, 0.02,-0.02], scale: [1,1,1] },
        { type: 'box', size: [4.0, 0.8, 2.1], position: [ 9.2, 1.0, -9.6],  color: 0xA7653D, rotation: [0.03,-0.02, 0.01], scale: [1,1,1] },

        // 37–52) 8× (cylinder+sphere) — shrubs at the rim (posts = stems; spheres = canopies)
        { type: 'cylinder', size: [0.10,0.10,1.4], position: [ 20.5,0.7,  0.0],  color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.42],          position: [ 20.5,1.6,  0.0],  color: 0x5E7A3B, rotation: [0,0,0], scale: [1,1,1] },

        { type: 'cylinder', size: [0.10,0.10,1.3], position: [ 14.5,0.65, 14.5], color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.40],          position: [ 14.5,1.5, 14.5], color: 0x638746, rotation: [0,0,0], scale: [1,1,1] },

        { type: 'cylinder', size: [0.10,0.10,1.5], position: [  0.0,0.75, 20.5], color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.44],          position: [  0.0,1.7, 20.5], color: 0x5E7A3B, rotation: [0,0,0], scale: [1,1,1] },

        { type: 'cylinder', size: [0.10,0.10,1.4], position: [-14.5,0.7, 14.5],  color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.41],          position: [-14.5,1.6, 14.5], color: 0x628244, rotation: [0,0,0], scale: [1,1,1] },

        { type: 'cylinder', size: [0.10,0.10,1.5], position: [-20.5,0.75, 0.0], color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.43],          position: [-20.5,1.7,  0.0], color: 0x5E7A3B, rotation: [0,0,0], scale: [1,1,1] },

        { type: 'cylinder', size: [0.10,0.10,1.3], position: [-14.5,0.65,-14.5], color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.40],          position: [-14.5,1.5,-14.5], color: 0x638746, rotation: [0,0,0], scale: [1,1,1] },

        { type: 'cylinder', size: [0.10,0.10,1.4], position: [  0.0,0.7,-20.5],  color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.42],          position: [  0.0,1.6,-20.5], color: 0x5E7A3B, rotation: [0,0,0], scale: [1,1,1] },

        { type: 'cylinder', size: [0.10,0.10,1.3], position: [ 14.5,0.65,-14.5], color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.40],          position: [ 14.5,1.5,-14.5], color: 0x628244, rotation: [0,0,0], scale: [1,1,1] },

        // 53–60) 4× (cylinder+sphere) — taller shrubs/trees deeper in the canyon
        { type: 'cylinder', size: [0.12,0.12,1.6], position: [-18,0.8,-26], color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [1.0],          position: [-18,1.8,-26], color: 0x6B8F4A, rotation: [0,0,0], scale: [1,1,1] },

        { type: 'cylinder', size: [0.12,0.12,1.5], position: [-8, 0.75,-26], color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.95],         position: [-8, 1.7,-26], color: 0x6B8F4A, rotation: [0,0,0], scale: [1,1,1] },

        { type: 'cylinder', size: [0.12,0.12,1.5], position: [ 8, 0.75,-26], color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.95],         position: [ 8, 1.7,-26], color: 0x6B8F4A, rotation: [0,0,0], scale: [1,1,1] },

        { type: 'cylinder', size: [0.12,0.12,1.6], position: [18, 0.8,-26], color: 0x4B3A2F, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [1.0],          position: [18, 1.8,-26], color: 0x6B8F4A, rotation: [0,0,0], scale: [1,1,1] },

        // 61) cylinder — elevator pad marker at origin (kept identical role)
        { type: 'cylinder', size: [1.2, 1.2, 0.15], position: [0, 0.08, 0], color: 0x5AA7D6, rotation: [0, 0, 0], scale: [1, 1, 1] }
    ];

    return {
        type: 'plane',
        size: [3, 3],
        position: [0, 0, 0],
        color: 0x6B412D, // ambient canyon tint
        children
    };
}
