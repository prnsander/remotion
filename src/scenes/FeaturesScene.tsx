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

const FEATURES = [
  {
    icon: "⚡",
    title: "Ship fast, localize faster",
    body: "Don't let translations slow your releases.",
    tag: "Speed",
  },
  {
    icon: "🌍",
    title: "New languages in minutes",
    body: "Generate all locales at once with one click.",
    tag: "Global reach",
  },
  {
    icon: "⌨️",
    title: "Translations never block dev",
    body: "Changes merge smoothly. Devs ship, we handle the rest.",
    tag: "Developer-first",
  },
  {
    icon: "🎯",
    title: "Central translation sync",
    body: "One hub, all platforms, consistent everywhere.",
    tag: "One hub",
  },
];

const Card: React.FC<{ index: number; data: (typeof FEATURES)[number] }> = ({
  index,
  data,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = 20 + index * 15;
  const enter = spring({
    frame: frame - start,
    fps,
    config: { damping: 16, stiffness: 100 },
  });
  const scale = interpolate(enter, [0, 1], [0.9, 1]);
  return (
    <div
      style={{
        width: 440,
        padding: 32,
        backgroundColor: THEME.panel,
        border: `1px solid ${THEME.border}`,
        borderRadius: 14,
        opacity: enter,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 36 }}>{data.icon}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: THEME.white }}>
        {data.title}
      </div>
      <div style={{ fontSize: 16, color: THEME.muted, lineHeight: 1.5 }}>
        {data.body}
      </div>
      <div
        style={{
          marginTop: 6,
          alignSelf: "flex-start",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: THEME.accent,
          backgroundColor: "rgba(99,102,241,0.12)",
          borderRadius: 20,
          padding: "5px 12px",
        }}
      >
        {data.tag}
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const headOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell fontFamily={fontFamily}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 48,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: THEME.white,
            letterSpacing: -2,
            opacity: headOpacity,
          }}
        >
          Built for teams that ship.
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "440px 440px",
            gap: 24,
          }}
        >
          {FEATURES.map((f, i) => (
            <Card key={f.title} index={i} data={f} />
          ))}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
