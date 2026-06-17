import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE } from "../constants";

export function useFadeIn(startFrame = 0, durationFrames = 20) {
  const frame = useCurrentFrame();
  return interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.outExpo,
  });
}

export function useSlideUp(startFrame = 0, durationFrames = 24, distance = 60) {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE.outExpo,
    }
  );
  return {
    opacity: progress,
    transform: `translateY(${(1 - progress) * distance}px)`,
  };
}

export function useScaleIn(startFrame = 0, durationFrames = 20, from = 0.85) {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [from, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE.outBack,
    }
  );
  return {
    transform: `scale(${progress})`,
    opacity: interpolate(frame, [startFrame, startFrame + 8], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  };
}

export function useSpringScale(startFrame = 0) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 1 },
  });
  return { transform: `scale(${scale})` };
}
