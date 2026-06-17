import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Video,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { Vignette } from "./PainScene";

const { fontFamily } = loadFont("normal", {
  weights: ["500", "400"],
  subsets: ["latin"],
});

const Pill: React.FC<{
  label: string;
  startFrame: number;
  endFrame: number;
}> = ({ label, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 12, endFrame - 12, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  if (frame < startFrame || frame >= endFrame) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        right: 20,
        opacity,
        background: "rgba(10,10,10,0.9)",
        border: "1px solid rgba(99,102,241,0.3)",
        borderRadius: 100,
        padding: "10px 22px",
        fontFamily,
        fontSize: 18,
        fontWeight: 500,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 10,
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#6366F1",
          flexShrink: 0,
        }}
      />
      {label}
    </div>
  );
};

export const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Browser springs up from below
  const browserSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 90 },
  });
  const browserY = (1 - browserSpring) * 100;

  // Crossfade overlays — 6 frames, centered on clip boundaries
  const crossfade1 = interpolate(frame, [117, 120, 123], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const crossfade2 = interpolate(frame, [237, 240, 243], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene fade to black
  const fadeToBlack = interpolate(frame, [330, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050505",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Browser mockup */}
      <div
        style={{
          width: 1540,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.95), 0 0 140px rgba(99,102,241,0.06)",
          transform: `translateY(${browserY}px)`,
          position: "relative",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            height: 40,
            backgroundColor: "#111",
            display: "flex",
            alignItems: "center",
            paddingLeft: 16,
            paddingRight: 16,
            gap: 8,
            flexShrink: 0,
          }}
        >
          {(["#FF5F56", "#FFBD2E", "#27C93F"] as const).map((color) => (
            <div
              key={color}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
          ))}
          <div
            style={{
              flex: 1,
              marginLeft: 16,
              height: 24,
              backgroundColor: "#1a1a1a",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily,
              fontSize: 13,
              fontWeight: 400,
              color: "#555",
            }}
          >
            app.localesy.com
          </div>
        </div>

        {/* Video content */}
        <div style={{ position: "relative", backgroundColor: "#000" }}>
          <Sequence from={0} durationInFrames={120} layout="none">
            <Video
              src={staticFile("landing-demo.mp4")}
              startFrom={0}
              style={{ width: "100%", display: "block" }}
            />
          </Sequence>

          <Sequence from={120} durationInFrames={120} layout="none">
            <Video
              src={staticFile("landing-demo.mp4")}
              startFrom={600}
              style={{ width: "100%", display: "block" }}
            />
          </Sequence>

          <Sequence from={240} durationInFrames={120} layout="none">
            <Video
              src={staticFile("landing-demo.mp4")}
              startFrom={1500}
              style={{ width: "100%", display: "block" }}
            />
          </Sequence>

          {/* Crossfade overlays */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#000",
              opacity: crossfade1,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#000",
              opacity: crossfade2,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Label pills */}
        <Pill label="Dashboard overview" startFrame={0} endFrame={120} />
        <Pill
          label="AI translation in one click"
          startFrame={120}
          endFrame={240}
        />
        <Pill label="Synced & ready to ship" startFrame={240} endFrame={360} />
      </div>

      <Vignette />

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
