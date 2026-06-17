import React from "react";
import { AbsoluteFill } from "remotion";
import {
  TransitionSeries,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { HeroScene } from "../scenes/HeroScene";
import { TIMING } from "../constants";

export interface ProductLaunchProps {
  productName: string;
  tagline: string;
  accentColor: string;
  productImageUrl: string;
  backgroundVideoUrl: string;
  audioUrl: string;
  [key: string]: unknown;
}

export const ProductLaunch: React.FC<ProductLaunchProps> = ({
  productName,
  tagline,
  accentColor,
}) => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={300}>
          <HeroScene
            productName={productName}
            tagline={tagline}
            accentColor={accentColor}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: TIMING.sceneTransition,
          })}
        />

        {/* Add more scenes here: FeatureScene, ProductRevealScene, CTAScene */}
        <TransitionSeries.Sequence durationInFrames={300}>
          <AbsoluteFill style={{ backgroundColor: "#111111" }} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
