import { useState } from "react";
import LetterGame from "@/components/LetterGame";

const Index = () => {
  const [started, setStarted] = useState(false);

  if (started) return <LetterGame />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <h1
          className="text-4xl md:text-5xl font-black tracking-wider text-primary mb-4"
          style={{ fontFamily: "var(--font-display)", textShadow: "var(--glow-primary)" }}
        >
          ESCAPE ROOM
        </h1>
        <p className="text-muted-foreground mb-2 text-sm tracking-widest uppercase">
          Puzzle #1 — Catch the Name
        </p>
        <p className="text-foreground/70 mb-8 text-sm leading-relaxed">
          Letters fall from above. Move your mouse to catch them with the paddle.
          Spell the correct last name to unlock the next hint.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold tracking-wider hover:opacity-90 transition-opacity"
          style={{ fontFamily: "var(--font-display)", boxShadow: "var(--glow-primary)" }}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default Index;
