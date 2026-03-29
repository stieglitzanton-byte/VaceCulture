import { interpolate, spring } from 'remotion';

// Apple Keynote / iPhone product video spring — used for ALL animations
export const SPRING_APPLE = { stiffness: 55, damping: 16 };
export const SPRING_SOFT = { stiffness: 55, damping: 16 };
export const SPRING_SNAPPY = { stiffness: 55, damping: 16 };
export const SPRING_SLOW = { stiffness: 55, damping: 16 };

// Gentle float — 6px amplitude, slow period
export const float = (frame: number): number =>
  Math.sin(frame / 50) * 6 + Math.sin(frame / 73) * 3;

// Scale intro: 0.92 → 1.0 (subtle, Apple style)
export const meltIn = (
  frame: number,
  fps: number,
  delay = 0,
  config = SPRING_SOFT
): React.CSSProperties => {
  const f = Math.max(0, frame - delay);
  const sp = spring({ frame: f, fps, config });
  return {
    opacity: interpolate(f, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
    transform: `scale(${interpolate(sp, [0, 1], [0.92, 1])})`,
    filter: `blur(${interpolate(f, [0, 20], [8, 0], { extrapolateRight: 'clamp' })}px)`,
  };
};

export const meltOut = (
  frame: number,
  startAt: number,
  duration = 20
): React.CSSProperties => {
  const f = Math.max(0, frame - startAt);
  return {
    opacity: interpolate(f, [0, duration], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    transform: `scale(${interpolate(f, [0, duration], [1, 0.94], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })})`,
    filter: `blur(${interpolate(f, [0, duration], [0, 8], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })}px)`,
  };
};

export const fadeIn = (frame: number, delay = 0, duration = 20): number =>
  interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const fadeOut = (frame: number, startAt: number, duration = 20): number =>
  interpolate(frame, [startAt, startAt + duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
