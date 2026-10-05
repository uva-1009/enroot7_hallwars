import Breather from "./Breather";
import Stations from "./Stations";

const Section = ({ id, title, children }) => (
  <section id={id} className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
    <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight max-w-xl">{title}</h2>
    <div className="mt-8">{children}</div>
  </section>
);

export default function Home() {
  return (
    <main>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 text-sm font-medium">
        <span className="font-display text-base font-bold">EnROOT 7</span>
        <nav className="flex gap-5">
          <a href="#stations" className="hover:underline">Stations</a>
          <a href="#card" className="hover:underline">My card</a>
          <a href="#info" className="hover:underline">Info</a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-5xl items-center gap-10 px-5 pb-16 pt-8 md:grid-cols-2 md:pt-16">
        <div>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            Hall Wars: play loud, stress less.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed">
            Eleven freshman classes, twelve stations, one activity card. Meet people outside your project group and finish with candy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#card" className="rounded-full bg-pine px-6 py-3 font-semibold text-paper transition hover:bg-pine/85">Open my activity card</a>
            <a href="#stations" className="rounded-full border-2 border-pine px-6 py-3 font-semibold transition hover:bg-pine/10">See the games</a>
          </div>
        </div>
        <Breather />
      </section>

      <Section id="stations" title="Twelve stations, four kinds of effort">
        <Stations mode="grid" />
      </Section>

      <div className="bg-paper">
        <Section id="card" title="Your team's activity card">
          <p className="mb-8 max-w-lg leading-relaxed">
            Tap a station once a facilitator confirms you finished it. Clear stations 1 to 11 and the Piñata opens.
          </p>
          <Stations mode="card" />
        </Section>
      </div>

      <Section id="info" title="Before you come">
        <dl className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            ["When", "Week 11"],
            ["How long", "2 to 3 hours"],
            ["Who", "Term 1 freshmen, 11 classes (200 to 300 people)"],
            ["Prizes", "Finish your card, sign up early, win small gifts"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-paper p-5">
              <dt className="font-display text-lg font-semibold">{k}</dt>
              <dd className="mt-1 leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <footer className="px-5 pb-10 text-center text-sm">Made by the EnROOT 7 team at SUTD.</footer>
    </main>
  );
}
