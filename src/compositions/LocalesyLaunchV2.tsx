import React from "react";
import { AbsoluteFill } from "remotion";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
  type TransitionPresentation,
  type TransitionTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { HeroV2Scene } from "../scenes/HeroV2Scene";
import { PainV2Scene } from "../scenes/PainV2Scene";
import { PlatformScene } from "../scenes/PlatformScene";
import { AITranslationScene } from "../scenes/AITranslationScene";
import { CleanFilesScene } from "../scenes/CleanFilesScene";
import { StatFlashScene } from "../scenes/StatFlashScene";
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
  { component: PainV2Scene, duration: 240 },
  { component: PlatformScene, duration: 210 },
  { component: AITranslationScene, duration: 180 },
  { component: CleanFilesScene, duration: 150 },
  { component: StatFlashScene, duration: 75 },
  { component: GitWorkflowScene, duration: 150 },
  { component: UseCasesBentoScene, duration: 180 },
  { component: AutopilotScene, duration: 150 },
  { component: LogoRevealScene, duration: 120 },
  { component: FinalCTAScene, duration: 180 },
];

// One transition per cut point (between scene i and i+1).
const TRANSITIONS: {
  presentation: TransitionPresentation<Record<string, unknown>>;
  durationInFrames: number;
  timing?: TransitionTiming;
}[] = [
  { presentation: slide({ direction: "from-right" }), durationInFrames: 18 }, // Hero → Pain
  { presentation: fade(), durationInFrames: 20 }, // Pain → Platform
  { presentation: slide({ direction: "from-left" }), durationInFrames: 18 }, // Platform → AI
  { presentation: fade(), durationInFrames: 20 }, // AI → CleanFiles
  { presentation: fade(), durationInFrames: 14 }, // CleanFiles → StatFlash
  { presentation: slide({ direction: "from-bottom" }), durationInFrames: 18 }, // StatFlash → Git
  { presentation: fade(), durationInFrames: 16 }, // Git → Bento
  {
    presentation: slide({ direction: "from-bottom" }),
    durationInFrames: 22,
    timing: springTiming({
      config: { damping: 40, stiffness: 90 },
      durationInFrames: 22,
    }),
  }, // Bento → Autopilot
  { presentation: fade(), durationInFrames: 14 }, // Autopilot → Logo
  { presentation: fade(), durationInFrames: 14 }, // Logo → FinalCTA
];

export const LocalesyLaunchV2: React.FC<LocalesyLaunchV2Props> = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#030305" }}>
      <TransitionSeries>
        {SCENES.map(({ component: Scene, duration }, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <TransitionSeries.Transition
                presentation={TRANSITIONS[i - 1].presentation}
                timing={
                  TRANSITIONS[i - 1].timing ??
                  linearTiming({
                    durationInFrames: TRANSITIONS[i - 1].durationInFrames,
                  })
                }
              />
            )}
            <TransitionSeries.Sequence durationInFrames={duration}>
              <Scene />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
