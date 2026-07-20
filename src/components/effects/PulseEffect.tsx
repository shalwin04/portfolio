"use client";

interface PulseEffectProps {
  color?: string;
  size?: number;
  className?: string;
}

export default function PulseEffect({
  color = "#00e5ff",
  size = 20,
  className = "",
}: PulseEffectProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Core */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />

      {/* Pulse rings */}
      <div
        className="absolute inset-0 rounded-full animate-ping"
        style={{
          backgroundColor: color,
          opacity: 0.4,
        }}
      />
      <div
        className="absolute inset-0 rounded-full animate-ping"
        style={{
          backgroundColor: color,
          opacity: 0.2,
          animationDelay: "0.5s",
        }}
      />
    </div>
  );
}
