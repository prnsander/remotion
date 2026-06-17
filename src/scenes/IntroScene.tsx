import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["800", "400"],
  subsets: ["latin"],
});

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Wordmark springs in from below
  const wordmarkY = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });
  const wordmarkOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline fades + slides in after wordmark settles
  const taglineOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [50, 70], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line expands under wordmark
  const lineWidth = interpolate(frame, [35, 65], [0, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene fades out + zooms
  const fadeOut = interpolate(frame, [60, 80], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [60, 80], [1, 1.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      {/* Content wrapper — scale drives the zoom-out exit */}
      <div
        style={{
          transform: `scale(${exitScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            opacity: wordmarkOpacity,
            transform: `translateY(${(1 - wordmarkY) * 60}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 120,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-5px",
              lineHeight: 1,
            }}
          >
            Localesy
          </div>

          {/* Accent line */}
          <div
            style={{
              width: lineWidth,
              height: 4,
              backgroundColor: "#6366F1",
              borderRadius: 2,
              margin: "20px auto 0",
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            marginTop: 32,
            fontFamily,
            fontSize: 28,
            fontWeight: 400,
            color: "#666666",
            letterSpacing: "1px",
            textAlign: "center",
          }}
        >
          Localization for fast-moving teams.
        </div>
      </div>
    </AbsoluteFill>
  );
};
