"use client";
import { useEffect, useState } from "react";
import { stations, skills } from "../data/stations";

const KEY = "enroot7-stamps";

export default function Stations({ mode }) {
  const [stamped, setStamped] = useState([]);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);

  useEffect(() => {
    try { setStamped(JSON.parse(localStorage.getItem(KEY)) || []); } catch {}
    const sync = () => { try { setStamped(JSON.parse(localStorage.getItem(KEY)) || []); } catch {} };
    window.addEventListener("stamps", sync);
    return () => window.removeEventListener("stamps", sync);
  }, []);

  const toggle = (id) => {
    const next = stamped.includes(id) ? stamped.filter((s) => s !== id) : [...stamped, id];
    setStamped(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); window.dispatchEvent(new Event("stamps")); } catch {}
  };

  const done = stamped.filter((id) => id <= 11).length;
  const unlocked = done === 11;

  if (mode === "card") {
    return (
      <div>
        <div className="mb-6 flex items-center gap-4">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-mist" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={11}>
            <div className="h-full rounded-full bg-foam transition-all duration-500" style={{ width: `${(done / 11) * 100}%` }} />
          </div>
          <span className="font-display font-semibold tabular-nums">{done}/11</span>
        </div>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {stations.map((s) => {
            const locked = s.locked && !unlocked;
            const on = stamped.includes(s.id);
            return (
              <li key={s.id}>
                <button
                  disabled={locked}
                  onClick={() => toggle(s.id)}
                  aria-pressed={on}
                  className={`flex aspect-square w-full flex-col items-center justify-center rounded-2xl p-2 text-center text-xs font-semibold leading-tight transition sm:text-sm
                    ${on ? `${skills[s.skill].bg} ring-2 ring-pine` : "border-2 border-dashed border-pine/30 hover:border-pine"}
                    ${locked ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <span className="font-display text-2xl">{on ? "✓" : s.id}</span>
                  <span className="mt-1">{s.name}</span>
                  {locked && <span className="mt-1 font-normal">Locked</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 min-h-6 font-medium">
          {unlocked ? "All stamps collected. Head to the Piñata." : "Piñata unlocks when stations 1 to 11 are stamped."}
        </p>
        {stamped.length > 0 && (
          <button onClick={() => { setStamped([]); try { localStorage.removeItem(KEY); } catch {} }} className="mt-2 text-sm underline">
            Clear card
          </button>
        )}
      </div>
    );
  }

  const list = stations.filter((s) => filter === "all" || s.skill === filter);
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter stations">
        {[["all", "All"], ...Object.entries(skills).map(([k, v]) => [k, v.label])].map(([k, label]) => (
          <button key={k} onClick={() => setFilter(k)} aria-pressed={filter === k}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${filter === k ? "bg-pine text-paper" : "bg-paper hover:bg-white"}`}>
            {label}
          </button>
        ))}
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => {
          const isOpen = open === s.id;
          return (
            <li key={s.id} className={`rounded-3xl p-5 ${skills[s.skill].bg}/60 bg-paper`}>
              <button className="w-full text-left" onClick={() => setOpen(isOpen ? null : s.id)} aria-expanded={isOpen}>
                <span className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full font-display font-bold ${skills[s.skill].bg}`}>{s.id}</span>
                <h3 className="font-display text-xl font-semibold">{s.name}</h3>
                <p className="mt-1 text-sm">{s.players}{s.mins ? `, ${s.mins} min` : ""}</p>
              </button>
              {isOpen && (
                <div className="mt-4 text-sm leading-relaxed">
                  <p>{s.blurb}</p>
                  <p className="mt-3 font-semibold">Tests: {s.tests.join(", ")}</p>
                  {s.safety && (
                    <div className="mt-3 rounded-2xl bg-sun/50 p-3">
                      <p className="font-semibold">Safety rules</p>
                      <ul className="mt-1 list-disc pl-5">{s.safety.map((r) => <li key={r}>{r}</li>)}</ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
