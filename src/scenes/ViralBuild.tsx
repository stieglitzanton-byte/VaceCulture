import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { inter } from '../utils/fonts';

const PARTICLES = [
  { x: 120, y: 400, sx: 40, sy: 55 },
  { x: 900, y: 700, sx: 60, sy: 35 },
  { x: 540, y: 1200, sx: 33, sy: 70 },
  { x: 200, y: 1550, sx: 80, sy: 45 },
  { x: 850, y: 1100, sx: 45, sy: 55 },
  { x: 720, y: 280, sx: 55, sy: 40 },
];

export const ViralBuild: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Price entrance spring
  const priceSp = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { stiffness: 180, damping: 20 },
  });
  const priceScale = interpolate(priceSp, [0, 1], [0, 1]);

  // Sub content entrance
  const subSp = spring({
    frame: Math.max(0, frame - 28),
    fps,
    config: { stiffness: 140, damping: 18 },
  });
  const subOpacity = interpolate(subSp, [0, 0.6], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Pulse on price after entrance settles
  const pulse = frame > 40 ? 1 + Math.sin(frame * 0.18) * 0.025 : 1;

  // Urgency badge flash in
  const badgeFade = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scene out fade
  const globalOut = interpolate(frame, [135, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #0a0a0a 0%, #111 100%)',
        opacity: globalOut,
      }}
    >
      {/* Floating particles */}
      {PARTICLES.map((p, i) => {
        const px = p.x + Math.sin(frame / p.sx + i * 1.4) * 60;
        const py = p.y + Math.cos(frame / p.sy + i * 0.8) * 80;
        const op = 0.06 + Math.sin(frame / 28 + i * 1.8) * 0.03;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: px,
              top: py,
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: '#c8b89a',
              opacity: op,
            }}
          />
        );
      })}

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* "This week only" label */}
        <div
          style={{
            fontFamily: inter,
            fontWeight: 700,
            fontSize: 28,
            color: '#c8b89a',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: 32,
            opacity: subOpacity,
          }}
        >
          this week only
        </div>

        {/* Price — spring + pulse */}
        <div
          style={{
            fontFamily: inter,
            fontWeight: 900,
            fontSize: 180,
            color: '#fff',
            lineHeight: 0.9,
            letterSpacing: '-0.05em',
            transform: `scale(${priceScale * pulse})`,
            textShadow: '0 0 80px rgba(255,255,255,0.12)',
          }}
        >
          €79
        </div>

        {/* Red divider */}
        <div
          style={{
            width: 120,
            height: 2,
            background: '#ff3b30',
            marginTop: 32,
            marginBottom: 32,
            opacity: subOpacity,
          }}
        />

        {/* Product name */}
        <div
          style={{
            fontFamily: inter,
            fontWeight: 700,
            fontSize: 44,
            color: '#e8e8e8',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textAlign: 'center',
            opacity: subOpacity,
          }}
        >
          Custom Flannel
        </div>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 300,
            fontSize: 30,
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            marginTop: 14,
            opacity: subOpacity,
          }}
        >
          Handcrafted · Germany
        </div>

        {/* Urgency badge */}
        <div
          style={{
            marginTop: 56,
            background: '#ff3b30',
            borderRadius: 100,
            padding: '18px 52px',
            opacity: badgeFade,
          }}
        >
          <div
            style={{
              fontFamily: inter,
              fontWeight: 800,
              fontSize: 30,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            1 Slot left this week
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
