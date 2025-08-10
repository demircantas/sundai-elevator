// Simpler, rescaled Grand Canyon scene for debugging and elevator scale
export function grandCanyonRecipe() {
  return {
    type: 'plane',
    size: [30, 30],
    position: [0, 0, 0],
    color: 0xE2B07A,
    children: [
      // 1: Plateau (sphere, matches dome)
      { type: 'sphere', size: [5], position: [0, 8, 0], color: 0xC97E4B },
      // 2: Plateau base (cylinder, matches dome base)
      { type: 'cylinder', size: [5, 5, 2], position: [0, 2, 0], color: 0xC97E4B },
      // 3: Main canyon floor (box, matches main building)
      { type: 'box', size: [12, 4, 8], position: [0, 2, -6], color: 0xE2B07A },
      // 4: River (box, matches steps)
      { type: 'box', size: [12, 0.5, 2], position: [0, 0.25, -10], color: 0x3399FF },
      // 5: Left wall (cylinder, matches left column)
      { type: 'cylinder', size: [0.4, 0.4, 4], position: [-4, 2, -6], color: 0xA0522D },
      // 6: Center wall (cylinder, matches center column)
      { type: 'cylinder', size: [0.4, 0.4, 4], position: [0, 2, -6], color: 0xA0522D },
      // 7: Right wall (cylinder, matches right column)
      { type: 'cylinder', size: [0.4, 0.4, 4], position: [4, 2, -6], color: 0xA0522D },
      // 8: Outcrop (box)
      { type: 'box', size: [2, 2, 2], position: [8, 1, 8], color: 0xC97E4B },
      // 9: Boulder (sphere)
      { type: 'sphere', size: [1], position: [5, 1, 5], color: 0xA0522D },
      // 10: Boulder (sphere)
      { type: 'sphere', size: [0.7], position: [-6, 1, -4], color: 0xA0522D },
      // 11: Boulder (sphere)
      { type: 'sphere', size: [0.5], position: [8, 1, -7], color: 0xA0522D }
    ]
  };
}
