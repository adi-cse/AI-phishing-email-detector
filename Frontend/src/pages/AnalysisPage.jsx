import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmailForm from '../components/EmailForm'
import ResultDisplay from '../components/ResultDisplay'
import SampleEmails from '../components/SampleEmails'

function AnalysisPage() {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('analyze')

  return (
    <>
      <style>{`
        .analysis-wrapper {
          --bg: #050508;
          --bg-card: rgba(20, 22, 35, 0.6);
          --bg-glass: rgba(240, 245, 255, 0.7);  /* Lighter glass for better contrast */
          --bg-input: rgba(255, 255, 255, 0.9);   /* White background for inputs */
          --border: rgba(100, 110, 140, 0.3);
          --border-glow: rgba(99, 102, 241, 0.3);
          --text: #f8fafc;
          --text-dark: #0f172a;                    /* Dark text for boxes */
          --text-muted: #475569;                   /* Darker muted text */
          --accent: #6366f1;
          --accent-2: #8b5cf6;
          --accent-3: #06b6d4;
          --danger: #f43f5e;
          --success: #10b981;
          --warning: #f59e0b;
          --gradient-1: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
          --shadow-glow: 0 0 40px rgba(99, 102, 241, 0.15);
          --radius: 20px;
          --radius-sm: 12px;
        }

        .analysis-page {
          min-height: 100vh;
          background: var(--bg);
          position: relative;
          overflow-x: hidden;
        }

        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
          animation: float-orb 20s infinite ease-in-out;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: var(--accent);
          top: -100px;
          right: -100px;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: var(--accent-2);
          bottom: -50px;
          left: -50px;
          animation-delay: -5s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: var(--accent-3);
          top: 50%;
          left: 50%;
          animation-delay: -10s;
        }

        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 30px) scale(0.9); }
        }

        .analysis-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(5, 5, 8, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: #cbd5e1;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          border-color: var(--accent);
          color: var(--text);
          background: rgba(99, 102, 241, 0.1);
          transform: translateX(-3px);
        }

        .page-title {
          font-size: 1.25rem;
          font-weight: 700;
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.4);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: var(--success);
        }

        .status-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .analysis-container {
          position: relative;
          z-index: 1;
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .tab-nav {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.4rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          width: fit-content;
        }

        .tab-btn {
          padding: 0.6rem 1.25rem;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          background: var(--gradient-1);
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }

        .tab-btn:hover:not(.active) {
          color: var(--text);
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 1.5rem;
          align-items: start;
        }

        .main-panel {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.75rem;
          box-shadow: var(--shadow-glow);
        }

        .side-panel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* ===== GLASS CARDS - BLACK TEXT ===== */
        .glass-card {
          background: var(--bg-glass);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.3);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
          transition: all 0.3s ease;
        }

        .glass-card,
        .glass-card h3,
        .glass-card h4,
        .glass-card p,
        .glass-card span,
        .glass-card div {
          color: var(--text-dark) !important;
        }

        .glass-card h4 {
          color: #334155 !important;
          margin: 0 0 1rem 0;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .glass-card:hover {
          border-color: var(--border-glow);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }

        /* ===== EMPTY STATE - BLACK TEXT ===== */
        .empty-state {
          min-height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1.5rem;
          background: rgba(248, 250, 252, 0.9);
          border: 2px dashed rgba(148, 163, 184, 0.4);
          border-radius: var(--radius);
          padding: 3rem 2rem;
        }

        .empty-state h3 {
          color: #0f172a !important;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .empty-state p {
          color: #475569 !important;
          font-size: 0.95rem;
          max-width: 300px;
          line-height: 1.6;
        }

        .empty-icon {
          font-size: 5rem;
          animation: float-email 3s ease-in-out infinite;
        }

        @keyframes float-email {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .empty-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--gradient-1);
          border: none;
          border-radius: var(--radius-sm);
          color: white;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .empty-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.6);
        }

        /* ===== LOADING ===== */
        .page-loading {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(5, 5, 8, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          flex-direction: column;
          gap: 1.5rem;
        }

        .loader-modern {
          width: 60px;
          height: 60px;
          position: relative;
        }

        .loader-modern::before,
        .loader-modern::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          border: 3px solid transparent;
        }

        .loader-modern::before {
          width: 100%;
          height: 100%;
          border-top-color: var(--accent);
          border-right-color: var(--accent-2);
          animation: spin 1s linear infinite;
        }

        .loader-modern::after {
          width: 70%;
          height: 70%;
          top: 15%;
          left: 15%;
          border-bottom-color: var(--accent-3);
          border-left-color: var(--accent);
          animation: spin 1.5s linear infinite reverse;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-text {
          color: #94a3b8;
          font-size: 14px;
          font-weight: 500;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .analysis-grid {
            grid-template-columns: 1fr;
          }
          .side-panel {
            order: -1;
          }
        }

        @media (max-width: 640px) {
          .analysis-header {
            padding: 0.75rem 1rem;
          }
          .analysis-container {
            padding: 1rem;
          }
          .main-panel {
            padding: 1.25rem;
          }
          .tab-nav {
            width: 100%;
          }
          .tab-btn {
            flex: 1;
            text-align: center;
          }
        }

        /* ===== SCROLLBAR ===== */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.4);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }
      `}</style>

      <div className="analysis-wrapper">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        <div className="analysis-page">
          <header className="analysis-header">
            <div className="header-left">
              <button className="back-btn" onClick={() => navigate('/')}>
                ← Back
              </button>
              <h1 className="page-title">🔐 Email Scanner</h1>
            </div>
            <div className="status-badge">AI Active</div>
          </header>

          <main className="analysis-container">
            <div className="tab-nav">
              <button 
                className={`tab-btn ${activeTab === 'analyze' ? 'active' : ''}`}
                onClick={() => setActiveTab('analyze')}
              >
                ✍️ Analyze Email
              </button>
              <button 
                className={`tab-btn ${activeTab === 'samples' ? 'active' : ''}`}
                onClick={() => setActiveTab('samples')}
              >
                🧪 Try Samples
              </button>
            </div>

            <div className="analysis-grid">
              <div className="main-panel">
                {activeTab === 'analyze' ? (
                  <EmailForm 
                    onAnalyze={setResult}
                    setLoading={setLoading}
                    setError={setError}
                    loading={loading}
                    error={error}
                  />
                ) : (
                  <SampleEmails onLoadSample={() => setError('')} />
                )}
              </div>

              <div className="side-panel">
                {result ? (
                  <ResultDisplay result={result} />
                ) : (
                  <div className="empty-state">
                    <span className="empty-icon">📬</span>
                    <h3>Ready to Scan</h3>
                    <p>Paste your email content or try a sample to detect phishing attempts</p>
                    <button className="empty-cta" onClick={() => setActiveTab('analyze')}>
                      Start Analysis →
                    </button>
                  </div>
                )}

                <div className="glass-card">
                  <h4>📊 Detection Stats</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{fontSize: '13px', color: '#475569'}}>Accuracy</span>
                      <span style={{fontSize: '14px', fontWeight: 700, color: 'var(--success)'}}>99.2%</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{fontSize: '13px', color: '#475569'}}>Layers</span>
                      <span style={{fontSize: '14px', fontWeight: 700, color: 'var(--accent)'}}>3 AI</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{fontSize: '13px', color: '#475569'}}>Speed</span>
                      <span style={{fontSize: '14px', fontWeight: 700, color: 'var(--accent-3)'}}>&lt;2s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {loading && (
            <div className="page-loading">
              <div className="loader-modern"></div>
              <div className="loading-text">AI is analyzing your email...</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AnalysisPage