import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { SPRING_SNAPPY } from '../utils/animations';

interface BeigeLineProps {
  startFrame?: number;
  maxWidth?: number;
}

export const BeigeLine: React.FC<BeigeLineProps> = ({ startFrame = 0, maxWidth = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - startFrame);
  const sp = spring({ frame: f, fps, config: SPRING_SNAPPY });
  const width = sp * maxWidth;

  return (
    <div
      style={{
        width,
        height: 1,
        background: '#c8b89a',
        margin: '0 auto',
        transformOrigin: 'center',
      }}
    />
  );
};
