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

const PainCard: React.FC<{ index: number; children: React.ReactNode }> = ({
  index,
  children,
}) => {
  const frame = useCurrentFrame();
  const start = 20 + index * 20;
  const progress = interpolate(frame, [start, start + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(frame, [90, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width: 480,
        padding: 36,
        backgroundColor: THEME.card,
        border: `1px solid ${THEME.border}`,
        borderRadius: 12,
        opacity: progress * exit,
        transform: `translateY(${(1 - progress) * 50}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {children}
    </div>
  );
};

const Header: React.FC<{ emoji: string; title: string; body: string }> = ({
  emoji,
  title,
  body,
}) => (
  <>
    <div style={{ fontSize: 40 }}>{emoji}</div>
    <div style={{ fontSize: 22, fontWeight: 700, color: THEME.white }}>
      {title}
    </div>
    <div style={{ fontSize: 16, color: THEME.muted, lineHeight: 1.5 }}>
      {body}
    </div>
  </>
);

export const PainScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 20], [0, 1], {
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
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 6,
            color: THEME.dim,
            textTransform: "uppercase",
            opacity: labelOpacity,
            marginBottom: 48,
          }}
        >
          Sound familiar?
        </div>

        <div style={{ display: "flex", gap: 32 }}>
          <PainCard index={0}>
            <Header
              emoji="😩"
              title="Copy-paste hell"
              body="Messy JSON files, missing keys, broken builds."
            />
            <div
              style={{
                backgroundColor: THEME.border,
                borderRadius: 8,
                padding: 14,
                fontFamily: MONO,
                fontSize: 14,
                color: THEME.muted,
              }}
            >
              {"{ "}
              <span style={{ color: THEME.white }}>"home.title"</span>:{" "}
              <span style={{ color: THEME.red }}>""</span>,{" "}
              <span style={{ color: THEME.white }}>"nav.about"</span>:{" "}
              <span style={{ color: THEME.red }}>""</span>
              {" }"}
            </div>
          </PainCard>

          <PainCard index={1}>
            <Header
              emoji="🤖"
              title="Robotic AI output"
              body="Generated text that sounds nothing like your brand."
            />
            <div
              style={{
                fontFamily: MONO,
                fontSize: 14,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div style={{ color: THEME.red }}>
                ❌ "Click here for buy product"
              </div>
              <div style={{ color: THEME.green }}>
                ✓ "Start your free trial"
              </div>
            </div>
          </PainCard>

          <PainCard index={2}>
            <Header
              emoji="🐌"
              title="Translations block shipping"
              body="Agencies, deadlines, extra cost. Every. Single. Time."
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: THEME.muted,
              }}
            >
              <span>Design</span>
              <span>→</span>
              <span>Dev</span>
              <span>→</span>
              <span
                style={{
                  color: THEME.red,
                  backgroundColor: "rgba(239,68,68,0.15)",
                  padding: "4px 8px",
                  borderRadius: 4,
                }}
              >
                😩 Translations
              </span>
              <span>→</span>
              <span>Launch</span>
            </div>
          </PainCard>
        </div>
      </AbsoluteFill>

      {frame >= 90 && (
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: THEME.white,
              opacity: closer,
              transform: `translateY(${(1 - closer) * 60}px)`,
            }}
          >
            We said no more.
          </div>
        </AbsoluteFill>
      )}
    </SceneShell>
  );
};
