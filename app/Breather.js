"use client";
import { useEffect, useState } from "react";

// The hero is a pacing circle: ~5s in, ~5s out. Stress relief you can try on arrival.
export default function Breather() {
  const [phase, setPhase] = useState("Breathe in");
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p === "Breathe in" ? "Breathe out" : "Breathe in")), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center" role="img" aria-label="A circle that expands and contracts to guide slow breathing">
      <div className="absolute inset-0 rounded-full bg-dusk/40" />
      <div className="absolute inset-[12%] animate-breathe rounded-full bg-foam" />
      <div className="absolute inset-[30%] animate-breathe rounded-full bg-paper [animation-delay:.4s]" />
      <p aria-live="off" className="relative font-display text-lg font-semibold">{phase}</p>
    </div>
  );
}
