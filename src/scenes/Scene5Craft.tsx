import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';
import { LightLeak } from '../components/LightLeak';
import { DrawOnPath } from '../components/DrawOnPath';
import { ProgressDots } from '../components/ProgressDots';
import { meltIn, SPRING_APPLE } from '../utils/animations';
import { inter, cormorant } from '../utils/fonts';

const NEEDLE_PATH = 'M20 160 Q35 100 60 60 Q75 35 85 20 M85 20 L90 14 M75 22 L92 10 M60 110 Q70 95 85 80';
const PEARL_PATH = 'M40 40 A20 20 0 1 1 39.9 40';
const SCISSOR_PATH =
  'M20 20 L55 55 M20 55 L55 20 M10 15 A8 8 0 1 0 10 16 M65 15 A8 8 0 1 0 65 16 M10 60 A8 8 0 1 0 10 61 M65 60 A8 8 0 1 0 65 61';

const CARDS = [
  {
    title: 'Hand-Stitched',
    subtitle: 'Every seam, placed by hand.',
    path: NEEDLE_PATH,
    pathLength: 280,
    delay: 23,
    drawStart: 50,
    offsetX: -220,
    offsetY: -160,
  },
  {
    title: 'Pearl Customization',
    subtitle: 'Each bead, positioned with intent.',
    path: PEARL_PATH,
    pathLength: 126,
    delay: 50,
    drawStart: 77,
    offsetX: 220,
    offsetY: -160,
  },
  {
    title: 'Raw Distressing',
    subtitle: 'Worn where it matters.',
    path: SCISSOR_PATH,
    pathLength: 260,
    delay: 77,
    drawStart: 104,
    offsetX: 0,
    offsetY: 60,
  },
];

const CraftCard: React.FC<(typeof CARDS)[number]> = ({
  title,
  subtitle,
  path,
  pathLength,
  delay,
  drawStart,
  offsetX,
  offsetY,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const melt = meltIn(frame, fps, delay, SPRING_APPLE);
  // Gentle float with phase offset per card
  const floatY = Math.sin(frame / 50 + delay * 0.08) * 6;

  const fadeOut = interpolate(frame, [330, 352], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) translateY(${floatY}px) ${melt.transform}`,
        opacity: Math.min(melt.opacity as number, fadeOut),
        filter: melt.filter as string,
        background: 'rgba(8,8,8,0.9)',
        border: '1px solid #2a2a2a',
        boxShadow: '0 0 60px rgba(200,184,154,0.05)',
        borderRadius: 20,
        padding: '36px 40px',
        width: 400,
        minHeight: 240,
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <DrawOnPath
          d={path}
          pathLength={pathLength}
          startFrame={drawStart}
          duration={60}
          stroke="#c8b89a"
          strokeWidth={1.5}
          width={80}
          height={80}
          viewBox="0 0 80 80"
        />
      </div>

      <div
        style={{
          fontFamily: inter,
          fontWeight: 300,
          fontSize: 22,
          color: '#f5f5f5',
          marginBottom: 8,
          letterSpacing: '0.02em',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: inter,
          fontWeight: 100,
          fontSize: 14,
          color: '#888888',
          letterSpacing: '0.02em',
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

export const Scene5Craft: React.FC = () => {
  const frame = useCurrentFrame();

  // Ken Burns: left image 1.0→1.05, right image 1.05→1.0
  const kenBurnsLeft = interpolate(frame, [0, 360], [1.0, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const kenBurnsRight = interpolate(frame, [0, 360], [1.05, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const progressOpacity = interpolate(frame, [250, 270], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#080808' }}>
      {/* Left image — carousel-2 */}
      <AbsoluteFill style={{ overflow: 'hidden', right: '50%' }}>
        <Img
          src={staticFile('images/carousel-2.webp')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: `scale(${kenBurnsLeft})`,
            filter: 'saturate(0.75)',
          }}
        />
      </AbsoluteFill>

      {/* Right image — carousel-3 */}
      <AbsoluteFill style={{ overflow: 'hidden', left: '50%' }}>
        <Img
          src={staticFile('images/carousel-3.webp')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: `scale(${kenBurnsRight})`,
            filter: 'saturate(0.75)',
          }}
        />
      </AbsoluteFill>

      {/* Dark overlay on left */}
      <AbsoluteFill style={{ background: 'rgba(8,8,8,0.55)', right: '50%' }} />
      {/* Dark overlay on right */}
      <AbsoluteFill style={{ background: 'rgba(8,8,8,0.55)', left: '50%' }} />

      {/* Beige center divider */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 2,
          background: '#c8b89a',
          transform: 'translateX(-50%)',
          opacity: 0.6,
        }}
      />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(8,8,8,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      <LightLeak position="right" startFrame={8} />

      {CARDS.map((card) => (
        <CraftCard key={card.title} {...card} />
      ))}

      {/* Progress */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: progressOpacity,
        }}
      >
        <ProgressDots activeStep={3} startFrame={250} />
      </div>
    </AbsoluteFill>
  );
};
