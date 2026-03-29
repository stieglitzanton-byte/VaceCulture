import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { LightLeak } from '../components/LightLeak';
import { FloatingCard } from '../components/FloatingCard';
import { TypeWriter } from '../components/TypeWriter';
import { ShimmerButton } from '../components/ShimmerButton';
import { VaceLogo } from '../components/VaceLogo';
import { meltIn, SPRING_APPLE } from '../utils/animations';
import { inter } from '../utils/fonts';

export const Scene2Vision: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoMelt = meltIn(frame, fps, 5, SPRING_APPLE);
  const logoY = interpolate(frame, [5, 45], [0, -820], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardFade = interpolate(frame, [270, 290], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#080808' }}>
      <LightLeak position="bottom" startFrame={0} />

      {/* Logo — slides to top */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, calc(-50% + ${logoY}px)) ${logoMelt.transform}`,
          opacity: logoMelt.opacity as number,
          filter: logoMelt.filter as string,
          zIndex: 10,
        }}
      >
        <VaceLogo size={160} />
      </div>

      {/* Order Card */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: cardFade,
        }}
      >
        <FloatingCard
          delay={20}
          style={{
            width: 860,
            padding: '60px 64px',
            position: 'relative',
          }}
        >
          {/* Highlight top line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: 'rgba(255,255,255,0.08)',
            }}
          />

          <p
            style={{
              fontFamily: inter,
              fontWeight: 100,
              fontSize: 18,
              letterSpacing: '0.4em',
              color: '#888888',
              textTransform: 'uppercase',
              margin: '0 0 48px 0',
            }}
          >
            CUSTOM ORDER — 001
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
            <TypeWriter
              label="YOUR VIBE"
              text="Dark & Distressed"
              delay={65}
              labelFontSize={18}
              fontSize={26}
            />
            <TypeWriter
              label="CUSTOMIZATION"
              text="Hand-Placed Pearls + Raw Cut"
              delay={115}
              labelFontSize={18}
              fontSize={26}
            />
            <TypeWriter
              label="BASE COLOR"
              text="Faded Obsidian Black"
              delay={170}
              labelFontSize={18}
              fontSize={26}
            />
          </div>

          <div style={{ marginTop: 52, display: 'flex', justifyContent: 'center' }}>
            <ShimmerButton label="SUBMIT YOUR VISION →" startFrame={220} />
          </div>
        </FloatingCard>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
