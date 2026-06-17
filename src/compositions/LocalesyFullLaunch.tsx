import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { CliScene } from "../scenes/CliScene";
import { PainScene2 } from "../scenes/PainScene2";
import { DashboardScene } from "../scenes/DashboardScene";
import { AITranslateScene } from "../scenes/AITranslateScene";
import { GitScene } from "../scenes/GitScene";
import { FeaturesScene } from "../scenes/FeaturesScene";
import { BrandScene } from "../scenes/BrandScene";
import { CTAScene } from "../scenes/CTAScene";

export interface LocalesyFullLaunchProps {
  [key: string]: unknown;
}

const SCENES: { component: React.FC; duration: number }[] = [
  { component: CliScene, duration: 90 },
  { component: PainScene2, duration: 120 },
  { component: DashboardScene, duration: 150 },
  { component: AITranslateScene, duration: 150 },
  { component: GitScene, duration: 120 },
  { component: FeaturesScene, duration: 120 },
  { component: BrandScene, duration: 90 },
  { component: CTAScene, duration: 120 },
];

const transition = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={springTiming({ config: { damping: 200 }, durationInFrames: 12 })}
  />
);

export const LocalesyFullLaunch: React.FC<LocalesyFullLaunchProps> = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <TransitionSeries>
        {SCENES.map(({ component: Scene, duration }, i) => (
          <React.Fragment key={i}>
            {i > 0 && transition}
            <TransitionSeries.Sequence durationInFrames={duration}>
              <Scene />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
