import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { SceneShell, THEME } from "../components/SceneShell";

const { fontFamily } = loadFont();

export const BrandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 30], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const wordmark = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const taglineOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [45, 65], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [70, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [70, 90], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell fontFamily={fontFamily} bg="#000000">
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 28,
          opacity: exitOpacity,
          transform: `scale(${exitScale})`,
        }}
      >
        <div
          style={{
            width: lineWidth,
            height: 3,
            borderRadius: 2,
            backgroundColor: THEME.accent,
          }}
        />
        <div
          style={{
            fontSize: 140,
            fontWeight: 800,
            color: THEME.white,
            letterSpacing: -6,
            opacity: wordmark,
            transform: `translateY(${(1 - wordmark) * 60}px)`,
          }}
        >
          Localesy.
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: THEME.muted,
            letterSpacing: 1,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Localization for fast-moving teams.
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
