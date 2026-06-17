import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "./shared/theme";
import { PurpleWash } from "./shared/PurpleWash";
import { Vignette } from "./shared/Vignette";
import { GrainOverlay } from "../components/GrainOverlay";

const BLOCKS = [
  {
    num: "01",
    headline: "Translations management gives you a headache.",
    start: 18,
  },
  {
    num: "02",
    headline: "Generated translations feel and sound robotic.",
    start: 68,
  },
  {
    num: "03",
    headline: "Your team finds even the top tools hard to use.",
    start: 118,
  },
];

const PainBlock: React.FC<(typeof BLOCKS)[number]> = ({
  num,
  headline,
  body,
  start,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numOpacity = interpolate(frame, [start, start + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headSpring = spring({
    frame: frame - (start + 6),
    fps,
    config: { damping: 13, stiffness: 80 },
  });
  const bodyOpacity = interpolate(
    frame,
    [start + 14, start + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{ maxWidth: 860, textAlign: "center", margin: "26px 0" }}>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "4px",
          color: C.accent,
          opacity: numOpacity,
          marginBottom: 14,
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 44,
          fontWeight: 800,
          color: C.text,
          letterSpacing: "-1.5px",
          opacity: interpolate(headSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(
            headSpring,
            [0, 1],
            [36, 0]
          )}px)`,
        }}
      >
        {headline}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 19,
          fontWeight: 400,
          color: "rgba(255,255,255,0.52)",
          lineHeight: 1.65,
          marginTop: 16,
          opacity: bodyOpacity,
        }}
      >
        {body}
      </div>
    </div>
  );
};

export const PainV2Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Group fade-out at frame 152
  const groupOpacity = interpolate(frame, [152, 164], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const groupY = interpolate(frame, [152, 164], [0, -28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Closing lines
  const line1Spring = spring({
    frame: frame - 164,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const line2Spring = spring({
    frame: frame - 172,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <PurpleWash />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {frame < 164 && (
          <div
            style={{
              opacity: groupOpacity,
              transform: `translateY(${groupY}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "5px",
                color: "rgba(255, 252, 252, 0.22)",
                opacity: labelOpacity,
                marginBottom: 18,
              }}
            >
              KNOW THAT FEELING?
            </div>
            {BLOCKS.map((b) => (
              <PainBlock key={b.num} {...b} />
            ))}
          </div>
        )}

        {frame >= 160 && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 34,
                fontWeight: 400,
                color: "rgba(255,255,255,0.48)",
                letterSpacing: "-0.5px",
                opacity: interpolate(line1Spring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(
                  line1Spring,
                  [0, 1],
                  [32, 0]
                )}px)`,
              }}
            >
              We felt it many times.
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 78,
                fontWeight: 800,
                color: C.accent,
                letterSpacing: "-3.5px",
                marginTop: 12,
                opacity: interpolate(line2Spring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(
                  line2Spring,
                  [0, 1],
                  [40, 0]
                )}px) scale(${interpolate(line2Spring, [0, 1], [0.92, 1])})`,
              }}
            >
              We said no more.
            </div>
          </div>
        )}
      </AbsoluteFill>

      <Vignette />
      <GrainOverlay opacity={0.032} />
    </AbsoluteFill>
  );
};
