"use client";

import { ReactNode } from "react";

interface GlowTextProps {
  children: ReactNode;
  color?: string;
  intensity?: "subtle" | "medium" | "strong";
  className?: string;
}

export default function GlowText({
  children,
  color = "#00e5ff",
  intensity = "medium",
  className = "",
}: GlowTextProps) {
  const intensityMap = {
    subtle: "0 0 10px",
    medium: "0 0 10px, 0 0 20px",
    strong: "0 0 10px, 0 0 20px, 0 0 40px",
  };

  const shadow = intensityMap[intensity];
  const colorWithAlpha = color.replace("#", "");
  const rgbColor = `rgba(${parseInt(colorWithAlpha.slice(0, 2), 16)}, ${parseInt(colorWithAlpha.slice(2, 4), 16)}, ${parseInt(colorWithAlpha.slice(4, 6), 16)}, 0.5)`;

  return (
    <span
      className={className}
      style={{
        textShadow: shadow
          .split(", ")
          .map((s) => `${s} ${rgbColor}`)
          .join(", "),
        color: color,
      }}
    >
      {children}
    </span>
  );
}
