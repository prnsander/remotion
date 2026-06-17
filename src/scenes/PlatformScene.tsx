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
import { SceneHeader } from "./shared/SceneHeader";
import { GrainOverlay } from "../components/GrainOverlay";

const NAV = ["Dashboard", "Projects", "Translations", "Settings", "Team"];

const PROJECTS = [
  { name: "localesy.com", flags: "🇺🇸 🇩🇪 🇫🇷 🇯🇵 🇪🇸", pct: 88 },
  { name: "admin-dashboard", flags: "🇺🇸 🇩🇪 🇫🇷", pct: 62 },
  { name: "mobile-app", flags: "🇺🇸 🇯🇵 🇰🇷", pct: 34 },
];

const STATS = [
  { target: 1247, label: "Keys", suffix: "" },
  { target: 6, label: "Languages", suffix: "" },
  { target: 98, label: "% AI-filled", suffix: "" },
];

export const PlatformScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mockSpring = spring({
    frame: frame - 38,
    fps,
    config: { damping: 12, stiffness: 75 },
  });
  const mockY = interpolate(mockSpring, [0, 1], [120, 0]);

  const fadeOut = interpolate(frame, [194, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <PurpleWash />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          paddingTop: 70,
        }}
      >
        <SceneHeader
          label="MEET LOCALESY"
          headline="The smart localization platform."
          subhead="Designed to help you manage translations effortlessly for all kinds of applications. Just plug and play."
          headlineSize={62}
        />

        {/* Browser mockup */}
        <div
          style={{
            width: 1540,
            borderRadius: "14px",
            overflow: "hidden",
            marginTop: 40,
            transform: `translateY(${mockY}px)`,
            opacity: interpolate(frame, [38, 56], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.07), 0 60px 120px rgba(0,0,0,0.95), 0 0 0 1px rgba(144,90,246,0.04), 0 0 180px rgba(144,90,246,0.06)",
          }}
        >
          {/* Mac chrome */}
          <div
            style={{
              height: 44,
              backgroundColor: "#0a0a0f",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              paddingLeft: 18,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
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
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: 460,
                height: 26,
                backgroundColor: "rgba(255,255,255,0.04)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.32)",
                }}
              >
                app.localesy.com
              </span>
            </div>
          </div>

          {/* Dashboard interior */}
          <div
            style={{ height: 560, backgroundColor: "#07060c", display: "flex" }}
          >
            {/* Sidebar */}
            <div
              style={{
                width: 196,
                borderRight: "1px solid rgba(255,255,255,0.05)",
                backgroundColor: "rgba(0,0,0,0.25)",
                padding: "20px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 18px 16px",
                }}
              >
                <Img
                  src={staticFile("logo_icon.svg")}
                  style={{ width: 28, height: 28 }}
                />
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 15,
                    fontWeight: 800,
                    color: C.accent,
                  }}
                >
                  Localesy
                </span>
              </div>
              {NAV.map((item, i) => {
                const active = item === "Translations";
                const navOpacity = interpolate(
                  frame,
                  [55 + i * 8, 55 + i * 8 + 12],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                return (
                  <div
                    key={item}
                    style={{
                      height: 38,
                      padding: "0 18px",
                      fontFamily: FONT,
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      opacity: navOpacity,
                      color: active ? C.accent : "rgba(255,255,255,0.45)",
                      backgroundColor: active
                        ? "rgba(144,90,246,0.10)"
                        : "transparent",
                      borderLeft: active
                        ? "3px solid #905af6"
                        : "3px solid transparent",
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>

            {/* Main panel */}
            <div style={{ flex: 1, padding: 24 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 22,
                    fontWeight: 700,
                    color: C.text,
                  }}
                >
                  My Projects
                </span>
                <span
                  style={{
                    backgroundColor: "rgba(144,90,246,0.12)",
                    border: "1px solid rgba(144,90,246,0.22)",
                    borderRadius: "8px",
                    padding: "6px 14px",
                    fontFamily: FONT,
                    fontSize: 13,
                    color: C.accent,
                    fontWeight: 600,
                  }}
                >
                  + New
                </span>
              </div>

              {/* Project rows */}
              {PROJECTS.map((p, i) => {
                const startF = 62 + i * 18;
                const rowOpacity = interpolate(
                  frame,
                  [startF, startF + 14],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                const fillPct = interpolate(
                  frame,
                  [startF, startF + 40],
                  [0, p.pct],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                return (
                  <div
                    key={p.name}
                    style={{
                      height: 58,
                      backgroundColor: "rgba(255,255,255,0.02)",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      margin: "4px 0",
                      padding: "0 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      opacity: rowOpacity,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: FONT,
                          fontSize: 15,
                          fontWeight: 600,
                          color: "#fff",
                        }}
                      >
                        {p.name}
                      </div>
                      <div style={{ fontSize: 18, marginTop: 2 }}>
                        {p.flags}
                      </div>
                    </div>
                    <div
                      style={{
                        height: 5,
                        width: 200,
                        backgroundColor: "rgba(255,255,255,0.06)",
                        borderRadius: "3px",
                      }}
                    >
                      <div
                        style={{
                          height: 5,
                          width: `${fillPct}%`,
                          backgroundColor: "#905af6",
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 15,
                        fontWeight: 700,
                        color: C.accent,
                      }}
                    >
                      {p.pct}%
                    </span>
                  </div>
                );
              })}

              {/* Stats */}
              <div style={{ display: "flex", gap: 32, marginTop: 24 }}>
                {STATS.map((s) => {
                  const val = Math.round(
                    interpolate(frame, [118, 158], [0, s.target], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  );
                  const statOpacity = interpolate(frame, [118, 132], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  return (
                    <div
                      key={s.label}
                      style={{
                        width: 160,
                        padding: "18px 24px",
                        backgroundColor: "rgba(255,255,255,0.02)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.05)",
                        opacity: statOpacity,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: FONT,
                          fontSize: 42,
                          fontWeight: 800,
                          color: C.accent,
                        }}
                      >
                        {val}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT,
                          fontSize: 13,
                          color: "rgba(255,255,255,0.40)",
                          marginTop: 4,
                        }}
                      >
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

      <Vignette />
      <GrainOverlay opacity={0.032} />
      <AbsoluteFill
        style={{ backgroundColor: "#000000", opacity: fadeOut }}
      />
    </AbsoluteFill>
  );
};
