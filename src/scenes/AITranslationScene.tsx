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
import { SceneHeader } from "./shared/SceneHeader";
import { GrainOverlay } from "../components/GrainOverlay";

const KEYS = [
  "hero.headline",
  "nav.pricing",
  "cta.button",
  "error.required",
  "feature.ai",
];

const TABS = [
  { flag: "🇺🇸", code: "EN" },
  { flag: "🇩🇪", code: "DE" },
  { flag: "🇫🇷", code: "FR" },
  { flag: "🇯🇵", code: "JA" },
  { flag: "🇪🇸", code: "ES" },
  { flag: "🇪🇪", code: "ET" },
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
  [
    "数分でローカライズ",
    "料金",
    "無料で始める",
    "この項目は必須です",
    "AIによる翻訳",
  ],
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

  const cardSpring = spring({
    frame: frame - 38,
    fps,
    config: { damping: 13, stiffness: 78 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [90, 0]);

  // Active tab
  const cycle = Math.max(0, Math.floor((frame - 60) / 40));
  const active = cycle % 6;
  const switchFrame = 60 + cycle * 40;
  const crossOpacity =
    cycle === 0
      ? 1
      : interpolate(frame, [switchFrame, switchFrame + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const spin = (frame * 11) % 360;
  const spinnerVisible = frame >= 60 && frame < 149;
  const doneOpacity = interpolate(frame, [149, 157], [0, 1], {
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
          paddingTop: 80,
        }}
      >
        <SceneHeader
          label="AI-POWERED LOCALIZATION"
          headline="Batch translate with AI in seconds."
          subhead="Context-aware, on-brand tone. Auto-fills every missing string."
          headlineSize={58}
        />

        <div
          style={{
            width: 1400,
            borderRadius: "18px",
            backgroundColor: "rgba(8,8,14,0.92)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04), 0 40px 90px rgba(0,0,0,0.85)",
            marginTop: 44,
            overflow: "hidden",
            transform: `translateY(${cardY}px)`,
            opacity: interpolate(frame, [38, 56], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            position: "relative",
          }}
        >
          {/* Status indicator */}
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 28,
              display: "flex",
              alignItems: "center",
              gap: 8,
              zIndex: 2,
            }}
          >
            {spinnerVisible && (
              <>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    border: "2px solid #905af6",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    transform: `rotate(${spin}deg)`,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.40)",
                  }}
                >
                  Translating...
                </span>
              </>
            )}
            {frame >= 149 && (
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.green,
                  opacity: doneOpacity,
                }}
              >
                ✓ Done
              </span>
            )}
          </div>

          {/* Tab strip */}
          <div
            style={{
              height: 50,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              padding: "0 28px",
              gap: 4,
            }}
          >
            {TABS.map((t, i) => {
              const isActive = i === active;
              return (
                <div
                  key={t.code}
                  style={{
                    padding: "0 14px",
                    fontFamily: FONT,
                    fontSize: 14,
                    fontWeight: isActive ? 700 : 500,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "default",
                    color: isActive ? C.accent : "rgba(255,255,255,0.35)",
                    borderBottom: isActive
                      ? "2px solid #905af6"
                      : "2px solid transparent",
                    paddingBottom: isActive ? 2 : 0,
                  }}
                >
                  <span>{t.flag}</span>
                  <span>{t.code}</span>
                </div>
              );
            })}
          </div>

          {/* Key-value table */}
          <div style={{ padding: "0 28px" }}>
            {KEYS.map((k, i) => {
              const charStart = 60 + i * 12;
              const revealed = Math.max(
                0,
                Math.floor((frame - charStart) / 1.3)
              );
              const value = VALUES[active][i].slice(0, revealed);
              return (
                <div
                  key={k}
                  style={{
                    height: 54,
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 280px",
                      fontFamily: MONO,
                      fontSize: 13,
                      color: "#905af6",
                      fontWeight: 500,
                    }}
                  >
                    {k}
                  </span>
                  <div
                    style={{
                      width: 1,
                      height: 28,
                      backgroundColor: "rgba(255,255,255,0.06)",
                      margin: "0 32px",
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      fontFamily: FONT,
                      fontSize: 15,
                      color: "#ffffff",
                      opacity: crossOpacity,
                    }}
                  >
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      <Vignette />
      <GrainOverlay opacity={0.032} />
    </AbsoluteFill>
  );
};
