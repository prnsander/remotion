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

const Panel: React.FC<{
  delay: number;
  axis: "x" | "y";
  from: number;
  children: React.ReactNode;
}> = ({ delay, axis, from, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 85 },
  });
  const offset = interpolate(enter, [0, 1], [from, 0]);
  const transform =
    axis === "x" ? `translateX(${offset}px)` : `translateY(${offset}px)`;
  return (
    <div
      style={{
        width: 500,
        borderRadius: 10,
        border: `1px solid ${THEME.border}`,
        backgroundColor: THEME.panel,
        padding: 24,
        opacity: enter,
        transform,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        minHeight: 240,
      }}
    >
      {children}
    </div>
  );
};

export const GitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spin = interpolate(frame, [10, 30], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const closer = spring({
    frame: frame - 90,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  return (
    <SceneShell fontFamily={fontFamily}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 56,
        }}
      >
        <div style={{ display: "flex", gap: 28 }}>
          {/* Panel 1 — Push */}
          <Panel delay={0} axis="x" from={-60}>
            <div style={{ fontFamily: MONO, fontSize: 15, color: THEME.green }}>
              git push origin main
            </div>
            <div style={{ fontSize: 13, color: THEME.muted }}>
              Localesy detects changes...
            </div>
            <div
              style={{
                fontSize: 20,
                color: THEME.accent,
                transform: `rotate(${spin}deg)`,
                width: 20,
              }}
            >
              ⟳
            </div>
            <div style={{ fontSize: 14, color: THEME.accent }}>
              ✓ 12 new keys found
            </div>
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: THEME.muted,
                border: `1px solid ${THEME.border}`,
                borderRadius: 20,
                padding: "6px 12px",
                alignSelf: "flex-start",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: THEME.accent,
                }}
              />
              Auto-sync on push
            </div>
          </Panel>

          {/* Panel 2 — Diff Engine */}
          <Panel delay={20} axis="y" from={60}>
            <div style={{ fontWeight: 700, color: THEME.white, fontSize: 16 }}>
              Diff Engine™
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 13,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div
                style={{
                  color: THEME.green,
                  backgroundColor: "rgba(34,197,94,0.1)",
                  padding: "4px 8px",
                  borderRadius: 4,
                }}
              >
                + "hero.cta": "Start for free"
              </div>
              <div
                style={{
                  color: THEME.red,
                  backgroundColor: "rgba(239,68,68,0.1)",
                  padding: "4px 8px",
                  borderRadius: 4,
                }}
              >
                - "hero.cta": "Get started"
              </div>
            </div>
            <div
              style={{
                marginTop: "auto",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: THEME.accent,
                alignSelf: "flex-start",
              }}
            >
              Smart conflict resolution
            </div>
          </Panel>

          {/* Panel 3 — PR */}
          <Panel delay={40} axis="x" from={60}>
            <div style={{ fontSize: 14, color: THEME.white, fontWeight: 600 }}>
              #47 feat: update translations for v2.4
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  color: THEME.accent,
                  backgroundColor: "rgba(99,102,241,0.15)",
                  borderRadius: 20,
                  padding: "3px 10px",
                }}
              >
                translations
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: THEME.muted,
                  backgroundColor: "rgba(51,51,51,0.4)",
                  borderRadius: 20,
                  padding: "3px 10px",
                }}
              >
                auto-generated
              </span>
            </div>
            <div style={{ color: THEME.green, fontWeight: 600, fontSize: 15 }}>
              ✓ Merge-ready
            </div>
            <div
              style={{ marginTop: "auto", fontSize: 12, color: THEME.muted }}
            >
              2 files changed · +47 −3
            </div>
          </Panel>
        </div>

        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: THEME.white,
            opacity: closer,
            transform: `translateY(${(1 - closer) * 50}px)`,
          }}
        >
          Translations move with your code.
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
