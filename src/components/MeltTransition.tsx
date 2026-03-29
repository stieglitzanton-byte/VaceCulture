import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { meltIn, meltOut } from '../utils/animations';

interface MeltTransitionProps {
  children: React.ReactNode;
  inDelay?: number;
  outStart?: number;
  style?: React.CSSProperties;
}

export const MeltTransition: React.FC<MeltTransitionProps> = ({
  children,
  inDelay = 0,
  outStart,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inStyle = meltIn(frame, fps, inDelay);
  const outStyle = outStart != null ? meltOut(frame, outStart) : {};

  const opacity =
    outStart != null
      ? Math.min(Number(inStyle.opacity), Number(outStyle.opacity))
      : inStyle.opacity;

  return (
    <div
      style={{
        opacity: opacity as number,
        transform: inStyle.transform,
        filter: inStyle.filter,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
