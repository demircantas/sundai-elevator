// Simpler, rescaled Great Dome of MIT scene for debugging and elevator scale
export function greatDomeMITRecipe() {
    // Add more primitives for richness
    const children = [
        { type: 'sphere', size: [5], position: [0, 8, 0], color: 0xFFFFFF, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [5, 5, 2], position: [0, 2, 0], color: 0xFFFFFF, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'box', size: [12, 4, 8], position: [0, 2, -6], color: 0xFFFFFF, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'box', size: [12, 0.5, 2], position: [0, 0.25, -10], color: 0xCCCCCC, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.4, 0.4, 4], position: [-4, 2, -6], color: 0xDDDDDD, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.4, 0.4, 4], position: [0, 2, -6], color: 0xDDDDDD, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.4, 0.4, 4], position: [4, 2, -6], color: 0xDDDDDD, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'box', size: [2, 2, 2], position: [8, 1, 8], color: 0x888888, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'sphere', size: [1], position: [5, 1, 5], color: 0x888888, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'sphere', size: [0.7], position: [-6, 1, -4], color: 0x888888, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'sphere', size: [0.5], position: [8, 1, -7], color: 0x888888, rotation: [0, 0, 0], scale: [1, 1, 1] },
        // New primitives for richness
        { type: 'box', size: [1, 1, 1], position: [-10, 0.5, 10], color: 0x4444ff, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'sphere', size: [0.8], position: [-8, 0.8, 8], color: 0xff4444, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'cylinder', size: [0.5, 0.5, 2], position: [10, 1, 10], color: 0x44ff44, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'box', size: [2, 0.5, 2], position: [-8, 0.25, -8], color: 0xffff44, rotation: [0, 0, 0], scale: [1, 1, 1] },
        { type: 'sphere', size: [0.6], position: [10, 0.6, -10], color: 0x44ffff, rotation: [0, 0, 0], scale: [1, 1, 1] }
    ];
    return {
        type: 'plane',
        size: [30, 30],
        position: [0, 0, 0],
        color: 0x888888,
        children
    };
}
