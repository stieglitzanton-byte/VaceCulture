import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { LightLeak } from '../components/LightLeak';
import { BeigeLine } from '../components/BeigeLine';
import { VaceLogo } from '../components/VaceLogo';
import { meltIn, float, SPRING_APPLE } from '../utils/animations';
import { inter, cormorant } from '../utils/fonts';

export const Scene8Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const contentStart = 27;

  const logoMelt = meltIn(frame, fps, contentStart, SPRING_APPLE);
  const floatY = float(frame);

  const copperOpacity = 0.15 + Math.sin((frame - contentStart) / 75) * 0.06;
  const sheenX = ((frame % 150) / 150) * 480 - 120;

  // Staggered elements — each 25 frames apart
  const headlineOpacity = interpolate(frame, [95, 118], [0, 1], { extrapolateRight: 'clamp' });
  const urlOpacity = interpolate(frame, [145, 168], [0, 1], { extrapolateRight: 'clamp' });
  const pillsOpacity = interpolate(frame, [190, 213], [0, 1], { extrapolateRight: 'clamp' });
  const pillPulse = 1 + Math.sin(frame / 25) * 0.02;

  const breathOpacity = interpolate(frame, [340, 360], [1, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#080808', opacity: breathOpacity }}>
      <LightLeak position="top" startFrame={12} />
      <LightLeak position="bottom" startFrame={12} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 48,
        }}
      >
        {/* Logo with glow + sheen */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            opacity: logoMelt.opacity as number,
            transform: `${logoMelt.transform} translateY(${floatY}px)`,
            filter: logoMelt.filter as string,
          }}
        >
          {/* Copper glow */}
          <div
            style={{
              position: 'absolute',
              inset: -80,
              borderRadius: '50%',
              background: `radial-gradient(ellipse, rgba(200,184,154,${copperOpacity}) 0%, transparent 65%)`,
              pointerEvents: 'none',
            }}
          />

          <VaceLogo size={320} />

          {/* Sheen sweep */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: sheenX,
              width: 120,
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Headline */}
        <div style={{ textAlign: 'center', opacity: headlineOpacity }}>
          <div style={{ marginBottom: 24 }}>
            <BeigeLine startFrame={85} maxWidth={80} />
          </div>
          <div
            style={{
              fontFamily: cormorant,
              fontStyle: 'italic',
              fontSize: 72,
              fontWeight: 300,
              color: '#f5f5f5',
              lineHeight: 1.1,
              letterSpacing: '0.01em',
            }}
          >
            Be Part of It.
          </div>
        </div>

        {/* URL */}
        <div style={{ opacity: urlOpacity, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: inter,
              fontWeight: 100,
              fontSize: 18,
              letterSpacing: '0.4em',
              color: '#c8b89a',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            VACECULTURE.COM
          </p>
        </div>

        {/* Action pills */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            opacity: pillsOpacity,
            transform: `scale(${pillPulse})`,
          }}
        >
          {['♡  FOLLOW', '↑  SHARE'].map((label) => (
            <div
              key={label}
              style={{
                border: '1px solid rgba(200,184,154,0.4)',
                background: 'rgba(200,184,154,0.04)',
                padding: '20px 40px',
                borderRadius: 100,
                fontFamily: inter,
                fontWeight: 100,
                fontSize: 18,
                color: '#c8b89a',
                letterSpacing: '0.4em',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
