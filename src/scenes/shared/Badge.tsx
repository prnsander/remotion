import React from "react";
import { FONT } from "./theme";

export const Badge: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "rgba(144,90,246,0.10)",
        border: "1px solid rgba(144,90,246,0.22)",
        borderRadius: 100,
        padding: "6px 18px",
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#905af6",
        }}
      />
      <span
        style={{
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "3px",
          color: "#905af6",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
};
