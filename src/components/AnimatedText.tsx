import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { EASE } from "../constants";

interface AnimatedTextProps {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  style?: React.CSSProperties;
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  startFrame = 0,
  duration = 24,
  style,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const actualStart = startFrame + delay;

  const opacity = interpolate(frame, [actualStart, actualStart + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE.outExpo,
  });

  const translateY = interpolate(
    frame,
    [actualStart, actualStart + duration],
    [40, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE.outExpo,
    }
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
