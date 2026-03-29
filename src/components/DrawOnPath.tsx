import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface DrawOnPathProps {
  d: string;
  pathLength: number;
  startFrame?: number;
  duration?: number;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}

export const DrawOnPath: React.FC<DrawOnPathProps> = ({
  d,
  pathLength,
  startFrame = 0,
  duration = 60,
  stroke = '#c8b89a',
  strokeWidth = 1.5,
  width = 80,
  height = 80,
  viewBox = '0 0 80 80',
  fill = 'none',
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);
  const progress = interpolate(f, [0, duration], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const offset = pathLength * (1 - progress);

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={offset}
      />
    </svg>
  );
};
