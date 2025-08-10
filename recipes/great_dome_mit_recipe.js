// Simpler, rescaled Great Dome of MIT scene for debugging and elevator scale
export function greatDomeMITRecipe() {
  return {
    type: 'plane',
    size: [30, 30],
    position: [0, 0, 0],
    color: 0x888888,
    children: [
      // 1: Main dome (sphere)
      { type: 'sphere', size: [5], position: [0, 8, 0], color: 0xFFFFFF },
      // 2: Dome base (cylinder)
      { type: 'cylinder', size: [5, 5, 2], position: [0, 2, 0], color: 0xFFFFFF },
      // 3: Main building (box)
      { type: 'box', size: [12, 4, 8], position: [0, 2, -6], color: 0xFFFFFF },
      // 4: Steps (box)
      { type: 'box', size: [12, 0.5, 2], position: [0, 0.25, -10], color: 0xCCCCCC },
      // 5: Left column (cylinder)
      { type: 'cylinder', size: [0.4, 0.4, 4], position: [-4, 2, -6], color: 0xDDDDDD },
      // 6: Center column (cylinder)
      { type: 'cylinder', size: [0.4, 0.4, 4], position: [0, 2, -6], color: 0xDDDDDD },
      // 7: Right column (cylinder)
      { type: 'cylinder', size: [0.4, 0.4, 4], position: [4, 2, -6], color: 0xDDDDDD },
      // 8: Extra box (for interpolation)
      { type: 'box', size: [2, 2, 2], position: [8, 1, 8], color: 0x888888 },
      // 9: Extra sphere (for interpolation)
      { type: 'sphere', size: [1], position: [5, 1, 5], color: 0x888888 },
      // 10: Extra sphere (for interpolation)
      { type: 'sphere', size: [0.7], position: [-6, 1, -4], color: 0x888888 },
      // 11: Extra sphere (for interpolation)
      { type: 'sphere', size: [0.5], position: [8, 1, -7], color: 0x888888 }
    ]
  };
}
