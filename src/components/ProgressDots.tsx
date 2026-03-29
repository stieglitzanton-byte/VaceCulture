import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { inter } from '../utils/fonts';
import { SPRING_SOFT } from '../utils/animations';

interface ProgressDotsProps {
  activeStep: number;
  label?: string;
  startFrame?: number;
}

const LABELS = ['Confirmed', 'Sourcing', 'Crafting', 'Shipped'];

export const ProgressDots: React.FC<ProgressDotsProps> = ({
  activeStep,
  label,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - startFrame);
  const sp = spring({ frame: f, fps, config: SPRING_SOFT });
  const containerOpacity = interpolate(f, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ opacity: containerOpacity }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {[1, 2, 3, 4].map((step, i) => {
          const isActive = step <= activeStep;
          const isCurrent = step === activeStep;
          const dotSize = isCurrent ? 10 * sp + 8 * (1 - sp) : 8;
          const dotColor = isActive ? '#c8b89a' : '#2d2d2d';

          return (
            <React.Fragment key={step}>
              <div
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: '50%',
                  background: dotColor,
                  boxShadow: isActive ? '0 0 8px rgba(200,184,154,0.4)' : 'none',
                  flexShrink: 0,
                }}
              />
              {i < 3 && (
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: step < activeStep ? '#c8b89a' : '#2d2d2d',
                    opacity: step < activeStep ? 0.5 : 1,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 8,
          fontFamily: inter,
          fontWeight: 100,
          fontSize: 10,
          color: '#555',
          letterSpacing: '0.06em',
        }}
      >
        {label ?? `Step ${activeStep} of 4  ·  ${LABELS[activeStep - 1]}`}
      </div>
    </div>
  );
};
