import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { inter } from '../utils/fonts';

export const ViralHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flannel explosion: scale 3 → 1 with stiff spring
  const sp = spring({
    frame: Math.max(0, frame - 2),
    fps,
    config: { stiffness: 220, damping: 24 },
  });
  const flannelScale = interpolate(sp, [0, 1], [3, 1]);
  const flannelOpacity = interpolate(frame, [1, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Text entrance
  const textFade = interpolate(frame, [8, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shake: decaying sin from frame 8–22
  const shakeX =
    frame >= 8 && frame <= 22
      ? Math.sin(frame * 3.1) *
        interpolate(frame, [8, 22], [16, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  // Global out fade
  const globalOut = interpolate(frame, [24, 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', opacity: globalOut }}>
      {/* Flannel BG — explodes in */}
      <AbsoluteFill
        style={{
          opacity: flannelOpacity,
          transform: `scale(${flannelScale})`,
        }}
      >
        <Img
          src={staticFile('images/vace-flannel.webp')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)',
          }}
        />
      </AbsoluteFill>

      {/* Hook text */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: textFade,
          transform: `translateX(${shakeX}px)`,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontWeight: 900,
            fontSize: 96,
            lineHeight: 1.05,
            color: '#fff',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            padding: '0 48px',
            textShadow: '0 4px 40px rgba(0,0,0,0.9)',
          }}
        >
          Flannels
          <br />
          sind tot…
          <br />
          <span
            style={{
              color: '#ff3b30',
              display: 'inline-block',
              transform: 'skewX(-4deg)',
            }}
          >
            falsch!
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
