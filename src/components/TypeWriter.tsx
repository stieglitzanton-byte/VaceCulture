import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { inter } from '../utils/fonts';

interface TypeWriterProps {
  label: string;
  text: string;
  delay?: number;
  speed?: number;
  labelFontSize?: number;
  fontSize?: number;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  label,
  text,
  delay = 0,
  speed = 0.7,
  labelFontSize = 18,
  fontSize = 24,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);
  const charsToShow = Math.floor(f * speed);
  const visible = text.slice(0, charsToShow);
  const progress = Math.min(1, charsToShow / text.length);
  const cursorVisible = charsToShow < text.length && Math.sin(frame / 8) > 0;
  const labelOpacity = interpolate(f, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          fontFamily: inter,
          fontWeight: 100,
          fontSize: labelFontSize,
          letterSpacing: '0.4em',
          color: '#888888',
          marginBottom: 10,
          opacity: labelOpacity,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>

      <div style={{ position: 'relative', paddingBottom: 10 }}>
        <span
          style={{
            fontFamily: inter,
            fontWeight: 300,
            fontSize: fontSize,
            color: '#f5f5f5',
            letterSpacing: '0.02em',
          }}
        >
          {visible}
          {cursorVisible && (
            <span style={{ color: '#c8b89a', marginLeft: 2 }}>|</span>
          )}
        </span>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: `${progress * 100}%`,
            height: 1,
            background: 'linear-gradient(90deg, #c8b89a, #d4a574)',
          }}
        />
      </div>
    </div>
  );
};
