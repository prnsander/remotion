import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { HeroV2Scene } from "../scenes/HeroV2Scene";
import { PainV2Scene } from "../scenes/PainV2Scene";
import { PlatformScene } from "../scenes/PlatformScene";
import { AITranslationScene } from "../scenes/AITranslationScene";
import { CleanFilesScene } from "../scenes/CleanFilesScene";
import { GitWorkflowScene } from "../scenes/GitWorkflowScene";
import { UseCasesBentoScene } from "../scenes/UseCasesBentoScene";
import { AutopilotScene } from "../scenes/AutopilotScene";
import { LogoRevealScene } from "../scenes/LogoRevealScene";
import { FinalCTAScene } from "../scenes/FinalCTAScene";

export interface LocalesyLaunchV2Props {
  [key: string]: unknown;
}

const SCENES: { component: React.FC; duration: number }[] = [
  { component: HeroV2Scene, duration: 150 },
  { component: PainV2Scene, duration: 180 },
  { component: PlatformScene, duration: 210 },
  { component: AITranslationScene, duration: 180 },
  { component: CleanFilesScene, duration: 150 },
  { component: GitWorkflowScene, duration: 150 },
  { component: UseCasesBentoScene, duration: 180 },
  { component: AutopilotScene, duration: 150 },
  { component: LogoRevealScene, duration: 120 },
  { component: FinalCTAScene, duration: 180 },
];

const transition = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={springTiming({ config: { damping: 200 }, durationInFrames: 14 })}
  />
);

export const LocalesyLaunchV2: React.FC<LocalesyLaunchV2Props> = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#030305" }}>
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
