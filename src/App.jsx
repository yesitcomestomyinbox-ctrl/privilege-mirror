import { useState, useEffect, useRef } from "react";
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
  "A child soldier is recruited somewhere every hour",
];

function StatTicker({ dark }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % TICKER_STATS.length); setVisible(true); }, 400);
    }, 3800);
    return () => clearInterval(cycle);
  }, []);
  return (
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em", color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.38)", transition: "opacity 0.4s ease", opacity: visible ? 1 : 0, textAlign: "center", minHeight: 22, padding: "0 16px" }}>
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
        const step = ts => {
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
  const [dark, setDark] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  // Theme tokens
  const D = {
    bg:         dark ? "#080809"               : "#F5F2EC",
    bg2:        dark ? "#0f0f10"               : "#EDEAE3",
    text:       dark ? "#E8E0D0"               : "#1A1810",
    textMid:    dark ? "rgba(255,255,255,0.55)": "rgba(0,0,0,0.55)",
    textLow:    dark ? "rgba(255,255,255,0.28)": "rgba(0,0,0,0.32)",
    border:     dark ? "rgba(255,255,255,0.07)": "rgba(0,0,0,0.1)",
    borderMid:  dark ? "rgba(255,255,255,0.14)": "rgba(0,0,0,0.18)",
    cardBg:     dark ? "rgba(255,255,255,0.02)": "rgba(255,255,255,0.75)",
    goldText:   dark ? "#E6C87A"               : "#8B6914",
    goldBg:     dark ? "rgba(230,200,122,0.07)": "rgba(180,140,40,0.07)",
    goldBorder: dark ? "rgba(230,200,122,0.14)": "rgba(180,140,40,0.18)",
    redText:    dark ? "#ff8866"               : "#993300",
    redBg:      dark ? "rgba(255,68,68,0.07)"  : "rgba(200,40,0,0.06)",
    redBorder:  dark ? "rgba(255,68,68,0.14)"  : "rgba(200,40,0,0.14)",
    red:        dark ? "#ff6644"               : "#CC3300",
  };

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navBack = () => { setPage("home"); window.scrollTo(0, 0); };

  const NavBar = ({ bgColor }) => (
    <div style={{ position: "fixed", top: 12, left: 12, zIndex: 999, display: "flex", gap: 8 }}>
      <button onClick={navBack} style={{ background: bgColor, border: `1px solid ${D.border}`, color: D.textMid, padding: "7px 14px", borderRadius: 3, fontFamily: "'DM Mono',monospace", fontSize: 10, cursor: "pointer", backdropFilter: "blur(8px)", letterSpacing: "0.06em" }}>← Home</button>
      <button onClick={() => setDark(d => !d)} style={{ background: bgColor, border: `1px solid ${D.border}`, color: D.textMid, padding: "7px 12px", borderRadius: 3, fontFamily: "'DM Mono',monospace", fontSize: 12, cursor: "pointer", backdropFilter: "blur(8px)" }}>{dark ? "☀️" : "🌙"}</button>
    </div>
  );

  if (page === "survey") return (
    <div style={{ background: dark ? "#0A0A0B" : "#F5F2EC", minHeight: "100vh" }}>
      <NavBar bgColor={dark ? "rgba(10,10,11,0.92)" : "rgba(245,242,236,0.92)"} />
      <PrivilegeDashboard />
    </div>
  );

  if (page === "mirror") return (
    <div style={{ background: dark ? "#0C0C0C" : "#F5F2EC", minHeight: "100vh" }}>
      <NavBar bgColor={dark ? "rgba(12,12,12,0.92)" : "rgba(245,242,236,0.92)"} />
      <DailyMirror />
    </div>
  );

  return (
    <div style={{ background: D.bg, color: D.text, minHeight: "100vh", overflowX: "hidden", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500&family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #888; }
        html { scroll-behavior: smooth; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slowDrift {
          0%,100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(20px,-15px) scale(1.03); }
          66%     { transform: translate(-15px,12px) scale(0.98); }
        }

        .hero-word { display: block; animation: fadeSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }

        .tool-card {
          border-radius: 8px; cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s; overflow: hidden;
        }
        .tool-card:hover { transform: translateY(-3px); }
        .tool-card:active { transform: scale(0.98); }

        .enter-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px 28px; border-radius: 4px;
          font-family: 'DM Mono', monospace; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s; border: none;
        }
        .enter-btn.gold  { background: #C8A84B; color: #080809; }
        .enter-btn.gold:hover { background: #d4b455; }

        .theme-btn {
          position: fixed; top: 14px; right: 16px; z-index: 200;
          border-radius: 20px; padding: 7px 16px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          cursor: pointer; transition: all 0.25s;
          display: flex; align-items: center; gap: 6px;
          letter-spacing: 0.06em;
        }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          .tools-grid  { grid-template-columns: 1fr !important; }
          .stats-grid  { grid-template-columns: 1fr 1fr !important; }
          .cta-row     { flex-direction: column !important; align-items: stretch !important; }
          .cta-row .enter-btn { width: 100% !important; max-width: 100% !important; }
          .footer-row  { flex-direction: column !important; text-align: center !important; }
          .quote-text  { font-size: 17px !important; }
        }
      `}</style>

      {/* Theme toggle */}
      <button
        className="theme-btn"
        onClick={() => setDark(d => !d)}
        style={{ background: D.bg, border: `1px solid ${D.border}`, color: D.textMid }}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* ══ HERO ══ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>

        {/* Glow blobs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${dark ? "rgba(230,200,122,0.05)" : "rgba(180,140,40,0.07)"} 0%, transparent 70%)`, top: "5%", left: "5%", animation: "slowDrift 18s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle, ${dark ? "rgba(255,68,68,0.04)" : "rgba(200,40,0,0.04)"} 0%, transparent 70%)`, bottom: "10%", right: "5%", animation: "slowDrift 22s ease-in-out infinite reverse" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 720, width: "100%" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 32, animation: "fadeIn 1s ease both" }}>
            A Project About What We Forget
          </div>

          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 14vw, 116px)", lineHeight: 0.92, letterSpacing: "0.01em", marginBottom: 32 }}>
            <span className="hero-word" style={{ animationDelay: "0.1s", color: D.text }}>You Are</span>
            <span className="hero-word" style={{ animationDelay: "0.25s", color: D.goldText }}>Luckier</span>
            <span className="hero-word" style={{ animationDelay: "0.4s", color: D.textLow, fontSize: "0.5em", letterSpacing: "0.06em" }}>than you think.</span>
          </h1>

          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "clamp(15px, 2.4vw, 20px)", color: D.textMid, lineHeight: 1.8, maxWidth: 520, margin: "0 auto 14px", animation: "fadeSlideUp 0.8s ease both", animationDelay: "0.5s" }}>
            Not because your life is easy. But because systems were quietly working <em>for</em> you while others were quietly crushed by the same systems.
          </p>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "clamp(13px, 1.8vw, 17px)", color: D.textLow, lineHeight: 1.75, maxWidth: 460, margin: "0 auto 44px", animation: "fadeSlideUp 0.8s ease both", animationDelay: "0.65s" }}>
            Two tools. No preaching. Just honesty about where you stand — and a nudge to do something about it.
          </p>

          <div className="cta-row" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", padding: "0 8px", animation: "fadeSlideUp 0.7s ease both", animationDelay: "0.8s" }}>
            <button className="enter-btn gold" onClick={() => { setPage("survey"); window.scrollTo(0, 0); }} style={{ flex: "1 1 200px", maxWidth: 300 }}>
              Take the Survey →
            </button>
            <button className="enter-btn" onClick={() => { setPage("mirror"); window.scrollTo(0, 0); }}
              style={{ flex: "1 1 200px", maxWidth: 300, background: "transparent", border: `1px solid ${D.borderMid}`, color: D.textMid }}>
              Open the Mirror →
            </button>
          </div>

          <div style={{ marginTop: 44, animation: "fadeIn 1.2s ease both", animationDelay: "1s" }}>
            <StatTicker dark={dark} />
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: scrollY > 40 ? 0 : 0.22, transition: "opacity 0.4s", pointerEvents: "none" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.15em", color: D.textLow, textTransform: "uppercase" }}>Scroll</div>
          <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${D.textLow}, transparent)` }} />
        </div>
      </section>

      {/* ══ NUMBERS ══ */}
      <section style={{ padding: "60px 24px", borderTop: `1px solid ${D.border}`, borderBottom: `1px solid ${D.border}`, background: D.bg2, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.22em", textTransform: "uppercase", textAlign: "center", marginBottom: 40 }}>While you read this</div>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: D.border, borderRadius: 4, overflow: "hidden" }}>
            {[
              { num: 733,  unit: "million",  label: "people go hungry tonight",   color: D.goldText },
              { num: 2200, unit: "million",  label: "lack clean drinking water",  color: "#5B9FD4"  },
              { num: 100,  unit: "million+", label: "people forcibly displaced",  color: D.redText  },
              { num: 160,  unit: "million",  label: "children in child labour",   color: "#9B7AE6"  },
            ].map((s, i) => (
              <div key={i} style={{ background: D.bg2, padding: "28px 16px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(34px, 5.5vw, 58px)", color: s.color, lineHeight: 1, marginBottom: 4 }}>
                  <CountUp target={s.num} />
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.1em", marginBottom: 7 }}>{s.unit}</div>
                <div style={{ fontFamily: "'Crimson Pro', serif", fontSize: 13, color: D.textMid, lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TWO TOOLS ══ */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14 }}>Two ways in</div>
            <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 300, color: D.text, lineHeight: 1.35 }}>
              One shows you your position.<br />
              <em style={{ color: D.textLow }}>The other shows you your blind spots.</em>
            </h2>
          </div>

          <div className="tools-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

            {/* Card 1 — Survey */}
            <div
              className="tool-card"
              onClick={() => { setPage("survey"); window.scrollTo(0, 0); }}
              onMouseEnter={() => setHovered("survey")}
              onMouseLeave={() => setHovered(null)}
              style={{ background: D.cardBg, border: `1px solid ${hovered === "survey" ? "rgba(200,168,75,0.4)" : D.border}`, boxShadow: hovered === "survey" ? `0 8px 28px ${dark ? "rgba(200,168,75,0.08)" : "rgba(180,140,40,0.12)"}` : "none" }}
            >
              <div style={{ padding: "32px 24px 24px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: D.goldText, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, opacity: 0.6 }}>Tool 01</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 4.5vw, 42px)", letterSpacing: "0.02em", color: D.text, marginBottom: 12, lineHeight: 1.05 }}>
                  Privilege Dashboard
                </h3>
                <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: 15, color: D.textMid, lineHeight: 1.72, marginBottom: 20 }}>
                  A 62-question structured assessment across 7 dimensions. Honest answers reveal exactly where you hold structural advantage and where you face systemic barriers.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 24 }}>
                  {["62 questions", "7 dimensions", "Radar chart", "Named insights"].map(tag => (
                    <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: D.goldText, background: D.goldBg, border: `1px solid ${D.goldBorder}`, padding: "3px 8px", borderRadius: 2 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: hovered === "survey" ? D.goldText : D.textLow, letterSpacing: "0.07em", transition: "color 0.2s", display: "flex", alignItems: "center", gap: 6 }}>
                  Take the survey →
                </div>
              </div>
              <div style={{ height: 3, background: `linear-gradient(to right, ${D.goldText}, transparent)`, opacity: hovered === "survey" ? 1 : 0.25, transition: "opacity 0.3s" }} />
            </div>

            {/* Card 2 — Mirror */}
            <div
              className="tool-card"
              onClick={() => { setPage("mirror"); window.scrollTo(0, 0); }}
              onMouseEnter={() => setHovered("mirror")}
              onMouseLeave={() => setHovered(null)}
              style={{ background: D.cardBg, border: `1px solid ${hovered === "mirror" ? "rgba(255,68,68,0.35)" : D.border}`, boxShadow: hovered === "mirror" ? `0 8px 28px ${dark ? "rgba(255,68,68,0.07)" : "rgba(200,40,0,0.08)"}` : "none" }}
            >
              <div style={{ padding: "32px 24px 24px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: D.redText, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, opacity: 0.6 }}>Tool 02</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 4.5vw, 42px)", letterSpacing: "0.02em", color: D.text, marginBottom: 12, lineHeight: 1.05 }}>
                  Daily Mirror
                </h3>
                <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: 15, color: D.textMid, lineHeight: 1.72, marginBottom: 20 }}>
                  Check off the ordinary things you did today — ate, took a cab, complained about bad WiFi. Then read what that same moment looks like for someone else on this planet. 20 moments. Each one a gut punch.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 24 }}>
                  {["20 moments", "Real statistics", "Side-by-side", "Concrete actions"].map(tag => (
                    <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: D.redText, background: D.redBg, border: `1px solid ${D.redBorder}`, padding: "3px 8px", borderRadius: 2 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: hovered === "mirror" ? D.redText : D.textLow, letterSpacing: "0.07em", transition: "color 0.2s", display: "flex", alignItems: "center", gap: 6 }}>
                  Open the mirror →
                </div>
              </div>
              <div style={{ height: 3, background: `linear-gradient(to right, ${D.red}, transparent)`, opacity: hovered === "mirror" ? 1 : 0.25, transition: "opacity 0.3s" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ QUOTE ══ */}
      <section style={{ padding: "72px 24px 84px", borderTop: `1px solid ${D.border}`, background: D.bg2, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div className="quote-text" style={{ fontFamily: "'Crimson Pro', serif", fontSize: "clamp(16px, 2.6vw, 23px)", fontStyle: "italic", color: D.textMid, lineHeight: 1.88, marginBottom: 28 }}>
            "Someone wishes they had more time with their dog.<br />
            Someone wishes they had more time with their loved ones.<br />
            A kid from a war-torn country wishes he could bring his brother back to life —<br />
            with a smile on his face and a broken heart."
          </div>
          <div style={{ width: 28, height: 1, background: D.border, margin: "0 auto 28px" }} />
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: D.textLow, lineHeight: 1.85 }}>
            There is a world that doesn't give 2 shits about this.<br />
            <span style={{ color: D.textMid }}>Be the part of the world that does.</span>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{ padding: "72px 24px", background: D.goldBg, borderTop: `1px solid ${D.goldBorder}` }}>
        <div style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 7vw, 58px)", letterSpacing: "0.03em", marginBottom: 14, color: D.text, lineHeight: 1 }}>
            Where do you<br /><span style={{ color: D.goldText }}>actually stand?</span>
          </h2>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: 16, color: D.textMid, lineHeight: 1.75, marginBottom: 34 }}>
            Not in terms of hard work or merit.<br />
            In terms of what the world handed you before you had a say.
          </p>
          <div className="cta-row" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", padding: "0 8px" }}>
            <button className="enter-btn gold" onClick={() => { setPage("survey"); window.scrollTo(0, 0); }} style={{ flex: "1 1 180px" }}>Take the Survey →</button>
            <button className="enter-btn" onClick={() => { setPage("mirror"); window.scrollTo(0, 0); }}
              style={{ flex: "1 1 180px", background: "transparent", border: `1px solid ${D.borderMid}`, color: D.textMid }}>Open the Mirror →</button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer-row" style={{ padding: "22px 28px", borderTop: `1px solid ${D.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, background: D.bg, transition: "background 0.3s" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.09em" }}>
          No ads. No data collected. No newsletter. Just a mirror.
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.07em" }}>
          Data: UN · WHO · World Bank · UNHCR
        </div>
      </footer>
    </div>
  );
}
