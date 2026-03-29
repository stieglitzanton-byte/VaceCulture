import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { ProgressDots } from '../components/ProgressDots';
import { DrawOnPath } from '../components/DrawOnPath';
import { VaceLogo } from '../components/VaceLogo';
import { meltIn, fadeIn, SPRING_APPLE } from '../utils/animations';
import { inter } from '../utils/fonts';

const CIRCLE_PATH = 'M56 28 A28 28 0 1 1 55.99 28';
const TICK_PATH = 'M18 28 L25 36 L40 20';

export const Scene3Confirmed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const contentStart = 8;

  const cardMelt = meltIn(frame, fps, contentStart, SPRING_APPLE);
  const cardFade = interpolate(frame, [155, 170], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const logoOpacity = fadeIn(frame, contentStart, 15);
  const nameOpacity = fadeIn(frame, contentStart + 8, 15);
  const subtitleOpacity = fadeIn(frame, contentStart + 16, 15);
  const checkOpacity = interpolate(frame, [contentStart, contentStart + 10], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const progressOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#080808' }}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          opacity: Math.min(cardMelt.opacity as number, cardFade),
        }}
      >
        <div
          style={{
            background: '#111111',
            border: '1px solid #2a2a2a',
            boxShadow: '0 0 80px rgba(200,184,154,0.05)',
            borderRadius: 24,
            width: 860,
            padding: '48px 60px',
            transform: cardMelt.transform as string,
            filter: cardMelt.filter as string,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 12,
            }}
          >
            <div style={{ opacity: logoOpacity }}>
              <VaceLogo iconOnly size={28} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: inter,
                  fontWeight: 300,
                  fontSize: 22,
                  color: '#f5f5f5',
                  opacity: nameOpacity,
                }}
              >
                VACE Culture
              </div>
              <div
                style={{
                  fontFamily: inter,
                  fontWeight: 100,
                  fontSize: 18,
                  color: '#888888',
                  marginTop: 4,
                  opacity: subtitleOpacity,
                }}
              >
                Your vision has been received.
              </div>
            </div>
            <div
              style={{
                marginLeft: 'auto',
                fontFamily: inter,
                fontWeight: 100,
                fontSize: 16,
                color: '#555',
                opacity: subtitleOpacity,
              }}
            >
              Just now
            </div>
          </div>

          <div style={{ height: 1, background: '#2a2a2a', margin: '24px 0' }} />

          {/* Checkmark */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 36,
              opacity: checkOpacity,
            }}
          >
            <svg width="72" height="72" viewBox="0 0 56 56" fill="none">
              <DrawOnPath
                d={CIRCLE_PATH}
                pathLength={176}
                startFrame={contentStart + 8}
                duration={40}
                stroke="#c8b89a"
                strokeWidth={1.5}
                width={56}
                height={56}
                viewBox="0 0 56 56"
              />
              <DrawOnPath
                d={TICK_PATH}
                pathLength={32}
                startFrame={contentStart + 40}
                duration={20}
                stroke="#c8b89a"
                strokeWidth={1.5}
                width={56}
                height={56}
                viewBox="0 0 56 56"
              />
            </svg>
          </div>

          <div style={{ opacity: progressOpacity }}>
            <ProgressDots activeStep={1} startFrame={100} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
