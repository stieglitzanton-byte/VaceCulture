import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

const PARTICLES = [
  { baseX: 180, baseY: 320, sx: 45, sy: 67, sz: 1.5 },
  { baseX: 820, baseY: 860, sx: 53, sy: 40, sz: 1.0 },
  { baseX: 590, baseY: 1380, sx: 37, sy: 59, sz: 1.2 },
  { baseX: 280, baseY: 1650, sx: 61, sy: 43, sz: 0.9 },
  { baseX: 940, baseY: 1200, sx: 71, sy: 33, sz: 1.1 },
];

export const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = (frame * 7 + 13) % 9999;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 999 }}>
      <svg
        style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.035 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="fg">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#fg)" />
      </svg>

      {PARTICLES.map((p, i) => {
        const x = p.baseX + Math.sin(frame / p.sx + i * 1.3) * 140;
        const y = p.baseY + Math.cos(frame / p.sy + i * 0.9) * 180;
        const opacity = 0.1 + Math.sin(frame / 23 + i * 1.7) * 0.04;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: p.sz,
              height: p.sz,
              borderRadius: '50%',
              background: '#fff',
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
