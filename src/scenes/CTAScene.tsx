import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { SceneShell, THEME, MONO } from "../components/SceneShell";

const { fontFamily } = loadFont();

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrow = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const counter = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const counterScale = interpolate(counter, [0, 1], [0.7, 1]);

  const subOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boxOpacity = interpolate(frame, [45, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const linkOpacity = interpolate(frame, [65, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const underline = interpolate(frame, [65, 85], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const footOpacity = interpolate(frame, [80, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.6, 1, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const sceneFade = interpolate(frame, [100, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell fontFamily={fontFamily}>
      <AbsoluteFill style={{ opacity: sceneFade }}>
        {/* radial glow behind number */}
        <AbsoluteFill
          style={{
            opacity: glowPulse,
            background:
              "radial-gradient(circle at 50% 42%, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: 6,
              color: THEME.dim,
              textTransform: "uppercase",
              opacity: eyebrow,
            }}
          >
            Join the movement
          </div>

          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: THEME.accent,
              opacity: counter,
              transform: `scale(${counterScale})`,
            }}
          >
            1,160+
          </div>

          <div
            style={{ fontSize: 22, color: THEME.muted, opacity: subOpacity }}
          >
            developers already on early access
          </div>

          <div
            style={{
              marginTop: 24,
              width: 480,
              backgroundColor: THEME.panel,
              border: `1px solid ${THEME.border}`,
              borderRadius: 8,
              padding: "16px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: boxOpacity,
            }}
          >
            <span
              style={{ fontFamily: MONO, fontSize: 20, color: THEME.accent }}
            >
              npx localesy@latest init
            </span>
            <span style={{ color: THEME.muted, fontSize: 18 }}>⎘</span>
          </div>

          <div
            style={{
              marginTop: 20,
              opacity: linkOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: 28, fontWeight: 700, color: THEME.white }}
            >
              localesy.com
            </div>
            <div
              style={{
                marginTop: 4,
                width: `${underline}%`,
                height: 2,
                backgroundColor: THEME.accent,
                alignSelf: "stretch",
              }}
            />
          </div>

          <div
            style={{
              marginTop: 16,
              fontSize: 16,
              color: THEME.muted,
              opacity: footOpacity,
            }}
          >
            Free to start · No credit card required
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
