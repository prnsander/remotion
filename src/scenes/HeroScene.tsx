import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { COLORS, TYPE, TIMING } from "../constants";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

interface HeroSceneProps {
  productName: string;
  tagline: string;
  accentColor: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  productName,
  tagline,
  accentColor,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
      }}
    >
      <AnimatedText
        startFrame={10}
        duration={TIMING.fadeIn}
        style={{
          fontSize: TYPE.display,
          fontWeight: 800,
          color: COLORS.text,
          letterSpacing: "-4px",
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {productName}
      </AnimatedText>

      <AnimatedText
        startFrame={20}
        duration={TIMING.fadeIn}
        style={{
          fontSize: TYPE.subheadline,
          fontWeight: 400,
          color: accentColor,
          marginTop: 24,
          textAlign: "center",
          letterSpacing: "2px",
        }}
      >
        {tagline}
      </AnimatedText>
    </AbsoluteFill>
  );
};
