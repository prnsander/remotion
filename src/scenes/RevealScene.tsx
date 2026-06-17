import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { FilmGrain, Vignette } from "./PainScene";

const { fontFamily } = loadFont("normal", {
  weights: ["800", "400"],
  subsets: ["latin"],
});

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Purple flash — 0→0.15→0 over 12 frames
  const flashOpacity = interpolate(frame, [0, 6, 12], [0, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Wordmark spring — scale 0.85→1 + opacity driven by spring value
  const wordmarkSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });
  const wordmarkScale = 0.85 + wordmarkSpring * 0.15;
  const wordmarkOpacity = Math.min(1, Math.max(0, wordmarkSpring));

  // Tagline fades in at frame 20
  const taglineOpacity = interpolate(frame, [20, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade to black
  const fadeToBlack = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Content — centered column */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            opacity: wordmarkOpacity,
            transform: `scale(${wordmarkScale})`,
            fontFamily,
            fontSize: 148,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-6px",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          Localesy.
        </div>

        <div
          style={{
            opacity: taglineOpacity,
            marginTop: 24,
            fontFamily,
            fontSize: 28,
            fontWeight: 400,
            color: "#555555",
            letterSpacing: "1px",
            textAlign: "center",
          }}
        >
          Translation platform
        </div>
      </AbsoluteFill>

      {/* Purple flash overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: "#6366F1",
          opacity: flashOpacity,
          pointerEvents: "none",
        }}
      />

      <Vignette />

      <AbsoluteFill style={{ zIndex: 11, pointerEvents: "none" }}>
        <FilmGrain />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          backgroundColor: "#000000",
          opacity: fadeToBlack,
          pointerEvents: "none",
          zIndex: 20,
        }}
      />
    </AbsoluteFill>
  );
};
