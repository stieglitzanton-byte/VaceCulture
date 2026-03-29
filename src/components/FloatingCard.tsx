import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { float, meltIn } from '../utils/animations';

interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
  floatSpeed?: number;
  style?: React.CSSProperties;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const melt = meltIn(frame, fps, delay);
  const floatY = float(frame);

  return (
    <div
      style={{
        background: 'rgba(16,16,16,0.97)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow:
          '0 0 60px rgba(200,184,154,0.06), inset 0 1px 0 rgba(255,255,255,0.08)',
        borderRadius: 16,
        opacity: melt.opacity,
        transform: `${melt.transform} translateY(${floatY}px)`,
        filter: melt.filter,
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
