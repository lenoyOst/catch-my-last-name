import { useState, useEffect, useRef, useCallback } from "react";

interface FallingLetter {
  id: number;
  char: string;
  x: number;
  y: number;
  speed: number;
}

const TARGET = "bendersky";
const RELEVANT = new Set(TARGET.split(""));
const ALL_LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

// 60% chance relevant letter, 40% random
function pickLetter(): string {
  if (Math.random() < 0.6) {
    const arr = TARGET.split("");
    return arr[Math.floor(Math.random() * arr.length)];
  }
  return ALL_LETTERS[Math.floor(Math.random() * ALL_LETTERS.length)];
}

export default function LetterGame({ onSolve }: {onSolve?: () => void;}) {
  const [letters, setLetters] = useState<FallingLetter[]>([]);
  const [caught, setCaught] = useState("");
  const [success, setSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const paddleElRef = useRef<HTMLDivElement>(null);
  const paddleRef = useRef<number>(window.innerWidth / 2 - 70);
  const nextId = useRef(0);
  const paddleWidth = 140;

  // Keyboard: backspace to delete last char
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setCaught((prev) => prev.slice(0, -1));
        setSuccess(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Mouse/touch paddle — directly update DOM
  useEffect(() => {
    const syncPaddle = () => {
      if (paddleElRef.current) {
        paddleElRef.current.style.transform = `translateX(${paddleRef.current}px)`;
      }
    };
    const move = (x: number) => {
      const w = window.innerWidth;
      paddleRef.current = Math.max(0, Math.min(x - paddleWidth / 2, w - paddleWidth));
      syncPaddle();
    };
    const onMouse = (e: MouseEvent) => move(e.clientX);
    const onTouch = (e: TouchEvent) => move(e.touches[0].clientX);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  // Arrow keys paddle — directly update DOM
  useEffect(() => {
    const keys = new Set<string>();
    const step = 24;
    let raf: number;
    const tick = () => {
      let moved = false;
      if (keys.has("ArrowLeft")) {
        paddleRef.current = Math.max(0, paddleRef.current - step);
        moved = true;
      }
      if (keys.has("ArrowRight")) {
        paddleRef.current = Math.min(window.innerWidth - paddleWidth, paddleRef.current + step);
        moved = true;
      }
      if (moved && paddleElRef.current) {
        paddleElRef.current.style.transform = `translateX(${paddleRef.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const down = (e: KeyboardEvent) => {if (e.key === "ArrowLeft" || e.key === "ArrowRight") {e.preventDefault();keys.add(e.key);}};
    const up = (e: KeyboardEvent) => keys.delete(e.key);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {cancelAnimationFrame(raf);window.removeEventListener("keydown", down);window.removeEventListener("keyup", up);};
  }, []);

  // Spawn letters
  useEffect(() => {
    const interval = setInterval(() => {
      const id = nextId.current++;
      setLetters((prev) => [
      ...prev,
      {
        id,
        char: pickLetter(),
        x: Math.random() * (window.innerWidth - 30),
        y: -30,
        speed: 2 + Math.random() * 3
      }]
      );
    }, 550);
    return () => clearInterval(interval);
  }, []);

  // Game loop
  useEffect(() => {
    let raf: number;
    const loop = () => {
      const h = window.innerHeight;
      const paddleTop = h - 50;
      const pLeft = paddleRef.current;
      const pRight = pLeft + paddleWidth;

      setLetters((prev) => {
        const next: FallingLetter[] = [];
        const caughtChars: string[] = [];
        for (const l of prev) {
          const ny = l.y + l.speed;
          if (ny >= paddleTop && ny <= paddleTop + 25 && l.x + 20 >= pLeft && l.x <= pRight) {
            caughtChars.push(l.char);
          } else if (ny > h) {




            // off screen
          } else {next.push({ ...l, y: ny });}}if (caughtChars.length > 0) {
          setCaught((c) => {
            const updated = c + caughtChars.join("");
            if (updated.toLowerCase() === TARGET) {setSuccess(true);if (onSolve) setTimeout(onSolve, 3000);}
            return updated;
          });
        }
        return next;
      });

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: "linear-gradient(to bottom, hsl(220 20% 10%), hsl(220 20% 4%))" }}>

      {/* Title */}
      <p className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-xs tracking-widest uppercase text-primary">
        Puzzle #2 — Write Your Last Name
      </p>

      {/* Caught letters display */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10 text-center">
        {success ?
        <div>
            <p className="text-primary text-3xl font-bold" style={{ fontFamily: "var(--font-display)", textShadow: "var(--glow-primary)" }}>
              ✓ Succeed!
            </p>
            <p className="text-secondary text-lg mt-2" style={{ textShadow: "var(--glow-secondary)" }}>
              Hint: MADUR PITUACH 1
            </p>
          </div> :

        <p className="text-primary text-3xl tracking-[0.3em]" style={{ fontFamily: "var(--font-display)", textShadow: "var(--glow-primary)" }}>
            {caught || "___"}
          </p>
        }
      </div>

      {/* Controls */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        <button
          onClick={() => {setCaught((c) => c.slice(0, -1));setSuccess(false);}}
          className="px-4 py-1.5 rounded bg-muted text-foreground text-sm hover:bg-muted/80 transition-colors">

          ⌫ Delete
        </button>
        <button
          onClick={() => {setCaught("");setSuccess(false);}}
          className="px-4 py-1.5 rounded bg-muted text-foreground text-sm hover:bg-muted/80 transition-colors">

          Clear
        </button>
      </div>

      {/* Target hint */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-muted-foreground text-xs tracking-widest">
        Catch the letters to spell the name • Backspace to delete
      </div>

      {/* Falling letters */}
      {letters.map((l) =>
      <div
        key={l.id}
        className="absolute text-2xl font-bold"
        style={{
          left: l.x,
          top: l.y,
          color: RELEVANT.has(l.char) ? "hsl(45 100% 50%)" : "hsl(220 10% 45%)",
          textShadow: RELEVANT.has(l.char) ? "var(--glow-primary)" : "none"
        }}>

          {l.char}
        </div>
      )}

      {/* Paddle */}
      <div
        ref={paddleElRef}
        className="absolute rounded-full bg-primary"
        style={{
          bottom: 20,
          left: 0,
          width: paddleWidth,
          height: 16,
          boxShadow: "var(--glow-secondary)",
          transform: `translateX(${paddleRef.current}px)`,
          willChange: "transform"
        }} />

    </div>);

}