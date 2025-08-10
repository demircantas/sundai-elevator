// Simpler, rescaled Great Dome of MIT scene for debugging and elevator scale
export function greatDomeMITRecipe() {
    // Add more primitives for richness
    const children = [
        // --- plaza / ground cues ---
        { type: 'box', size: [60, 0.2, 60], position: [0, 0.1, 0], color: 0xD9D4C7, rotation: [0, 0, 0], scale: [1, 1, 1] },   // stone plaza
        { type: 'box', size: [36, 0.2, 24], position: [0, 0.11, -22], color: 0x5A7C4A, rotation: [0, 0, 0], scale: [1, 1, 1] }, // lawn (Killian Court cue)
        { type: 'box', size: [36, 0.2, 6],  position: [0, 0.12, -10], color: 0xC8C2B8, rotation: [0, 0, 0], scale: [1, 1, 1] }, // walkway strip

        // --- steps up to colonnade (3 stacked) ---
        { type: 'box', size: [30, 0.4, 3], position: [0, 0.2, -3.0],   color: 0xBFB8A5, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'box', size: [28, 0.4, 3], position: [0, 0.6, -0.2],   color: 0xBFB8A5, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'box', size: [26, 0.4, 3], position: [0, 1.0,  2.6],   color: 0xBFB8A5, rotation: [0, 0, 0], scale: [1, 1, 1] },

        // --- column ring (12 shafts) ---
        // ring radius r=12; column height h=6; center y = h/2 = 3
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [ 12.000, 3.0,  0.000],  color: 0xD9D4C7, rotation: [0, 1.5708, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [ 10.392, 3.0,  6.000],  color: 0xD9D4C7, rotation: [0, 2.0944, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [  6.000, 3.0, 10.392],  color: 0xD9D4C7, rotation: [0, 2.6179, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [  0.000, 3.0, 12.000],  color: 0xD9D4C7, rotation: [0, 3.1416, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [ -6.000, 3.0, 10.392],  color: 0xD9D4C7, rotation: [0, -2.6179,0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [-10.392, 3.0,  6.000],  color: 0xD9D4C7, rotation: [0, -2.0944,0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [-12.000, 3.0,  0.000],  color: 0xD9D4C7, rotation: [0, -1.5708,0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [-10.392, 3.0, -6.000],  color: 0xD9D4C7, rotation: [0, -1.0472,0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [ -6.000, 3.0, -10.392], color: 0xD9D4C7, rotation: [0, -0.5236,0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [  0.000, 3.0, -12.000], color: 0xD9D4C7, rotation: [0, 0.0000, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [  6.000, 3.0, -10.392], color: 0xD9D4C7, rotation: [0, 0.5236, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.42, 0.46, 6], position: [ 10.392, 3.0, -6.000],  color: 0xD9D4C7, rotation: [0, 1.0472, 0], scale: [1, 1, 1] },

        // architrave ring as a flattened cylinder "belt" above columns
        { type: 'cylinder', size: [12.6, 12.6, 0.8], position: [0, 6.8, 0], color: 0xBFB8A5, rotation: [1.5708, 0, 0], scale: [1, 0.12, 1] },

        // --- drum (cylindrical base under dome) ---
        { type: 'cylinder', size: [10.0, 10.0, 4.0], position: [0, 8.8, 0], color: 0xD9D4C7, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [10.5, 10.5, 0.4], position: [0, 10.8, 0], color: 0xBFB8A5, rotation: [0, 0, 0], scale: [1, 1, 1] },

        // --- dome (squashed sphere) ---
        { type: 'sphere', size: [8.0], position: [0, 14.08, 0], color: 0xD9D4C7, rotation: [0, 0, 0], scale: [1.0, 0.66, 1.0] },

        // oculus cap
        { type: 'cylinder', size: [1.4, 1.4, 0.5], position: [0, 19.4, 0], color: 0xBFB8A5, rotation: [0, 0, 0], scale: [1, 1, 1] },

        // oculus lights (8 warm spheres around a small ring)
        { type: 'sphere', size: [0.28], position: [ 2.4, 17.4,  0.0],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.28], position: [ 1.697,17.4,  1.697], color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.28], position: [ 0.0, 17.4,  2.4],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.28], position: [-1.697,17.4,  1.697], color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.28], position: [-2.4, 17.4,  0.0],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.28], position: [-1.697,17.4, -1.697], color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.28], position: [ 0.0, 17.4, -2.4],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere', size: [0.28], position: [ 1.697,17.4, -1.697], color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },

        // --- façade benches (simple blocks near the steps)
        { type: 'box', size: [3.6, 0.6, 1.2], position: [-9.2, 0.6, -7.2], color: 0xBFB8A5, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'box', size: [3.6, 0.6, 1.2], position: [-4.6, 0.6, -7.2], color: 0xBFB8A5, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'box', size: [3.6, 0.6, 1.2], position: [ 0.0, 0.6, -7.2], color: 0xBFB8A5, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'box', size: [3.6, 0.6, 1.2], position: [ 4.6, 0.6, -7.2], color: 0xBFB8A5, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'box', size: [3.6, 0.6, 1.2], position: [ 9.2, 0.6, -7.2], color: 0xBFB8A5, rotation: [0,0,0], scale: [1,1,1] },

        // --- lamppost ring (for scale at the plaza edge) ---
        { type: 'cylinder', size: [0.12,0.12,2.6], position: [ 20.5,1.3,  0.0],  color: 0x777777, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.28],          position: [ 20.5,2.8,  0.0],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'cylinder', size: [0.12,0.12,2.6], position: [ 14.5,1.3, 14.5],  color: 0x777777, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.28],          position: [ 14.5,2.8, 14.5],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'cylinder', size: [0.12,0.12,2.6], position: [  0.0,1.3, 20.5],  color: 0x777777, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.28],          position: [  0.0,2.8, 20.5],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'cylinder', size: [0.12,0.12,2.6], position: [-14.5,1.3, 14.5],  color: 0x777777, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.28],          position: [-14.5,2.8, 14.5],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'cylinder', size: [0.12,0.12,2.6], position: [-20.5,1.3,  0.0],  color: 0x777777, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.28],          position: [-20.5,2.8,  0.0],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'cylinder', size: [0.12,0.12,2.6], position: [-14.5,1.3,-14.5],  color: 0x777777, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.28],          position: [-14.5,2.8,-14.5],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'cylinder', size: [0.12,0.12,2.6], position: [  0.0,1.3,-20.5],  color: 0x777777, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.28],          position: [  0.0,2.8,-20.5],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'cylinder', size: [0.12,0.12,2.6], position: [ 14.5,1.3,-14.5],  color: 0x777777, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.28],          position: [ 14.5,2.8,-14.5],  color: 0xFFE2B0, rotation: [0,0,0], scale: [1,1,1] },

        // --- a few stylized trees near the lawn edge (trunk + canopy) ---
        { type: 'cylinder', size: [0.12,0.12,1.4], position: [-18,0.7,-26], color: 0x5B4636, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.9],           position: [-18,1.6,-26], color: 0x5A7C4A, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'cylinder', size: [0.12,0.12,1.4], position: [-8, 0.7,-26], color: 0x5B4636, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.9],           position: [-8, 1.6,-26], color: 0x5A7C4A, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'cylinder', size: [0.12,0.12,1.4], position: [ 8, 0.7,-26], color: 0x5B4636, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.9],           position: [ 8, 1.6,-26], color: 0x5A7C4A, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'cylinder', size: [0.12,0.12,1.4], position: [18, 0.7,-26], color: 0x5B4636, rotation: [0,0,0], scale: [1,1,1] },
        { type: 'sphere',   size: [0.9],           position: [18, 1.6,-26], color: 0x5A7C4A, rotation: [0,0,0], scale: [1,1,1] },

        // --- elevator pad marker at origin ---
        { type: 'cylinder', size: [1.2, 1.2, 0.15], position: [0, 0.08, 0], color: 0x99A6B2, rotation: [0, 0, 0], scale: [1, 1, 1] }
    ];

    return {
        type: 'plane',
        size: [3, 3],
        position: [0, 0, 0],
        color: 0x888888,
        children
    };
}
