import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "./theme";

export const SceneHeader: React.FC<{
  label: string;
  headline: string;
  subhead?: string;
  headlineSize?: number;
  maxWidth?: number;
}> = ({ label, headline, subhead, headlineSize = 62, maxWidth = 680 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 14, stiffness: 85 },
  });
  const subOpacity = interpolate(frame, [26, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "5px",
          color: C.accent,
          opacity: labelOpacity,
          marginBottom: 16,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: headlineSize,
          fontWeight: 800,
          letterSpacing: "-2.5px",
          color: C.text,
          lineHeight: 1.05,
          opacity: interpolate(headSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(
            headSpring,
            [0, 1],
            [40, 0]
          )}px)`,
        }}
      >
        {headline}
      </div>
      {subhead && (
        <div
          style={{
            fontFamily: FONT,
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.5,
            maxWidth,
            margin: "16px auto 0",
            opacity: subOpacity,
          }}
        >
          {subhead}
        </div>
      )}
    </div>
  );
};
