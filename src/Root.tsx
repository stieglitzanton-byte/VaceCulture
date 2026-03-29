import React from 'react';
import { AbsoluteFill, Composition, Series } from 'remotion';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Vision } from './scenes/Scene2Vision';
import { Scene3Confirmed } from './scenes/Scene3Confirmed';
import { Scene4Sourcing } from './scenes/Scene4Sourcing';
import { Scene5Craft } from './scenes/Scene5Craft';
import { Scene6Packaged } from './scenes/Scene6Packaged';
import { Scene7Transit } from './scenes/Scene7Transit';
import { Scene8Reveal } from './scenes/Scene8Reveal';
import { ViralHook } from './scenes/ViralHook';
import { ViralCore } from './scenes/ViralCore';
import { ViralBuild } from './scenes/ViralBuild';
import { ViralCTA } from './scenes/ViralCTA';

const FPS = 60;
const WIDTH = 1080;
const HEIGHT = 1920;
const TOTAL_FRAMES = 2100; // 35s @ 60fps

const VACEStoryVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#080808' }}>
      <Series>
        <Series.Sequence durationInFrames={120} style={{ backgroundColor: '#080808' }}>
          <Scene1Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300} style={{ backgroundColor: '#080808' }}>
          <Scene2Vision />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180} style={{ backgroundColor: '#080808' }}>
          <Scene3Confirmed />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240} style={{ backgroundColor: '#080808' }}>
          <Scene4Sourcing />
        </Series.Sequence>
        <Series.Sequence durationInFrames={360} style={{ backgroundColor: '#080808' }}>
          <Scene5Craft />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300} style={{ backgroundColor: '#080808' }}>
          <Scene6Packaged />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240} style={{ backgroundColor: '#080808' }}>
          <Scene7Transit />
        </Series.Sequence>
        <Series.Sequence durationInFrames={360} style={{ backgroundColor: '#080808' }}>
          <Scene8Reveal />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

const VIRAL_FPS = 30;
const VIRAL_FRAMES = 450; // 15s @ 30fps

const VaceViralDrop: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: '#000' }}>
    <Series>
      <Series.Sequence durationInFrames={30}>
        <ViralHook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180}>
        <ViralCore />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <ViralBuild />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90}>
        <ViralCTA />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VACEStoryVideo"
        component={VACEStoryVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="VaceViralDrop"
        component={VaceViralDrop}
        durationInFrames={VIRAL_FRAMES}
        fps={VIRAL_FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
    </>
  );
};
