import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import PrivilegeDashboard from "./privilege-dashboard";
import DailyMirror from "./daily-privilege-mirror";

const TICKER_STATS = [
  "733 million people go to bed hungry tonight",
  "A child dies of preventable disease every 5 seconds",
  "2.2 billion people lack access to safe drinking water",
  "Over 100 million people are forcibly displaced right now",
  "Half the world lives on less than $6.85 a day",
  "130 million girls are out of school globally",
  "1 in 3 women experience violence in their lifetime",
  "770 million people have no access to electricity",
  "Only 13% of the world holds a passport",
  "A child soldier is recruited somewhere in the world every hour",
];

function StatTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % TICKER_STATS.length);
        setVisible(true);
      }, 400);
    }, 3800);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div style={{
      fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.08em",
      color: "rgba(255,255,255,0.28)", transition: "opacity 0.4s ease",
      opacity: visible ? 1 : 0, textAlign: "center", minHeight: 20,
    }}>
      {TICKER_STATS[idx]}
    </div>
  );
}

function CountUp({ target, duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const prog = Math.min((ts - start) / duration, 1);
          setVal(Math.floor(prog * target));
          if (prog < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val.toLocaleString()}</span>;
}

export default function App() {
  const [page, setPage] = useState("home");
  const [hovered, setHovered] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (page === "survey") return (
    <div>
      <button onClick={() => setPage("home")} style={{
        position: "fixed", top: 16, left: 20, zIndex: 999,
        background: "rgba(10,10,11,0.9)", border: "1px solid rgba(255,255,255,0.12)",
        color: "rgba(255,255,255,0.5)", padding: "7px 14px", borderRadius: 3,
        fontFamily: "'DM Mono',monospace", fontSize: 10, cursor: "pointer",
        backdropFilter: "blur(8px)", letterSpacing: "0.06em",
      }}>← Home</button>
      <PrivilegeDashboard />
      <Analytics />
    </div>
  );

  if (page === "mirror") return (
    <div>
      <button onClick={() => setPage("home")} style={{
        position: "fixed", top: 16, left: 20, zIndex: 999,
        background: "rgba(12,12,12,0.9)", border: "1px solid rgba(255,255,255,0.12)",
        color: "rgba(255,255,255,0.5)", padding: "7px 14px", borderRadius: 3,
        fontFamily: "Georgia,serif", fontSize: 10, cursor: "pointer",
        backdropFilter: "blur(8px)", letterSpacing: "0.06em",
      }}>← Home</button>
      <DailyMirror />
      <Analytics />
    </div>
  );

  return (
    <div style={{ background: "#080809", color: "#E8E0D0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500&family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #222; }
        html { scroll-behavior: smooth; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes slowDrift {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%  { transform: translate(30px,-20px) scale(1.05); }
          66%  { transform: translate(-20px, 15px) scale(0.97); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes counterUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-word {
          display: inline-block;
          animation: fadeSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        .tool-card {
          position: relative; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 6px; cursor: pointer;
          transition: border-color 0.3s, transform 0.3s;
        }
        .tool-card:hover {
          transform: translateY(-4px);
        }
        .tool-card::before {
          content: '';
          position: absolute; inset: 0;
          opacity: 0; transition: opacity 0.3s;
          pointer-events: none;
        }
        .tool-card.survey::before {
          background: radial-gradient(ellipse at 30% 50%, rgba(230,200,122,0.08), transparent 70%);
        }
        .tool-card.mirror::before {
          background: radial-gradient(ellipse at 70% 50%, rgba(255,68,68,0.07), transparent 70%);
        }
        .tool-card:hover::before { opacity: 1; }
        .stat-num {
          font-family: 'Bebas Neue', sans-serif;
          animation: counterUp 0.6s ease both;
        }
        .enter-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 28px; border-radius: 3px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: all 0.22s; border: none;
        }
        .enter-btn.gold {
          background: #E6C87A; color: #080809;
        }
        .enter-btn.gold:hover { background: #f0d48a; transform: translateY(-1px); }
        .enter-btn.outline {
          background: transparent; color: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.15) !important;
          border: none;
        }
        .enter-btn.outline:hover { color: #E8E0D0; border-color: rgba(255,255,255,0.35) !important; }
        .divider-line {
          height: 1px; background: rgba(255,255,255,0.07);
          transform-origin: left; animation: lineGrow 1s ease both;
        }
        .quote-mark {
          font-family: 'Crimson Pro', serif;
          font-size: 120px; line-height: 0.7;
          color: rgba(255,255,255,0.04);
          position: absolute; top: 20px; left: 20px;
          pointer-events: none; user-select: none;
        }
        .noise-overlay {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="noise-overlay" />

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px 24px 60px", textAlign: "center", position: "relative" }}>

        {/* Ambient glow blobs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(230,200,122,0.04) 0%, transparent 70%)", top: "10%", left: "10%", animation: "slowDrift 18s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,68,68,0.04) 0%, transparent 70%)", bottom: "15%", right: "10%", animation: "slowDrift 22s ease-in-out infinite reverse" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 780 }}>
          {/* Eyebrow */}
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 36, animation: "fadeIn 1s ease both" }}>
            A Project About What We Forget
          </div>

          {/* Main headline */}
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(64px, 13vw, 128px)", lineHeight: 0.92, letterSpacing: "0.01em", marginBottom: 36 }}>
            <span className="hero-word" style={{ animationDelay: "0.1s", color: "#E8E0D0", display: "block" }}>You Are</span>
            <span className="hero-word" style={{ animationDelay: "0.25s", color: "#E6C87A", display: "block" }}>Luckier</span>
            <span className="hero-word" style={{ animationDelay: "0.4s", color: "rgba(255,255,255,0.25)", display: "block", fontSize: "0.55em", letterSpacing: "0.06em" }}>than you think.</span>
          </h1>

          {/* Subhead */}
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "clamp(17px, 2.5vw, 22px)", color: "rgba(255,255,255,0.42)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 20px", animation: "fadeSlideUp 0.8s ease both", animationDelay: "0.5s" }}>
            Not because your life is easy. But because systems were quietly working <em>for</em> you while others were quietly crushed by the same systems.
          </p>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.28)", lineHeight: 1.75, maxWidth: 540, margin: "0 auto 52px", animation: "fadeSlideUp 0.8s ease both", animationDelay: "0.65s" }}>
            Two tools. No preaching. Just honesty about where you stand — and a gentle push to do something about it.
          </p>

          {/* CTA row */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", animation: "fadeSlideUp 0.7s ease both", animationDelay: "0.8s" }}>
            <button className="enter-btn gold" onClick={() => { setPage("survey"); window.scrollTo(0,0); }}>
              Take the Survey
              <span style={{ opacity: 0.6 }}>→</span>
            </button>
            <button className="enter-btn outline" style={{ border: "1px solid rgba(255,255,255,0.15)" }} onClick={() => { setPage("mirror"); window.scrollTo(0,0); }}>
              Open the Mirror
              <span style={{ opacity: 0.4 }}>→</span>
            </button>
          </div>

          {/* Ticker */}
          <div style={{ marginTop: 56, animation: "fadeIn 1.2s ease both", animationDelay: "1s" }}>
            <StatTicker />
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: scrollY > 50 ? 0 : 0.3, transition: "opacity 0.4s" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Scroll</div>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </section>

      {/* ── NUMBERS THAT HIT ── */}
      <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.22em", textTransform: "uppercase", textAlign: "center", marginBottom: 56 }}>
            While you read this
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1, background: "rgba(255,255,255,0.06)" }}>
            {[
              { num: 733, unit: "million", label: "people go hungry tonight", color: "#E6C87A" },
              { num: 2200, unit: "million", label: "lack clean drinking water", color: "#7AB8E6" },
              { num: 100, unit: "million+", label: "people forcibly displaced", color: "#E68A7A" },
              { num: 160, unit: "million", label: "children in child labour", color: "#A87AE6" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#080809", padding: "36px 28px", textAlign: "center" }}>
                <div className="stat-num" style={{ fontSize: "clamp(42px, 7vw, 68px)", color: s.color, lineHeight: 1, marginBottom: 6 }}>
                  <CountUp target={s.num} />
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: 10 }}>{s.unit}</div>
                <div style={{ fontFamily: "'Crimson Pro', serif", fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TWO TOOLS ── */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 16 }}>Two ways in</div>
            <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 300, color: "rgba(255,255,255,0.8)", lineHeight: 1.3 }}>
              One shows you your position.<br />
              <em style={{ color: "rgba(255,255,255,0.4)" }}>The other shows you your blind spots.</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            {/* Tool 1 — Survey */}
            <div
              className="tool-card survey"
              onClick={() => { setPage("survey"); window.scrollTo(0,0); }}
              onMouseEnter={() => setHovered("survey")}
              onMouseLeave={() => setHovered(null)}
              style={{ borderColor: hovered === "survey" ? "rgba(230,200,122,0.3)" : "rgba(255,255,255,0.07)" }}
            >
              <div className="quote-mark">"</div>
              <div style={{ padding: "44px 40px 40px", position: "relative" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(230,200,122,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Tool 01</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, letterSpacing: "0.03em", color: "#E8E0D0", marginBottom: 16, lineHeight: 1 }}>
                  Privilege<br />Dashboard
                </h3>
                <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 28 }}>
                  A 62-question structured assessment across 7 dimensions — economic, geographic, racial, gender, health, education, and social. You answer honestly, it shows you exactly where you hold structural advantage and where you face systemic barriers.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 36 }}>
                  {["62 questions", "7 dimensions", "Radar chart", "Specific insights", "Named advantages & barriers"].map(tag => (
                    <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(230,200,122,0.55)", background: "rgba(230,200,122,0.07)", border: "1px solid rgba(230,200,122,0.12)", padding: "4px 10px", borderRadius: 2 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 11, color: hovered === "survey" ? "#E6C87A" : "rgba(255,255,255,0.3)", letterSpacing: "0.08em", transition: "color 0.2s" }}>
                  Take the survey <span style={{ fontSize: 14 }}>→</span>
                </div>
              </div>
              {/* Bottom accent bar */}
              <div style={{ height: 3, background: "linear-gradient(to right, #E6C87A, transparent)", opacity: hovered === "survey" ? 1 : 0.3, transition: "opacity 0.3s" }} />
            </div>

            {/* Tool 2 — Mirror */}
            <div
              className="tool-card mirror"
              onClick={() => { setPage("mirror"); window.scrollTo(0,0); }}
              onMouseEnter={() => setHovered("mirror")}
              onMouseLeave={() => setHovered(null)}
              style={{ borderColor: hovered === "mirror" ? "rgba(255,68,68,0.3)" : "rgba(255,255,255,0.07)" }}
            >
              <div className="quote-mark">"</div>
              <div style={{ padding: "44px 40px 40px", position: "relative" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,100,100,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Tool 02</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, letterSpacing: "0.03em", color: "#E8E0D0", marginBottom: 16, lineHeight: 1 }}>
                  Daily<br />Mirror
                </h3>
                <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 28 }}>
                  Check off the ordinary things you did today — ate, took a cab, complained about bad WiFi. Then read what that same moment looks like for someone else on this planet right now. 20 moments. Each one a gut punch.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 36 }}>
                  {["20 daily moments", "Real statistics", "Side-by-side reality", "Brutal verdict", "Concrete actions"].map(tag => (
                    <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,100,100,0.55)", background: "rgba(255,68,68,0.07)", border: "1px solid rgba(255,68,68,0.12)", padding: "4px 10px", borderRadius: 2 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 11, color: hovered === "mirror" ? "#ff8888" : "rgba(255,255,255,0.3)", letterSpacing: "0.08em", transition: "color 0.2s" }}>
                  Open the mirror <span style={{ fontSize: 14 }}>→</span>
                </div>
              </div>
              <div style={{ height: 3, background: "linear-gradient(to right, #ff6644, transparent)", opacity: hovered === "mirror" ? 1 : 0.3, transition: "opacity 0.3s" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE QUOTE THAT STARTED THIS ── */}
      <section style={{ padding: "80px 24px 100px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'Crimson Pro', serif", fontSize: "clamp(18px, 3vw, 26px)", fontStyle: "italic", color: "rgba(255,255,255,0.38)", lineHeight: 1.85, marginBottom: 32 }}>
            "Someone wishes they had more time with their dog.<br />
            Someone wishes they had more time with their loved ones.<br />
            A kid from a war-torn country wishes he could bring his brother back to life —<br />
            with a smile on his face and a broken heart."
          </div>
          <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.12)", margin: "0 auto 32px" }} />
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", lineHeight: 1.8 }}>
            There is a world that doesn't give 2 shits about this.<br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Be the part of the world that does.</span>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "80px 24px", background: "rgba(230,200,122,0.03)", borderTop: "1px solid rgba(230,200,122,0.08)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 7vw, 64px)", letterSpacing: "0.04em", marginBottom: 20, color: "#E8E0D0", lineHeight: 1 }}>
            Where do you<br /><span style={{ color: "#E6C87A" }}>actually stand?</span>
          </h2>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: 17, color: "rgba(255,255,255,0.38)", lineHeight: 1.75, marginBottom: 40 }}>
            Not in terms of hard work or merit — you can hold on to those.<br />
            In terms of what the world handed you before you had a say.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="enter-btn gold" onClick={() => { setPage("survey"); window.scrollTo(0,0); }}>
              Take the Survey →
            </button>
            <button className="enter-btn outline" style={{ border: "1px solid rgba(255,255,255,0.15)" }} onClick={() => { setPage("mirror"); window.scrollTo(0,0); }}>
              Open the Mirror →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "28px 32px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.15)", letterSpacing: "0.12em" }}>
          No ads. No data collected. No newsletter. Just a mirror.
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.1)", letterSpacing: "0.1em" }}>
          Statistics sourced from UN, WHO, World Bank & UNHCR
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
