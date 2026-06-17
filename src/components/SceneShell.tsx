import React from "react";
import { AbsoluteFill } from "remotion";
import { GrainOverlay } from "./GrainOverlay";

// Local Localesy dark theme. Intentionally separate from src/constants.ts
// (whose accent is #C8FF00) so existing compositions stay untouched.
export const THEME = {
  bg: "#0a0a0a",
  surface: "#111111",
  panel: "#0d0d0d",
  card: "#0f0f0f",
  border: "#1a1a1a",
  accent: "#6366F1",
  white: "#ffffff",
  muted: "#555555",
  dim: "#333333",
  green: "#22c55e",
  red: "#ef4444",
};

export const MONO = "'Courier New', monospace";

// Wraps a scene with its background, a radial vignette, and the grain overlay.
export const SceneShell: React.FC<{
  children: React.ReactNode;
  bg?: string;
  fontFamily?: string;
}> = ({ children, bg = THEME.bg, fontFamily }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: bg, fontFamily }}>
      {children}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 50%, transparent 45%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      <GrainOverlay opacity={0.04} />
    </AbsoluteFill>
  );
};
