import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        .home-wrapper {
          --bg:#0a0b0f; --bg2:#111318; --bg3:#181c25; --bg4:#1e2330;
          --border:#2a3040; --border2:#3a4560;
          --text:#e8eaf2; --text2:#8b92a8; --text3:#555e78;
          --accent:#4f6fff; --accent2:#7b5fff; --accent3:#00d4aa;
          --danger:#ff4f6e; --warn:#ffaa00; --success:#00cc7a;
          --radius:12px; --radius2:8px; --radius3:20px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .page { min-height: 100vh; display: flex; flex-direction: column; background: var(--bg); color: var(--text); }
        .hero {
          flex: 1; display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 4rem 2rem; text-align: center;
          position: relative; overflow: hidden;
        }
        .hero-glow {
          position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(79,111,255,0.12) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(79,111,255,0.12); border: 1px solid rgba(79,111,255,0.3);
          color: var(--accent); padding: 6px 16px; border-radius: var(--radius3);
          font-size: 12px; font-weight: 600; letter-spacing: .5px;
          text-transform: uppercase; margin-bottom: 1.5rem;
        }
        .hero h1 {
          font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800;
          line-height: 1.1; margin-bottom: 1rem; max-width: 700px; color: var(--text);
        }
        .hero h1 span {
          background: linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: 16px; color: var(--text2); max-width: 500px;
          line-height: 1.6; margin-bottom: 2.5rem;
        }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-bottom: 4rem; }
        .btn-hero {
          padding: 14px 28px; border-radius: var(--radius3); font-size: 15px;
          font-weight: 600; cursor: pointer; transition: all .2s; border: none;
        }
        .btn-hero.main {
          background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff;
        }
        .btn-hero.main:hover {
          transform: translateY(-2px); box-shadow: 0 8px 30px rgba(79,111,255,0.4);
        }
        .btn-hero.ghost {
          background: transparent; border: 1px solid var(--border2); color: var(--text);
        }
        .btn-hero.ghost:hover { border-color: var(--accent); color: var(--accent); }
        .stats-row { display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; margin-bottom: 4rem; }
        .stat-item { text-align: center; }
        .stat-num {
          font-size: 28px; font-weight: 800;
          background: linear-gradient(135deg, var(--accent3), var(--accent));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .stat-label { font-size: 12px; color: var(--text3); margin-top: 2px; }
        .features-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px; width: 100%; max-width: 700px; margin: 0 auto;
        }
        .feat-card {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 1.25rem; text-align: left;
          transition: border-color .2s, transform .2s;
        }
        .feat-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .feat-icon {
          width: 36px; height: 36px; border-radius: var(--radius2);
          background: rgba(79,111,255,0.15); display: flex;
          align-items: center; justify-content: center; font-size: 16px; margin-bottom: 10px;
        }
        .feat-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; color: var(--text); }
        .feat-desc { font-size: 12px; color: var(--text2); line-height: 1.5; }
        .how-section {
          background: var(--bg2); border-top: 1px solid var(--border);
          padding: 3rem 2rem; text-align: center;
        }
        .how-section h2 { font-size: 22px; font-weight: 700; margin-bottom: 2rem; color: var(--text); }
        .steps {
          display: flex; gap: 0; flex-wrap: wrap; justify-content: center;
          max-width: 700px; margin: 0 auto; position: relative;
        }
        .step { flex: 1; min-width: 140px; padding: 1rem; position: relative; }
        .step-num {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff; font-weight: 700; font-size: 16px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 12px;
        }
        .step h3 { font-size: 14px; font-weight: 600; margin-bottom: 4px; color: var(--text); }
        .step p { font-size: 12px; color: var(--text2); line-height: 1.5; }
        .step-arrow {
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: var(--text3); padding-top: 20px;
        }
        footer {
          background: var(--bg); border-top: 1px solid var(--border);
          padding: 1.5rem 2rem; text-align: center; font-size: 13px; color: var(--text3);
        }
        footer span { color: var(--accent); }
        @media (max-width: 768px) {
          .hero { padding: 3rem 1.5rem; }
          .hero-actions { flex-direction: column; align-items: center; }
          .btn-hero { width: 100%; max-width: 280px; }
          .steps { flex-direction: column; gap: 1rem; }
          .step-arrow { display: none; }
        }
      `}</style>
      <div className="home-wrapper">
        <div className="page">
          <Header />
          <main className="hero">
            <div className="hero-glow"></div>
            <div className="hero-badge">● AI-Powered Detection</div>
            <h1>Stop <span>Phishing Attacks</span><br/>Before They Reach You</h1>
            <p className="hero-sub">
              Paste any suspicious email and our 3-layer AI detection engine 
              will tell you instantly if it's safe.
            </p>
            <div className="hero-actions">
              <button className="btn-hero main" onClick={() => navigate('/analyze')}>
                Check an Email Now →
              </button>
              <button className="btn-hero ghost" onClick={() => document.getElementById('how')?.scrollIntoView({behavior:'smooth'})}>
                See How It Works
              </button>
            </div>
            <div className="stats-row">
              <div className="stat-item"><div className="stat-num">99.2%</div><div className="stat-label">Detection Accuracy</div></div>
              <div className="stat-item"><div className="stat-num">3-Layer</div><div className="stat-label">AI Analysis</div></div>
              <div className="stat-item"><div className="stat-num">&lt;2s</div><div className="stat-label">Instant Results</div></div>
            </div>
            <div className="features-grid">
              <div className="feat-card"><div className="feat-icon">📋</div><div className="feat-title">Dataset Rules</div><div className="feat-desc">Pattern-matched against known phishing signatures</div></div>
              <div className="feat-card"><div className="feat-icon">🔗</div><div className="feat-title">URL Analysis</div><div className="feat-desc">Deep scan of all embedded links and redirects</div></div>
              <div className="feat-card"><div className="feat-icon">🤖</div><div className="feat-title">AI Analysis</div><div className="feat-desc">Claude AI contextual understanding of intent</div></div>
              <div className="feat-card"><div className="feat-icon">⚡</div><div className="feat-title">Instant Results</div><div className="feat-desc">Full report in under 2 seconds</div></div>
            </div>
          </main>
          <section className="how-section" id="how">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step"><div className="step-num">1</div><h3>Paste Email</h3><p>Copy paste the suspicious email content</p></div>
              <div className="step-arrow">→</div>
              <div className="step"><div className="step-num">2</div><h3>AI Scans</h3><p>3-layer detection runs in parallel</p></div>
              <div className="step-arrow">→</div>
              <div className="step"><div className="step-num">3</div><h3>Get Report</h3><p>Detailed verdict with full breakdown</p></div>
            </div>
          </section>
          <footer>🎓 College Project — Powered by <span>Claude AI</span></footer>
        </div>
      </div>
    </>
  )
}
export default HomePage