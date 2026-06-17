import React, { useEffect, useRef, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  interpolate,
  spring,
  useCurrentFrame,
  useCurrentScale,
  useVideoConfig,
} from "remotion";
import { C, FONT, MONO } from "./shared/theme";
import { PurpleWash } from "./shared/PurpleWash";
import { Vignette } from "./shared/Vignette";
import { CopyIcon } from "./shared/CopyIcon";
import { GrainOverlay } from "../components/GrainOverlay";

const WORDS = [
  "Company Website",
  "Figma Designs",
  "Admin Dashboard",
  "Mobile App",
  "Landing Page",
  "CLI Toolkit",
];

// Horizontal padding (28px each side) added to the measured text width.
const PILL_PAD = 56;

export const HeroV2Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = useCurrentScale();

  // Measure actual rendered text widths so the pill hugs each word exactly.
  const measureRef = useRef<HTMLDivElement>(null);
  const [handle] = useState(() => delayRender("measure-hero-pill"));
  const [measured, setMeasured] = useState<number[] | null>(null);
  useEffect(() => {
    if (!measureRef.current) {
      continueRender(handle);
      return;
    }
    const ws = Array.from(measureRef.current.children).map(
      (c) => (c as HTMLElement).getBoundingClientRect().width / scale
    );
    setMeasured(ws);
    continueRender(handle);
  }, [handle, scale]);
  const widthOf = (i: number) => (measured ? measured[i] + PILL_PAD : 700);

  // --- Badge: spring down + fade
  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90 },
  });
  const badgeY = interpolate(badgeSpring, [0, 1], [-24, 0]);
  const badgeOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Slide-up helper for headline lines
  const lineSlide = (start: number) => {
    const s = spring({
      frame: frame - start,
      fps,
      config: { damping: 13, stiffness: 85 },
    });
    return {
      transform: `translateY(${interpolate(s, [0, 1], [56, 0])}px)`,
      opacity: interpolate(frame, [start, start + 16], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    };
  };

  // --- Cycling word pill
  const cycle = Math.max(0, Math.floor((frame - 20) / 26));
  const idx = cycle % 6;
  const prevIdx = cycle === 0 ? idx : (cycle - 1) % 6;
  const switchFrame = 20 + cycle * 26;
  const targetWidth = widthOf(idx);
  const prevWidth = widthOf(prevIdx);
  const widthProg = spring({
    frame: frame - switchFrame,
    fps,
    config: { damping: 18, stiffness: 90 },
  });
  const pillWidth = interpolate(widthProg, [0, 1], [prevWidth, targetWidth]);
  const enterOpacity =
    cycle === 0
      ? 1
      : interpolate(frame, [switchFrame + 3, switchFrame + 9], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const exitOpacity = interpolate(
    frame,
    [switchFrame, switchFrame + 6],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const pillSlide = spring({
    frame: frame - 16,
    fps,
    config: { damping: 13, stiffness: 85 },
  });

  // --- Subtitle
  const subSpring = spring({
    frame: frame - 62,
    fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(frame, [62, 84], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(subSpring, [0, 1], [18, 0]);

  // --- Command pill
  const cmdSpring = spring({
    frame: frame - 78,
    fps,
    config: { damping: 16, stiffness: 100 },
  });
  const cmdY = interpolate(cmdSpring, [0, 1], [16, 0]);
  const cmdOpacity = interpolate(frame, [78, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- CTA button
  const ctaSpring = spring({
    frame: frame - 84,
    fps,
    config: { damping: 13, stiffness: 120 },
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.88, 1]);

  // --- Social proof
  const proofOpacity = interpolate(frame, [104, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineStyle: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: 94,
    fontWeight: 800,
    letterSpacing: "-3.5px",
    lineHeight: 1.05,
    color: C.text,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Hidden measuring layer — sizes the cycling word pill exactly */}
      <div
        ref={measureRef}
        aria-hidden
        style={{
          position: "absolute",
          visibility: "hidden",
          height: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {WORDS.map((w) => (
          <span
            key={w}
            style={{
              ...headlineStyle,
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            {w}
          </span>
        ))}
      </div>
      <PurpleWash />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* Badge */}
        <div
          style={{
            marginBottom: 28,
            textAlign: "center",
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 700,
              color: C.accent,
              letterSpacing: "-0.5px",
            }}
          >
            1,160+
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "2px",
              marginTop: 4,
            }}
          >
            DEVELOPERS ALREADY ON EARLY ACCESS
          </div>
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center" }}>
          <div style={{ ...headlineStyle, ...lineSlide(12) }}>
            Localize your
          </div>

          {/* Cycling word pill */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
              transform: `translateY(${interpolate(
                pillSlide,
                [0, 1],
                [56, 0]
              )}px)`,
              opacity: interpolate(frame, [16, 32], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                padding: "6px 28px",
                overflow: "hidden",
                width: pillWidth,
                height: 116,
                background:
                  "linear-gradient(135deg, #a975f8 0%, #905af6 100%)",
                boxShadow:
                  "inset 0 1px 0 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(196,162,255,0.16), 0 0 48px rgba(144,90,246,0.30)",
                position: "relative",
              }}
            >
              {cycle > 0 && (
                <span
                  style={{
                    ...headlineStyle,
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                    position: "absolute",
                    opacity: exitOpacity,
                  }}
                >
                  {WORDS[prevIdx]}
                </span>
              )}
              <span
                style={{
                  ...headlineStyle,
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                  position: "absolute",
                  opacity: enterOpacity,
                }}
              >
                {WORDS[idx]}
              </span>
            </div>
          </div>

          <div style={{ ...headlineStyle, ...lineSlide(20) }}>
            in just minutes.
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 400,
            color: "rgba(255,255,255,0.62)",
            letterSpacing: "0.2px",
            maxWidth: 640,
            textAlign: "center",
            marginTop: 32,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
        </div>

        {/* Command + CTA row */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 36,
          }}
        >
          <div
            style={{
              width: 406,
              height: 56,
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 18px",
              opacity: cmdOpacity,
              transform: `translateY(${cmdY}px)`,
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 17,
                fontWeight: 500,
                color: "#905af6",
              }}
            >
              npx localesy@latest init
            </span>
            <CopyIcon />
          </div>

          <div
            style={{
              width: 228,
              height: 56,
              borderRadius: "14px",
              background: "linear-gradient(135deg, #a975f8 0%, #905af6 100%)",
              boxShadow:
                "0 10px 36px -8px rgba(144,90,246,0.55), inset 0 1px 0 0 rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${ctaScale})`,
              opacity: interpolate(frame, [84, 96], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 17,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Get started for free
            </span>
          </div>
        </div>

        {/* Social proof */}
        <div
          style={{
            fontFamily: FONT,
            fontSize: 14,
            color: "rgba(255,255,255,0.32)",
            letterSpacing: "0.3px",
            marginTop: 26,
            opacity: proofOpacity,
          }}
        >
        </div>
      </AbsoluteFill>
      <Vignette />
      <GrainOverlay opacity={0.032} />
    </AbsoluteFill>
  );
};
