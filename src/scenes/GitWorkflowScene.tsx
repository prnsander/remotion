import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT, MONO } from "./shared/theme";
import { PurpleWash } from "./shared/PurpleWash";
import { Vignette } from "./shared/Vignette";
import { SceneHeader } from "./shared/SceneHeader";
import { GrainOverlay } from "../components/GrainOverlay";

const IconBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: 48,
      height: 48,
      backgroundColor: "rgba(144,90,246,0.11)",
      border: "1px solid rgba(144,90,246,0.20)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
    }}
  >
    {children}
  </div>
);

const Connector: React.FC = () => {
  const frame = useCurrentFrame();
  const dx = interpolate((frame + 20) % 40, [0, 20, 40], [-4, 4, -4]);
  return (
    <div
      style={{
        width: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(8,8,14,0.9)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderLeft: "none",
        borderRight: "none",
        alignSelf: "stretch",
      }}
    >
      <span
        style={{
          fontSize: 24,
          color: "rgba(144,90,246,0.50)",
          transform: `translateX(${dx}px)`,
        }}
      >
        →
      </span>
    </div>
  );
};

export const GitWorkflowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1 = spring({
    frame: frame - 40,
    fps,
    config: { damping: 14, stiffness: 82 },
  });
  const card2 = spring({
    frame: frame - 62,
    fps,
    config: { damping: 14, stiffness: 82 },
  });
  const card3 = spring({
    frame: frame - 84,
    fps,
    config: { damping: 14, stiffness: 82 },
  });

  const found = spring({
    frame: frame - 80,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const tagOpacity = interpolate(frame, [125, 141], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardBase: React.CSSProperties = {
    width: 420,
    backgroundColor: "rgba(8,8,14,0.9)",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "32px 28px",
  };
  const title: React.CSSProperties = { marginTop: 16 };
  const body: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: 14,
    color: "rgba(255,255,255,0.50)",
    lineHeight: 1.6,
    marginTop: 8,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <PurpleWash />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          paddingTop: 80,
        }}
      >
        <SceneHeader
          label="GIT-NATIVE"
          headline="Fits into your git workflow."
          subhead="Translations move with your code — pushes, PRs and merges, all taken care of."
          headlineSize={58}
        />

        <div
          style={{ display: "flex", alignItems: "stretch", marginTop: 50 }}
        >
          {/* Card 1 */}
          <div
            style={{
              ...cardBase,
              borderRadius: "18px 0 0 18px",
              borderRight: "none",
              transform: `translateX(${interpolate(
                card1,
                [0, 1],
                [-90, 0]
              )}px)`,
              opacity: interpolate(card1, [0, 1], [0, 1]),
            }}
          >
            <IconBox>⬆</IconBox>
            <div
              style={{
                ...title,
                fontFamily: MONO,
                fontSize: 15,
                fontWeight: 600,
                color: C.accent,
              }}
            >
              git push origin main
            </div>
            <div style={body}>
              Localesy detects your changes automatically on every push.
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 700,
                color: C.green,
                marginTop: 16,
                opacity: interpolate(found, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(
                  found,
                  [0, 1],
                  [8, 0]
                )}px)`,
              }}
            >
              ✓ 12 new keys found
            </div>
          </div>

          <Connector />

          {/* Card 2 */}
          <div
            style={{
              ...cardBase,
              borderRadius: 0,
              borderLeft: "none",
              borderRight: "none",
              transform: `translateY(${interpolate(
                card2,
                [0, 1],
                [90, 0]
              )}px)`,
              opacity: interpolate(card2, [0, 1], [0, 1]),
            }}
          >
            <IconBox>⚙</IconBox>
            <div
              style={{
                ...title,
                fontFamily: FONT,
                fontSize: 17,
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              Diff Engine™
            </div>
            <div style={body}>
              Smart conflict resolution — every key tracked, every change
              versioned.
            </div>
            <div
              style={{
                marginTop: 14,
                backgroundColor: "rgba(0,0,0,0.35)",
                borderRadius: "8px",
                padding: "10px 14px",
                fontFamily: MONO,
                fontSize: 12,
                lineHeight: 1.8,
              }}
            >
              <div
                style={{
                  color: C.green,
                  opacity: interpolate(frame, [95, 101], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                + "hero.cta": "Get started"
              </div>
              <div
                style={{
                  color: C.red,
                  opacity: interpolate(frame, [99, 105], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                - "hero.cta": "Start now"
              </div>
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "2px",
                color: C.accent,
                marginTop: 10,
              }}
            >
              Smart conflict resolution via Diff Engine™
            </div>
          </div>

          <Connector />

          {/* Card 3 */}
          <div
            style={{
              ...cardBase,
              borderRadius: "0 18px 18px 0",
              borderLeft: "none",
              transform: `translateX(${interpolate(
                card3,
                [0, 1],
                [90, 0]
              )}px)`,
              opacity: interpolate(card3, [0, 1], [0, 1]),
            }}
          >
            <IconBox>⎇</IconBox>
            <div
              style={{
                ...title,
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 600,
                color: "#ffffff",
              }}
            >
              #47 feat: update translations
            </div>
            <div
              style={{
                display: "flex",
                gap: 6,
                marginTop: 10,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  color: C.accent,
                  backgroundColor: "rgba(144,90,246,0.12)",
                }}
              >
                translations
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.50)",
                }}
              >
                auto-generated
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  color: C.green,
                  backgroundColor: "rgba(34,197,94,0.08)",
                }}
              >
                ✓ merge-ready
              </span>
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 12,
                color: "rgba(255,255,255,0.35)",
                marginTop: 12,
              }}
            >
              2 files changed · +47 −3
            </div>
          </div>
        </div>

        <div
          style={{
            fontFamily: FONT,
            fontSize: 16,
            color: "rgba(255,255,255,0.40)",
            letterSpacing: "0.2px",
            marginTop: 44,
            opacity: tagOpacity,
          }}
        >
          Auto-sync on push or on demand · Smart conflict resolution ·
          Merge-ready pull requests
        </div>
      </AbsoluteFill>

      <Vignette />
      <GrainOverlay opacity={0.032} />
    </AbsoluteFill>
  );
};
