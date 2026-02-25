import { useState } from "react";
import caesarImage from "@/assets/caesar-cipher-shift4.png";

const ENCRYPTED = "YB MW MQTSVXERX";
const ANSWER = "ux is important";

export default function CipherPuzzle({ onSolve }: { onSolve: () => void }) {
  const [solved, setSolved] = useState(false);
  const [guess, setGuess] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (guess.trim().toLowerCase() === ANSWER) {
      setSolved(true);
      setTimeout(onSolve, 2000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg text-center">
        <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">
          Puzzle #1 — Caesar Cipher
        </p>
        <h2
          className="text-2xl md:text-3xl font-black text-primary mb-6 tracking-wider"
          style={{ fontFamily: "var(--font-display)", textShadow: "var(--glow-primary)" }}
        >
          CRACK THE CODE
        </h2>

        {/* Encrypted message */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <p className="text-muted-foreground text-xs mb-1">Intercepted message:</p>
          <p className="text-foreground text-lg tracking-[0.2em] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
            {ENCRYPTED}
          </p>
        </div>

        {/* Caesar cipher reference image */}
        <div className="mb-6">
          <img
            src={caesarImage}
            alt="Caesar cipher wheel with shift of 4"
            className="mx-auto rounded-lg border border-border max-w-[280px] w-full"
          />
          <p className="text-muted-foreground text-xs mt-2">Hint: Shift = 4</p>
        </div>

        {/* Answer input */}
        {!solved && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-muted-foreground text-xs mb-3">Type the decoded message to proceed:</p>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter decoded message..."
              className={`w-full px-4 py-3 text-center text-lg rounded-lg bg-card border-2 text-foreground outline-none transition-colors mb-4 ${
                error ? "border-accent" : "border-border focus:border-primary"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            />
            <button
              onClick={handleSubmit}
              className="px-8 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold tracking-wider hover:opacity-90 transition-opacity"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SUBMIT
            </button>
          </div>
        )}

        {solved && (
          <div className="animate-in fade-in duration-700">
            <p className="text-primary text-2xl font-bold" style={{ fontFamily: "var(--font-display)", textShadow: "var(--glow-primary)" }}>
              ✓ Correct!
            </p>
            <p className="text-secondary text-sm mt-2" style={{ textShadow: "var(--glow-secondary)" }}>
              Proceeding to final challenge...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
