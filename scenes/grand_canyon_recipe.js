export default {
  seed: 777,
  motifs: [
    {
      kind: 'poissonScatter',
      id: 'boulders',
      count: 180,
      bbox: [-60, 60, -60, 60],
      minDist: 1.4,
      base: {
        geometry: { kind: 'sphere', params: { radius: 0.8 }},
        material: { kind: 'standard', color: '#b57b51', roughness: 1.0 },
        randomScale: [0.6, 2.2],
        tags: ['rock']
      }
    },
    {
      kind: 'poissonScatter',
      id: 'scrub',
      count: 220,
      bbox: [-60, 60, -60, 60],
      minDist: 1.0,
      noiseMask: { freq: 0.06, threshold: 0.6 },
      base: {
        geometry: { kind: 'sphere', params: { radius: 0.3 }},
        material: { kind: 'standard', color: '#6e7d52', roughness: 1.0 },
        randomScale: [0.6, 1.3],
        tags: ['scrub']
      }
    },
    {
      kind: 'curveSamples',
      id: 'river_markers',
      count: 80,
      curve: [{x:-50,z:-10},{x:-20,z:-5},{x:0,z:0},{x:20,z:10},{x:50,z:8}],
      base: {
        geometry: { kind: 'box', params: { width: 0.4, height: 0.4, depth: 0.4 }},
        material: { kind: 'standard', color: '#7ec8e3', metalness: 0.0, roughness: 0.8 },
        tags: ['river']
      },
      heightFunc: (x,z,noise)=> (noise(x*0.02,z*0.02)-0.5)*2.0
    }
  ]
};
