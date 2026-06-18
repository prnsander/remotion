import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "./shared/theme";
import { GrainOverlay } from "../components/GrainOverlay";

export const AutopilotScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 85 },
  });
  const line2 = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 85 },
  });
  const sub1Opacity = interpolate(frame, [38, 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sub2Opacity = interpolate(frame, [52, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const btn = spring({
    frame: frame - 72,
    fps,
    config: { damping: 13, stiffness: 120 },
  });
  const arrowX = interpolate(frame % 60, [0, 30, 60], [0, 5, 0]);

  const illoSpring = spring({
    frame: frame - 72,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const illoX = interpolate(illoSpring, [0, 1], [100, 0]);

  const fadeOut = interpolate(frame, [124, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const mockBlock: React.CSSProperties = {
    backgroundColor: "rgba(0,0,0,0.20)",
    border: "1px solid rgba(255,255,255,0.15)",
    marginBottom: 12,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#905af6" }}>
      {/* radial texture */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(196,162,255,0.08) 0%, transparent 65%)",
        }}
      />
      {/* inner glow border */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          boxShadow:
            "inset 0 0 0 2px rgba(196,162,255,0.85), inset 0 0 120px rgba(144,90,246,0.20)",
        }}
      />

      {/* Scrolling dot grid on the right half */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "46%",
          height: "100%",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: `0 ${frame * 0.4}px`,
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      {/* Right floating components */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            right: -60,
            bottom: 300,
            width: 800,
            height: 480,
            opacity: 0.65,
            transform: `translateX(${illoX}px)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 80,
          }}
        >
          <div
            style={{ ...mockBlock, height: 40, width: 360, borderRadius: 8 }}
          />
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {[70, 90, 60].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 22,
                  width: w,
                  borderRadius: 100,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
          <div
            style={{
              ...mockBlock,
              height: 44,
              width: 360,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 14px",
            }}
          >
            <div
              style={{
                width: 120,
                height: 12,
                borderRadius: 6,
                backgroundColor: "rgba(255,255,255,0.12)",
              }}
            />
            <div
              style={{
                width: 80,
                height: 12,
                borderRadius: 6,
                backgroundColor: "rgba(0,0,0,0.20)",
              }}
            />
          </div>
          <div
            style={{
              width: 44,
              height: 26,
              borderRadius: 13,
              backgroundColor: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.15)",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              padding: 3,
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.5)",
              }}
            />
          </div>
          <div
            style={{
              width: 180,
              height: 38,
              borderRadius: 8,
              backgroundColor: "rgba(0,0,0,0.30)",
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Left content */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "54%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 52,
            fontWeight: 700,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            opacity: interpolate(line1, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line1, [0, 1], [40, 0])}px)`,
          }}
        >
          Translation management,
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 52,
            fontWeight: 700,
            color: "rgba(255,255,255,0.80)",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            opacity: interpolate(line2, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line2, [0, 1], [40, 0])}px)`,
          }}
        >
          on autopilot.
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 500,
            color: "rgba(255,255,255,0.78)",
            letterSpacing: "-0.3px",
            marginTop: 24,
            opacity: sub1Opacity,
          }}
        >
          Stop losing engineering hours to translation busywork.
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 18,
            color: "rgba(255,255,255,0.58)",
            marginTop: 10,
            opacity: sub2Opacity,
          }}
        >
          Set up in less than 2 minutes. No credit card required.
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(0,0,0,0.72)",
            borderRadius: "14px",
            padding: "13px 26px",
            color: "rgba(255,255,255,0.95)",
            fontFamily: FONT,
            fontSize: 17,
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(0,0,0,0.30)",
            marginTop: 36,
            alignSelf: "flex-start",
            transform: `scale(${interpolate(btn, [0, 1], [0.9, 1])})`,
            opacity: interpolate(btn, [0, 1], [0, 1]),
          }}
        >
          Get started for free
          <span style={{ fontSize: 18, transform: `translateX(${arrowX}px)` }}>
            →
          </span>
        </div>
      </div>

      <GrainOverlay opacity={0.025} />
      <AbsoluteFill
        style={{ backgroundColor: C.bg, opacity: fadeOut, pointerEvents: "none" }}
      />
    </AbsoluteFill>
  );
};
