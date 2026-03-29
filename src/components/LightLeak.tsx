import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

interface LightLeakProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  startFrame?: number;
}

const GRADIENTS = {
  top: 'radial-gradient(ellipse 70% 28% at 50% 0%, #d4a574 0%, transparent 100%)',
  bottom: 'radial-gradient(ellipse 70% 28% at 50% 100%, #d4a574 0%, transparent 100%)',
  left: 'radial-gradient(ellipse 28% 70% at 0% 50%, #d4a574 0%, transparent 100%)',
  right: 'radial-gradient(ellipse 28% 70% at 100% 50%, #d4a574 0%, transparent 100%)',
};

export const LightLeak: React.FC<LightLeakProps> = ({ position = 'top', startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const f = frame - startFrame;
  const opacity = interpolate(f, [0, 6, 9, 15], [0, 0.18, 0.18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: GRADIENTS[position],
        opacity,
        pointerEvents: 'none',
        zIndex: 50,
        mixBlendMode: 'screen',
      }}
    />
  );
};
