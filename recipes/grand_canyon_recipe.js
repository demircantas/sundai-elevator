// Simpler, rescaled Grand Canyon scene for debugging and elevator scale
export function grandCanyonRecipe() {
  return {
    type: 'plane',
    size: [30, 30],
    position: [0, 0, 0],
    color: 0xE2B07A,
    children: [
      // Canyon walls (boxes)
      { type: 'box', size: [28, 4, 2], position: [0, 2, -14], color: 0xC97E4B },
      { type: 'box', size: [28, 4, 2], position: [0, 2, 14], color: 0xC97E4B },
      { type: 'box', size: [2, 4, 28], position: [-14, 2, 0], color: 0xC97E4B },
      { type: 'box', size: [2, 4, 28], position: [14, 2, 0], color: 0xC97E4B },
      // River
      { type: 'box', size: [20, 0.5, 3], position: [0, 0.3, 0], color: 0x3399FF },
      // Some rocks
      { type: 'sphere', size: [1], position: [5, 1, 5], color: 0xA0522D },
      { type: 'sphere', size: [0.7], position: [-6, 1, -4], color: 0xA0522D },
      { type: 'sphere', size: [0.5], position: [8, 1, -7], color: 0xA0522D },
      // Plateau
      { type: 'box', size: [6, 1, 6], position: [8, 2, 8], color: 0xE2B07A }
    ]
  };
}
