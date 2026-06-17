import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT } from "./shared/theme";
import { GrainOverlay } from "../components/GrainOverlay";

export const StatFlashScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame 0–12: thin horizontal line expands from center.
  const lineWidth = interpolate(frame, [0, 12], [0, 280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Frame 8: stat number springs in (scale 0.4 → 1) and fades over 14 frames.
  const numSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const numScale = interpolate(numSpring, [0, 1], [0.4, 1]);
  const numOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Frame 22: subtitle slides up from translateY(28px) → 0.
  const subSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 200 },
  });
  const subY = interpolate(subSpring, [0, 1], [28, 0]);
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);

  // Frame 50: cinematic push-out — fade + slight scale up.
  const exitOpacity = interpolate(frame, [50, 70], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [50, 70], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#030305" }}>
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(50% 35% at 50% 50%, rgba(144,90,246,0.22) 0%, transparent 68%)",
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          opacity: exitOpacity,
          transform: `scale(${exitScale})`,
        }}
      >
        <div
          style={{
            width: lineWidth,
            height: 1,
            backgroundColor: "#905af6",
            opacity: 0.5,
            marginBottom: 44,
          }}
        />
        <div
          style={{
            fontFamily: FONT,
            fontSize: 220,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-12px",
            lineHeight: 1,
            opacity: numOpacity,
            transform: `scale(${numScale})`,
          }}
        >
          98%
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 28,
            fontWeight: 400,
            color: "rgba(255,255,255,0.50)",
            letterSpacing: "-0.3px",
            marginTop: 28,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          of strings auto-filled by AI
        </div>
      </AbsoluteFill>

      <GrainOverlay opacity={0.032} />
    </AbsoluteFill>
  );
};
