import { useState } from "react";

export default function VictoryScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div
          className="text-6xl mb-6 animate-in zoom-in duration-700"
        >
          🔓
        </div>
        <h1
          className="text-3xl md:text-4xl font-black text-primary mb-4 tracking-wider"
          style={{ fontFamily: "var(--font-display)", textShadow: "var(--glow-primary)" }}
        >
          ESCAPE COMPLETE
        </h1>
        <p className="text-foreground/70 text-sm leading-relaxed mb-6">
          You've cracked all the puzzles and escaped the room.
          Congratulations, agent.
        </p>
        <div className="bg-muted rounded-lg p-6 border border-border">
          <p className="text-foreground/80 text-lg font-bold tracking-wider mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Your gamad is from:
          </p>
          <svg viewBox="0 0 200 200" width="120" height="120" className="mx-auto">
            {/* North Star / 8-pointed star */}
            <polygon
              points="100,10 112,75 175,50 125,100 175,150 112,125 100,190 88,125 25,150 75,100 25,50 88,75"
              fill="hsl(45, 100%, 50%)"
              stroke="hsl(45, 100%, 65%)"
              strokeWidth="1.5"
              style={{ filter: "drop-shadow(0 0 12px hsl(45 100% 50% / 0.6))" }}
            />
            <circle cx="100" cy="100" r="8" fill="hsl(220, 20%, 10%)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
