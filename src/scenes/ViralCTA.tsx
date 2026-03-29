import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { VaceLogo } from '../components/VaceLogo';
import { inter } from '../utils/fonts';

export const ViralCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo slides down from above
  const logoSp = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { stiffness: 100, damping: 16 },
  });
  const logoOpacity = interpolate(logoSp, [0, 0.6], [0, 1], { extrapolateRight: 'clamp' });
  const logoY = interpolate(logoSp, [0, 1], [-60, 0]);

  // CTA button entrance
  const ctaSp = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { stiffness: 200, damping: 20 },
  });
  const ctaScale = interpolate(ctaSp, [0, 1], [0.5, 1]);
  const ctaOpacity = interpolate(ctaSp, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });

  // Perpetual bounce (absolute sin = never goes below start)
  const bounceY = frame > 28 ? Math.abs(Math.sin((frame - 28) * 0.18)) * -24 : 0;

  // Glow pulse on CTA button
  const glowSize = 20 + Math.sin(frame * 0.22) * 9;

  // Sub-text stagger
  const subFade = interpolate(frame, [38, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #000 0%, #0d0d0d 100%)',
      }}
    >
      {/* Top: VACE Logo */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 160,
          opacity: logoOpacity,
          transform: `translateY(${logoY}px)`,
        }}
      >
        <VaceLogo size={200} />
      </AbsoluteFill>

      {/* Center copy */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontWeight: 300,
            fontSize: 24,
            color: '#666',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginBottom: 40,
            opacity: subFade,
          }}
        >
          VACE CULTURE
        </div>

        <div
          style={{
            fontFamily: inter,
            fontWeight: 900,
            fontSize: 76,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.0,
            textAlign: 'center',
            opacity: subFade,
          }}
        >
          Sicher dir
          <br />
          <span style={{ color: '#c8b89a' }}>deinen Slot</span>
        </div>
      </AbsoluteFill>

      {/* Bottom: CTA button + handle */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 180,
        }}
      >
        <div
          style={{
            transform: `scale(${ctaScale}) translateY(${bounceY}px)`,
            opacity: ctaOpacity,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 100,
              padding: '28px 80px',
              boxShadow: `0 0 ${glowSize}px rgba(255,255,255,0.22)`,
            }}
          >
            <div
              style={{
                fontFamily: inter,
                fontWeight: 900,
                fontSize: 44,
                color: '#000',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                textAlign: 'center',
              }}
            >
              DM &apos;FLANNEL&apos; NOW
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 32,
            fontFamily: inter,
            fontWeight: 400,
            fontSize: 26,
            color: '#555',
            textAlign: 'center',
            opacity: subFade,
            letterSpacing: '0.06em',
          }}
        >
          @vaceculture · Instagram / TikTok
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
