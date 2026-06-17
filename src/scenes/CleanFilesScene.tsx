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

type Seg = { t: string; c: string };

const BRACE_L = "rgba(255,255,255,0.30)";
const KEY_L = "rgba(255,255,255,0.55)";
const VAL_L = "rgba(255,255,255,0.70)";
const COMMENT = "rgba(255,255,255,0.28)";

const BEFORE: Seg[][] = [
  [{ t: "{", c: BRACE_L }],
  [
    { t: '  "hero.title": ', c: KEY_L },
    { t: '""', c: C.red },
  ],
  [
    { t: '  "hero.desc":  ', c: KEY_L },
    { t: '""', c: C.red },
  ],
  [
    { t: '  "nav.home":   ', c: KEY_L },
    { t: '"Home"', c: VAL_L },
  ],
  [
    { t: '  "cta":        ', c: KEY_L },
    { t: '""', c: C.red },
  ],
  [
    { t: '  "error.msg":  ', c: KEY_L },
    { t: '""', c: C.red },
  ],
  [
    { t: '  "nav.about":  ', c: KEY_L },
    { t: '"About Us"', c: VAL_L },
  ],
  [
    { t: '  "hero.cta":   ', c: KEY_L },
    { t: '""', c: C.red },
  ],
  [{ t: "}", c: BRACE_L }],
];

const AFTER: Seg[][] = [
  [{ t: "{", c: COMMENT }],
  [{ t: "  // Hero section", c: COMMENT }],
  [
    { t: '  "hero.cta":   ', c: C.accent },
    { t: '"Get started for free"', c: C.green },
  ],
  [
    { t: '  "hero.desc":  ', c: C.accent },
    { t: '"Localize in minutes."', c: C.green },
  ],
  [
    { t: '  "hero.title": ', c: C.accent },
    { t: '"Localize anything"', c: C.green },
  ],
  [{ t: " ", c: COMMENT }],
  [{ t: "  // Navigation", c: COMMENT }],
  [
    { t: '  "nav.about":  ', c: C.accent },
    { t: '"About Us"', c: C.green },
  ],
  [
    { t: '  "nav.home":   ', c: C.accent },
    { t: '"Home"', c: C.green },
  ],
  [{ t: "}", c: COMMENT }],
];

const CodeBlock: React.FC<{ lines: Seg[][]; base: number; stagger: number }> = ({
  lines,
  base,
  stagger,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        padding: "20px 24px",
        fontFamily: MONO,
        fontSize: 14,
        lineHeight: 1.9,
      }}
    >
      {lines.map((segs, i) => {
        const start = base + i * stagger;
        const opacity = interpolate(frame, [start, start + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div key={i} style={{ whiteSpace: "pre", opacity, minHeight: 26 }}>
            {segs.map((s, j) => (
              <span key={j} style={{ color: s.c }}>
                {s.t}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const PILLS = [
  "↕ Sort & group keys",
  "📦 Export JSON / YAML",
  "✏️ Rename without breaking",
];

export const CleanFilesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panel = (start: number) => {
    const s = spring({
      frame: frame - start,
      fps,
      config: { damping: 13, stiffness: 78 },
    });
    return {
      transform: `translateY(${interpolate(s, [0, 1], [80, 0])}px)`,
      opacity: interpolate(frame, [start, start + 16], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    };
  };

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <PurpleWash />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          paddingTop: 70,
        }}
      >
        <SceneHeader
          label="CLEAN · ORGANIZED · STRUCTURED"
          headline="Locale files that stay clean."
          subhead="Structured like your codebase — no more wrestling with messy JSON."
          headlineSize={58}
        />

        <div style={{ display: "flex", gap: 28, marginTop: 44 }}>
          {/* BEFORE */}
          <div
            style={{
              width: 640,
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "rgba(14,6,6,0.95)",
              border: "1px solid rgba(239,68,68,0.14)",
              ...panel(38),
            }}
          >
            <div
              style={{
                height: 44,
                backgroundColor: "rgba(239,68,68,0.07)",
                borderBottom: "1px solid rgba(239,68,68,0.12)",
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 600,
                color: "#ef4444",
              }}
            >
              ❌&nbsp;&nbsp;Before Localesy
            </div>
            <CodeBlock lines={BEFORE} base={44} stagger={4} />
          </div>

          {/* AFTER */}
          <div
            style={{
              width: 640,
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "rgba(6,14,8,0.95)",
              border: "1px solid rgba(34,197,94,0.14)",
              ...panel(58),
            }}
          >
            <div
              style={{
                height: 44,
                backgroundColor: "rgba(34,197,94,0.07)",
                borderBottom: "1px solid rgba(34,197,94,0.12)",
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 600,
                color: "#22c55e",
              }}
            >
              ✓&nbsp;&nbsp;With Localesy
            </div>
            <CodeBlock lines={AFTER} base={68} stagger={4} />
          </div>
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 24,
          }}
        >
          {PILLS.map((p, i) => {
            const start = 112 + i * 14;
            const opacity = interpolate(frame, [start, start + 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={p}
                style={{
                  backgroundColor: "rgba(144,90,246,0.08)",
                  border: "1px solid rgba(144,90,246,0.22)",
                  borderRadius: "100px",
                  padding: "7px 18px",
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#905af6",
                  opacity,
                }}
              >
                {p}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <Vignette />
      <GrainOverlay opacity={0.032} />
    </AbsoluteFill>
  );
};
