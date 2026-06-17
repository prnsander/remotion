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

const COMMAND = "npx localesy@latest init";
const TYPE_START = 8;
const FRAMES_PER_CHAR = 2;

const OUTPUTS = [
  { text: "✓ Detected 47 translation keys", color: THEME.accent },
  { text: "✓ Connected to Localesy dashboard", color: THEME.accent },
  { text: "✓ Ready. Run localesy push to sync.", color: THEME.green },
];

export const CliScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 90, mass: 1 },
  });
  const translateY = interpolate(enter, [0, 1], [80, 0]);

  const typedCount = Math.max(
    0,
    Math.min(COMMAND.length, Math.floor((frame - TYPE_START) / FRAMES_PER_CHAR))
  );
  const typed = COMMAND.slice(0, typedCount);
  const typingDone = typedCount >= COMMAND.length;
  const cursorOn = Math.floor(frame / 8) % 2 === 0;

  return (
    <SceneShell fontFamily={fontFamily}>
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div
          style={{
            width: 1400,
            borderRadius: 10,
            backgroundColor: "#0d0d0d",
            border: `1px solid ${THEME.border}`,
            boxShadow: "0 0 80px rgba(99,102,241,0.08)",
            overflow: "hidden",
            transform: `translateY(${translateY}px)`,
            opacity: enter,
          }}
        >
          {/* chrome */}
          <div
            style={{
              backgroundColor: THEME.border,
              height: 44,
              display: "flex",
              alignItems: "center",
              paddingLeft: 18,
              gap: 10,
            }}
          >
            {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
              <div
                key={c}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: c,
                }}
              />
            ))}
          </div>
          {/* body */}
          <div
            style={{
              padding: "32px 36px",
              fontFamily: MONO,
              fontSize: 22,
              lineHeight: 1.6,
              minHeight: 240,
            }}
          >
            <div style={{ color: THEME.white }}>
              <span style={{ color: THEME.accent }}>$ </span>
              {typed}
              {!typingDone && cursorOn && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: 22,
                    backgroundColor: THEME.accent,
                    transform: "translateY(4px)",
                  }}
                />
              )}
            </div>
            <div style={{ marginTop: 16 }}>
              {OUTPUTS.map((line, i) => {
                const start = 55 + i * 8;
                const opacity = interpolate(
                  frame,
                  [start, start + 10],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                return (
                  <div key={i} style={{ color: line.color, opacity }}>
                    {line.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
