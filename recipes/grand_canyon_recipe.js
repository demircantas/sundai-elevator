// Recipe for the Grand Canyon scene using parametric objects
export function grandCanyonRecipe() {
  return {
    type: 'plane',
    size: [100, 100],
    position: [0, 0, 0],
    color: 0x888888,
    children: [
      {
        type: 'box',
        size: [10, 5, 10],
        position: [0, 2.5, 0],
        color: 0xFFA500,
        children: [
          {
            type: 'box',
            size: [6, 3, 6],
            position: [0, 4, 0],
            color: 0xFFB347
          }
        ]
      },
      {
        type: 'cylinder',
        size: [2, 2, 8],
        position: [15, 4, -10],
        color: 0xFFB347
      },
      {
        type: 'sphere',
        size: [3],
        position: [-20, 3, 10],
        color: 0xFFFF00
      }
    ]
  };
}
