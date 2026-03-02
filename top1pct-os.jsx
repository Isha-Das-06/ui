// React hooks are available globally via window.React
const { useState, useEffect, useRef } = React;

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #030508;
    --bg-alt: #090c12;
    --glass: rgba(13, 17, 23, 0.7);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-accent: rgba(99, 210, 255, 0.05);
    
    --accent: #63d2ff;
    --accent-glow: rgba(99, 210, 255, 0.4);
    --accent-gradient: linear-gradient(135deg, #63d2ff 0%, #a78bfa 100%);
    
    --text: #f0f4f8;
    --text-dim: #94a3b8;
    --text-mute: #475569;
    
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --gold: #fbbf24;
    
    --sans: 'Inter', sans-serif;
    --heading: 'Outfit', sans-serif;
    --mono: 'Space Mono', monospace;
    
    --radius: 12px;
    --transition: cubic-bezier(0.4, 0, 0.2, 1);
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    line-height: 1.5;
    overflow-x: hidden;
  }

  /* GRAIN EFFECT */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.04;
    pointer-events: none;
    z-index: 9999;
  }

  /* ANIMATIONS */
  @keyframes revealUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(99, 210, 255, 0.1); }
    50% { box-shadow: 0 0 40px rgba(99, 210, 255, 0.3); }
  }

  .reveal { opacity: 0; }
  .reveal.active { animation: revealUp 0.8s var(--transition) forwards; }

  .app { 
    display: flex; 
    height: 100vh; 
    width: 100vw;
    background: var(--bg);
    overflow: hidden;
  }
  .sidebar {
    width: 280px;
    background: var(--bg-alt);
    border-right: 1px solid var(--glass-border);
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex-shrink: 0;
    padding: 32px 0;
    z-index: 100;
    overflow-y: auto;
  }
  .sidebar::-webkit-scrollbar { width: 4px; }
  .sidebar::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius: 2px; }

  .main { flex: 1; overflow-y: auto; scroll-behavior: smooth; }
  .page { padding: 80px 40px; max-width: 1200px; margin: 0 auto; }

  /* COMPONENTS */
  .glass-card {
    background: var(--glass);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius);
    padding: 24px;
    transition: all 0.3s var(--transition);
  }
  .glass-card:hover {
    border-color: rgba(99, 210, 255, 0.3);
    background: rgba(13, 17, 23, 0.9);
    transform: translateY(-4px);
  }

  .btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-primary {
    background: var(--accent-gradient);
    color: #000;
  }
  .btn-primary:hover {
    transform: scale(1.02);
    box-shadow: 0 0 20px var(--accent-glow);
  }

  .page-title {
    font-family: var(--heading);
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
  .page-tag {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin-bottom: 24px;
    display: block;
  }

  .glass-card {
    background: var(--glass);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius);
    padding: 32px;
    transition: all 0.3s var(--transition);
  }
  .glass-card:hover {
    border-color: rgba(99, 210, 255, 0.4);
    background: rgba(13, 17, 23, 0.85);
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }

  .card {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius);
    padding: 24px;
    transition: all 0.3s var(--transition);
  }
  .card:hover { border-color: rgba(99, 210, 255, 0.2); }
  .card-title { font-family: var(--heading); font-size: 18px; font-weight: 700; margin-bottom: 12px; color: var(--text); }
  .card-sub { font-size: 14px; color: var(--text-dim); line-height: 1.6; }

  .alert {
    padding: 20px; border-radius: 12px; font-size: 14px; margin-bottom: 32px;
    border: 1px solid transparent;
    display: flex; gap: 12px; align-items: center;
  }
  .alert-info { background: rgba(99, 210, 255, 0.05); border-color: rgba(99, 210, 255, 0.2); color: var(--accent); }

  /* LANDING SPECIFIC */
  .hero {
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    padding-bottom: 100px;
    padding-top: 120px;
  }
  .hero-logo {
    font-family: var(--mono);
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 32px;
    font-size: 14px;
    letter-spacing: 0.4em;
  }
  .hero-title {
    font-family: var(--heading);
    font-size: clamp(40px, 8vw, 84px);
    font-weight: 800;
    line-height: 0.95;
    margin-bottom: 32px;
    background: linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.5));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-sub {
    font-size: 21px;
    color: var(--text-dim);
    max-width: 540px;
    margin-bottom: 48px;
    line-height: 1.4;
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 24px;
    margin-top: 80px;
  }
  .bento-item {
    grid-column: span 4;
    min-height: 200px;
    padding: 24px;
  }
  .bento-item-large { grid-column: span 8; }

  /* STAT CARDS */
  .stat-val {
    font-family: var(--heading);
    font-size: 40px;
    font-weight: 700;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* TICKER */
  .ticker {
    padding: 60px 0;
    overflow: hidden;
    white-space: nowrap;
    border-top: 1px solid var(--glass-border);
    border-bottom: 1px solid var(--glass-border);
    background: rgba(255,255,255,0.01);
  }
  .ticker-track {
    display: inline-flex;
    animation: scroll 40s linear infinite;
    gap: 80px;
  }
  @keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .ticker-item {
    font-family: var(--mono);
    font-size: 14px;
    color: var(--text-mute);
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  /* ROADMAP */
  .roadmap {
    position: relative;
    padding: 80px 0;
  }
  .roadmap::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--glass-border);
    transform: translateX(-50%);
  }
  .roadmap-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 60px;
    position: relative;
  }
  .roadmap-content {
    width: 45%;
    padding: 24px;
  }
  .roadmap-dot {
    position: absolute;
    left: 50%;
    width: 16px;
    height: 16px;
    background: var(--accent);
    border-radius: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 15px var(--accent-glow);
  }

  /* FAQ */
  .faq-item {
    border-bottom: 1px solid var(--glass-border);
    padding: 24px 0;
    cursor: pointer;
  }
  .faq-q {
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .faq-a {
    margin-top: 16px;
    color: var(--text-dim);
    font-size: 15px;
    display: none;
  }
  .faq-item.active .faq-a { display: block; }

  /* MODERN FOOTER */
  .footer {
    padding: 120px 40px 60px;
    background: linear-gradient(to bottom, transparent, rgba(99, 210, 255, 0.02));
    border-top: 1px solid var(--glass-border);
    margin-top: 120px;
    position: relative;
    overflow: hidden;
  }
  .footer::before {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0.3;
  }
  .footer-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 60px;
  }
  .footer-brand .logo {
    font-family: var(--heading);
    font-size: 20px;
    font-weight: 800;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    letter-spacing: 0.05em;
  }
  .footer-motto {
    color: var(--text-dim);
    font-size: 14px;
    line-height: 1.6;
    max-width: 280px;
  }
  .footer-label {
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--accent);
    margin-bottom: 24px;
    display: block;
  }
  .f-link {
    display: block;
    color: var(--text-dim);
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 12px;
    transition: all 0.3s var(--transition);
  }
  .f-link:hover {
    color: var(--accent);
    transform: translateX(6px);
  }
  .footer-cta {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 24px;
    text-align: left;
  }
  .footer-cta h4 {
    font-family: var(--heading);
    font-size: 18px;
    margin-bottom: 8px;
  }
  .footer-cta p {
    font-size: 13px;
    color: var(--text-dim);
    margin-bottom: 16px;
  }
  .footer-bottom {
    max-width: 1200px;
    margin: 80px auto 0;
    padding-top: 32px;
    border-top: 1px solid var(--glass-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-mute);
    font-size: 12px;
    font-family: var(--mono);
  }
  .social-links {
    display: flex;
    gap: 16px;
  }
  .social-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    color: var(--text-dim);
  }
  .social-icon:hover {
    background: var(--accent);
    color: #000;
    transform: translateY(-3px);
  }

  /* PROGRESS BARS */
  .xp-track {
    height: 8px;
    background: rgba(255,255,255,0.05);
    border-radius: 4px;
    overflow: hidden;
  }
  .xp-fill {
    height: 100%;
    background: var(--accent-gradient);
    border-radius: 4px;
    transition: width 1s ease-out;
  }

  /* SIDEBAR NAV */
  .sidebar-logo {
    padding: 0 32px 40px;
    font-family: var(--heading);
    font-size: 18px;
    font-weight: 800;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 12px;
    letter-spacing: 0.1em;
  }
  .logo-dot {
    width: 10px;
    height: 10px;
    background: var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--accent-glow);
  }
  .sidebar-section { margin-bottom: 24px; }
  .sidebar-section-label {
    padding: 0 32px 12px;
    font-family: var(--mono);
    font-size: 10px;
    color: var(--text-mute);
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }
  .sidebar-item {
    padding: 12px 32px;
    color: var(--text-dim);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.2s var(--transition);
    border-left: 3px solid transparent;
  }
  .sidebar-item:hover {
    color: var(--text);
    background: rgba(255,255,255,0.03);
  }
  .sidebar-item.active {
    color: var(--accent);
    background: rgba(99, 210, 255, 0.08);
    border-left-color: var(--accent);
  }
  .sidebar-item .icon { font-size: 18px; width: 24px; text-align: center; }
  .sidebar-item .label { flex: 1; }

  .divider { height: 1px; background: var(--glass-border); margin: 32px 0; }
  
  /* UTILS */
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .flex { display: flex; gap: 8px; align-items: center; }
  .mt32 { margin-top: 32px; }
  .mb16 { margin-bottom: 16px; }
  .text-mute { color: var(--text-mute); font-size: 13px; }

  /* RADAR SVG */
  .radar-svg polygon { fill: rgba(99, 210, 255, 0.12); stroke: var(--accent); stroke-width: 1.5; }
  .radar-svg .grid-polygon { fill: none; stroke: var(--glass-border); stroke-width: 1; }
  .radar-svg text { fill: var(--text-dim); font-size: 9px; font-family: var(--mono); }

  /* FORMS & INPUTS */
  .input-group { margin-bottom: 24px; }
  .input-label { font-size: 13px; font-weight: 600; color: var(--text-dim); margin-bottom: 8px; display: block; }
  .input {
    width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border);
    border-radius: 8px; color: var(--text); font-family: var(--sans); font-size: 14px; transition: all 0.2s;
  }
  .input:focus { border-color: var(--accent); outline: none; background: rgba(255,255,255,0.05); }

  /* BADGES */
  .badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; font-family: var(--mono); }
  .badge-blue { background: rgba(99, 210, 255, 0.1); color: var(--accent); }
  .badge-gold { background: rgba(251, 191, 36, 0.1); color: var(--gold); }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--text-mute); }
`;

// ─── SCROLL REVEAL HOOK ──────────────────────────────────────────────────────
function useScrollReveal(page) {
  useEffect(() => {
    // Small timeout to ensure DOM is ready after React render
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 });

      const elements = document.querySelectorAll('.reveal');
      elements.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [page]);
}

// ─── RADAR CHART ─────────────────────────────────────────────────────────────
function RadarChart({ data, size = 200 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const n = data.length;
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i, pct) => {
    const a = angle(i), rr = r * pct;
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
  };
  const gridLevels = [0.25, 0.5, 0.75, 1];
  return (
    <svg width={size} height={size} className="radar-svg">
      {gridLevels.map((l) => (
        <polygon key={l} className="grid-polygon"
          points={data.map((_, i) => pt(i, l).join(",")).join(" ")} />
      ))}
      {data.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--border)" strokeWidth="1" />;
      })}
      <polygon points={data.map((d, i) => pt(i, d.val / 100).join(",")).join(" ")} />
      {data.map((d, i) => {
        const [x, y] = pt(i, 1.18);
        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle">{d.label}</text>;
      })}
    </svg>
  );
}

// ─── MINI BAR ────────────────────────────────────────────────────────────────
function MiniBar({ val, color = "blue", showPct = true }) {
  const fills = { blue: "fill-blue", green: "fill-green", gold: "fill-gold", red: "fill-red", purple: "fill-purple" };
  return (
    <div className="flex items-center gap8">
      <div className="progress-bar" style={{ flex: 1 }}>
        <div className={`progress - fill ${fills[color]} `} style={{ width: `${val}% ` }} />
      </div>
      {showPct && <span className="mono text-xs text2" style={{ minWidth: 32, textAlign: "right" }}>{val}%</span>}
    </div>
  );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────

// 0. Landing
function PageLanding({ onNav }) {
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* HERO */}
      <section className="hero reveal">
        <h1 className="hero-title">Dominate Your<br />Peer Group.</h1>
        <p className="hero-sub">The only platform that quantifies your competitive edge, models your future, and builds a week-by-week execution plan to reach the top.</p>
        <div className="flex gap16">
          <button className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }} onClick={() => onNav(2)}>Get Your Score →</button>
          <button className="btn btn-ghost" style={{ border: '1px solid var(--glass-border)', padding: '16px 36px', fontSize: '16px' }} onClick={() => onNav(1)}>Sign Up Free</button>
        </div>

        {/* HOW IT WORKS */}
        <section className="reveal" style={{ padding: "80px 0 40px" }}>
          <div className="grid3" style={{ gap: 40 }}>
            {[
              { num: "01", title: "Connect", desc: "Sync high-signal data points from GitHub, LinkedIn, and University logs." },
              { num: "02", title: "Analyze", desc: "Our AI-driven engine calculates your percentile positioning against the global elite." },
              { num: "03", title: "Execute", desc: "Receive a week-by-week roadmap tailored for Quant/FAANG/Founder trajectories." }
            ].map((step, i) => (
              <div key={i} className="glass-card" style={{ padding: 32, border: "1px solid var(--glass-border)" }}>
                <div style={{ fontFamily: "var(--mono)", color: "var(--accent)", fontSize: 14, marginBottom: 16 }}>{step.num}</div>
                <h3 className="fw700 mb8" style={{ fontSize: 18, letterSpacing: -0.5 }}>{step.title}</h3>
                <p className="text-dim text-sm" style={{ lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BENTO GRID */}
        <div className="bento-grid reveal mt32">
          <div className="glass-card bento-item bento-item-large">
            <div className="page-tag">01 · QUANTIFIED EDGE</div>
            <div className="page-title" style={{ fontSize: 24 }}>The 47 Signals.</div>
            <p className="text-dim">We analyze everything from your commit frequency to your research narrative coherence. No more guessing where you stand.</p>
            <div className="mt32" style={{ display: 'flex', gap: 40 }}>
              <div><div className="stat-val">99.4</div><div className="text-mute">Percentile Avg</div></div>
              <div><div className="stat-val">12k+</div><div className="text-mute">Data Points</div></div>
            </div>
          </div>
          <div className="glass-card bento-item">
            <div className="page-tag">02 · PREDICTIVE</div>
            <div className="page-title" style={{ fontSize: 20 }}>Outcome Modeling.</div>
            <p className="text-dim">Simulate your probability of getting into T10 schools or FAANG based on current velocity.</p>
          </div>
          <div className="glass-card bento-item">
            <div className="page-tag">03 · VELOCITY</div>
            <div className="page-title" style={{ fontSize: 20 }}>Elite Execution.</div>
            <p className="text-dim">A morning dashboard that tells you exactly what to do today to stay in the top 1%.</p>
          </div>
          <div className="glass-card bento-item bento-item-large">
            <div className="page-tag">04 · NETWORK</div>
            <div className="page-title" style={{ fontSize: 24 }}>The Shadow Network.</div>
            <p className="text-dim">Connect with the top 0.1% students in your cohort. Exclusive groups for verified high-performers.</p>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker reveal">
        <div className="ticker-track">
          {["Stanford", "MIT", "Google", "Goldman Sachs", "DeepMind", "Meta", "Harvard", "OpenAI", "Y Combinator"].map(n => (
            <div key={n} className="ticker-item">{n}</div>
          ))}
          {["Stanford", "MIT", "Google", "Goldman Sachs", "DeepMind", "Meta", "Harvard", "OpenAI", "Y Combinator"].map(n => (
            <div key={n + '2'} className="ticker-item">{n}</div>
          ))}
        </div>
      </div>

      {/* ROADMAP */}
      <section className="page reveal" style={{ textAlign: 'center' }}>
        <div className="page-tag">METHODOLOGY</div>
        <h2 className="page-title">The Path to Dominance.</h2>
        <div className="roadmap mt32">
          {[
            { t: "Baseline Assessment", d: "Connect your socials, academic records, and projects for a raw percentile score." },
            { t: "Gap Identification", d: "Our LLM identifies where your narrative is weak compared to successful peers." },
            { t: "Strategic Pivot", d: "We suggest the 'One Big Thing' that will move your score by the most percentiles." },
            { t: "Daily Execution", d: "Micro-tasks pushed to your calendar every morning at 6AM." }
          ].map((item, i) => (
            <div key={i} className={`roadmap-item ${i % 2 === 0 ? '' : 'flex-reverse'}`}>
              <div className="roadmap-content glass-card" style={{ textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                <div className="fw700 mb8">{item.t}</div>
                <div className="text-dim text-sm">{item.d}</div>
              </div>
              <div className="roadmap-dot" />
              <div className="roadmap-content" />
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section className="reveal" style={{ padding: "100px 0" }}>
        <div className="page-tag" style={{ textAlign: "center", width: "100%" }}>SOCIAL PROOF</div>
        <h2 className="page-title" style={{ textAlign: "center", marginTop: 12 }}>The Wall of Elite.</h2>
        <div className="grid2 mt32" style={{ gap: 24 }}>
          {[
            {
              quote: "This is the OS I wish I had when I was prepping for quant roles. Most people focus on the wrong signals. This platform forces you to focus on what actually moves the needle.",
              author: "Senior Software Engineer",
              company: "Google / Ex-Quant",
              tier: "APEX TIER USER"
            },
            {
              quote: "It quantifies the 'hustle' in a way that actually matters to recruiters. My admissions officer specifically pointed out the narrative coherence I built using these signal models.",
              author: "CS Honors Student",
              company: "Top 10 University",
              tier: "DIAMOND TIER USER"
            }
          ].map((t, i) => (
            <div key={i} className="glass-card" style={{ padding: 40, position: "relative" }}>
              <div style={{ fontSize: 48, color: "var(--accent)", opacity: 0.2, position: "absolute", top: 20, left: 24, fontFamily: "serif" }}>"</div>
              <p className="mb24" style={{ fontSize: 16, lineHeight: 1.7, fontStyle: "italic", position: "relative", zIndex: 1 }}>{t.quote}</p>
              <div className="flex items-center gap16">
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--accent)", opacity: 0.1, border: "1px solid var(--accent)" }} />
                <div>
                  <div className="fw700 text-sm">{t.author}</div>
                  <div className="text-xs text-mute">{t.company}</div>
                </div>
                <div className="spacer" />
                <span className="badge badge-gold" style={{ fontSize: 10 }}>{t.tier}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="page reveal">
        <div className="page-tag">QUESTIONS</div>
        <h2 className="page-title">Common Queries.</h2>
        <div className="mt32">
          {[
            { q: "Is my data private?", a: "Yes. All analysis is performed through isolated local modules. Your raw GitHub/University data is never stored on our central servers — only the resulting signal scores." },
            { q: "How accurate are the signals?", a: "Our models are backtested against 10,000+ successful career entries into FAANG, T10 Academia, and top-tier Quants. The margin of error for percentile positioning is < 0.2%." },
            { q: "Is this only for software engineers?", a: "Currently, we are optimized for CS, Quant Finance, and High-Stakes Academia. We are rolling out support for Law and Med-Tech tracks in the coming months." },
            { q: "What is the 'Shadow Network'?", a: "It is a gated social layer. You only get access once your score hits the 99th percentile for your cohort. It prevents noise and ensures high-signal networking." }
          ].map((f, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'active' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q">{f.q} <span>{openFaq === i ? '−' : '+'}</span></div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW: DASHBOARD PREVIEW SECTION */}
      <section className="reveal" style={{ padding: "120px 0" }}>
        <h2 className="page-title" style={{ textAlign: "center", marginBottom: 60 }}>Quantified Intelligence.</h2>
        <div className="glass-card" style={{ padding: 0, overflow: "hidden", position: "relative", maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ padding: "20px 32px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
            </div>
            <div style={{ fontSize: 12, color: "var(--text-mute)", fontFamily: "var(--mono)" }}>TOP 1% OS · INTELLIGENCE_DASHBOARD_LIVE</div>
          </div>
          <div style={{ padding: 40, background: "rgba(0,0,0,0.5)" }}>
            <div className="grid2" style={{ gap: 32 }}>
              <div className="card">
                <div className="stat-val">99.4</div>
                <div className="text-mute">Current Percentile</div>
                <div className="xp-track mt12"><div className="xp-fill" style={{ width: "94%" }} /></div>
              </div>
              <div className="card">
                <div className="stat-val">12.4k</div>
                <div className="text-mute">Data Points Analyzed</div>
                <div className="text-xs text-success mt8">↑ 12% vs last week</div>
              </div>
            </div>
            <div className="card mt32">
              <div className="card-title">Identity: FAANG SWE / Quant</div>
              <div className="text-mute">Your profile is aligning with the top 0.1% of applicants from your region.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-dot" />
              TOP 1% OS
            </div>
            <p className="footer-motto">
              The definitive operating system for high-performance students.
              Engineering your path to the global elite through data and discipline.
            </p>
          </div>

          <div>
            <span className="footer-label">Platform</span>
            <a href="#" className="f-link" onClick={() => onNav(14)}>Benchmarking</a>
            <a href="#" className="f-link" onClick={() => onNav(28)}>Roadmaps</a>
            <a href="#" className="f-link" onClick={() => onNav(34)}>Shadow Network</a>
            <a href="#" className="f-link" onClick={() => onNav(40)}>Elite Mode</a>
          </div>

          <div>
            <span className="footer-label">Company</span>
            <a href="#" className="f-link" onClick={() => onNav(43)}>About Us</a>
            <a href="#" className="f-link">Methodology</a>
            <a href="#" className="f-link">Privacy Policy</a>
            <a href="#" className="f-link">Terms of Service</a>
          </div>

          <div className="footer-cta">
            <h4>Join the Elite</h4>
            <p>Get weekly high-impact signals and peer updates.</p>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="email@access.com"
                className="input"
                style={{ paddingRight: 40, fontSize: 13 }}
              />
              <button style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer',
                fontSize: 18
              }}>→</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2025 TOP 1% OS · BUILT FOR THE BOLD</div>
          <div className="social-links">
            <a href="#" className="social-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.663l4.709 6.272 5.622-6.272zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 1. Signup
function PageSignup({ onNav }) {
  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div className="form-card" style={{ maxWidth: 420, width: "100%" }}>
        <div className="form-title">Create Account</div>
        <div className="form-sub">Join 12,400+ students competing at the top.</div>
        <div className="input-group"><label className="input-label">Email</label><input className="input" placeholder="you@example.com" /></div>
        <div className="input-group"><label className="input-label">Password</label><input className="input" type="password" placeholder="••••••••" /></div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: 16 }}>Create Account</button>
        <div className="form-divider">or continue with</div>
        <div className="flex gap8">
          <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>🔵 Google</button>
          <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>⬛ GitHub</button>
        </div>
        <div className="text-sm text2 mt16" style={{ textAlign: "center" }}>
          Already have an account? <span className="text-accent" style={{ cursor: "pointer" }} onClick={() => onNav(2)}>Log in</span>
        </div>
      </div>
    </div>
  );
}

// 2. Login
function PageLogin({ onNav }) {
  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div className="form-card" style={{ maxWidth: 420, width: "100%" }}>
        <div className="form-title">Welcome back</div>
        <div className="form-sub">Your competitive position awaits.</div>
        <div className="input-group"><label className="input-label">Email</label><input className="input" placeholder="you@example.com" /></div>
        <div className="input-group"><label className="input-label">Password</label><input className="input" type="password" placeholder="••••••••" /></div>
        <div className="flex" style={{ justifyContent: "flex-end", marginBottom: 16 }}>
          <span className="text-sm text-accent" style={{ cursor: "pointer" }} onClick={() => onNav(3)}>Forgot password?</span>
        </div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => onNav(5)}>Sign In →</button>
        <div className="text-sm text2 mt16" style={{ textAlign: "center" }}>
          New here? <span className="text-accent" style={{ cursor: "pointer" }} onClick={() => onNav(1)}>Create account</span>
        </div>
      </div>
    </div>
  );
}

// 3. Forgot Password
function PageForgot() {
  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div className="form-card" style={{ maxWidth: 420, width: "100%" }}>
        <div className="form-title">Reset Password</div>
        <div className="form-sub">We'll send a recovery link to your email.</div>
        <div className="input-group"><label className="input-label">Email</label><input className="input" placeholder="you@example.com" /></div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Send Reset Link</button>
        <div className="alert alert-info mt16">Check your inbox — the link expires in 30 minutes.</div>
      </div>
    </div>
  );
}

// 4. Welcome / Positioning
function PageWelcome({ onNav }) {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 1 · ONBOARDING</span>
        <h1 className="page-title">What Is Competitive Positioning?</h1>
        <p className="page-sub">Most students optimize for grades. Top 1% students optimize for signal. Here's why that distinction determines outcomes.</p>
      </div>
      <div className="grid2 mb24">
        {[
          ["🎯", "Signal Over Score", "Your GPA is noise. Your spike — a concentrated, rare, verifiable achievement — is signal that filters you above 99% of peers."],
          ["📊", "Percentile vs. Group", "You're not competing globally. You're competing in your cohort targeting the same path. We benchmark you exactly there."],
          ["⚡", "Execution Velocity", "The speed at which you convert knowledge to achievement compounds over time. One published paper at 17 > 4.0 GPA at 22."],
          ["🧠", "Narrative Coherence", "Admission officers and hiring managers pattern-match. Your story must collapse into a 3-word archetype: 'CS Researcher', 'Quant Builder'."],
        ].map(([icon, title, desc]) => (
          <div key={title} className="card">
            <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
            <div className="card-title mb4">{title}</div>
            <div className="card-sub">{desc}</div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={() => onNav(5)}>Select My Identity →</button>
    </div>
  );
}

// 5. Identity Selection
function PageIdentity({ onNav, setIdentity }) {
  const [sel, setSel] = useState(null);
  const identities = [
    { id: "faang", icon: "⚙️", name: "FAANG SWE", desc: "Google, Meta, Apple, Amazon, Netflix" },
    { id: "ivy", icon: "🏛️", name: "Ivy / T10 Applicant", desc: "Undergrad or grad admissions" },
    { id: "quant", icon: "📈", name: "Quant / Finance", desc: "HFT, hedge funds, trading firms" },
    { id: "research", icon: "🔬", name: "Research / PhD", desc: "Academia, lab, publication track" },
    { id: "startup", icon: "🚀", name: "Startup Founder", desc: "0→1 builder, revenue, traction" },
    { id: "cs", icon: "🥇", name: "Elite CS / Olympiad", desc: "IOI, ICPC, competitive programming" },
  ];

  const handleContinue = () => {
    setIdentity(sel);
    // Quant and some others skip ACT/SAT (Academic Inputs are specialized)
    onNav(6);
  };

  return (
    <div className="page" style={{ padding: "120px 40px" }}>
      <div className="page-header" style={{ textAlign: "center" }}>
        <span className="page-tag">STEP 2</span>
        <h1 className="page-title">Select Your Path.</h1>
        <p className="page-sub">Your entire experience will be pruned for this specific trajectory.</p>
      </div>
      <div className="grid3 mb24">
        {identities.map((id) => (
          <div key={id.id} className={`id - card ${sel === id.id ? "selected" : ""} `} onClick={() => setSel(id.id)}>
            <div className="id-icon">{id.icon}</div>
            <div className="id-name" style={{ fontWeight: 700 }}>{id.name}</div>
            <div className="id-desc">{id.desc}</div>
          </div>
        ))}
      </div>
      {sel && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={handleContinue}>Continue with {identities.find(i => i.id === sel)?.name} →</button>
        </div>
      )}
    </div>
  );
}

// 6. Academic Inputs
function PageAcademicInputs({ onNav, identity }) {
  const isQuant = identity === "quant";

  return (
    <div className="page" style={{ padding: "80px 40px" }}>
      <div className="page-header">
        <span className="page-tag">STEP 3 · ACADEMIC PROFILE</span>
        <h1 className="page-title">Academic Baseline.</h1>
        <p className="page-sub">
          {isQuant
            ? "For Quants, we prioritize university rank and technical rigour over high school testers."
            : "Enter your academic foundation to baseline your competitive score."}
        </p>
      </div>
      <div className="grid2">
        <div>
          <div className="input-group"><label className="input-label">GPA (Unweighted)</label><input className="input" placeholder="e.g. 3.95" /></div>
          <div className="input-group"><label className="input-label">GPA (Weighted)</label><input className="input" placeholder="e.g. 4.62" /></div>
          {!isQuant && <div className="input-group"><label className="input-label">SAT / ACT Score</label><input className="input" placeholder="e.g. 1580 SAT" /></div>}
          <div className="input-group"><label className="input-label">Course Rigor</label>
            <select className="input select"><option>5+ AP / IB HL</option><option>3-4 AP / IB HL</option><option>1-2 AP / IB HL</option><option>No AP / IB</option></select>
          </div>
        </div>
        <div>
          <div className="input-group"><label className="input-label">AMC / AIME Score</label><input className="input" placeholder="e.g. AIME Qualifier" /></div>
          <div className="input-group"><label className="input-label">AP Exam Scores</label><input className="input" placeholder="e.g. 5 in Calc BC, Phys C" /></div>
          <div className="input-group"><label className="input-label">Class Rank</label><input className="input" placeholder="e.g. Top 2%" /></div>
          <div className="input-group"><label className="input-label">School Prestige</label>
            <select className="input select"><option>Magnet / Highly Competitive</option><option>Large Public</option><option>Private Non-Selective</option><option>International</option></select>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => onNav(7)}>Save & Continue →</button>
    </div>
  );
}

// 7. Academic Achievements
function PageAcademicAchievements({ onNav }) {
  return (
    <div className="page" style={{ padding: "80px 40px" }}>
      <div className="page-header">
        <span className="page-tag">STEP 4 · ACHIEVEMENTS</span>
        <h1 className="page-title">Competitive Proof.</h1>
        <p className="page-sub">Olympiads and awards that define your peak performance.</p>
      </div>
      <div className="mb20">
        <div className="section-title">Olympiad Performance</div>
        <div className="grid2">
          {["IMO / USAMO", "IPhO / USAPhO", "IChO / USNCO", "IOI / USACO"].map(comp => (
            <div key={comp} className="input-group">
              <label className="input-label">{comp}</label>
              <select className="input select"><option>Not Entered</option><option>State / National Level</option><option>International Qualifier</option><option>Medalist</option></select>
            </div>
          ))}
        </div>
      </div>
      <div className="mb20">
        <div className="section-title">Research & Awards</div>
        <div className="input-group"><label className="input-label">Research Competitions (ISEF, STS, etc.)</label>
          <select className="input select"><option>None</option><option>Regional Recognition</option><option>National Finalist</option><option>International Award</option></select>
        </div>
        <div className="input-group"><label className="input-label">Other Notable Awards</label><input className="input" placeholder="Describe awards, honors, or recognitions" /></div>
      </div>
      <button className="btn btn-primary" onClick={() => onNav(8)}>Save & Continue →</button>
    </div>
  );
}

// 8. Programming / Projects Inputs
function PageProjectInputs({ onNav, identity }) {
  const isResearchOnly = identity === "research";

  return (
    <div className="page" style={{ padding: "80px 40px" }}>
      <div className="page-header">
        <span className="page-tag">STEP 5 · TECHNICAL</span>
        <h1 className="page-title">Technical Leverage.</h1>
        <p className="page-sub">Software and system benchmarks.</p>
      </div>
      <div className="input-group"><label className="input-label">GitHub Projects (# with &gt;10 stars)</label><input className="input" placeholder="e.g. 3" /></div>
      <div className="input-group"><label className="input-label">Primary Language / Stack</label><input className="input" placeholder="e.g. Python, TypeScript, Rust, C++" /></div>
      <div className="input-group"><label className="input-label">LeetCode / Codeforces Rating</label><input className="input" placeholder="e.g. LC: 2100, CF: Expert" /></div>
      <div className="input-group"><label className="input-label">Hackathons Won / Placed</label><input className="input" placeholder="e.g. 2 wins, 1 runner-up" /></div>
      <div className="input-group"><label className="input-label">Open Source Contributions</label>
        <select className="input select"><option>None</option><option>Minor PRs</option><option>Regular Contributor</option><option>Core Maintainer</option></select>
      </div>
      <div className="input-group"><label className="input-label">Notable Projects</label><textarea className="input" rows={3} placeholder="Describe your high-signal builds"></textarea></div>
      <button className="btn btn-primary" onClick={() => {
        // Research skip Startup
        if (isResearchOnly) onNav(9);
        else onNav(9); // Default next is research inputs, but research track actually wants it. 
        // Wait, if research, next is 9 (Research). If FAANG, next is 9 (Research)? User said skip research for FAANG.
      }}>Save & Continue →</button>
    </div>
  );
}

// 9. Research / Publication Inputs
function PageResearchInputs({ onNav, identity }) {
  const skipResearch = (identity === "faang" || identity === "startup" || identity === "cs");

  useEffect(() => {
    if (skipResearch) {
      onNav(10); // Skip to Startup
    }
  }, [identity]);

  if (skipResearch) return null;

  return (
    <div className="page" style={{ padding: "80px 40px" }}>
      <div className="page-header">
        <span className="page-tag">STEP 6 · RESEARCH</span>
        <h1 className="page-title">Intellectual Signal.</h1>
        <p className="page-sub">Publications, lab affiliations, and contributions to human knowledge.</p>
      </div>
      <div className="grid2">
        <div>
          <div className="input-group"><label className="input-label">Published Papers</label><input className="input" placeholder="e.g. arXiv, NeurIPS" /></div>
          <div className="input-group"><label className="input-label">Lab Affiliations</label><input className="input" placeholder="e.g. MIT CSAIL" /></div>
        </div>
        <div>
          <div className="input-group"><label className="input-label">Research Area</label><input className="input" placeholder="e.g. ML, Bio" /></div>
          <div className="input-group"><label className="input-label">PI / Lab Lead</label><input className="input" placeholder="e.g. Prof. Smith" /></div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => onNav(10)}>Save & Continue →</button>
    </div>
  );
}

// 10. Startup / Execution Inputs
function PageStartupInputs({ onNav, identity }) {
  const skipStartup = (identity === "quant" || identity === "faang" || identity === "research" || identity === "ivy" || identity === "cs");

  useEffect(() => {
    if (skipStartup) onNav(11);
  }, [identity]);

  if (skipStartup) return null;

  return (
    <div className="page" style={{ padding: "80px 40px" }}>
      <div className="page-header">
        <span className="page-tag">STEP 7 · STARTUP</span>
        <h1 className="page-title">Venture & Scale.</h1>
      </div>
      <div className="input-group"><label className="input-label">Company / Project Name</label><input className="input" placeholder="e.g. Stealth AI" /></div>
      <div className="grid2">
        <div className="input-group"><label className="input-label">Revenue (MRR)</label><input className="input" placeholder="e.g. $2k" /></div>
        <div className="input-group"><label className="input-label">Funding</label><input className="input" placeholder="e.g. Seed / Bootstrapped" /></div>
      </div>
      <button className="btn btn-primary" onClick={() => onNav(11)}>Save & Continue →</button>
    </div>
  );
}

// 11. Economic / Demographics
// 11. Economic / Demographics
function PageDemographics({ onNav }) {
  return (
    <div className="page" style={{ padding: "80px 40px" }}>
      <div className="page-header">
        <span className="page-tag">STEP 8 · DEMOGRAPHICS</span>
        <h1 className="page-title">Contextual Baseline.</h1>
        <p className="page-sub">Context adjusts your percentile against accurate peer groups.</p>
      </div>
      <div className="grid2">
        <div>
          <div className="input-group"><label className="input-label">Location</label><input className="input" placeholder="e.g. New York, USA" /></div>
          <div className="input-group"><label className="input-label">Citizenship</label>
            <select className="input select"><option>US Citizen</option><option>Permanent Resident</option><option>International</option><option>Other</option></select>
          </div>
        </div>
        <div>
          <div className="input-group"><label className="input-label">University / Institution Tier</label>
            <select className="input select"><option>T10 Global</option><option>T50 Global</option><option>Regional Elite</option><option>Standard Public</option></select>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => onNav(12)}>Save & Continue →</button>
    </div>
  );
}

// 12. Skill Stack & Time Horizon
// 12. Skill Stack & Context
function PageSkillStack({ onNav }) {
  const skills = ["Communication", "Math Depth", "Research Experience", "Leadership", "Technical Breadth", "Domain Expertise"];
  const [vals, setVals] = useState({ Communication: 60, "Math Depth": 75, "Research Experience": 40, Leadership: 55, "Technical Breadth": 70, "Domain Expertise": 50 });
  return (
    <div className="page" style={{ padding: "80px 40px" }}>
      <div className="page-header">
        <span className="page-tag">STEP 9 · CAPACITY</span>
        <h1 className="page-title">Growth Potential.</h1>
      </div>
      <div className="card mb24">
        {skills.map(s => (
          <div key={s} className="mb16">
            <div className="flex items-center gap8 mb4">
              <span className="text-sm">{s}</span><span className="spacer" />
              <span className="text-xs text-accent fw700">{vals[s]}%</span>
            </div>
            <input type="range" className="slider-input" min={0} max={100} value={vals[s]}
              onChange={e => setVals(v => ({ ...v, [s]: +e.target.value }))} />
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={() => onNav(13)}>Generate My Score →</button>
    </div>
  );
}

// 13. Onboarding Preview / Summary
// 13. Onboarding Preview / Summary
function PageOnboardingPreview({ onNav, identity }) {
  return (
    <div className="page" style={{ padding: "120px 40px" }}>
      <div className="page-header" style={{ textAlign: "center" }}>
        <span className="page-tag">ANALYSIS COMPLETE</span>
        <h1 className="page-title">Profile Benchmarked.</h1>
        <p className="page-sub">Your archetype is defined. Welcome to the elite tier.</p>
      </div>
      <div className="glass-card mb32" style={{ textAlign: "center", padding: 60 }}>
        <div style={{ fontSize: 13, color: "var(--accent)", marginBottom: 16, fontFamily: "var(--mono)", letterSpacing: 2 }}>INITIAL QUANT SCORE</div>
        <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>74<span style={{ fontSize: 32, color: "var(--text-mute)", fontWeight: 400 }}>/100</span></div>
        <div className="mt24">
          <span className="badge badge-gold">TOP 4% OF {identity?.toUpperCase() || "GLOBAL"} COHORT</span>
        </div>
      </div>
      <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => onNav(14)}>进入 Dashboard →</button>
    </div>
  );
}

// 14. Overall Score Overview
function PageScoreOverview({ onNav }) {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 2 · COMPETITIVE SCORE</span>
        <h1 className="page-title">Your Top 1% Score</h1>
      </div>
      <div className="flex gap16 mb24 items-center">
        <div style={{ background: "var(--bg2)", border: "2px solid var(--accent)", borderRadius: 16, padding: "32px 48px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 72, fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>84</div>
          <div className="text-sm text2 mt8">Overall Score</div>
          <span className="badge badge-gold mt8">Top 7%</span>
        </div>
        <div className="col" style={{ gap: 12, flex: 1 }}>
          {[
            ["Academic Power", 88, "blue"], ["Spike Strength", 72, "gold"],
            ["Execution Velocity", 90, "green"], ["Positioning Advantage", 78, "purple"],
            ["Narrative Coherence", 65, "red"],
          ].map(([label, val, color]) => (
            <div key={label}>
              <div className="flex items-center gap8 mb4">
                <span className="text-sm">{label}</span><span className="spacer" />
                <span className="mono text-xs text2">{val}</span>
              </div>
              <MiniBar val={val} color={color} showPct={false} />
            </div>
          ))}
        </div>
      </div>
      <div className="alert alert-warn mb16">📊 You're 6 points away from the Top 1% threshold. Your narrative coherence is your biggest gap.</div>
      <div className="flex gap12">
        <button className="btn btn-primary" onClick={() => onNav(15)}>View Radar Analysis →</button>
        <button className="btn btn-secondary" onClick={() => onNav(16)}>Compare to Peers</button>
      </div>
    </div>
  );
}

// 15. Radar Graph
function PageRadarGraph({ onNav }) {
  const radarData = [
    { label: "Academic", val: 88 }, { label: "Spike", val: 72 },
    { label: "Velocity", val: 90 }, { label: "Positioning", val: 78 }, { label: "Narrative", val: 65 },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 2 · MULTI-INDEX</span>
        <h1 className="page-title">Performance Radar</h1>
      </div>
      <div className="grid2">
        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <RadarChart data={radarData} size={280} />
        </div>
        <div className="col" style={{ gap: 12 }}>
          {radarData.map(d => (
            <div key={d.label} className="card" style={{ cursor: "pointer" }} onClick={() => onNav(17)}>
              <div className="flex items-center gap8 mb8">
                <span className="fw700 text-sm">{d.label}</span>
                <span className="spacer" />
                <span className="mono" style={{ color: d.val >= 85 ? "var(--accent3)" : d.val >= 70 ? "var(--accent)" : "var(--accent2)" }}>{d.val}</span>
              </div>
              <MiniBar val={d.val} color={d.val >= 85 ? "green" : d.val >= 70 ? "blue" : "red"} showPct={false} />
              <div className="text-xs text2 mt8">Click to see drilldown →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 16. Peer Comparison
function PagePeerComparison() {
  const peers = [
    { name: "User #A4821", identity: "FAANG SWE", score: 91, country: "🇺🇸" },
    { name: "You", identity: "FAANG SWE", score: 84, country: "🇺🇸", isYou: true },
    { name: "User #B2341", identity: "FAANG SWE", score: 82, country: "🇮🇳" },
    { name: "User #C7720", identity: "FAANG SWE", score: 79, country: "🇨🇳" },
    { name: "User #D9012", identity: "FAANG SWE", score: 77, country: "🇬🇧" },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 2 · PEER COMPARISON</span>
        <h1 className="page-title">You vs. Global Peers</h1>
        <p className="page-sub">Anonymized comparison against students targeting the same identity.</p>
      </div>
      <div className="card">
        <table className="table">
          <thead><tr><th>#</th><th>Peer</th><th>Country</th><th>Score</th><th>Percentile</th></tr></thead>
          <tbody>
            {peers.map((p, i) => (
              <tr key={p.name} style={p.isYou ? { background: "rgba(99,210,255,0.04)" } : {}}>
                <td className="mono fw700" style={{ color: i === 0 ? "var(--gold)" : "var(--text3)" }}>#{i + 1}</td>
                <td className="fw700" style={p.isYou ? { color: "var(--accent)" } : {}}>{p.name}{p.isYou && <span className="badge badge-blue" style={{ marginLeft: 8 }}>YOU</span>}</td>
                <td>{p.country}</td>
                <td className="mono text-accent">{p.score}</td>
                <td><span className="badge badge-gold">Top {100 - p.score + 5}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 17. Index Detail Drilldown
function PageIndexDrilldown() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 2 · DRILLDOWN</span>
        <h1 className="page-title">Narrative Coherence — Deep Dive</h1>
        <p className="page-sub">Score: 65/100 · This is your highest-leverage improvement area.</p>
      </div>
      <div className="alert alert-warn mb20">⚠️ Your profile story doesn't collapse into a clear archetype. Reviewers can't pattern-match you in 3 words.</div>
      <div className="card mb16">
        <div className="section-title">Signal Breakdown</div>
        {[
          ["Personal Statement Alignment", 55, "red"], ["Extracurricular Coherence", 72, "blue"],
          ["Recommendation Letter Angle", 60, "gold"], ["Application Narrative Arc", 58, "red"],
          ["Online Presence Consistency", 80, "green"],
        ].map(([label, val, color]) => (
          <div key={label} className="mb16">
            <div className="flex items-center gap8 mb4"><span className="text-sm">{label}</span><span className="spacer" /><span className="mono text-xs text2">{val}</span></div>
            <MiniBar val={val} color={color} showPct={false} />
          </div>
        ))}
      </div>
      <div className="card">
        <div className="section-title">How to Improve</div>
        <div className="timeline">
          {["Define your 3-word archetype: 'Systems-ML-Builder'", "Rewrite your bio to lead with execution metrics not roles", "Align all ECs to support one thread", "Update LinkedIn to match essay narrative"].map((t, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-title">{t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 18. Target Inputs (Outcome Simulator)
function PageTargetInputs({ onNav }) {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 3 · OUTCOME SIMULATOR</span>
        <h1 className="page-title">Define Your Targets</h1>
      </div>
      <div className="grid2 mb20">
        <div>
          <div className="input-group"><label className="input-label">Target Universities</label><input className="input" placeholder="e.g. MIT, Stanford, CMU" /></div>
          <div className="input-group"><label className="input-label">Target Career</label><select className="input select"><option>FAANG Engineer</option><option>Quant Researcher</option><option>Startup Founder</option><option>PhD Academic</option></select></div>
          <div className="input-group"><label className="input-label">5-Year Salary Target</label><select className="input select"><option>$150k+</option><option>$200k+</option><option>$300k+</option><option>$500k+</option></select></div>
        </div>
        <div>
          <div className="input-group"><label className="input-label">Visa / Residency Goal</label><select className="input select"><option>US H1-B</option><option>O-1 Visa</option><option>UK Tier 2</option><option>No Visa Needed</option></select></div>
          <div className="input-group"><label className="input-label">10-Year Net Worth Goal</label><select className="input select"><option>$1M+</option><option>$5M+</option><option>$10M+</option><option>$50M+</option></select></div>
          <div className="input-group"><label className="input-label">Risk Tolerance</label><select className="input select"><option>Conservative</option><option>Moderate</option><option>Aggressive</option></select></div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => onNav(19)}>Run Simulation →</button>
    </div>
  );
}

// 19. Probability Results
function PageProbabilityResult({ onNav }) {
  const results = [
    { label: "MIT Admission Probability", val: "12%", color: "var(--accent2)", note: "Competitive range" },
    { label: "5-Year Salary (p50)", val: "$285k", color: "var(--accent3)", note: "FAANG L5 equivalent" },
    { label: "10-Year Net Worth", val: "$2.1M", color: "var(--accent)", note: "Incl. equity & savings" },
    { label: "H1-B Lottery Likelihood", val: "34%", color: "var(--gold)", note: "Yr 1 attempt probability" },
    { label: "Burnout Risk Score", val: "42/100", color: "var(--accent4)", note: "Moderate — monitor" },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 3 · RESULTS</span>
        <h1 className="page-title">Probability Results</h1>
      </div>
      <div className="grid2 mb24">
        {results.map(r => (
          <div key={r.label} className="stat-card">
            <div className="stat-val" style={{ color: r.color, fontSize: 28 }}>{r.val}</div>
            <div className="stat-label">{r.label}</div>
            <div className="text-xs text2 mt8">{r.note}</div>
          </div>
        ))}
      </div>
      <div className="flex gap12">
        <button className="btn btn-primary" onClick={() => onNav(20)}>Adjust Sliders →</button>
        <button className="btn btn-secondary" onClick={() => onNav(21)}>Compare Scenarios</button>
      </div>
    </div>
  );
}

// 20. Simulation Sliders
function PageSimulationSliders() {
  const [sliders, setSliders] = useState({ gpa: 3.95, lc: 2100, papers: 0, projects: 3, competitions: 1 });
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 3 · SLIDERS</span>
        <h1 className="page-title">Adjust & Simulate</h1>
        <p className="page-sub">Move sliders to see real-time impact on your outcomes.</p>
      </div>
      <div className="grid2 gap16">
        <div className="card">
          <div className="section-title">Input Variables</div>
          {[
            ["GPA", "gpa", 2, 4, 0.01], ["LeetCode Rating", "lc", 1000, 3000, 10],
            ["Published Papers", "papers", 0, 10, 1], ["GitHub Projects", "projects", 0, 20, 1],
            ["Competition Wins", "competitions", 0, 5, 1],
          ].map(([label, key, min, max, step]) => (
            <div key={key} className="mb16">
              <div className="flex items-center gap8 mb4">
                <span className="text-sm">{label}</span><span className="spacer" />
                <span className="mono text-xs text-accent">{sliders[key]}</span>
              </div>
              <input type="range" className="slider-input" min={min} max={max} step={step} value={sliders[key]}
                onChange={e => setSliders(v => ({ ...v, [key]: parseFloat(e.target.value) }))} />
            </div>
          ))}
        </div>
        <div className="col gap12">
          <div className="section-title">Live Outcome Preview</div>
          {[
            ["MIT Probability", Math.min(40, 5 + sliders.papers * 3 + sliders.competitions * 4).toFixed(0) + "%", "red"],
            ["5-Year Salary", "$" + Math.round(200 + sliders.lc / 100 + sliders.papers * 20) + "k", "green"],
            ["Top 1% Score", Math.min(100, 60 + sliders.projects * 2 + sliders.competitions * 5).toFixed(0), "blue"],
          ].map(([label, val, color]) => (
            <div key={label} className="stat-card">
              <div className="stat-val" style={{ color: `var(--accent${color === "green" ? "3" : color === "red" ? "2" : ""})`, fontSize: 24 }}>{val}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 21. Scenario Comparison
function PageScenarioComparison() {
  const scenarios = [
    { name: "Current", score: 84, mit: "12%", salary: "$285k", color: "var(--text2)" },
    { name: "Improved", score: 91, mit: "21%", salary: "$340k", color: "var(--accent)" },
    { name: "Ideal", score: 97, mit: "38%", salary: "$420k", color: "var(--accent3)" },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 3 · SCENARIOS</span>
        <h1 className="page-title">Scenario Comparison</h1>
      </div>
      <div className="grid3 mb24">
        {scenarios.map(s => (
          <div key={s.name} className="card" style={{ borderColor: s.color === "var(--text2)" ? "var(--border)" : s.color, borderWidth: 1 }}>
            <div style={{ color: s.color, fontWeight: 800, fontSize: 16, marginBottom: 12 }}>{s.name}</div>
            <div className="stat-val" style={{ color: s.color, fontSize: 36 }}>{s.score}</div>
            <div className="stat-label mb12">Overall Score</div>
            <div className="text-sm mb4"><span className="text2">MIT Probability: </span><span style={{ color: s.color }}>{s.mit}</span></div>
            <div className="text-sm"><span className="text2">5-Yr Salary: </span><span style={{ color: s.color }}>{s.salary}</span></div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="section-title">What Changes Between Scenarios</div>
        {[
          ["Publish 1 paper", "+3 points Spike, +5% MIT prob"],
          ["Win 1 hackathon", "+2 points Velocity"],
          ["Define narrative archetype", "+8 points Coherence"],
          ["Reach USACO Gold", "+4 points Academic Power"],
        ].map(([action, impact]) => (
          <div key={action} className="flex items-center gap12 mb12">
            <span className="text-sm fw700">→</span>
            <span className="text-sm">{action}</span><span className="spacer" />
            <span className="text-xs text-green">{impact}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 22. Alternative Path Simulator
function PageAlternativePath() {
  const [from, setFrom] = useState("FAANG SWE");
  const [to, setTo] = useState("Startup Founder");
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 3 · PATH SIMULATOR</span>
        <h1 className="page-title">Alternative Path Simulator</h1>
        <p className="page-sub">What if you switched tracks? See the cost, benefit, and timeline.</p>
      </div>
      <div className="card mb20">
        <div className="grid2">
          <div className="input-group"><label className="input-label">Current Path</label>
            <select className="input select" value={from} onChange={e => setFrom(e.target.value)}>
              {["FAANG SWE", "Ivy Admissions", "Quant Finance", "PhD Research", "Startup Founder"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="input-group"><label className="input-label">Test Path</label>
            <select className="input select" value={to} onChange={e => setTo(e.target.value)}>
              {["Startup Founder", "FAANG SWE", "Quant Finance", "PhD Research", "Ivy Admissions"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <button className="btn btn-primary">Simulate Switch →</button>
      </div>
      <div className="grid2">
        <div className="card">
          <div className="card-title mb12" style={{ color: "var(--text2)" }}>Staying: {from}</div>
          <div className="text-sm mb8">Strength Carry-over: <span className="text-accent">High</span></div>
          <div className="text-sm mb8">Signal Decay Risk: <span className="text-green">Low</span></div>
          <div className="text-sm">Time to Competitive: <span className="text-gold">2 years</span></div>
        </div>
        <div className="card" style={{ borderColor: "rgba(99,210,255,0.2)" }}>
          <div className="card-title mb12" style={{ color: "var(--accent)" }}>Switching: {to}</div>
          <div className="text-sm mb8">Required Signal Build: <span className="text-red">High</span></div>
          <div className="text-sm mb8">Opportunity Cost: <span className="text-gold">~18 months</span></div>
          <div className="text-sm">Time to Competitive: <span className="text-red">3.5 years</span></div>
        </div>
      </div>
    </div>
  );
}

// 23. What-if Analytics
function PageWhatIfAnalytics() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 3 · WHAT-IF</span>
        <h1 className="page-title">What-If Analytics</h1>
        <p className="page-sub">See how specific actions change your trajectory over time.</p>
      </div>
      <div className="card mb20">
        <div className="section-title">Trajectory Graph (Score Over Time)</div>
        <svg width="100%" height="200" style={{ overflow: "visible" }}>
          <defs><linearGradient id="traj" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" /><stop offset="100%" stopColor="var(--accent)" stopOpacity="0" /></linearGradient></defs>
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map(y => (
            <line key={y} x1="40" y1={200 - y * 160} x2="100%" y2={200 - y * 160} stroke="var(--border)" strokeWidth="1" />
          ))}
          {/* Current path */}
          <polyline points="40,160 120,145 200,130 280,120 360,110 440,100 520,88" fill="none" stroke="var(--text3)" strokeWidth="2" strokeDasharray="4,3" />
          {/* Improved path */}
          <polyline points="40,160 120,138 200,115 280,95 360,75 440,58 520,42" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
          {/* Labels */}
          <text x="535" y="88" fill="var(--text3)" fontSize="10" fontFamily="var(--mono)">Current</text>
          <text x="535" y="42" fill="var(--accent)" fontSize="10" fontFamily="var(--mono)">Improved</text>
          {/* Y axis labels */}
          {[60, 70, 80, 90, 100].map((v, i) => (
            <text key={v} x="32" y={200 - i * 40} fill="var(--text3)" fontSize="9" fontFamily="var(--mono)" textAnchor="end">{v}</text>
          ))}
          {/* X axis labels */}
          {["Now", "3M", "6M", "9M", "1Y", "18M", "2Y"].map((v, i) => (
            <text key={v} x={40 + i * 80} y="195" fill="var(--text3)" fontSize="9" fontFamily="var(--mono)" textAnchor="middle">{v}</text>
          ))}
        </svg>
      </div>
      <div className="card">
        <div className="section-title">Actions That Create This Gap</div>
        {[
          ["Publish research paper", "+3M from now", "+7 pts"],
          ["Win hackathon", "+4M from now", "+4 pts"],
          ["Clarify personal narrative", "+6M from now", "+9 pts"],
        ].map(([action, when, impact]) => (
          <div key={action} className="flex items-center gap12 mb12 card" style={{ padding: "10px 14px" }}>
            <span className="text-sm fw700">{action}</span><span className="spacer" />
            <span className="badge badge-blue">{when}</span>
            <span className="badge badge-green">{impact}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 24. Skill Gap Overview
function PageSkillGapOverview({ onNav }) {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 4 · SKILL GAP</span>
        <h1 className="page-title">Skill Gap Overview</h1>
        <p className="page-sub">Your weakest areas quantified against FAANG SWE top 1% benchmark.</p>
      </div>
      <div className="grid2 mb24">
        {[
          { label: "System Design", yours: 52, top: 88, color: "red" },
          { label: "Research Output", yours: 30, top: 75, color: "red" },
          { label: "Narrative / Brand", yours: 65, top: 91, color: "gold" },
          { label: "Algorithm Depth", yours: 82, top: 95, color: "blue" },
          { label: "Leadership Proof", yours: 44, top: 80, color: "red" },
          { label: "Network / Access", yours: 58, top: 85, color: "gold" },
        ].map(g => (
          <div key={g.label} className="card">
            <div className="flex items-center gap8 mb8">
              <span className="fw700 text-sm">{g.label}</span><span className="spacer" />
              <span className={`badge badge - ${g.yours < 50 ? "red" : g.yours < 70 ? "gold" : "green"} `}>Gap: {g.top - g.yours}pts</span>
            </div>
            <div className="text-xs text2 mb4">You: {g.yours}</div>
            <MiniBar val={g.yours} color={g.color} showPct={false} />
            <div className="text-xs text2 mb4 mt8">Top 1%: {g.top}</div>
            <MiniBar val={g.top} color="green" showPct={false} />
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={() => onNav(25)}>See ROI Table →</button>
    </div>
  );
}

// 25. Improvement Opportunity Table
function PageImprovementTable({ onNav }) {
  const rows = [
    { action: "Define narrative archetype", effort: "Low", roi: "9 pts", time: "1 week", priority: "CRITICAL" },
    { action: "Publish 1 arXiv paper", effort: "High", roi: "7 pts", time: "3 months", priority: "HIGH" },
    { action: "Win hackathon", effort: "Med", roi: "5 pts", time: "1 month", priority: "HIGH" },
    { action: "USACO Gold → Platinum", effort: "High", roi: "4 pts", time: "6 months", priority: "MED" },
    { action: "Contribute to OSS project", effort: "Med", roi: "3 pts", time: "2 months", priority: "MED" },
    { action: "Cold email 10 professors", effort: "Low", roi: "3 pts", time: "2 weeks", priority: "MED" },
    { action: "Build deployed SaaS project", effort: "High", roi: "5 pts", time: "4 months", priority: "HIGH" },
  ];
  const colors = { CRITICAL: "badge-red", HIGH: "badge-gold", MED: "badge-blue" };
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 4 · ROI TABLE</span>
        <h1 className="page-title">Improvement Opportunities</h1>
        <p className="page-sub">Actions ranked by points gained per effort spent.</p>
      </div>
      <div className="card mb16">
        <table className="table">
          <thead><tr><th>Action</th><th>Effort</th><th>Points Gained</th><th>Timeline</th><th>Priority</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.action}>
                <td className="fw700 text-sm">{r.action}</td>
                <td className="text-sm">{r.effort}</td>
                <td className="mono text-green">{r.roi}</td>
                <td className="text-sm text2">{r.time}</td>
                <td><span className={`badge ${colors[r.priority]} `}>{r.priority}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary" onClick={() => onNav(26)}>See Action Priorities →</button>
    </div>
  );
}

// 26. Action Prioritization
function PageActionPrioritization() {
  const items = [
    { x: 20, y: 85, label: "Narrative Fix", color: "var(--accent3)", size: 14 },
    { x: 70, y: 72, label: "Publish Paper", color: "var(--accent)", size: 11 },
    { x: 55, y: 60, label: "Win Hackathon", color: "var(--accent)", size: 9 },
    { x: 80, y: 45, label: "USACO Platinum", color: "var(--gold)", size: 8 },
    { x: 40, y: 50, label: "Cold Email Profs", color: "var(--accent3)", size: 7 },
    { x: 85, y: 30, label: "PhD App", color: "var(--accent2)", size: 12 },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 4 · PRIORITIZATION</span>
        <h1 className="page-title">High-Impact vs High-Effort</h1>
      </div>
      <div className="card mb20">
        <svg width="100%" height="320" style={{ overflow: "visible" }}>
          <line x1="50%" y1="20" x2="50%" y2="280" stroke="var(--border)" strokeWidth="1" />
          <line x1="20" y1="50%" x2="100%" y2="50%" stroke="var(--border)" strokeWidth="1" />
          <text x="50%" y="12" fill="var(--text3)" fontSize="9" fontFamily="var(--mono)" textAnchor="middle">HIGH IMPACT</text>
          <text x="50%" y="295" fill="var(--text3)" fontSize="9" fontFamily="var(--mono)" textAnchor="middle">LOW IMPACT</text>
          <text x="12" y="50%" fill="var(--text3)" fontSize="9" fontFamily="var(--mono)" textAnchor="middle" transform="rotate(-90,12,160)">LOW EFFORT</text>
          <text x="95%" y="50%" fill="var(--text3)" fontSize="9" fontFamily="var(--mono)" textAnchor="middle">HIGH EFFORT</text>
          {items.map(item => (
            <g key={item.label}>
              <circle cx={`${item.x}% `} cy={`${100 - item.y}% `} r={item.size + 6} fill={item.color} opacity="0.15" />
              <circle cx={`${item.x}% `} cy={`${100 - item.y}% `} r={6} fill={item.color} />
              <text x={`${item.x}% `} y={`${100 - item.y + 4}% `} fill={item.color} fontSize="9" fontFamily="var(--mono)" textAnchor="middle" dy="18">{item.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

// 27. Suggested Next Action
function PageSuggestedNextAction() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 4 · AI SUGGESTION</span>
        <h1 className="page-title">Your #1 Next Move</h1>
      </div>
      <div className="card mb20" style={{ borderColor: "var(--accent)", background: "rgba(99,210,255,0.03)" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🎯</div>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Define Your 3-Word Archetype</div>
        <div className="text-sm text2 mb16">Your narrative coherence score (65) is limiting your MIT probability by an estimated 8%. This is a 1-week, zero-cost action that unlocks your biggest score jump.</div>
        <div className="card mb12" style={{ background: "var(--bg3)" }}>
          <div className="text-xs text2 mb4">EXAMPLE ARCHETYPES</div>
          <div className="flex" style={{ flexWrap: "wrap" }}>
            {["ML Systems Builder", "Competitive Programmer", "CS Research Pioneer", "Quant-Finance Coder"].map(a => (
              <span key={a} className="chip">{a}</span>
            ))}
          </div>
        </div>
        <button className="btn btn-primary">Start This Action →</button>
      </div>
      <div className="section-title">Up Next</div>
      <div className="col gap8">
        {["Publish arXiv paper (Week 3)", "Enter HackMIT (Month 2)", "Cold-email 3 professors (Month 1)"].map((a, i) => (
          <div key={a} className="card flex items-center gap12">
            <span className="mono text-xs text3">#{i + 2}</span>
            <span className="text-sm">{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 28. Year-by-Year Roadmap
function PageRoadmap() {
  const years = [
    { year: "Year 1", milestones: ["Define archetype & narrative", "Publish first arXiv preprint", "Reach USACO Gold", "Intern at YC startup"] },
    { year: "Year 2", milestones: ["Conference paper submission", "Build & launch SaaS", "USACO Platinum attempt", "Apply to T10 universities"] },
    { year: "Year 3", milestones: ["Research at top lab", "Series A portfolio startup", "PhD or FAANG placement", "Speaking at conference"] },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 5 · ROADMAP</span>
        <h1 className="page-title">Year-by-Year Strategic Plan</h1>
      </div>
      <div className="col gap16">
        {years.map(y => (
          <div key={y.year} className="card">
            <div className="flex items-center gap12 mb16">
              <span className="badge badge-blue" style={{ fontSize: 12, padding: "4px 12px" }}>{y.year}</span>
            </div>
            <div className="timeline">
              {y.milestones.map((m, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" style={{ borderColor: i === 0 ? "var(--accent)" : "var(--border)" }} />
                  <div className="timeline-title">{m}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 29. Quarterly Missions
function PageQuarterlyMissions() {
  const quarters = [
    { q: "Q1 2025", theme: "Signal Build", tasks: ["arXiv draft outline", "Email 3 professors", "LeetCode daily contest"], status: "active" },
    { q: "Q2 2025", theme: "Execution Sprint", tasks: ["Submit to NeurIPS workshop", "Launch SaaS MVP", "Win regional hackathon"], status: "upcoming" },
    { q: "Q3 2025", theme: "Recognition", tasks: ["Conference presentation", "YC application", "USACO Platinum"], status: "upcoming" },
    { q: "Q4 2025", theme: "Application Season", tasks: ["Common App essays", "Rec letter coordination", "Interview prep"], status: "upcoming" },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 5 · QUARTERLY</span>
        <h1 className="page-title">Quarterly Missions</h1>
      </div>
      <div className="grid2">
        {quarters.map(q => (
          <div key={q.q} className="card" style={q.status === "active" ? { borderColor: "rgba(99,210,255,0.3)" } : {}}>
            <div className="flex items-center gap8 mb4">
              <span className="fw700">{q.q}</span>
              {q.status === "active" && <span className="badge badge-green">Active</span>}
            </div>
            <div className="text-xs text-accent mb12">{q.theme}</div>
            {q.tasks.map(t => (
              <div key={t} className="flex items-center gap8 mb8">
                <div style={{ width: 16, height: 16, border: "1px solid var(--border)", borderRadius: 4 }} />
                <span className="text-sm text2">{t}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// 30. Weekly Tasks
function PageWeeklyTasks() {
  const [done, setDone] = useState({});
  const tasks = [
    { id: 1, label: "Solve 3 LeetCode Hard problems", pts: "+2", tag: "Algo" },
    { id: 2, label: "Draft intro paragraph of arXiv paper", pts: "+3", tag: "Research" },
    { id: 3, label: "Email Professor Chen at MIT CSAIL", pts: "+2", tag: "Network" },
    { id: 4, label: "Contribute PR to open-source ML repo", pts: "+1", tag: "OSS" },
    { id: 5, label: "Rewrite 3-word archetype + LinkedIn bio", pts: "+4", tag: "Narrative" },
  ];
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 5 · WEEKLY TASKS</span>
        <h1 className="page-title">This Week's Competitive Tasks</h1>
        <p className="page-sub">Week 12 of 52 · {Object.keys(done).length}/{tasks.length} complete</p>
      </div>
      <div className="xp-bar-wrap">
        <span className="xp-level">WEEK 12</span>
        <div className="xp-bar"><MiniBar val={(Object.keys(done).length / tasks.length) * 100} color="green" showPct={false} /></div>
        <span className="xp-pts">{Object.keys(done).length * 3}/15 pts</span>
      </div>
      <div className="col gap8">
        {tasks.map(t => (
          <div key={t.id} className="card flex items-center gap12" style={done[t.id] ? { opacity: 0.5 } : {}}>
            <div style={{ width: 20, height: 20, border: `2px solid ${done[t.id] ? "var(--accent3)" : "var(--border)"} `, borderRadius: 4, background: done[t.id] ? "var(--accent3)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              onClick={() => setDone(d => ({ ...d, [t.id]: !d[t.id] }))}>
              {done[t.id] && <span style={{ color: "#000", fontSize: 12 }}>✓</span>}
            </div>
            <span className="text-sm" style={done[t.id] ? { textDecoration: "line-through" } : {}}>{t.label}</span>
            <span className="spacer" />
            <span className="tag">{t.tag}</span>
            <span className="badge badge-green">{t.pts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 31. Task Drilldown
function PageTaskDrilldown() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 5 · TASK DETAIL</span>
        <h1 className="page-title">Email Professor Chen</h1>
        <p className="page-sub">Network-building task · Estimated time: 45 minutes · +2 pts</p>
      </div>
      <div className="card mb16">
        <div className="section-title">Why This Matters</div>
        <div className="text-sm text2">Cold-emailing professors in your target research area is one of the highest-ROI actions for research track students. One positive response can lead to a lab position, letter of recommendation, or co-authorship — each worth 4–10 points.</div>
      </div>
      <div className="card mb16">
        <div className="section-title">Step-by-Step Instructions</div>
        <div className="timeline">
          {[
            ["Research Prof. Chen's recent work", "Read the last 2 papers. Note specific findings you found interesting."],
            ["Write a 4-paragraph email", "Intro → Why their work → What you bring → Specific ask (15-min call)"],
            ["Attach your CV", "Include GitHub, any publications, GPA if competitive (>3.9)"],
            ["Send between 8–10am Tuesday", "Response rates peak early weekday mornings"],
          ].map(([title, desc]) => (
            <div key={title} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-title">{title}</div>
              <div className="timeline-sub">{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap12">
        <button className="btn btn-primary">Mark Complete (+2 pts)</button>
        <button className="btn btn-secondary">Skip This Week</button>
      </div>
    </div>
  );
}

// 32. Roadmap Scenario Planner
function PageRoadmapScenario() {
  const [scenario, setScenario] = useState("optimal");
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 5 · SCENARIO PLANNER</span>
        <h1 className="page-title">Roadmap Scenario Planner</h1>
      </div>
      <div className="toggle-wrap mb24" style={{ maxWidth: 360 }}>
        {["optimal", "realistic", "conservative"].map(s => (
          <div key={s} className={`toggle - btn ${scenario === s ? "active" : ""} `} onClick={() => setScenario(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </div>
        ))}
      </div>
      <div className="card mb16">
        <div className="section-title">{scenario === "optimal" ? "Optimal" : scenario === "realistic" ? "Realistic" : "Conservative"} Roadmap</div>
        <div className="timeline">
          {(scenario === "optimal"
            ? ["Month 1: Publish preprint, cold-email 10 profs", "Month 2: Hackathon win + narrative defined", "Month 3: Lab offer + USACO Platinum"]
            : scenario === "realistic"
              ? ["Month 1: Cold-email 5 profs, narrative draft", "Month 2: arXiv paper submitted", "Month 3: USACO Gold"]
              : ["Month 1: Define archetype", "Month 2: LeetCode consistency", "Month 3: Research reading list"]
          ).map((item, i) => (
            <div key={i} className="timeline-item">
              <div className={`timeline - dot ${scenario === "optimal" ? "done" : ""} `} />
              <div className="timeline-title">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 33. Weekly Report
function PageWeeklyReport() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 6 · WEEKLY REPORT</span>
        <h1 className="page-title">Week 12 Report</h1>
        <p className="page-sub">Mar 3 – Mar 9, 2025 · Your competitive position this week.</p>
      </div>
      <div className="grid4 mb24">
        <div className="stat-card"><div className="stat-val">+6</div><div className="stat-label">Points Gained</div></div>
        <div className="stat-card"><div className="stat-val" style={{ color: "var(--accent3)" }}>↑3</div><div className="stat-label">Peer Rank Change</div></div>
        <div className="stat-card"><div className="stat-val" style={{ color: "var(--gold)" }}>7</div><div className="stat-label">Day Streak</div></div>
        <div className="stat-card"><div className="stat-val" style={{ color: "var(--accent2)" }}>2</div><div className="stat-label">Peers Passed You</div></div>
      </div>
      <div className="card mb16">
        <div className="section-title">This Week's Activity</div>
        {[
          ["✅ Completed narrative archetype", "+4 pts Coherence", "green"],
          ["✅ Solved 8 LeetCode problems", "+2 pts Velocity", "green"],
          ["❌ Skipped professor cold-email", "-0 pts (carry over)", "red"],
        ].map(([action, impact, color]) => (
          <div key={action} className="flex items-center gap12 mb10">
            <span className="text-sm flex-1">{action}</span>
            <span className={`badge badge - ${color} `}>{impact}</span>
          </div>
        ))}
      </div>
      <div className="alert alert-warn">⚠️ 2 peers who were behind you closed the gap this week. Your execution advantage is narrowing.</div>
    </div>
  );
}

// 34. Leaderboard / Tier System
function PageLeaderboard() {
  const users = [
    { rank: 1, name: "User #X8801", score: 98, tier: "APEX", pts: 12400 },
    { rank: 2, name: "User #A3321", score: 95, tier: "APEX", pts: 11200 },
    { rank: 3, name: "User #B4410", score: 92, tier: "DIAMOND", pts: 10800 },
    { rank: 4, name: "User #C9918", score: 91, tier: "DIAMOND", pts: 10200 },
    { rank: 5, name: "User #D7723", score: 88, tier: "PLATINUM", pts: 9800 },
    { rank: 47, name: "YOU", score: 84, tier: "PLATINUM", pts: 8200, isYou: true },
    { rank: 48, name: "User #F2211", score: 83, tier: "GOLD", pts: 8100 },
  ];
  const tierColor = { APEX: "var(--accent2)", DIAMOND: "var(--accent)", PLATINUM: "var(--purple)", GOLD: "var(--gold)" };
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 6 · LEADERBOARD</span>
        <h1 className="page-title">Global Tier Rankings</h1>
      </div>
      <div className="flex gap8 mb20">
        {["APEX", "DIAMOND", "PLATINUM", "GOLD", "SILVER", "BRONZE"].map(t => (
          <div key={t} style={{ flex: 1, padding: "8px 4px", textAlign: "center", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 6 }}>
            <div className="mono" style={{ fontSize: 10, color: tierColor[t] || "var(--text3)", fontWeight: 700 }}>{t}</div>
          </div>
        ))}
      </div>
      <div className="col gap8">
        {users.map(u => (
          <div key={u.rank} className="lb-item" style={u.isYou ? { borderColor: "rgba(99,210,255,0.3)", background: "rgba(99,210,255,0.04)" } : {}}>
            <div className={`lb - rank ${u.rank === 1 ? "top1" : u.rank === 2 ? "top2" : u.rank === 3 ? "top3" : ""} `}>#{u.rank}</div>
            <div className="lb-name">{u.name}{u.isYou && <span className="badge badge-blue" style={{ marginLeft: 8 }}>YOU</span>}</div>
            <span className="badge" style={{ background: "transparent", color: tierColor[u.tier] || "var(--text3)", borderColor: "transparent" }}>{u.tier}</span>
            <div className="lb-score">{u.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 35. Psych Milestone / Top 0.1%
function PagePsychMilestone() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 6 · ELITE UNLOCK</span>
        <h1 className="page-title">⚡ You've Entered the Top 0.1% Zone</h1>
      </div>
      <div className="card mb20" style={{ border: "1px solid var(--gold)", background: "rgba(255,209,102,0.03)", textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "var(--gold)", marginBottom: 8 }}>APEX Threshold Unlocked</div>
        <div className="text-sm text2">Only 0.1% of students on this platform have reached this competitive score.</div>
      </div>
      <div className="grid2 mb16">
        {[
          ["🔓", "Elite Mode Challenges", "Exclusive high-difficulty tasks visible only at this tier"],
          ["📊", "Full Peer Intelligence", "See detailed breakdowns of top 50 global peers"],
          ["🎯", "Hidden Milestones", "3 secret missions unlocked — each worth 10+ points"],
          ["📞", "Mentor Network Access", "Direct access to FAANG engineers and founders"],
        ].map(([icon, title, desc]) => (
          <div key={title} className="card">
            <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
            <div className="card-title mb4">{title}</div>
            <div className="card-sub">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 36. Streak / Progress History
function PageStreakHistory() {
  const weeks = [72, 75, 74, 78, 80, 79, 82, 84, 83, 85, 84, 84];
  const max = Math.max(...weeks);
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 6 · HISTORY</span>
        <h1 className="page-title">Score History & Streaks</h1>
      </div>
      <div className="card mb20">
        <div className="section-title">Score Trend (Last 12 Weeks)</div>
        <svg width="100%" height="160">
          <polyline
            points={weeks.map((w, i) => `${(i / (weeks.length - 1)) * 100}%, ${160 - (w / max) * 140} `).join(" ")}
            fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round"
          />
          {weeks.map((w, i) => (
            <circle key={i} cx={`${(i / (weeks.length - 1)) * 100}% `} cy={160 - (w / max) * 140} r="4" fill="var(--accent)" />
          ))}
          {weeks.map((w, i) => (
            <text key={i} x={`${(i / (weeks.length - 1)) * 100}% `} y="158" fill="var(--text3)" fontSize="9" fontFamily="var(--mono)" textAnchor="middle">W{i + 1}</text>
          ))}
        </svg>
      </div>
      <div className="grid4 mb20">
        <div className="stat-card"><div className="stat-val" style={{ color: "var(--gold)" }}>7</div><div className="stat-label">Current Streak</div></div>
        <div className="stat-card"><div className="stat-val">21</div><div className="stat-label">Best Streak</div></div>
        <div className="stat-card"><div className="stat-val" style={{ color: "var(--accent3)" }}>+12</div><div className="stat-label">Score Delta (12W)</div></div>
        <div className="stat-card"><div className="stat-val" style={{ color: "var(--purple)" }}>84</div><div className="stat-label">Current Score</div></div>
      </div>
    </div>
  );
}

// 37. XP & Leveling
function PageXPLeveling() {
  const [xp] = useState(8240);
  const nextLevel = 9000;
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 7 · GAMIFICATION</span>
        <h1 className="page-title">XP & Progression</h1>
      </div>
      <div className="card mb20" style={{ textAlign: "center", padding: 32 }}>
        <div className="badge badge-gold mb12" style={{ fontSize: 14, padding: "6px 16px" }}>PLATINUM TIER</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 64, fontWeight: 700, color: "var(--accent)" }}>Lv. 24</div>
        <div className="text-sm text2 mt8 mb16">FAANG SWE Track</div>
        <div className="xp-bar-wrap" style={{ maxWidth: 400, margin: "0 auto" }}>
          <span className="xp-level">Lv.24</span>
          <div className="xp-bar"><MiniBar val={(xp / nextLevel) * 100} color="gold" showPct={false} /></div>
          <span className="xp-pts">{xp.toLocaleString()} / {nextLevel.toLocaleString()} XP</span>
        </div>
      </div>
      <div className="grid3">
        {[
          { icon: "⚡", name: "Speed Coder", desc: "Solved 50 LeetCode Hard", xp: "+500 XP" },
          { icon: "📝", name: "Researcher", desc: "First arXiv submission", xp: "+800 XP" },
          { icon: "🤝", name: "Networker", desc: "10 professor emails sent", xp: "+300 XP" },
        ].map(a => (
          <div key={a.name} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{a.icon}</div>
            <div className="fw700 text-sm mb4">{a.name}</div>
            <div className="text-xs text2 mb8">{a.desc}</div>
            <span className="badge badge-gold">{a.xp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 38. Tier Unlock / Milestone
function PageTierUnlock() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 7 · TIERS</span>
        <h1 className="page-title">Tier Progression</h1>
      </div>
      <div className="col gap12">
        {[
          { tier: "BRONZE", min: 0, max: 60, color: "#cd7f32", locked: false, desc: "Entry-level competitive profile" },
          { tier: "SILVER", min: 60, max: 70, color: "#aaa", locked: false, desc: "Above-average student" },
          { tier: "GOLD", min: 70, max: 80, color: "var(--gold)", locked: false, desc: "Strong candidate for target schools/firms" },
          { tier: "PLATINUM", min: 80, max: 90, color: "var(--purple)", locked: false, desc: "Current tier · You are here", active: true },
          { tier: "DIAMOND", min: 90, max: 95, color: "var(--accent)", locked: true, desc: "Top 5% globally · Requires published work" },
          { tier: "APEX", min: 95, max: 100, color: "var(--accent2)", locked: true, desc: "Top 0.1% · Requires verifiable extraordinary achievement" },
        ].map(t => (
          <div key={t.tier} className="card flex items-center gap16" style={t.active ? { borderColor: t.color, background: `${t.color}08` } : {}}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${t.locked ? "var(--border)" : t.color} `, display: "flex", alignItems: "center", justifyContent: "center", color: t.locked ? "var(--text3)" : t.color, fontSize: 10, fontFamily: "var(--mono)", fontWeight: 700, flexShrink: 0 }}>{t.tier}</div>
            <div style={{ flex: 1 }}>
              <div className="fw700 text-sm mb4">{t.tier} · {t.min}–{t.max} pts</div>
              <div className="text-xs text2">{t.desc}</div>
            </div>
            {t.active && <span className="badge badge-purple">YOU</span>}
            {t.locked && <span className="badge" style={{ color: "var(--text3)", borderColor: "var(--border)" }}>🔒 Locked</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// 39. Psychological Triggers
function PagePsychTriggers() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 7 · COMPETITIVE INTELLIGENCE</span>
        <h1 className="page-title">Competitive Reality Alerts</h1>
        <p className="page-sub">Data-backed signals to sharpen your urgency.</p>
      </div>
      <div className="col gap12">
        {[
          { icon: "🔬", text: "Only 8% of students your age with FAANG goals have published any research. If you publish before 18, you're in the top 1% of your cohort.", type: "alert-info" },
          { icon: "⚡", text: "3 peers who started at the same score as you 4 weeks ago are now 6 points ahead. Weekly consistency is compounding against you.", type: "alert-warn" },
          { icon: "📊", text: "Students who define their archetype in Month 1 score 11 points higher by Month 6, on average.", type: "alert-success" },
          { icon: "🎯", text: "Your current trajectory puts MIT admission probability at 12%. Completing this week's tasks moves it to 16%. That's the delta.", type: "alert-info" },
          { icon: "⏰", text: "Application deadlines are 284 days away. Based on your current pace, you will miss 2 of your 5 target signals.", type: "alert-danger" },
        ].map((a, i) => (
          <div key={i} className={`alert ${a.type} `} style={{ fontSize: 13 }}>
            <span style={{ marginRight: 8 }}>{a.icon}</span>{a.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// 40. Elite Mode / Hidden Challenges
function PageEliteMode() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">MODULE 7 · ELITE MODE</span>
        <h1 className="page-title">🔒 Elite Mode</h1>
        <p className="page-sub">Unlocked for Top 0.1% users only. These challenges are not visible to other users.</p>
      </div>
      <div className="alert alert-info mb20">You unlocked Elite Mode by reaching Score 95+. These challenges cannot be found by searching — they appear only here.</div>
      <div className="col gap12">
        {[
          { name: "Shadow Mentor", desc: "Cold-email 5 partners at top VC firms. Document all responses. Worth 15 points.", difficulty: "EXTREME", reward: "+15 pts", locked: false },
          { name: "Published Researcher", desc: "Submit a paper to a workshop at NeurIPS, ICML, or ICLR. Must be accepted.", difficulty: "EXTREME", reward: "+20 pts", locked: false },
          { name: "Revenue Proof", desc: "Launch a product that generates $1k+ MRR within 90 days.", difficulty: "EXTREME", reward: "+25 pts", locked: false },
          { name: "???", desc: "Complete the first 3 elite challenges to unlock.", difficulty: "LEGENDARY", reward: "???", locked: true },
        ].map(c => (
          <div key={c.name} className="card" style={c.locked ? { opacity: 0.4 } : { borderColor: "rgba(255,94,94,0.2)" }}>
            <div className="flex items-center gap12 mb8">
              <span className="fw700">{c.name}</span><span className="spacer" />
              <span className="badge badge-red">{c.difficulty}</span>
              <span className="badge badge-gold">{c.reward}</span>
            </div>
            <div className="text-sm text2">{c.desc}</div>
            {!c.locked && <button className="btn btn-danger mt12" style={{ fontSize: 12, padding: "6px 14px" }}>Accept Challenge</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

// 41. Profile / Settings
// 41. Profile / Settings
function PageProfileSettings({ onNav }) {
  const [dark, setDark] = useState(true);
  const [notify, setNotify] = useState(true);

  // Mock data as initial state for the "gamer" profile
  const [stats, setStats] = useState({
    identity: "FAANG SWE",
    gpa: "3.95",
    leetcode: "2100",
    github: "340+",
    multiplier: "1.4x"
  });

  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">IDENTITY SYSTEM</span>
        <h1 className="page-title">Profile & Performance</h1>
      </div>

      <div className="grid2 gap24">
        {/* Left Column: Personality & Core Stats */}
        <div className="col gap24">
          <div className="glass-card" style={{ background: "linear-gradient(135deg, rgba(99, 210, 255, 0.1) 0%, transparent 100%)" }}>
            <div className="flex items-center gap16 mb24">
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--accent-gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#000", fontWeight: 800 }}>
                A
              </div>
              <div>
                <div className="text-sm fw700 mb4">ANONYMOUS_USER_v1.0</div>
                <div className="badge badge-blue">LEVEL 14 ARCHITECT</div>
              </div>
            </div>

            <div className="grid2 gap12">
              <div className="card" style={{ padding: "16px", textAlign: "center" }}>
                <div className="text-xs text2 mb4">GLOBAL RANK</div>
                <div className="fw800 text-lg" style={{ color: "var(--gold)" }}>#4,281</div>
              </div>
              <div className="card" style={{ padding: "16px", textAlign: "center" }}>
                <div className="text-xs text2 mb4">MULTIPLIER</div>
                <div className="fw800 text-lg" style={{ color: "var(--accent)" }}>{stats.multiplier}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="section-title">Competitive Score Inputs</div>
            <div className="input-group">
              <label className="input-label">Identity Track</label>
              <select className="input select" value={stats.identity} onChange={e => setStats({ ...stats, identity: e.target.value })}>
                <option>FAANG SWE</option>
                <option>Quant Researcher</option>
                <option>Startup Founder</option>
                <option>PhD Academic</option>
              </select>
            </div>
            <div className="grid2 gap12">
              <div className="input-group">
                <label className="input-label">GPA (Mock)</label>
                <input className="input" value={stats.gpa} onChange={e => setStats({ ...stats, gpa: e.target.value })} />
              </div>
              <div className="input-group">
                <label className="input-label">LeetCode (Mock)</label>
                <input className="input" value={stats.leetcode} onChange={e => setStats({ ...stats, leetcode: e.target.value })} />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">GitHub Stars (Mock)</label>
              <input className="input" value={stats.github} onChange={e => setStats({ ...stats, github: e.target.value })} />
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Sync Data Hub ◈</button>
          </div>
        </div>

        {/* Right Column: Preferences & Appearance */}
        <div className="col gap24">
          <div className="card">
            <div className="section-title">System Appearance</div>
            {[["Dark Mode", dark, setDark], ["Show XP Bar", true, () => { }], ["Compact Sidebar", false, () => { }]].map(([label, val, set]) => (
              <div key={label} className="flex items-center gap12 mb12">
                <span className="text-sm">{label}</span><span className="spacer" />
                <div onClick={() => typeof set === "function" && set(!val)} style={{ width: 40, height: 22, borderRadius: 11, background: val ? "var(--accent)" : "var(--bg3)", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                  <div style={{ position: "absolute", top: 3, left: val ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="section-title">Account Base Details</div>
            <div className="input-group"><label className="input-label">Display Name</label><input className="input" defaultValue="Anonymous User" /></div>
            <div className="input-group"><label className="input-label">Email</label><input className="input" defaultValue="user@example.com" /></div>
            <button className="btn btn-secondary" style={{ width: "100%" }}>Update Credentials</button>
          </div>

          <div className="card">
            <div className="section-title">Interface Configuration</div>
            <div className="mb16">
              <label className="input-label">Typography Scale</label>
              <div className="flex gap8">
                {["Compact", "Default", "Comfortable"].map(t => (
                  <div key={t} className={`chip ${t === "Default" ? "selected" : ""} `} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, background: t === "Default" ? "var(--accent-glow)" : "rgba(255,255,255,0.05)", cursor: "pointer", border: "1px solid var(--glass-border)" }}>{t}</div>
                ))}
              </div>
            </div>
            <div className="divider" style={{ margin: "20px 0" }} />
            <div className="section-title">Regional Synthesis</div>
            <select className="input select"><option>English (US)</option><option>English (UK)</option><option>Hindi</option><option>Mandarin</option></select>
          </div>
        </div>
      </div>
    </div>
  );
}

// 42. Account / Subscription / Payment
function PageSubscription() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">SETTINGS · BILLING</span>
        <h1 className="page-title">Subscription & Billing</h1>
      </div>
      <div className="alert alert-info mb20">You're on the <strong>Free Plan</strong>. Upgrade to access simulation sliders, full peer comparison, and Elite Mode.</div>
      <div className="grid2 mb24">
        {[
          { plan: "Free", price: "$0/mo", features: ["Score overview", "Basic roadmap", "Weekly 5 tasks"], current: true, color: "var(--text2)" },
          { plan: "Pro", price: "$29/mo", features: ["All 45 modules", "Simulation sliders", "Elite mode", "Priority scoring"], current: false, color: "var(--accent)" },
        ].map(p => (
          <div key={p.plan} className="card" style={{ borderColor: p.current ? "var(--accent)" : "var(--border)" }}>
            <div style={{ color: p.color, fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{p.plan}</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 28, color: p.color, marginBottom: 16 }}>{p.price}</div>
            {p.features.map(f => <div key={f} className="text-sm mb8">✓ {f}</div>)}
            <button className={`btn ${p.current ? "btn-ghost" : "btn-primary"} mt12`} style={{ width: "100%" }}>
              {p.current ? "Current Plan" : "Upgrade Now"}
            </button>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="section-title">Payment Method</div>
        <div className="input-group"><label className="input-label">Card Number</label><input className="input" placeholder="•••• •••• •••• ••••" /></div>
        <div className="grid2">
          <div className="input-group"><label className="input-label">Expiry</label><input className="input" placeholder="MM/YY" /></div>
          <div className="input-group"><label className="input-label">CVC</label><input className="input" placeholder="•••" /></div>
        </div>
        <button className="btn btn-primary">Save Card</button>
      </div>
    </div>
  );
}

// 43. Help / About / Legal
function PageHelp() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">HELP & LEGAL</span>
        <h1 className="page-title">Help & About</h1>
      </div>
      <div className="grid2 mb20">
        {[["📖", "FAQ", "Answers to common questions"], ["💬", "Support Chat", "Live chat with our team"], ["📝", "Documentation", "Full platform docs"], ["⚖️", "Terms of Service", "Legal terms"]].map(([icon, label, desc]) => (
          <div key={label} className="card flex items-center gap12" style={{ cursor: "pointer" }}>
            <span style={{ fontSize: 24 }}>{icon}</span>
            <div><div className="fw700 text-sm">{label}</div><div className="text-xs text2">{desc}</div></div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="section-title">About Top 1% OS</div>
        <div className="text-sm text2 mb12">Top 1% OS is a competitive intelligence platform built for students who want to optimize their academic and career trajectory with quantitative precision.</div>
        <div className="text-xs text3">Version 2.4.1 · © 2025 Top 1% OS Inc. · All rights reserved</div>
      </div>
    </div>
  );
}

// 44. Notification Settings
function PageNotifications() {
  const settings = [
    { label: "Weekly Report", desc: "Delivered every Sunday evening", enabled: true },
    { label: "Peer Movement Alerts", desc: "When a peer passes your rank", enabled: true },
    { label: "Milestone Unlocks", desc: "Tier changes and elite unlocks", enabled: true },
    { label: "Task Reminders", desc: "Daily task nudges", enabled: false },
    { label: "Score Changes", desc: "When your score updates", enabled: false },
    { label: "Marketing Emails", desc: "Product updates and features", enabled: false },
  ];
  const [state, setState] = useState(Object.fromEntries(settings.map(s => [s.label, s.enabled])));
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-tag">SETTINGS · NOTIFICATIONS</span>
        <h1 className="page-title">Notification Preferences</h1>
      </div>
      <div className="card">
        {settings.map(s => (
          <div key={s.label} className="flex items-center gap12 mb16">
            <div style={{ flex: 1 }}>
              <div className="fw700 text-sm">{s.label}</div>
              <div className="text-xs text2">{s.desc}</div>
            </div>
            <div onClick={() => setState(p => ({ ...p, [s.label]: !p[s.label] }))}
              style={{ width: 40, height: 22, borderRadius: 11, background: state[s.label] ? "var(--accent)" : "var(--bg3)", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 3, left: state[s.label] ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
            </div>
          </div>
        ))}
        <button className="btn btn-primary mt8">Save Preferences</button>
      </div>
    </div>
  );
}

// ─── NAV STRUCTURE ────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  {
    label: "Public", items: [
      { id: 0, icon: "◈", label: "Landing Page" },
      { id: 1, icon: "✦", label: "Sign Up" },
      { id: 2, icon: "→", label: "Login" },
      { id: 3, icon: "🔑", label: "Forgot Password" },
    ]
  },
  {
    label: "02 · Scoring Dashboard", items: [
      { id: 14, icon: "📊", label: "Score Overview" },
      { id: 15, icon: "🕸️", label: "Radar Graph" },
      { id: 16, icon: "👥", label: "Peer Comparison" },
      { id: 17, icon: "🔍", label: "Index Drilldown" },
    ]
  },
  {
    label: "03 · Outcome Simulator", items: [
      { id: 18, icon: "🎯", label: "Target Inputs" },
      { id: 19, icon: "📈", label: "Probability Results" },
      { id: 20, icon: "🎚️", label: "Simulation Sliders" },
      { id: 21, icon: "⚖️", label: "Scenario Comparison" },
      { id: 22, icon: "🔀", label: "Alternative Path" },
      { id: 23, icon: "📉", label: "What-If Analytics" },
    ]
  },
  {
    label: "04 · Skill Gap", items: [
      { id: 24, icon: "🧩", label: "Skill Gap Overview" },
      { id: 25, icon: "📋", label: "Improvement Table" },
      { id: 26, icon: "🗺️", label: "Action Prioritization" },
      { id: 27, icon: "💡", label: "Next Best Action" },
    ]
  },
  {
    label: "05 · Roadmap", items: [
      { id: 28, icon: "🗓️", label: "Year-by-Year Plan" },
      { id: 29, icon: "📆", label: "Quarterly Missions" },
      { id: 30, icon: "📋", label: "Weekly Tasks" },
      { id: 31, icon: "🔎", label: "Task Drilldown" },
      { id: 32, icon: "🔭", label: "Scenario Planner" },
    ]
  },
  {
    label: "06 · Weekly Loop", items: [
      { id: 33, icon: "📰", label: "Weekly Report" },
      { id: 34, icon: "🏅", label: "Leaderboard" },
      { id: 35, icon: "⚡", label: "Top 0.1% Milestone" },
      { id: 36, icon: "📈", label: "Streak History" },
    ]
  },
  {
    label: "07 · Gamification", items: [
      { id: 37, icon: "⭐", label: "XP & Leveling" },
      { id: 38, icon: "🔓", label: "Tier Unlocks" },
      { id: 39, icon: "⚠️", label: "Psych Triggers" },
      { id: 40, icon: "🔥", label: "Elite Mode" },
    ]
  },
  {
    label: "08 · Settings", items: [
      { id: 41, icon: "👤", label: "Profile & Appearance" },
      { id: 42, icon: "💳", label: "Subscription" },
      { id: 43, icon: "❓", label: "Help & Legal" },
      { id: 44, icon: "🔔", label: "Notifications" },
    ]
  },
];

const PAGES = [
  PageLanding, PageSignup, PageLogin, PageForgot, PageWelcome, PageIdentity,
  PageAcademicInputs, PageAcademicAchievements, PageProjectInputs, PageResearchInputs,
  PageStartupInputs, PageDemographics, PageSkillStack, PageOnboardingPreview,
  PageScoreOverview, PageRadarGraph, PagePeerComparison, PageIndexDrilldown,
  PageTargetInputs, PageProbabilityResult, PageSimulationSliders, PageScenarioComparison,
  PageAlternativePath, PageWhatIfAnalytics, PageSkillGapOverview, PageImprovementTable,
  PageActionPrioritization, PageSuggestedNextAction, PageRoadmap, PageQuarterlyMissions,
  PageWeeklyTasks, PageTaskDrilldown, PageRoadmapScenario, PageWeeklyReport,
  PageLeaderboard, PagePsychMilestone, PageStreakHistory, PageXPLeveling,
  PageTierUnlock, PagePsychTriggers, PageEliteMode, PageProfileSettings,
  PageSubscription, PageHelp, PageNotifications,
];

// ─── APP ─────────────────────────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState(0);
  const [identity, setIdentity] = useState(null);
  const mainRef = useRef(null);

  const isOnboarding = (page >= 4 && page <= 13);

  // Initialize scroll reveals
  useScrollReveal(page);

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [page]);

  const PageComponent = PAGES[page];

  const isAuthPage = page < 4;
  const hideSidebar = isAuthPage || isOnboarding;

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {!hideSidebar && (
          <div className="sidebar">
            <div className="sidebar-logo" style={{ cursor: 'pointer' }} onClick={() => setPage(0)}>
              <div className="logo-dot" />
              TOP 1% OS
            </div>
            {NAV_SECTIONS.map(section => (
              <div key={section.label} className="sidebar-section">
                {section.label !== "Public" && <div className="sidebar-section-label">{section.label}</div>}
                {section.items.map(item => (
                  <div key={item.id}
                    className={`sidebar-item ${page === item.id ? "active" : ""}`}
                    onClick={() => setPage(item.id)}>
                    <span className="icon">{item.icon}</span>
                    <span className="label">{item.label}</span>
                    {item.id === 33 && <div className="notif-dot" />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <div className="main" ref={mainRef}>
          {isAuthPage && (
            <div style={{ position: "absolute", top: 20, left: 24, fontFamily: "var(--mono)", fontSize: 13, color: "var(--accent)", letterSpacing: 2, zIndex: 10, cursor: "pointer" }} onClick={() => setPage(0)}>
              ◈ TOP 1% OS
            </div>
          )}
          {/* Top bar for auth pages nav hint removed per user request */}
          {PageComponent && <PageComponent onNav={setPage} setIdentity={setIdentity} identity={identity} />}
        </div>
      </div>
    </>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
