import { useState, useEffect } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ENCRYPTED = "XLIWI GSQFMREXMSR MW 7 14 21";
const SHIFT_ANSWER = 4;
const DECODED = "THESE COMBINATION IS 7 14 21";

export default function CipherPuzzle({ onSolve }: { onSolve: () => void }) {
  const [shift, setShift] = useState(0);
  const [solved, setSolved] = useState(false);
  const [inputCode, setInputCode] = useState(["", "", ""]);
  const [codeError, setCodeError] = useState(false);

  const decrypt = (text: string, s: number) => {
    return text
      .split("")
      .map((c) => {
        if (c >= "A" && c <= "Z") {
          const i = (c.charCodeAt(0) - 65 - s + 26) % 26;
          return String.fromCharCode(i + 65);
        }
        return c;
      })
      .join("");
  };

  const decrypted = decrypt(ENCRYPTED, shift);
  const isCorrectShift = shift === SHIFT_ANSWER;

  const handleSubmitCode = () => {
    if (inputCode[0] === "7" && inputCode[1] === "14" && inputCode[2] === "21") {
      setSolved(true);
      setTimeout(onSolve, 2000);
    } else {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 1000);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setShift((s) => (s + 1) % 26);
      if (e.key === "ArrowDown") setShift((s) => (s - 1 + 26) % 26);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg text-center">
        <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">
          Puzzle #1 — Cipher Decoder
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

        {/* Cipher wheel */}
        <div className="mb-6">
          <p className="text-muted-foreground text-xs mb-3">
            Rotate the cipher wheel (↑↓ keys or buttons) — Shift: {shift}
          </p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <button
              onClick={() => setShift((s) => (s - 1 + 26) % 26)}
              className="w-10 h-10 rounded bg-muted text-foreground text-xl hover:bg-muted/80 transition-colors"
            >
              −
            </button>
            <div
              className="bg-card border border-border rounded-lg px-6 py-3 min-w-[80px]"
              style={{ boxShadow: isCorrectShift ? "var(--glow-primary)" : "none" }}
            >
              <span className="text-3xl font-black text-primary" style={{ fontFamily: "var(--font-display)" }}>
                {shift}
              </span>
            </div>
            <button
              onClick={() => setShift((s) => (s + 1) % 26)}
              className="w-10 h-10 rounded bg-muted text-foreground text-xl hover:bg-muted/80 transition-colors"
            >
              +
            </button>
          </div>

          {/* Letter mapping preview */}
          <div className="overflow-x-auto pb-2">
            <div className="inline-flex gap-0.5 text-[10px] tracking-tight">
              {ALPHABET.slice(0, 13).map((l, i) => (
                <div key={i} className="flex flex-col items-center w-5">
                  <span className="text-muted-foreground">{l}</span>
                  <span className="text-primary">↓</span>
                  <span className="text-foreground font-bold">{ALPHABET[(i - shift + 26) % 26]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decrypted result */}
        <div
          className={`rounded-lg p-4 mb-6 transition-all ${isCorrectShift ? "bg-primary/10 border border-primary/30" : "bg-muted"}`}
        >
          <p className="text-muted-foreground text-xs mb-1">Decoded output:</p>
          <p
            className={`text-lg tracking-[0.2em] font-bold ${isCorrectShift ? "text-primary" : "text-foreground/60"}`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {decrypted}
          </p>
        </div>

        {/* Combination lock */}
        {isCorrectShift && !solved && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-muted-foreground text-xs mb-3">Enter the combination:</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              {inputCode.map((val, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={val}
                  onChange={(e) => {
                    const next = [...inputCode];
                    next[i] = e.target.value.replace(/\D/g, "");
                    setInputCode(next);
                  }}
                  className={`w-14 h-14 text-center text-2xl font-bold rounded-lg bg-card border-2 text-foreground outline-none transition-colors ${
                    codeError ? "border-accent" : "border-border focus:border-primary"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                />
              ))}
            </div>
            <button
              onClick={handleSubmitCode}
              className="px-8 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold tracking-wider hover:opacity-90 transition-opacity"
              style={{ fontFamily: "var(--font-display)" }}
            >
              UNLOCK
            </button>
          </div>
        )}

        {solved && (
          <div className="animate-in fade-in duration-700">
            <p className="text-primary text-2xl font-bold" style={{ fontFamily: "var(--font-display)", textShadow: "var(--glow-primary)" }}>
              ✓ Unlocked!
            </p>
            <p className="text-secondary text-sm mt-2" style={{ textShadow: "var(--glow-secondary)" }}>
              Proceeding to final challenge...
            </p>
          </div>
        )}

        {/* Hint */}
        <p className="text-muted-foreground/50 text-[10px] mt-8">
          Remember the hint: MADUR PITUACH 1
        </p>
      </div>
    </div>
  );
}
