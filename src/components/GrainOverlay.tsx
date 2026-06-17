import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { noise3D } from "@remotion/noise";
import { AbsoluteFill } from "remotion";

// Performance note: renders at 1/8 resolution grid. For full 1920x1080 grain,
// replace with a static grain PNG in public/ using <Img> at low opacity.
export const GrainOverlay: React.FC<{ opacity?: number }> = ({
  opacity = 0.04,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const cellSize = 8;

  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay" }}>
      {Array.from({ length: Math.ceil(height / cellSize) }).map((_, y) =>
        Array.from({ length: Math.ceil(width / cellSize) }).map((_, x) => {
          const n = noise3D("grain", x / 50, y / 50, frame / 10);
          const brightness = Math.floor(((n + 1) / 2) * 255);
          return (
            <div
              key={`${x}-${y}`}
              style={{
                position: "absolute",
                left: x * cellSize,
                top: y * cellSize,
                width: cellSize,
                height: cellSize,
                backgroundColor: `rgb(${brightness},${brightness},${brightness})`,
              }}
            />
          );
        })
      )}
    </AbsoluteFill>
  );
};
