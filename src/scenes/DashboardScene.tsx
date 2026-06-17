import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { SceneShell, THEME } from "../components/SceneShell";

const { fontFamily } = loadFont();

const NAV = ["Dashboard", "Projects", "Translations", "Settings"];

const PROJECTS = [
  { name: "localesy.com", target: 88 },
  { name: "admin-dashboard", target: 60 },
  { name: "mobile-app", target: 34 },
];

const STATS = [
  { value: 1247, label: "Keys", display: (n: number) => n.toLocaleString() },
  { value: 6, label: "Languages", display: (n: number) => `${n}` },
  { value: 98, label: "Auto-filled", display: (n: number) => `${n}%` },
];

export const DashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1 },
  });
  const translateY = interpolate(enter, [0, 1], [120, 0]);

  return (
    <SceneShell fontFamily={fontFamily}>
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div
          style={{
            width: 1540,
            borderRadius: 12,
            backgroundColor: THEME.bg,
            border: `1px solid ${THEME.border}`,
            overflow: "hidden",
            transform: `translateY(${translateY}px)`,
            opacity: enter,
          }}
        >
          {/* chrome */}
          <div
            style={{
              backgroundColor: THEME.surface,
              height: 48,
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
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: c,
                }}
              />
            ))}
            <div
              style={{
                marginLeft: 20,
                backgroundColor: THEME.bg,
                border: `1px solid ${THEME.border}`,
                borderRadius: 6,
                padding: "4px 16px",
                fontSize: 13,
                color: THEME.muted,
              }}
            >
              app.localesy.com
            </div>
          </div>

          <div style={{ display: "flex", height: 620 }}>
            {/* sidebar */}
            <div
              style={{
                width: 240,
                backgroundColor: THEME.panel,
                borderRight: `1px solid ${THEME.border}`,
                padding: "28px 0",
              }}
            >
              <div
                style={{
                  color: THEME.accent,
                  fontWeight: 800,
                  fontSize: 20,
                  padding: "0 24px",
                  marginBottom: 32,
                }}
              >
                Localesy
              </div>
              {NAV.map((item, i) => {
                const opacity = interpolate(
                  frame,
                  [10 + i * 8, 10 + i * 8 + 12],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                const active = item === "Translations";
                return (
                  <div
                    key={item}
                    style={{
                      opacity,
                      fontSize: 14,
                      color: active ? THEME.white : THEME.muted,
                      padding: "12px 24px",
                      borderLeft: `4px solid ${
                        active ? THEME.accent : "transparent"
                      }`,
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>

            {/* main */}
            <div style={{ flex: 1, padding: 40 }}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: THEME.white,
                  marginBottom: 28,
                }}
              >
                My Projects
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginBottom: 48,
                }}
              >
                {PROJECTS.map((p, i) => {
                  const start = 25 + i * 15;
                  const opacity = interpolate(
                    frame,
                    [start, start + 14],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  );
                  const fill = interpolate(
                    frame,
                    [40, 80],
                    [0, p.target],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  );
                  return (
                    <div
                      key={p.name}
                      style={{
                        height: 64,
                        backgroundColor: THEME.card,
                        borderRadius: 8,
                        border: `1px solid ${THEME.border}`,
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 24,
                        opacity,
                      }}
                    >
                      <div
                        style={{
                          width: 200,
                          color: THEME.white,
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                      >
                        {p.name}
                      </div>
                      <div style={{ fontSize: 18, width: 130 }}>
                        🇺🇸 🇩🇪 🇯🇵 🇫🇷
                      </div>
                      <div
                        style={{
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: THEME.border,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${fill}%`,
                            height: "100%",
                            backgroundColor: THEME.accent,
                            borderRadius: 3,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: 54,
                          textAlign: "right",
                          color: THEME.accent,
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {Math.round(fill)}%
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* stats */}
              <div style={{ display: "flex", gap: 48 }}>
                {STATS.map((s) => {
                  const n = interpolate(frame, [60, 120], [0, s.value], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  return (
                    <div key={s.label} style={{ width: 120 }}>
                      <div
                        style={{
                          fontSize: 48,
                          fontWeight: 800,
                          color: THEME.white,
                        }}
                      >
                        {s.display(Math.round(n))}
                      </div>
                      <div style={{ fontSize: 14, color: THEME.muted }}>
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
