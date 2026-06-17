import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { SceneShell, THEME, MONO } from "../components/SceneShell";

const { fontFamily } = loadFont();

const KEYS = ["hero.headline", "nav.pricing", "cta.button", "error.required"];

const SOURCE = [
  "Localize anything in minutes",
  "Pricing",
  "Get started for free",
  "This field is required",
];

const LANGS = [
  {
    flag: "🇩🇪",
    name: "German",
    values: [
      "Lokalisiere alles in Minuten",
      "Preise",
      "Kostenlos loslegen",
      "Dieses Feld ist erforderlich",
    ],
  },
  {
    flag: "🇯🇵",
    name: "Japanese",
    values: [
      "数分であらゆるものをローカライズ",
      "料金",
      "無料で始める",
      "この項目は必須です",
    ],
  },
  {
    flag: "🇫🇷",
    name: "French",
    values: [
      "Localisez tout en quelques minutes",
      "Tarifs",
      "Commencer gratuitement",
      "Ce champ est obligatoire",
    ],
  },
  {
    flag: "🇪🇸",
    name: "Spanish",
    values: [
      "Localiza todo en minutos",
      "Precios",
      "Empieza gratis",
      "Este campo es obligatorio",
    ],
  },
  {
    flag: "🇪🇪",
    name: "Estonian",
    values: [
      "Lokaliseeri kõik minutitega",
      "Hinnakiri",
      "Alusta tasuta",
      "See väli on kohustuslik",
    ],
  },
];

const SWITCH_FRAMES = [10, 40, 80, 120];

export const AITranslateScene: React.FC = () => {
  const frame = useCurrentFrame();

  // active language column derived from switch points
  let active = 0;
  let activatedAt = SWITCH_FRAMES[0];
  for (let i = 0; i < SWITCH_FRAMES.length; i++) {
    if (frame >= SWITCH_FRAMES[i]) {
      active = i;
      activatedAt = SWITCH_FRAMES[i];
    }
  }
  const lang = LANGS[active];

  const crossfade = interpolate(
    frame,
    [activatedAt, activatedAt + 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const arrowScale = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 1.2, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const footerOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panelStyle: React.CSSProperties = {
    width: 680,
    backgroundColor: THEME.panel,
    border: `1px solid ${THEME.border}`,
    borderRadius: 12,
    padding: 32,
  };

  return (
    <SceneShell fontFamily={fontFamily}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {/* left source panel */}
          <div style={panelStyle}>
            <div
              style={{ fontSize: 16, color: THEME.muted, marginBottom: 20 }}
            >
            </div>
            {KEYS.map((k, i) => {
              const opacity = interpolate(
                frame,
                [5 + i * 6, 5 + i * 6 + 12],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={k}
                  style={{
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    borderBottom: "1px solid #111",
                    opacity,
                  }}
                >
                  <span
                    style={{
                      color: THEME.accent,
                      fontSize: 13,
                      fontFamily: MONO,
                      width: 150,
                    }}
                  >
                    {k}
                  </span>
                  <span style={{ color: THEME.white, fontSize: 15 }}>
                    {SOURCE[i]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* center */}
          <div
            style={{
              width: 80,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                color: THEME.accent,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 3,
              }}
            >
              AI
            </div>
            <div
              style={{
                color: THEME.accent,
                fontSize: 36,
                transform: `scale(${arrowScale})`,
              }}
            >
              →
            </div>
            <div style={{ color: THEME.muted, fontSize: 12 }}>1 click</div>
          </div>

          {/* right translations panel */}
          <div style={panelStyle}>
            <div
              style={{
                fontSize: 16,
                color: THEME.muted,
                marginBottom: 12,
              }}
            >
              Translations · 5 languages
            </div>
            {/* tab selector */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              {LANGS.map((l, i) => (
                <div
                  key={l.name}
                  style={{
                    fontSize: 18,
                    opacity: i === active ? 1 : 0.35,
                    borderBottom: `2px solid ${
                      i === active ? THEME.accent : "transparent"
                    }`,
                    paddingBottom: 4,
                  }}
                >
                  {l.flag}
                </div>
              ))}
            </div>
            <div style={{ opacity: crossfade }}>
              {KEYS.map((k, i) => {
                const charStart = activatedAt + i * 20;
                const revealed = Math.max(
                  0,
                  Math.floor((frame - charStart) / 1.5)
                );
                const value = lang.values[i].slice(0, revealed);
                return (
                  <div
                    key={k}
                    style={{
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      borderBottom: "1px solid #111",
                    }}
                  >
                    <span
                      style={{
                        color: THEME.accent,
                        fontSize: 13,
                        fontFamily: MONO,
                        width: 150,
                      }}
                    >
                      {k}
                    </span>
                    <span style={{ color: THEME.white, fontSize: 15 }}>
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 16,
            color: THEME.muted,
            opacity: footerOpacity,
          }}
        >
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
