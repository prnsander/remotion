import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT, MONO } from "./shared/theme";
import { PurpleWash } from "./shared/PurpleWash";
import { Vignette } from "./shared/Vignette";
import { CopyIcon } from "./shared/CopyIcon";
import { GrainOverlay } from "../components/GrainOverlay";

export const FinalCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kickerOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const counterSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 11, stiffness: 95 },
  });
  const counterScale = interpolate(counterSpring, [0, 1], [0.55, 1]);
  const counterVal = Math.round(
    interpolate(frame, [14, 58], [0, 1160], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const subSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(frame, [30, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cmd = spring({
    frame: frame - 54,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const btn = spring({
    frame: frame - 74,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const domainSpring = spring({
    frame: frame - 94,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const underlineW = interpolate(frame, [100, 128], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const footerOpacity = interpolate(frame, [118, 132], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [152, 178], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <PurpleWash opacity={1.5} />
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(55% 42% at 50% 58%, rgba(144,90,246,0.18) 0%, transparent 72%)",
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Img
          src={staticFile("logo_icon.svg")}
          style={{ width: 32, height: 32, marginBottom: 18 }}
        />

        <div
          style={{
            fontFamily: FONT,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "6px",
            color: "rgba(255,255,255,0.18)",
            opacity: kickerOpacity,
          }}
        >
        </div>

        <div
          style={{
            fontFamily: FONT,
            fontSize: 148,
            fontWeight: 900,
            color: C.accent,
            letterSpacing: "-7px",
            marginTop: 14,
            transform: `scale(${counterScale})`,
            opacity: interpolate(counterSpring, [0, 1], [0, 1]),
          }}
        >
          {counterVal.toLocaleString() + "+"}
        </div>

        <div
          style={{
            fontFamily: FONT,
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(255,255,255,0.42)",
            letterSpacing: "0.2px",
            opacity: subOpacity,
            transform: `translateY(${interpolate(
              subSpring,
              [0, 1],
              [16, 0]
            )}px)`,
          }}
        >
          developers already on the early access list
        </div>

        {/* Command + CTA */}
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <div
            style={{
              width: 432,
              height: 58,
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              transform: `translateY(${interpolate(cmd, [0, 1], [22, 0])}px)`,
              opacity: interpolate(cmd, [0, 1], [0, 1]),
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 18,
                color: "#905af6",
                fontWeight: 500,
              }}
            >
              npx localesy@latest init
            </span>
            <CopyIcon />
          </div>

          <div
            style={{
              width: 272,
              height: 58,
              borderRadius: "16px",
              background: "linear-gradient(135deg, #a975f8 0%, #905af6 100%)",
              boxShadow:
                "0 14px 48px -8px rgba(144,90,246,0.60), 0 0 0 1px rgba(196,162,255,0.14), inset 0 1px 0 rgba(255,255,255,0.20)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${interpolate(btn, [0, 1], [0.88, 1])})`,
              opacity: interpolate(btn, [0, 1], [0, 1]),
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 18,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Get started for free
            </span>
          </div>
        </div>

        {/* Domain */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: interpolate(domainSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(
              domainSpring,
              [0, 1],
              [20, 0]
            )}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 28,
              fontWeight: 700,
              color: "rgba(255,255,255,0.78)",
              letterSpacing: "-0.5px",
            }}
          >
            localesy.com
          </span>
          <div
            style={{
              height: 2,
              width: underlineW,
              backgroundColor: "#905af6",
              borderRadius: "1px",
              marginTop: 6,
            }}
          />
        </div>

        <div
          style={{
            fontFamily: FONT,
            fontSize: 13,
            color: "rgba(255,255,255,0.22)",
            letterSpacing: "0.5px",
            marginTop: 26,
            opacity: footerOpacity,
          }}
        >
        </div>
      </AbsoluteFill>

      <Vignette />
      <GrainOverlay opacity={0.032} />
      <AbsoluteFill
        style={{
          backgroundColor: "#000000",
          opacity: fadeOut,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
