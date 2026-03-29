import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { LightLeak } from '../components/LightLeak';
import { VaceLogo } from '../components/VaceLogo';
import { meltIn, SPRING_APPLE } from '../utils/animations';
import { inter } from '../utils/fonts';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoMelt = meltIn(frame, fps, 12, SPRING_APPLE);
  // Text 25 frames after logo
  const textMelt = meltIn(frame, fps, 60, SPRING_APPLE);

  const globalFade = interpolate(frame, [95, 112], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glowOpacity = 0.14 + Math.sin(frame / 40) * 0.05;
  const sheenX = ((frame % 120) / 120) * 420 - 100;

  return (
    <AbsoluteFill style={{ backgroundColor: '#080808' }}>
      <LightLeak position="top" startFrame={0} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: globalFade,
        }}
      >
        {/* Warm glow */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, rgba(200,184,154,${glowOpacity}) 0%, transparent 70%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            opacity: logoMelt.opacity as number,
            transform: logoMelt.transform as string,
            filter: logoMelt.filter as string,
          }}
        >
          <VaceLogo size={280} />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: sheenX,
              width: 100,
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Subtext */}
        <div
          style={{
            marginTop: 56,
            opacity: textMelt.opacity as number,
            transform: textMelt.transform as string,
            filter: textMelt.filter as string,
          }}
        >
          <p
            style={{
              fontFamily: inter,
              fontWeight: 100,
              fontSize: 18,
              letterSpacing: '0.4em',
              color: '#c8b89a',
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0,
            }}
          >
            HANDCRAFTED IN GERMANY
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
