"use client";

interface NeonLineProps {
  color?: string;
  width?: string;
  height?: string;
  direction?: "horizontal" | "vertical";
  animate?: boolean;
  className?: string;
}

export default function NeonLine({
  color = "#00e5ff",
  width = "100%",
  height = "2px",
  direction = "horizontal",
  animate = false,
  className = "",
}: NeonLineProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: isHorizontal ? width : height,
        height: isHorizontal ? height : width,
      }}
    >
      {/* Main line */}
      <div
        className={`absolute inset-0 ${animate ? "animate-pulse" : ""}`}
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        }}
      />

      {/* Glow overlay */}
      <div
        className="absolute inset-0 blur-sm"
        style={{
          backgroundColor: color,
          opacity: 0.5,
        }}
      />
    </div>
  );
}
