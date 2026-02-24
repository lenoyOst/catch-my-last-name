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
        <div className="bg-muted rounded-lg p-4 border border-border">
          <p className="text-muted-foreground text-xs mb-1">Final decoded message:</p>
          <p className="text-secondary font-bold tracking-wider" style={{ fontFamily: "var(--font-mono)", textShadow: "var(--glow-secondary)" }}>
            MISSION ACCOMPLISHED
          </p>
        </div>
      </div>
    </div>
  );
}
