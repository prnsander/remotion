import React from "react";
import { AbsoluteFill } from "remotion";

export const Vignette: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 42%, rgba(0,0,0,0.60) 100%)",
      }}
    />
  );
};
