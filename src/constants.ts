import { Easing } from "remotion";

export const COLORS = {
  bg: "#0a0a0a",
  bgSecondary: "#111111",
  accent: "#C8FF00",
  text: "#ffffff",
  muted: "#666666",
  overlay: "rgba(0,0,0,0.5)",
};

export const TYPE = {
  display: 120,
  headline: 72,
  subheadline: 48,
  body: 32,
  caption: 24,
};

export const EASE = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  inOutCubic: Easing.bezier(0.65, 0, 0.35, 1),
  outBack: Easing.bezier(0.34, 1.56, 0.64, 1),
};

export const TIMING = {
  fadeIn: 20,
  fadeOut: 15,
  sceneTransition: 18,
  textDelay: 8,
  staggerDelay: 6,
};
