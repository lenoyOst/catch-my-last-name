import { useState } from "react";
import LetterGame from "@/components/LetterGame";
import CipherPuzzle from "@/components/CipherPuzzle";
import VictoryScreen from "@/components/VictoryScreen";

type Stage = "intro" | "puzzle1" | "puzzle2" | "victory";

const Index = () => {
  const [stage, setStage] = useState<Stage>("intro");

  if (stage === "puzzle1") return <CipherPuzzle onSolve={() => setStage("puzzle2")} />;
  if (stage === "puzzle2") return <LetterGame onSolve={() => setStage("victory")} />;
  if (stage === "victory") return <VictoryScreen />;

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
          Puzzle #1 — Caesar Cipher
        </p>
        <p className="text-foreground/70 mb-8 text-sm leading-relaxed">
          Decode the intercepted cipher message and enter the hidden combination to proceed.
        </p>
        <button
          onClick={() => setStage("puzzle1")}
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
