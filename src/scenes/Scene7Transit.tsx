import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { meltIn, SPRING_APPLE } from '../utils/animations';
import { inter } from '../utils/fonts';

const ROUTE_LENGTH = 740;

export const Scene7Transit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const contentStart = 8;
  const cardMelt = meltIn(frame, fps, contentStart, SPRING_APPLE);
  const cardFade = interpolate(frame, [215, 230], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Route draw-on
  const routeProgress = interpolate(frame, [80, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const routeOffset = ROUTE_LENGTH * (1 - routeProgress);

  // Destination dot pulse
  const pulseSp = spring({
    frame: (frame - 170) % 60,
    fps,
    config: { stiffness: 200, damping: 20 },
  });
  const pulseScale = frame >= 170 ? 1 + pulseSp * 0.4 : 1;
  const pulseGlow = frame >= 170 ? 0.6 : 0;

  const packageX = Math.sin(frame / 25) * 8;

  const labelOpacity = interpolate(frame, [contentStart, contentStart + 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const exclusiveOpacity = interpolate(frame, [180, 200], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#080808' }}>
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: Math.min(cardMelt.opacity as number, cardFade),
        }}
      >
        {/* Tracking card */}
        <div
          style={{
            background: '#111111',
            border: '1px solid #2a2a2a',
            boxShadow: '0 0 80px rgba(200,184,154,0.05)',
            borderRadius: 24,
            width: 860,
            padding: '60px 64px',
            transform: cardMelt.transform as string,
            filter: cardMelt.filter as string,
            position: 'relative',
          }}
        >
          {/* Copper glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 24,
              background: 'radial-gradient(ellipse at 50% 100%, rgba(200,184,154,0.06) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginBottom: 48,
              opacity: labelOpacity,
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 28 28"
              fill="none"
              style={{ transform: `translateX(${packageX}px)` }}
            >
              <rect x="4" y="10" width="20" height="14" rx="2" stroke="#c8b89a" strokeWidth="1.2" />
              <path d="M4 14 L14 10 L24 14" stroke="#c8b89a" strokeWidth="1.2" />
              <path d="M14 10 L14 24" stroke="rgba(200,184,154,0.4)" strokeWidth="1" />
              <path d="M10 6 L14 10 L18 6" stroke="#c8b89a" strokeWidth="1.2" strokeLinecap="round" />
            </svg>

            <p
              style={{
                fontFamily: inter,
                fontWeight: 100,
                fontSize: 18,
                letterSpacing: '0.25em',
                color: '#c8b89a',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              IN TRANSIT
            </p>
          </div>

          {/* Route */}
          <div style={{ position: 'relative', marginBottom: 40 }}>
            <svg
              width="100%"
              height="50"
              viewBox="0 0 780 50"
              fill="none"
              style={{ overflow: 'visible' }}
            >
              <line
                x1="24"
                y1="25"
                x2="756"
                y2="25"
                stroke="#2a2a2a"
                strokeWidth="1"
                strokeDasharray={ROUTE_LENGTH}
                strokeDashoffset={routeOffset}
              />
              <circle cx="24" cy="25" r="6" fill="#c8b89a" />
              <circle
                cx="390"
                cy="25"
                r="5"
                fill="none"
                stroke={routeProgress > 0.5 ? '#c8b89a' : '#2a2a2a'}
                strokeWidth="1.5"
              />
              <circle
                cx="756"
                cy="25"
                r={5 * pulseScale}
                fill="none"
                stroke={routeProgress > 0.95 ? '#c8b89a' : '#2a2a2a'}
                strokeWidth="1.5"
                opacity={routeProgress > 0.95 ? 1 : 0.4}
                style={{
                  filter: frame >= 170 ? `drop-shadow(0 0 8px rgba(200,184,154,${pulseGlow}))` : 'none',
                }}
              />
            </svg>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginTop: 14,
                opacity: labelOpacity,
              }}
            >
              <div
                style={{
                  fontFamily: inter,
                  fontWeight: 100,
                  fontSize: 18,
                  color: '#888888',
                  letterSpacing: '0.05em',
                }}
              >
                Atelier, DE
              </div>

              {/* Center: On its way */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: inter,
                    fontWeight: 300,
                    fontSize: 22,
                    color: '#c8b89a',
                    letterSpacing: '0.05em',
                    marginBottom: 4,
                  }}
                >
                  On its way
                </div>
                <div
                  style={{
                    fontFamily: inter,
                    fontWeight: 100,
                    fontSize: 14,
                    color: '#888888',
                    letterSpacing: '0.05em',
                  }}
                >
                  From our atelier to your hands
                </div>
              </div>

              <div
                style={{
                  fontFamily: inter,
                  fontWeight: 100,
                  fontSize: 18,
                  color: '#888888',
                  letterSpacing: '0.05em',
                }}
              >
                Your hands
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: '#2a2a2a', marginBottom: 32 }} />

          <div style={{ opacity: exclusiveOpacity, textAlign: 'center' }}>
            <p
              style={{
                fontFamily: inter,
                fontWeight: 100,
                fontSize: 18,
                color: '#c8b89a',
                letterSpacing: '0.15em',
                margin: 0,
              }}
            >
              Exclusively crafted for you.
            </p>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
