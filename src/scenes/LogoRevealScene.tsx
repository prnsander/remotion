import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT } from "./shared/theme";
import { GrainOverlay } from "../components/GrainOverlay";

export const LogoRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowPulse = interpolate(
    frame % 70,
    [0, 35, 70],
    [0.85, 1.15, 0.85]
  );

  const logoSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 110 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0, 1]);

  const tagOpacity = interpolate(frame, [56, 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit push-out
  const exitOpacity = interpolate(frame, [90, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [90, 120], [1, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          opacity: glowPulse,
          background:
            "radial-gradient(ellipse 64% 44% at 50% 50%, rgba(144,90,246,0.24) 0%, transparent 68%)",
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
            display: "flex",
            alignItems: "center",
            gap: 20,
            transform: `scale(${logoScale})`,
            opacity: interpolate(logoSpring, [0, 1], [0, 1]),
          }}
        >
          <Img src={staticFile("logo_icon.svg")} style={{ height: 88 }} />
          <span
            style={{
              fontFamily: FONT,
              fontSize: 88,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-3.5px",
            }}
          >
            Localesy
          </span>
        </div>

        <div
          style={{
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 400,
            color: "rgba(255,255,255,0.42)",
            letterSpacing: "0.4px",
            marginTop: 36,
            opacity: tagOpacity,
          }}
        >
          Localization for fast-moving teams.
        </div>
      </AbsoluteFill>

      <GrainOverlay opacity={0.03} />
    </AbsoluteFill>
  );
};
