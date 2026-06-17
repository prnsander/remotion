import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { IntroScene } from "../scenes/IntroScene";
import { PainScene } from "../scenes/PainScene";
import { RevealScene } from "../scenes/RevealScene";
import { DemoScene } from "../scenes/DemoScene";

export interface LocalesyLaunchProps {
  [key: string]: unknown;
}

export const LocalesyLaunch: React.FC<LocalesyLaunchProps> = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={80}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({
            config: { damping: 18, stiffness: 80, mass: 0.6 },
            durationInFrames: 14,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={140}>
          <PainScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: 12,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={80}>
          <RevealScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: 12,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={360}>
          <DemoScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
