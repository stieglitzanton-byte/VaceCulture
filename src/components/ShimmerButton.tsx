import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { inter } from '../utils/fonts';

interface ShimmerButtonProps {
  label: string;
  startFrame?: number;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  label,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);
  const opacity = interpolate(f, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(f, [0, 20], [0.92, 1], { extrapolateRight: 'clamp' });

  // Shimmer: moves across button every ~90 frames
  const shimmerPos = ((frame % 90) / 90) * 280 - 80;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        opacity,
        transform: `scale(${scale})`,
        overflow: 'hidden',
        borderRadius: 12,
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #c8b89a, #d4a574)',
          padding: '0 40px',
          height: 80,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 12,
          fontFamily: inter,
          fontWeight: 300,
          fontSize: 18,
          color: '#080808',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>

      {/* Shimmer sweep */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: shimmerPos,
          width: 80,
          height: '100%',
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
