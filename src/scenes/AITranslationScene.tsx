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

const KEYS = [
  "hero.headline",
  "nav.pricing",
  "cta.button",
  "error.required",
  "feature.ai",
];

const LANGS = [
  { flag: "🇺🇸", name: "English", code: "EN" },
  { flag: "🇩🇪", name: "German", code: "DE" },
  { flag: "🇫🇷", name: "French", code: "FR" },
  { flag: "🇯🇵", name: "Japanese", code: "JA" },
  { flag: "🇪🇸", name: "Spanish", code: "ES" },
  { flag: "🇪🇪", name: "Estonian", code: "ET" },
];

// 6 languages × 5 keys
const VALUES: string[][] = [
  // EN
  [
    "Localize anything in just minutes",
    "Pricing",
    "Get started for free",
    "This field is required",
    "AI-powered translations",
  ],
  // DE
  [
    "In Minuten lokalisieren",
    "Preise",
    "Kostenlos loslegen",
    "Dieses Feld ist erforderlich",
    "KI-gestützte Übersetzungen",
  ],
  // FR
  [
    "Localisez en quelques minutes",
    "Tarifs",
    "Commencer gratuitement",
    "Ce champ est obligatoire",
    "Traductions par IA",
  ],
  // JA
  ["数分でローカライズ", "料金", "無料で始める", "この項目は必須です", "AIによる翻訳"],
  // ES
  [
    "Localiza en minutos",
    "Precios",
    "Empieza gratis",
    "Este campo es obligatorio",
    "Traducciones con IA",
  ],
  // ET
  [
    "Lokaliseeri minutitega",
    "Hinnakiri",
    "Alusta tasuta",
    "See väli on kohustuslik",
    "AI-põhised tõlked",
  ],
];

export const AITranslationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cycle through languages — highlights the active pill on the right.
  const cycle = Math.max(0, Math.floor((frame - 60) / 40));
  const active = cycle % 6;

  const headSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const headX = interpolate(headSpring, [0, 1], [-40, 0]);
  const headOpacity = interpolate(headSpring, [0, 1], [0, 1]);

  // Pulsing diamond on the divider (45-frame loop).
  const diamondScale = interpolate(
    frame % 45,
    [0, 22.5, 45],
    [0.8, 1.2, 0.8]
  );

  const sourceLabel: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "5px",
    color: "rgba(255,255,255,0.25)",
  };

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <PurpleWash />

      {/* LEFT HALF — source */}
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "rgba(6,5,10,0.98)",
          padding: "0 100px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
         
          <span
            style={{
              fontFamily: FONT,
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
            }}
          >
          </span>
        </div>

        <div
          style={{
            fontFamily: FONT,
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: "-1.5px",
            color: "#ffffff",
            lineHeight: 1.1,
            marginTop: 36,
            maxWidth: 640,
            opacity: headOpacity,
            transform: `translateX(${headX}px)`,
            marginBottom: 56,
          }}
        >
          Localize your product in every language.
        </div>

        <div style={{ marginTop: 56 }}>
          {KEYS.map((k, i) => {
            const rowSpring = spring({
              frame: frame - (24 + i * 8),
              fps,
              config: { damping: 18, stiffness: 90 },
            });
            const rowX = interpolate(rowSpring, [0, 1], [-30, 0]);
            const rowOpacity = interpolate(rowSpring, [0, 1], [0, 1]);
            return (
              <div
                key={k}
                style={{
                  height: 80,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  opacity: rowOpacity,
                  transform: `translateX(${rowX}px)`,
                }}
              >
                <span
                  style={{
                    flex: "0 0 240px",
                    fontFamily: MONO,
                    fontSize: 15,
                    color: "#905af6",
                    fontWeight: 500,
                  }}
                >
                  {k}
                </span>
                <span
                  style={{
                    flex: 1,
                    fontFamily: FONT,
                    fontSize: 20,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {VALUES[0][i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT HALF — translations */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "rgba(6,5,10,0.98)",
          padding: "173px 80px 0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Compact horizontal language tabs — TRANSLATIONS label folded in as prefix */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          <span style={{ ...sourceLabel, marginRight: 12 }}>TRANSLATIONS</span>
          {LANGS.map((l, i) => (
            <div
              key={l.code}
              style={{
                height: 40,
                padding: "0 12px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
                backgroundColor:
                  i === active ? "rgba(144,90,246,0.15)" : "transparent",
                border: `1px solid ${
                  i === active
                    ? "rgba(144,90,246,0.30)"
                    : "rgba(255,255,255,0.07)"
                }`,
              }}
            >
              <span style={{ fontSize: 14 }}>{l.flag}</span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 13,
                  fontWeight: 700,
                  color: i === active ? C.accent : "rgba(255,255,255,0.35)",
                }}
              >
                {l.code}
              </span>
            </div>
          ))}
        </div>

        {/* All 5 translated keys for the active language */}
        {KEYS.map((k, i) => {
          const switchF = 60 + active * 40;
          const rowOpacity = interpolate(
            frame,
            [switchF, switchF + 14],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={k}
              style={{
                height: 80,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: rowOpacity,
              }}
            >
              <span
                style={{
                  flex: "0 0 240px",
                  fontFamily: MONO,
                  fontSize: 15,
                  color: C.accent,
                  fontWeight: 500,
                }}
              >
                {k}
              </span>
              <span
                style={{
                  flex: 1,
                  fontFamily: FONT,
                  fontSize: 20,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {VALUES[active][i]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Vertical divider */}
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 0,
          bottom: 0,
          width: 1,
          backgroundColor: "rgba(255,255,255,0.06)",
        }}
      />
      {/* Pulsing diamond centered on the divider */}
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 540,
          transform: `translate(-50%, -50%) scale(${diamondScale})`,
          fontSize: 14,
          lineHeight: 1,
          color: "#905af6",
        }}
      >
      </div>

      <Vignette />
      <GrainOverlay opacity={0.032} />
    </AbsoluteFill>
  );
};
