import { loadFont } from "@remotion/google-fonts/DMSans";

// DM Sans — package key is "DMSans" in this version of @remotion/google-fonts.
const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const FONT = fontFamily;
export const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Cascadia Code', monospace";

// Localesy brand palette
export const C = {
  bg: "#030305",
  surface: "#0c0b10",
  surfaceRaised: "#13111a",
  border: "rgba(255,255,255,0.06)",
  borderBright: "rgba(255,255,255,0.12)",
  text: "#ffffff",
  muted: "rgba(255,255,255,0.60)",
  dim: "rgba(255,255,255,0.28)",
  green: "#22c55e",
  red: "#ef4444",
  accent: "#905af6",
} as const;
