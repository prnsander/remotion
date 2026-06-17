import React from "react";
import { AbsoluteFill } from "remotion";

export const PurpleWash: React.FC<{ opacity?: number }> = ({
  opacity = 1,
}) => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(70% 60% at 50% 42%, rgba(144,90,246,0.11) 0%, transparent 72%)",
        }}
      />
    </AbsoluteFill>
  );
};
