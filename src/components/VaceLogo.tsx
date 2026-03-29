import React from 'react';
import { Img, staticFile } from 'remotion';
import { cormorant } from '../utils/fonts';

interface VaceLogoProps {
  size?: number;
  style?: React.CSSProperties;
  iconOnly?: boolean;
}

export const VaceLogo: React.FC<VaceLogoProps> = ({ size = 280, style, iconOnly = false }) => {
  if (iconOnly) {
    // Geometric icon used inside cards — kept as SVG, beige fill
    return (
      <svg
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size, height: size, ...style }}
      >
        <path
          d="M3 0H5V18H3V0ZM13 0H15V18H13V0ZM18 3V5H0V3H18ZM0 15V13H18V15H0Z"
          fill="#c8b89a"
        />
      </svg>
    );
  }

  return (
    <Img
      src={staticFile('images/logo.png')}
      style={{
        width: size,
        height: 'auto',
        filter: 'invert(1) brightness(1)',
        display: 'block',
        ...style,
      }}
    />
  );
};
