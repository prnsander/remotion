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

const CardBottom: React.FC<{
  tag: string;
  title: string;
  desc: string;
}> = ({ tag, title, desc }) => (
  <div style={{ position: "absolute", bottom: 0, left: 0, padding: "28px 32px" }}>
    <div
      style={{
        fontFamily: FONT,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "3px",
        color: C.accent,
      }}
    >
      {tag}
    </div>
    <div
      style={{
        fontFamily: FONT,
        fontSize: 21,
        fontWeight: 700,
        color: "#ffffff",
        marginTop: 6,
        letterSpacing: "-0.5px",
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontFamily: FONT,
        fontSize: 14,
        color: "rgba(255,255,255,0.52)",
        marginTop: 4,
        lineHeight: 1.55,
      }}
    >
      {desc}
    </div>
  </div>
);

const cardShell: React.CSSProperties = {
  borderRadius: "20px",
  overflow: "hidden",
  backgroundColor: "rgba(8,8,14,0.96)",
  border: "1px solid rgba(255,255,255,0.14)",
  boxShadow: "0 24px 60px rgba(0,0,0,0.75)",
  position: "relative",
  height: 460,
};

const FLAGS = ["🇩🇪", "🇫🇷", "🇯🇵", "🇪🇸", "🇰🇷"];
const FLAG_POS = [
  { top: "15%", left: "20%" },
  { top: "10%", right: "18%" },
  { top: "35%", right: "8%" },
  { top: "55%", left: "12%" },
  { top: "50%", right: "15%" },
];

export const UseCasesBentoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardAnim = (i: number) => {
    const s = spring({
      frame: frame - (28 + i * 18),
      fps,
      config: { damping: 14, stiffness: 90 },
    });
    return {
      transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})`,
      opacity: interpolate(s, [0, 1], [0, 1]),
    };
  };

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <PurpleWash />

      {/* Floating label */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: badgeOpacity,
          zIndex: 4,
          fontFamily: FONT,
          fontSize: 13,
          fontWeight: 700,
          color: C.accent,
          letterSpacing: "4px",
        }}
      >
        USE CASES
      </div>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: 90,
          paddingBottom: 60,
        }}
      >
        <div
          style={{
            width: 1280,
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gridTemplateRows: "460px 460px",
            gap: "18px",
          }}
        >
          {/* Card TL */}
          <div style={{ ...cardShell, ...cardAnim(0) }}>
            <AbsoluteFill
              style={{
                height: "55%",
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* terminal mockup */}
            <div
              style={{
                position: "absolute",
                top: 40,
                left: 32,
                width: 340,
                height: 140,
                backgroundColor: "rgba(0,0,0,0.6)",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
                boxShadow: "0 0 40px rgba(144,90,246,0.12)",
              }}
            >
              <div
                style={{
                  height: 26,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  paddingLeft: 12,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: c,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  padding: "12px 14px",
                  fontFamily: MONO,
                  fontSize: 13,
                  lineHeight: 1.9,
                }}
              >
                <div style={{ color: "rgba(255,255,255,0.7)" }}>
                  $ localesy push
                </div>
                <div style={{ color: C.accent }}>✓ 12 keys synced</div>
              </div>
            </div>
            <AbsoluteFill
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(8,8,14,0.98) 72%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: "28px 32px",
              }}
            >
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.15,
                }}
              >
                Translations, off your plate.
              </div>
            </div>
          </div>

          {/* Card TR */}
          <div style={{ ...cardShell, ...cardAnim(1) }}>
            <div
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 200,
                height: 200,
              }}
            >
              <div
                style={{
                  borderRadius: "50%",
                }}
              >
              <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="rgba(144,90,246,0.08)" />
                {[40, 70, 100, 130, 160].map((cy) => (
                  <ellipse
                    key={`h${cy}`}
                    cx="100"
                    cy={cy}
                    rx={Math.sqrt(Math.max(0, 90 * 90 - (cy - 100) * (cy - 100)))}
                    ry={Math.sqrt(Math.max(0, 90 * 90 - (cy - 100) * (cy - 100))) / 4}
                    fill="none"
                    stroke="rgba(144,90,246,0.18)"
                    strokeWidth="1"
                  />
                ))}
                {[30, 60, 90].map((rx) => (
                  <ellipse
                    key={`v${rx}`}
                    cx="100"
                    cy="100"
                    rx={rx}
                    ry="90"
                    fill="none"
                    stroke="rgba(144,90,246,0.18)"
                    strokeWidth="1"
                  />
                ))}
              </svg>
              </div>
            </div>
            {FLAGS.map((f, i) => {
              const y = interpolate(
                (frame + i * 30) % 90,
                [0, 45, 90],
                [-3, 3, -3]
              );
              return (
                <div
                  key={f}
                  style={{
                    position: "absolute",
                    ...FLAG_POS[i],
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "rgba(144,90,246,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    transform: `translateY(${y}px)`,
                  }}
                >
                  {f}
                </div>
              );
            })}
            <AbsoluteFill
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(8,8,14,0.98) 72%)",
              }}
            />
            <CardBottom
              tag="Global reach"
              title="New languages in minutes"
              desc="Generate all locales at once."
            />
          </div>

          {/* Card BL */}
          <div style={{ ...cardShell, ...cardAnim(2) }}>
            <svg
              width="100%"
              height="200"
              viewBox="0 0 420 200"
              style={{
                position: "absolute",
                top: 20,
                left: 0,
              }}
            >
              <line
                x1="60"
                y1="80"
                x2="300"
                y2="80"
                stroke="rgba(144,90,246,0.25)"
                strokeWidth="2"
              />
              <path
                d="M180,80 Q200,80 220,120 L340,120"
                fill="none"
                stroke="rgba(144,90,246,0.20)"
                strokeWidth="2"
              />
              {[60, 180, 300].map((cx) => (
                <circle
                  key={cx}
                  cx={cx}
                  cy="80"
                  r="8"
                  fill="rgba(144,90,246,0.6)"
                />
              ))}
              <circle cx="340" cy="120" r="8" fill="rgba(34,197,94,0.6)" />
              {/* commit pulse */}
              <circle
                cx="300"
                cy="80"
                r="10"
                fill="none"
                stroke="rgba(144,90,246,0.6)"
                strokeWidth="2"
                opacity={interpolate(frame % 45, [0, 22, 44], [0.8, 0, 0])}
                transform={`scale(${interpolate(
                  frame % 45,
                  [0, 44],
                  [1, 2.5]
                )})`}
                style={{ transformOrigin: "300px 80px" }}
              />
            </svg>
            <AbsoluteFill
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(8,8,14,0.98) 72%)",
              }}
            />
            <CardBottom
              tag="Developer-first"
              title="Translations never block dev"
              desc="Changes merge smoothly. Devs ship."
            />
          </div>

          {/* Card BR */}
          <div style={{ ...cardShell, ...cardAnim(3) }}>
            {(() => {
              const pulse = interpolate(
                frame % 60,
                [0, 30, 60],
                [0.25, 0.65, 0.25]
              );
              const nodes = [
                { top: "15%", left: "15%", label: "Web" },
                { top: "15%", right: "15%", label: "Git" },
                { bottom: "18%", left: "15%", label: "CLI" },
                { bottom: "18%", right: "15%", label: "API" },
              ];
              return (
                <>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 420 360"
                    style={{ position: "absolute", inset: 0 }}
                  >
                    {[
                      [63, 54],
                      [357, 54],
                      [63, 295],
                      [357, 295],
                    ].map(([x, y], i) => (
                      <line
                        key={i}
                        x1={x}
                        y1={y}
                        x2="210"
                        y2="155"
                        stroke="rgba(144,90,246,0.4)"
                        strokeWidth="1"
                        opacity={pulse}
                      />
                    ))}
                  </svg>
                  {nodes.map((n) => (
                    <div
                      key={n.label}
                      style={{
                        position: "absolute",
                        top: n.top,
                        bottom: n.bottom,
                        left: n.left,
                        right: n.right,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          border: "1px solid rgba(255,255,255,0.06)",
                          backgroundColor: "rgba(255,255,255,0.03)",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: FONT,
                          fontSize: 11,
                          color: "rgba(255,255,255,0.40)",
                        }}
                      >
                        {n.label}
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      width: 48,
                      height: 48,
                      backgroundColor: "rgba(144,90,246,0.14)",
                      border: "1px solid rgba(144,90,246,0.30)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: FONT,
                      fontWeight: 800,
                      fontSize: 18,
                      color: C.accent,
                    }}
                  >
                    L
                  </div>
                </>
              );
            })()}
            <AbsoluteFill
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(8,8,14,0.98) 72%)",
                pointerEvents: "none",
              }}
            />
            <CardBottom
              tag="One hub"
              title="Central translation sync"
              desc="One source of truth across all platforms."
            />
          </div>
        </div>
      </AbsoluteFill>

      <Vignette />
      <GrainOverlay opacity={0.032} />
    </AbsoluteFill>
  );
};
