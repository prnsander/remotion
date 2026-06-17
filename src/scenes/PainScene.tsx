import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Sequence,
} from "remotion";
import { noise3D } from "@remotion/noise";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["800"],
  subsets: ["latin"],
});

const CELL = 32;
const ENTER_FRAMES = 10;
const EXIT_FRAMES = 8;
const SNAP_EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
      pointerEvents: "none",
      zIndex: 10,
    }}
  />
);

// Pixel-grid film grain driven by @remotion/noise — changes every frame
export const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const cols = Math.ceil(width / CELL);
  const rows = Math.ceil(height / CELL);

  return (
    <AbsoluteFill
      style={{ opacity: 0.03, mixBlendMode: "overlay", pointerEvents: "none" }}
    >
      {Array.from({ length: rows }, (_, y) => (
        <React.Fragment key={y}>
          {Array.from({ length: cols }, (_, x) => {
            const n = noise3D("pg", x / 35, y / 35, frame / 6);
            const v = Math.floor(((n + 1) / 2) * 255);
            return (
              <div
                key={x}
                style={{
                  position: "absolute",
                  left: x * CELL,
                  top: y * CELL,
                  width: CELL,
                  height: CELL,
                  backgroundColor: `rgb(${v},${v},${v})`,
                }}
              />
            );
          })}
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};

// Single statement — frame is relative to its <Sequence> start
const Statement: React.FC<{
  prefix: string;
  accent: string;
  sequenceDuration: number;
}> = ({ prefix, accent, sequenceDuration }) => {
  const frame = useCurrentFrame();

  // Enter: translateY 40→0 + opacity 0→1 over ENTER_FRAMES with snappy ease-out
  const enterProgress = interpolate(frame, [0, ENTER_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: SNAP_EASE,
  });

  // Exit: opacity 1→0 over EXIT_FRAMES, no movement
  const exitOpacity = interpolate(
    frame,
    [sequenceDuration - EXIT_FRAMES, sequenceDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const opacity = enterProgress * exitOpacity;
  const translateY = (1 - enterProgress) * 40;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 96,
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-3px",
          textAlign: "center",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {prefix}
        <span style={{ color: "#EF4444" }}>{accent}</span>
      </div>
    </AbsoluteFill>
  );
};

export const PainScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeToBlack = interpolate(frame, [130, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Statements — behind vignette and grain */}
      <Sequence from={10} durationInFrames={40}>
        <Statement
          prefix="Localization takes "
          accent="weeks."
          sequenceDuration={40}
        />
      </Sequence>
      <Sequence from={52} durationInFrames={40}>
        <Statement
          prefix="AI copy sounds "
          accent="off-brand."
          sequenceDuration={40}
        />
      </Sequence>
      <Sequence from={94} durationInFrames={40}>
        <Statement
          prefix="Your team skips it "
          accent="anyway."
          sequenceDuration={40}
        />
      </Sequence>
      {/* Vignette — sits above text, transparent center preserves readability */}
      <Vignette />
      {/* Film grain — overlays everything */}
      <AbsoluteFill style={{ zIndex: 11, pointerEvents: "none" }}>
        <FilmGrain />
      </AbsoluteFill>
      {/* Fade to black — topmost */}
      <AbsoluteFill
        style={{
          backgroundColor: "#000000",
          opacity: fadeToBlack,
          pointerEvents: "none",
          zIndex: 20,
        }}
      />
    </AbsoluteFill>
  );
};
