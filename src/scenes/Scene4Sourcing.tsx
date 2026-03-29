import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';
import { LightLeak } from '../components/LightLeak';
import { ProgressDots } from '../components/ProgressDots';
import { float, SPRING_APPLE } from '../utils/animations';
import { inter, cormorant } from '../utils/fonts';

const PILLS = [
  { label: 'Premium heavyweight flannel', delay: 80 },
  { label: 'Made in Germany', delay: 110 },
  { label: 'Hand-washed & softened', delay: 140 },
];

export const Scene4Sourcing: React.FC = () => {
  const frame = useCurrentFrame();

  // Ken Burns: scale 1.05 → 1.0 over 240 frames
  const kenBurnsScale = interpolate(frame, [0, 240], [1.05, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const numOpacity = interpolate(frame, [120, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const globalFade = interpolate(frame, [220, 238], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const headlineOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#080808', opacity: globalFade }}>
      {/* Background photo with Ken Burns */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Img
          src={staticFile('images/carousel-1.webp')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: `scale(${kenBurnsScale})`,
            filter: 'saturate(0.75)',
          }}
        />
      </AbsoluteFill>

      {/* Dark overlay */}
      <AbsoluteFill
        style={{ background: 'rgba(8,8,8,0.55)' }}
      />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(8,8,8,0.9) 100%)',
          pointerEvents: 'none',
        }}
      />

      <LightLeak position="left" startFrame={0} />

      {/* Background number */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          right: 60,
          fontFamily: cormorant,
          fontStyle: 'italic',
          fontSize: 200,
          fontWeight: 300,
          color: '#c8b89a',
          opacity: numOpacity * 0.12,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        02
      </div>

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
        }}
      >
        {/* Headline */}
        <div
          style={{
            opacity: headlineOpacity,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: inter,
              fontWeight: 100,
              fontSize: 18,
              letterSpacing: '0.25em',
              color: '#888888',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
            }}
          >
            THE MATERIAL
          </p>
          <p
            style={{
              fontFamily: cormorant,
              fontStyle: 'italic',
              fontSize: 64,
              fontWeight: 300,
              color: '#f5f5f5',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Sourced.
          </p>
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          {PILLS.map((pill) => {
            const pillOpacity = interpolate(frame, [pill.delay, pill.delay + 25], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const pillY = interpolate(frame, [pill.delay, pill.delay + 25], [16, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={pill.label}
                style={{
                  opacity: pillOpacity,
                  transform: `translateY(${pillY}px)`,
                  border: '1px solid rgba(200,184,154,0.4)',
                  background: 'rgba(8,8,8,0.7)',
                  padding: '14px 32px',
                  borderRadius: 100,
                  fontFamily: inter,
                  fontWeight: 100,
                  fontSize: 18,
                  color: '#c8b89a',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                }}
              >
                {pill.label}
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div
          style={{
            opacity: interpolate(frame, [180, 200], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <ProgressDots activeStep={2} startFrame={180} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
