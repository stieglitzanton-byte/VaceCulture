import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { LightLeak } from '../components/LightLeak';
import { BeigeLine } from '../components/BeigeLine';
import { ProgressDots } from '../components/ProgressDots';
import { VaceLogo } from '../components/VaceLogo';
import { meltIn, float, SPRING_APPLE } from '../utils/animations';
import { inter, cormorant } from '../utils/fonts';

export const Scene6Packaged: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floatY = float(frame);

  // Ken Burns: scale 1.0 → 1.05
  const kenBurnsScale = interpolate(frame, [0, 300], [1.0, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Box lid opens
  const lidSp = spring({ frame: Math.max(0, frame - 30), fps, config: SPRING_APPLE });
  const lidScaleY = interpolate(lidSp, [0, 1], [0, 1]);

  // Logo stamps onto box
  const logoSp = spring({ frame: Math.max(0, frame - 60), fps, config: SPRING_APPLE });
  const logoScale = interpolate(logoSp, [0, 1], [1.3, 1]);
  const logoOpacity = interpolate(frame, [60, 78], [0, 1], { extrapolateRight: 'clamp' });
  const stampRot = frame >= 60 && frame <= 75 ? Math.sin((frame - 60) * 1.2) * 1.5 : 0;

  const oneOpacity = interpolate(frame, [90, 108], [0, 1], { extrapolateRight: 'clamp' });
  const lineOpacity = interpolate(frame, [140, 155], [0, 1], { extrapolateRight: 'clamp' });
  const headlineOpacity = interpolate(frame, [165, 185], [0, 1], { extrapolateRight: 'clamp' });
  const sublineOpacity = interpolate(frame, [195, 215], [0, 1], { extrapolateRight: 'clamp' });
  const progressOpacity = interpolate(frame, [215, 230], [0, 1], { extrapolateRight: 'clamp' });

  const globalFade = interpolate(frame, [272, 290], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const boxMelt = meltIn(frame, fps, 15, SPRING_APPLE);
  const copperOpacity = 0.1 + Math.sin(frame / 42) * 0.04;

  return (
    <AbsoluteFill style={{ backgroundColor: '#080808', opacity: globalFade }}>
      {/* Background photo */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Img
          src={staticFile('images/carousel-4.JPEG')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: `scale(${kenBurnsScale})`,
            filter: 'saturate(0.75)',
          }}
        />
      </AbsoluteFill>

      {/* Dark overlay */}
      <AbsoluteFill style={{ background: 'rgba(8,8,8,0.7)' }} />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(8,8,8,0.9) 100%)',
          pointerEvents: 'none',
        }}
      />

      <LightLeak position="bottom" startFrame={0} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 64,
        }}
      >
        {/* Premium box */}
        <div
          style={{
            opacity: boxMelt.opacity as number,
            transform: `${boxMelt.transform} translateY(${floatY}px)`,
            filter: boxMelt.filter as string,
            position: 'relative',
          }}
        >
          {/* Copper glow */}
          <div
            style={{
              position: 'absolute',
              inset: -60,
              borderRadius: '50%',
              background: `radial-gradient(ellipse, rgba(200,184,154,${copperOpacity}) 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Box body */}
          <div
            style={{
              position: 'relative',
              width: 280,
              height: 200,
              background: '#080808',
              border: '1px solid #c8b89a',
              borderRadius: 6,
              overflow: 'visible',
            }}
          >
            {/* "1 of 1" side label */}
            <div
              style={{
                position: 'absolute',
                left: -1,
                top: '50%',
                transform: 'translateY(-50%)',
                writingMode: 'vertical-rl',
                opacity: oneOpacity,
                fontFamily: cormorant,
                fontStyle: 'italic',
                fontSize: 18,
                fontWeight: 300,
                color: '#c8b89a',
                letterSpacing: '0.15em',
                padding: '10px 8px',
              }}
            >
              1 of 1
            </div>

            {/* Lid */}
            <div
              style={{
                position: 'absolute',
                top: -54,
                left: -1,
                right: -1,
                height: 54,
                background: '#111111',
                border: '1px solid #c8b89a',
                borderRadius: '6px 6px 0 0',
                transformOrigin: 'bottom center',
                transform: `scaleY(${lidScaleY})`,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  opacity: logoOpacity,
                  transform: `scale(${logoScale}) rotate(${stampRot}deg)`,
                }}
              >
                <VaceLogo size={100} />
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ opacity: lineOpacity, marginBottom: 20 }}>
            <BeigeLine startFrame={140} maxWidth={80} />
          </div>

          <div
            style={{
              opacity: headlineOpacity,
              fontFamily: cormorant,
              fontStyle: 'italic',
              fontSize: 64,
              fontWeight: 300,
              color: '#f5f5f5',
              marginBottom: 16,
              letterSpacing: '0.01em',
            }}
          >
            Yours alone.
          </div>

          <div
            style={{
              opacity: sublineOpacity,
              fontFamily: inter,
              fontWeight: 100,
              fontSize: 18,
              letterSpacing: '0.4em',
              color: '#888888',
              textTransform: 'uppercase',
            }}
          >
            WORLDWIDE. ONE OF ONE.
          </div>
        </div>

        <div style={{ opacity: progressOpacity }}>
          <ProgressDots activeStep={4} startFrame={215} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
