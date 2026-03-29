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

// Replace these with your own high-res flatlay images
const FLANNEL_IMAGES = [
  'images/carousel-1.webp',
  'images/carousel-2.webp',
  'images/carousel-3.webp',
  'images/carousel-4.JPEG',
];

const CUT_DURATION = 45; // 1.5s per image at 30fps

const TOP_TEXTS = [
  'CLEANEST\nCUSTOM FLANNELS',
  'HANDCRAFTED\nIN GERMANY',
  'EVERY PIECE\nIS UNIQUE',
  'LIMITED\nDROP',
];

const BOTTOM_TAGS = ['@vaceculture', 'Est. 2024', 'Made for real ones', '1 slot left'];

export const ViralCore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cutIndex = Math.min(Math.floor(frame / CUT_DURATION), 3);
  const localFrame = frame % CUT_DURATION;

  // Slow zoom per image: 1.0 → 1.12
  const zoomScale = interpolate(localFrame, [0, CUT_DURATION], [1.0, 1.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Short pop on each hard cut
  const entranceSp = spring({
    frame: localFrame,
    fps,
    config: { stiffness: 300, damping: 30 },
  });
  const combinedScale = interpolate(entranceSp, [0, 1], [1.08, 1]) * zoomScale;

  // Text fade in / out within each cut
  const textIn = interpolate(localFrame, [4, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textOut = interpolate(localFrame, [36, 44], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textOpacity = Math.min(textIn, textOut);

  const isLastCut = cutIndex === 3;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Flannel image — hard cut on each cutIndex change */}
      <AbsoluteFill style={{ transform: `scale(${combinedScale})` }}>
        <Img
          src={staticFile(FLANNEL_IMAGES[cutIndex])}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.72) 100%)',
          }}
        />
      </AbsoluteFill>

      {/* Top headline */}
      <AbsoluteFill
        style={{
          padding: '120px 60px 0',
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontWeight: 900,
            fontSize: 64,
            lineHeight: 1.05,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 24px rgba(0,0,0,0.85)',
            whiteSpace: 'pre-line',
          }}
        >
          {TOP_TEXTS[cutIndex]}
        </div>
      </AbsoluteFill>

      {/* Bottom tag */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0 60px 160px',
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontWeight: 700,
            fontSize: 36,
            color: isLastCut ? '#ff3b30' : '#c8b89a',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textShadow: '0 2px 16px rgba(0,0,0,0.9)',
          }}
        >
          {BOTTOM_TAGS[cutIndex]}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
