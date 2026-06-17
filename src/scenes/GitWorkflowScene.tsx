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
import { GrainOverlay } from "../components/GrainOverlay";

// Y position of each node relative to the timeline container top.
const NODE_Y = [200, 370, 540];
const STEP_FRAME = [50, 75, 100];
const NODE_FRAME = [45, 70, 95];

export const GitWorkflowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();


  const headSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 85 },
  });
  const headY = interpolate(headSpring, [0, 1], [40, 0]);
  const headOpacity = interpolate(headSpring, [0, 1], [0, 1]);

  // Vertical line grows top → bottom to connect all three nodes.
  const lineHeight = interpolate(frame, [40, 100], [0, 580], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagOpacity = interpolate(frame, [125, 141], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardSlide = (i: number) => {
    const s = spring({
      frame: frame - STEP_FRAME[i],
      fps,
      config: { damping: 16, stiffness: 80 },
    });
    const fromRight = i !== 1; // steps 1 & 3 on the right, step 2 on the left
    const dx = interpolate(s, [0, 1], [fromRight ? 60 : -60, 0]);
    return { opacity: interpolate(s, [0, 1], [0, 1]), dx, fromRight };
  };

  const nodeScale = (i: number) => {
    const s = spring({
      frame: frame - NODE_FRAME[i],
      fps,
      config: { damping: 12, stiffness: 120 },
    });
    return interpolate(s, [0, 1], [0, 1]);
  };

  const cardBase: React.CSSProperties = {
    position: "absolute",
    width: 560,
    backgroundColor: "rgba(12,11,18,0.95)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "14px",
    padding: "24px 28px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
  };
  const body: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: 14,
    color: "rgba(255,255,255,0.50)",
    lineHeight: 1.6,
    marginTop: 8,
  };

  const cardStyle = (i: number): React.CSSProperties => {
    const { opacity, dx, fromRight } = cardSlide(i);
    return {
      ...cardBase,
      top: NODE_Y[i],
      [fromRight ? "left" : "right"]: "calc(50% + 50px)",
      transform: `translateY(-50%) translateX(${dx}px)`,
      opacity,
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
          paddingTop: 96,
        }}
      >

        <div
          style={{
            fontFamily: FONT,
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: "-2px",
            color: C.text,
            textAlign: "center",
            lineHeight: 1.05,
            marginTop: 18,
            maxWidth: 900,
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
          }}
        >
          Your code pushes. We handle the rest.
        </div>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            width: 800,
            height: 620,
            marginTop: 36,
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              transform: "translateX(-50%)",
              width: 2,
              height: lineHeight,
              backgroundColor: "rgba(144,90,246,0.20)",
            }}
          />

          {/* Nodes */}
          {NODE_Y.map((y, i) => (
            <div
              key={`node-${i}`}
              style={{
                position: "absolute",
                left: "50%",
                top: y,
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "rgba(12,11,18,0.98)",
                border: "1px solid rgba(144,90,246,0.40)",
                boxShadow: "0 0 0 6px rgba(3,3,5,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: MONO,
                fontSize: 15,
                fontWeight: 700,
                color: C.accent,
                transform: `translate(-50%, -50%) scale(${nodeScale(i)})`,
                zIndex: 2,
              }}
            >
              {`0${i + 1}`}
            </div>
          ))}

          {/* Card 1 — git push */}
          <div style={cardStyle(0)}>
            <div
              style={{
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
                marginTop: 14,
              }}
            >
              ✓ 12 new keys found
            </div>
          </div>

          {/* Card 2 — Diff Engine */}
          <div style={cardStyle(1)}>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 18,
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
              <div style={{ color: C.green }}>+ "hero.cta": "Get started"</div>
              <div style={{ color: C.red }}>- "hero.cta": "Start now"</div>
            </div>
          </div>

          {/* Card 3 — PR ready */}
          <div style={cardStyle(2)}>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 15,
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
            marginTop: 8,
            textAlign: "center",
            opacity: tagOpacity,
          }}
        >
        </div>
      </AbsoluteFill>

      <Vignette />
      <GrainOverlay opacity={0.032} />
    </AbsoluteFill>
  );
};
