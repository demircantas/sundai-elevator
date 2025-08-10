// Expands compact "recipe" objects into a large flat list of atomic entries
import { seeded } from './util/seededRng.js';
import { makeValueNoise2D } from './util/noise.js';

export class SceneGenerator {
  static expandRecipe(recipe) {
    const out = [];
    const rng = seeded(recipe.seed ?? 1234);
    const noise = makeValueNoise2D(recipe.seed ?? 1234);

  const lerp = (a,b,t)=>a+(b-a)*t;
  const randRange = (a,b)=>lerp(a,b,rng());

    for (const motif of recipe.motifs ?? []) {
    switch (motif.kind) {
      case 'ringInstances': {
        const { id, count, radius, y=0, jitterAngle=0, jitterRadius=0, align='outward', base } = motif;
        for (let i=0;i<count;i++){
          const t = (i / count) * Math.PI * 2;
          const ang = t + (rng()*2-1)*jitterAngle;
          const rad = radius + (rng()*2-1)*jitterRadius;
          const x = Math.cos(ang)*rad, z = Math.sin(ang)*rad;
          const rotY = align === 'outward' ? Math.atan2(z,x)+Math.PI/2 : 0;
          out.push(atom(`${id}_${i}`, base, [x,y,z], [0,rotY,0]));
        }
        break;
      }
      case 'poissonScatter': {
        const { id, count, bbox, minDist=1.0, base, noiseMask } = motif;
        const pts = poisson2D(count, bbox, minDist, seeded(rng()*1e9|0));
        for (let i=0;i<pts.length;i++){
          const [x,z] = pts[i];
          if (noiseMask) {
            const n = noise(x*noiseMask.freq, z*noiseMask.freq);
            if (n < (noiseMask.threshold ?? 0.5)) continue;
          }
          const s = base.randomScale ? randRange(base.randomScale[0], base.randomScale[1]) : 1;
          out.push(atom(`${id}_${i}`, base, [x, base.y||0, z], [0, rng()*Math.PI*2, 0], [s,s,s]));
        }
        break;
      }
      case 'curveSamples': {
        const { id, count, curve, base, heightFunc } = motif; // curve: [{x,z}, ...]
        for (let i=0;i<count;i++){
          const t = i/(count-1);
          const p = samplePolylineXZ(curve, t);
          const y = heightFunc ? heightFunc(p.x, p.z, noise) : (base.y||0);
          out.push(atom(`${id}_${i}`, base, [p.x,y,p.z]));
        }
        break;
      }
      default: console.warn('Unknown motif', motif.kind);
    }
  }
    return out;

    function atom(id, base, position=[0,0,0], rotation=[0,0,0], scale){
      return {
        id, type: 'mesh',
        geometry: base.geometry,     // { kind, params? } or { url } for custom
        material: base.material,     // { kind: 'standard'|'emissive'|..., color, ... }
        transform: { position, rotation, scale: scale ?? (base.scale ?? [1,1,1]) },
        lod: base.lod ?? { near: 0, far: 200, billboard: false },
        tags: base.tags ?? []
      };
    }
  }
}

// --- helpers ---
function samplePolylineXZ(curve, t){
  if (!curve || curve.length < 2) return { x:0, z:0 };
  const segs = curve.length - 1;
  const ft = t * segs;
  const i = Math.min(Math.floor(ft), segs-1);
  const lt = ft - i;
  const a = curve[i], b = curve[i+1];
  const lerp=(a,b,t)=>a+(b-a)*t;
  return { x: lerp(a.x,b.x,lt), z: lerp(a.z,b.z,lt) };
}

function poisson2D(n, bbox, minDist, rng){
  const [xmin,xmax,zmin,zmax] = bbox; const pts=[];
  const dist2 = (ax,az,bx,bz)=>{const dx=ax-bx,dz=az-bz; return dx*dx+dz*dz;};
  let tries = n*30;
  while (pts.length<n && tries-->0){
    const x = xmin + (xmax-xmin)*rng();
    const z = zmin + (zmax-zmin)*rng();
    if (pts.every(p=>dist2(p[0],p[1],x,z) >= minDist*minDist)) pts.push([x,z]);
  }
  return pts;
}
