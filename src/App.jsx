import { useState, useEffect, useRef } from "react";
import PrivilegeDashboard from "./privilege-dashboard";
import DailyMirror from "./daily-privilege-mirror";

// ─── AUTO THEME FROM LOCAL TIME ───────────────────────────────────────────────
function getInitialDark() {
  try {
    const h = new Date().getHours();
    return h < 6 || h >= 18; // dark between 6pm–6am
  } catch { return true; }
}

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
    const c = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % TICKER_STATS.length); setVisible(true); }, 400);
    }, 3800);
    return () => clearInterval(c);
  }, []);
  return (
    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.06em", color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.38)", transition: "opacity 0.4s", opacity: visible ? 1 : 0, textAlign: "center", minHeight: 22, padding: "0 8px" }}>
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
          const p = Math.min((ts - start) / duration, 1);
          setVal(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(step);
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
  const [dark, setDark] = useState(getInitialDark);
  const [hovered, setHovered] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  // Re-check time every minute in case they leave the tab open across sunrise/sunset
  useEffect(() => {
    const interval = setInterval(() => {
      setDark(getInitialDark());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const D = {
    bg:         dark ? "#080809"                : "#F5F2EC",
    bg2:        dark ? "#0f0f10"                : "#EDEAE3",
    text:       dark ? "#E8E0D0"                : "#1A1810",
    textMid:    dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
    textLow:    dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.32)",
    border:     dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)",
    borderMid:  dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.18)",
    cardBg:     dark ? "rgba(255,255,255,0.025)": "rgba(255,255,255,0.8)",
    goldText:   dark ? "#E6C87A"                : "#8B6914",
    goldBg:     dark ? "rgba(230,200,122,0.07)" : "rgba(180,140,40,0.07)",
    goldBorder: dark ? "rgba(230,200,122,0.14)" : "rgba(180,140,40,0.18)",
    redText:    dark ? "#ff8866"                : "#993300",
    redBg:      dark ? "rgba(255,68,68,0.07)"   : "rgba(200,40,0,0.06)",
    redBorder:  dark ? "rgba(255,68,68,0.14)"   : "rgba(200,40,0,0.14)",
    red:        dark ? "#ff6644"                : "#CC3300",
  };

  const toggleTheme = () => setDark(d => !d);
  const navTo = p => { setPage(p); window.scrollTo(0, 0); };

  if (page === "survey") return <PrivilegeDashboard dark={dark} onToggleTheme={toggleTheme} />;
  if (page === "mirror")  return <DailyMirror dark={dark} onToggleTheme={toggleTheme} />;

  return (
    <div style={{ background: D.bg, color: D.text, minHeight: "100vh", overflowX: "hidden", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500&family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:3px; } ::-webkit-scrollbar-thumb { background:#888; }
        html { scroll-behavior:smooth; }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slowDrift { 0%,100%{transform:translate(0,0)} 33%{transform:translate(20px,-15px)} 66%{transform:translate(-15px,12px)} }
        .hero-word { display:block; animation:fadeSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .tool-card { border-radius:8px; cursor:pointer; transition:transform 0.25s,box-shadow 0.25s; overflow:hidden; }
        .tool-card:hover { transform:translateY(-3px); }
        .tool-card:active { transform:scale(0.98); }
        .enter-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:14px 24px; border-radius:4px; font-family:'DM Mono',monospace; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; border:none; }
        .enter-btn.gold { background:#C8A84B; color:#080809; }
        .enter-btn.gold:hover { background:#d4b455; }
        .theme-btn { position:fixed; top:14px; right:14px; z-index:200; border-radius:20px; padding:7px 14px; font-family:'DM Mono',monospace; font-size:10px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:5px; letter-spacing:0.06em; }
        /* ── MOBILE ── */
        @media(max-width:640px){
          .tools-grid  { grid-template-columns:1fr!important; }
          .stats-grid  { grid-template-columns:1fr 1fr!important; }
          .cta-row     { flex-direction:column!important; align-items:stretch!important; }
          .cta-row .enter-btn { width:100%!important; }
          .quote-text  { font-size:16px!important; }
          .footer-row  { flex-direction:column!important; text-align:center!important; gap:8px!important; }
          .hero-section { padding:64px 20px 48px!important; }
          .section-pad  { padding:48px 20px!important; }
          .tool-inner   { padding:24px 20px 20px!important; }
        }
      `}</style>

      {/* Theme toggle — auto + manual */}
      <button className="theme-btn" onClick={toggleTheme} style={{ background: D.bg, border: `1px solid ${D.border}`, color: D.textMid }}>
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* ══ HERO ══ */}
      <section className="hero-section" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 460, height: 460, borderRadius: "50%", background: `radial-gradient(circle, ${dark ? "rgba(230,200,122,0.05)" : "rgba(180,140,40,0.07)"} 0%, transparent 70%)`, top: "5%", left: "5%", animation: "slowDrift 18s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${dark ? "rgba(255,68,68,0.04)" : "rgba(200,40,0,0.04)"} 0%, transparent 70%)`, bottom: "10%", right: "5%", animation: "slowDrift 22s ease-in-out infinite reverse" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 700, width: "100%" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 28, animation: "fadeIn 1s ease both" }}>
            A Project About What We Forget
          </div>

          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(52px,13vw,110px)", lineHeight: 0.92, letterSpacing: "0.01em", marginBottom: 28 }}>
            <span className="hero-word" style={{ animationDelay: "0.1s", color: D.text }}>You Are</span>
            <span className="hero-word" style={{ animationDelay: "0.25s", color: D.goldText }}>Luckier</span>
            <span className="hero-word" style={{ animationDelay: "0.4s", color: D.textLow, fontSize: "0.5em", letterSpacing: "0.06em" }}>than you think.</span>
          </h1>

          <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(15px,2.5vw,20px)", color: D.textMid, lineHeight: 1.8, maxWidth: 500, margin: "0 auto 14px", animation: "fadeSlideUp 0.8s ease both", animationDelay: "0.5s" }}>
            Not because your life is easy. But because systems were quietly working <em>for</em> you while others were quietly crushed by the same systems.
          </p>
          <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(13px,1.8vw,16px)", color: D.textLow, lineHeight: 1.75, maxWidth: 460, margin: "0 auto 40px", animation: "fadeSlideUp 0.8s ease both", animationDelay: "0.65s" }}>
            Two tools. No preaching. Just honesty about where you stand — and a nudge to do something about it.
          </p>

          <div className="cta-row" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", padding: "0 8px", animation: "fadeSlideUp 0.7s ease both", animationDelay: "0.8s" }}>
            <button className="enter-btn gold" onClick={() => navTo("survey")} style={{ flex: "1 1 180px", maxWidth: 280 }}>Take the Survey →</button>
            <button className="enter-btn" onClick={() => navTo("mirror")} style={{ flex: "1 1 180px", maxWidth: 280, background: "transparent", border: `1px solid ${D.borderMid}`, color: D.textMid }}>Open the Mirror →</button>
          </div>

          <div style={{ marginTop: 40, animation: "fadeIn 1.2s ease both", animationDelay: "1s" }}>
            <StatTicker dark={dark} />
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, opacity: scrollY > 40 ? 0 : 0.2, transition: "opacity 0.4s", pointerEvents: "none" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, letterSpacing: "0.15em", color: D.textLow, textTransform: "uppercase" }}>Scroll</div>
          <div style={{ width: 1, height: 30, background: `linear-gradient(to bottom, ${D.textLow}, transparent)` }} />
        </div>
      </section>

      {/* ══ NUMBERS ══ */}
      <section className="section-pad" style={{ padding: "60px 24px", borderTop: `1px solid ${D.border}`, borderBottom: `1px solid ${D.border}`, background: D.bg2, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.22em", textTransform: "uppercase", textAlign: "center", marginBottom: 36 }}>While you read this</div>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: D.border, borderRadius: 4, overflow: "hidden" }}>
            {[
              { num: 733,  unit: "million",  label: "people go hungry tonight",  color: D.goldText },
              { num: 2200, unit: "million",  label: "lack clean drinking water", color: "#5B9FD4"  },
              { num: 100,  unit: "million+", label: "people forcibly displaced", color: D.redText  },
              { num: 160,  unit: "million",  label: "children in child labour",  color: "#9B7AE6"  },
            ].map((s, i) => (
              <div key={i} style={{ background: D.bg2, padding: "24px 14px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,5.5vw,56px)", color: s.color, lineHeight: 1, marginBottom: 3 }}><CountUp target={s.num} /></div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.1em", marginBottom: 6 }}>{s.unit}</div>
                <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 12, color: D.textMid, lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TWO TOOLS ══ */}
      <section className="section-pad" style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 12 }}>Two ways in</div>
            <h2 style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(20px,4vw,38px)", fontWeight: 300, color: D.text, lineHeight: 1.35 }}>
              One shows you your position.<br /><em style={{ color: D.textLow }}>The other shows you your blind spots.</em>
            </h2>
          </div>

          <div className="tools-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* Survey card */}
            <div className="tool-card" onClick={() => navTo("survey")} onMouseEnter={() => setHovered("survey")} onMouseLeave={() => setHovered(null)}
              style={{ background: D.cardBg, border: `1px solid ${hovered === "survey" ? "rgba(200,168,75,0.4)" : D.border}`, boxShadow: hovered === "survey" ? `0 8px 28px ${dark ? "rgba(200,168,75,0.08)" : "rgba(180,140,40,0.12)"}` : "none" }}>
              <div className="tool-inner" style={{ padding: "28px 24px 22px" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: D.goldText, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, opacity: 0.6 }}>Tool 01</div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(26px,4.5vw,40px)", letterSpacing: "0.02em", color: D.text, marginBottom: 12, lineHeight: 1.05 }}>Privilege Dashboard</h3>
                <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(13px,2vw,15px)", color: D.textMid, lineHeight: 1.72, marginBottom: 18 }}>
                  62 questions across 7 dimensions. Honest answers reveal exactly where you hold structural advantage and where you face systemic barriers.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
                  {["62 questions", "7 dimensions", "Radar chart", "Named insights"].map(tag => (
                    <span key={tag} style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: D.goldText, background: D.goldBg, border: `1px solid ${D.goldBorder}`, padding: "3px 8px", borderRadius: 2 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: hovered === "survey" ? D.goldText : D.textLow, transition: "color 0.2s" }}>Take the survey →</div>
              </div>
              <div style={{ height: 3, background: `linear-gradient(to right, ${D.goldText}, transparent)`, opacity: hovered === "survey" ? 1 : 0.25, transition: "opacity 0.3s" }} />
            </div>

            {/* Mirror card */}
            <div className="tool-card" onClick={() => navTo("mirror")} onMouseEnter={() => setHovered("mirror")} onMouseLeave={() => setHovered(null)}
              style={{ background: D.cardBg, border: `1px solid ${hovered === "mirror" ? "rgba(255,68,68,0.35)" : D.border}`, boxShadow: hovered === "mirror" ? `0 8px 28px ${dark ? "rgba(255,68,68,0.07)" : "rgba(200,40,0,0.08)"}` : "none" }}>
              <div className="tool-inner" style={{ padding: "28px 24px 22px" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: D.redText, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, opacity: 0.6 }}>Tool 02</div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(26px,4.5vw,40px)", letterSpacing: "0.02em", color: D.text, marginBottom: 12, lineHeight: 1.05 }}>Daily Mirror</h3>
                <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(13px,2vw,15px)", color: D.textMid, lineHeight: 1.72, marginBottom: 18 }}>
                  Check off the ordinary things you did today. Then read what that same moment looks like for someone else on this planet. 20 moments. Each one a gut punch.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
                  {["20 moments", "Real statistics", "Side-by-side", "Concrete actions"].map(tag => (
                    <span key={tag} style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: D.redText, background: D.redBg, border: `1px solid ${D.redBorder}`, padding: "3px 8px", borderRadius: 2 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: hovered === "mirror" ? D.redText : D.textLow, transition: "color 0.2s" }}>Open the mirror →</div>
              </div>
              <div style={{ height: 3, background: `linear-gradient(to right, ${D.red}, transparent)`, opacity: hovered === "mirror" ? 1 : 0.25, transition: "opacity 0.3s" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ QUOTE ══ */}
      <section className="section-pad" style={{ padding: "64px 24px 72px", borderTop: `1px solid ${D.border}`, background: D.bg2, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div className="quote-text" style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(15px,2.6vw,22px)", fontStyle: "italic", color: D.textMid, lineHeight: 1.88, marginBottom: 24 }}>
            "Someone wishes they had more time with their dog.<br />
            Someone wishes they had more time with their loved ones.<br />
            A kid from a war-torn country wishes he could bring his brother back to life —<br />
            with a smile on his face and a broken heart."
          </div>
          <div style={{ width: 24, height: 1, background: D.border, margin: "0 auto 24px" }} />
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: D.textLow, lineHeight: 1.85 }}>
            There is a world that doesn't give 2 shits about this.<br />
            <span style={{ color: D.textMid }}>Be the part of the world that does.</span>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="section-pad" style={{ padding: "64px 24px", background: D.goldBg, borderTop: `1px solid ${D.goldBorder}` }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(30px,7vw,56px)", letterSpacing: "0.03em", marginBottom: 14, color: D.text, lineHeight: 1 }}>
            Where do you<br /><span style={{ color: D.goldText }}>actually stand?</span>
          </h2>
          <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 15, color: D.textMid, lineHeight: 1.75, marginBottom: 30 }}>
            Not in terms of hard work or merit.<br />In terms of what the world handed you before you had a say.
          </p>
          <div className="cta-row" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", padding: "0 8px" }}>
            <button className="enter-btn gold" onClick={() => navTo("survey")} style={{ flex: "1 1 160px" }}>Take the Survey →</button>
            <button className="enter-btn" onClick={() => navTo("mirror")} style={{ flex: "1 1 160px", background: "transparent", border: `1px solid ${D.borderMid}`, color: D.textMid }}>Open the Mirror →</button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer-row" style={{ padding: "20px 24px", borderTop: `1px solid ${D.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, background: D.bg, transition: "background 0.3s" }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.08em" }}>No ads. No data collected. No newsletter. Just a mirror.</div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: D.textLow, letterSpacing: "0.07em" }}>Data: UN · WHO · World Bank · UNHCR</div>
      </footer>
    </div>
  );
}
