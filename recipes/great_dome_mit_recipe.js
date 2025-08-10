// Simpler, rescaled Great Dome of MIT scene for debugging and elevator scale
export function greatDomeMITRecipe() {
  return {
    type: 'plane',
    size: [30, 30],
    position: [0, 0, 0],
    color: 0x888888,
    children: [
      // Main dome
      { type: 'sphere', size: [5], position: [0, 8, 0], color: 0xFFFFFF },
      // Dome base
      { type: 'cylinder', size: [5, 5, 2], position: [0, 2, 0], color: 0xFFFFFF },
      // Main building
      { type: 'box', size: [12, 4, 8], position: [0, 2, -6], color: 0xFFFFFF },
      // Steps
      { type: 'box', size: [12, 0.5, 2], position: [0, 0.25, -10], color: 0xCCCCCC },
      // Columns
      { type: 'cylinder', size: [0.4, 0.4, 4], position: [-4, 2, -6], color: 0xDDDDDD },
      { type: 'cylinder', size: [0.4, 0.4, 4], position: [0, 2, -6], color: 0xDDDDDD },
      { type: 'cylinder', size: [0.4, 0.4, 4], position: [4, 2, -6], color: 0xDDDDDD }
    ]
  };
}
