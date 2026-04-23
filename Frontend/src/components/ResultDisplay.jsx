import React from 'react'

function ResultDisplay({ result }) {
  const getVerdictType = (verdict) => {
    if (verdict?.includes('PHISHING')) return 'phishing'
    if (verdict?.includes('SUSPICIOUS')) return 'suspicious'
    return 'legitimate'
  }

  const getVerdictConfig = (type) => {
    const configs = {
      phishing: {
        icon: '🚨',
        gradient: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(244,63,94,0.05))',
        border: 'rgba(244,63,94,0.4)',
        glow: '0 0 30px rgba(244,63,94,0.2)',
        text: '#f43f5e',
        bg: 'rgba(244,63,94,0.1)',
        pulse: 'rgba(244,63,94,0.3)'
      },
      suspicious: {
        icon: '⚠️',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))',
        border: 'rgba(245,158,11,0.4)',
        glow: '0 0 30px rgba(245,158,11,0.2)',
        text: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        pulse: 'rgba(245,158,11,0.3)'
      },
      legitimate: {
        icon: '✅',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
        border: 'rgba(16,185,129,0.4)',
        glow: '0 0 30px rgba(16,185,129,0.2)',
        text: '#10b981',
        bg: 'rgba(16,185,129,0.1)',
        pulse: 'rgba(16,185,129,0.3)'
      }
    }
    return configs[type] || configs.legitimate
  }

  if (!result) return null

  const verdictType = getVerdictType(result.verdict)
  const config = getVerdictConfig(verdictType)
  const confidencePct = Math.round((result.confidence || 0) * 100)

  return (
    <>
      <style>{`
        /* ===== ResultDisplay - Modern Dark Theme ===== */
        .result-wrapper {
          --bg: #050508;
          --bg-card: rgba(20, 22, 35, 0.7);
          --bg-glass: rgba(30, 35, 55, 0.5);
          --bg-input: rgba(255, 255, 255, 0.05);
          --border: rgba(100, 110, 140, 0.25);
          --border-glow: rgba(99, 102, 241, 0.3);
          --text: #f8fafc;
          --text-muted: #94a3b8;
          --text-dim: #64748b;
          --accent: #6366f1;
          --accent-2: #8b5cf6;
          --danger: #f43f5e;
          --warning: #f59e0b;
          --success: #10b981;
          --radius: 20px;
          --radius-sm: 12px;
          --shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          --shadow-glow: 0 0 40px rgba(99, 102, 241, 0.1);
          --transition: all 0.3s ease;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        }

        /* ===== Result Card Base ===== */
        .result-card {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.5rem;
          max-width: 720px;
          margin: 0 auto;
          box-shadow: var(--shadow), var(--shadow-glow);
          animation: slideUp 0.4s ease-out;
          position: relative;
          overflow: hidden;
        }

        .result-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-glow), transparent);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ===== Verdict Hero Box ===== */
        .verdict-box {
          padding: 1.75rem;
          border-radius: var(--radius-sm);
          text-align: center;
          margin-bottom: 1.5rem;
          border: 1px solid;
          position: relative;
          overflow: hidden;
          background: var(--bg-glass);
          transition: var(--transition);
        }

        .verdict-box::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle, var(--pulse) 0%, transparent 60%);
          opacity: 0;
          animation: pulse-glow 3s infinite;
          pointer-events: none;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.15; transform: scale(1.2); }
        }

        .verdict-box.phishing { border-color: var(--danger); }
        .verdict-box.suspicious { border-color: var(--warning); }
        .verdict-box.legitimate { border-color: var(--success); }

        .verdict-icon {
          font-size: 3.5rem;
          margin-bottom: 0.75rem;
          display: inline-block;
          animation: bounce 0.6s ease-out;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
        }

        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15) rotate(5deg); }
        }

        .verdict-box h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.3px;
        }

        /* ===== Score Circle ===== */
        .score-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 1rem 0;
        }

        .score-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          font-weight: 800;
          background: var(--bg-input);
          border: 3px solid;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .score-circle::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: rotate 3s linear infinite;
          opacity: 0.6;
        }

        @keyframes rotate {
          to { transform: rotate(360deg); }
        }

        .verdict-box.phishing .score-circle { border-color: var(--danger); color: var(--danger); }
        .verdict-box.suspicious .score-circle { border-color: var(--warning); color: var(--warning); }
        .verdict-box.legitimate .score-circle { border-color: var(--success); color: var(--success); }

        .score-label {
          font-size: 0.95rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .confidence {
          margin: 0.75rem 0 0 0;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .confidence-bar {
          height: 4px;
          background: var(--bg-input);
          border-radius: 2px;
          margin-top: 0.5rem;
          overflow: hidden;
          max-width: 200px;
          margin-left: auto;
          margin-right: auto;
        }

        .confidence-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
        }

        /* ===== Layers Section ===== */
        .layers-section {
          border-top: 1px solid var(--border);
          padding-top: 1.25rem;
        }

        .layers-section h3 {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .layer-item {
          background: var(--bg-glass);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 1rem;
          margin-bottom: 0.75rem;
          transition: var(--transition);
        }

        .layer-item:hover {
          border-color: var(--border-glow);
          transform: translateX(3px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .layer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px dashed var(--border);
        }

        .layer-title {
          font-weight: 600;
          color: var(--text);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .layer-score {
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          color: var(--text-muted);
        }

        .layer-item.phishing .layer-score { color: var(--danger); border-color: rgba(244,63,94,0.3); }
        .layer-item.suspicious .layer-score { color: var(--warning); border-color: rgba(245,158,11,0.3); }
        .layer-item.legitimate .layer-score { color: var(--success); border-color: rgba(16,185,129,0.3); }

        /* ===== Score Bar ===== */
        .score-bar {
          height: 5px;
          background: var(--bg-input);
          border-radius: 3px;
          margin: 0.5rem 0;
          overflow: hidden;
        }

        .score-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .layer-item.phishing .score-bar-fill { 
          background: linear-gradient(90deg, var(--danger), #ec4899); 
        }
        .layer-item.suspicious .score-bar-fill { 
          background: linear-gradient(90deg, var(--warning), #f97316); 
        }
        .layer-item.legitimate .score-bar-fill { 
          background: linear-gradient(90deg, var(--success), #06b6d4); 
        }

        /* ===== Lists & Content ===== */
        .pattern-list,
        .url-list,
        .indicator-list {
          margin: 0.5rem 0 0 0;
          padding-left: 1rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.7;
          list-style: none;
        }

        .pattern-list li,
        .url-list li,
        .indicator-list li {
          margin-bottom: 0.35rem;
          padding-left: 1rem;
          position: relative;
          word-break: break-word;
        }

        .pattern-list li::before,
        .indicator-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: bold;
        }

        .url-list li {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 0.8rem;
          background: var(--bg-input);
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          display: inline-block;
          margin: 0.2rem 0.2rem 0.2rem 0;
          border: 1px solid var(--border);
        }

        .url-list li::before {
          content: '🔗';
          margin-right: 4px;
        }

        .no-data {
          margin: 0.25rem 0 0 0;
          font-size: 0.85rem;
          color: var(--text-dim);
          font-style: italic;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .no-data::before {
          content: '✓';
          color: var(--success);
          font-weight: bold;
        }

        .reasoning {
          margin: 0.5rem 0 0 0;
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
          padding: 0.75rem;
          background: var(--bg-input);
          border-radius: 8px;
          border-left: 3px solid var(--accent);
        }

        .reasoning strong {
          color: var(--text);
        }

        .error {
          margin: 0.25rem 0 0 0;
          font-size: 0.85rem;
          color: var(--danger);
          background: rgba(244,63,94,0.1);
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          border: 1px solid rgba(244,63,94,0.3);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* ===== Timestamp ===== */
        .timestamp {
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
        }

        /* ===== Badge Styles ===== */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge-phishing { background: rgba(244,63,94,0.15); color: var(--danger); }
        .badge-suspicious { background: rgba(245,158,11,0.15); color: var(--warning); }
        .badge-legitimate { background: rgba(16,185,129,0.15); color: var(--success); }

        /* ===== Responsive Design ===== */
        @media (max-width: 640px) {
          .result-card {
            margin: 0.5rem;
            padding: 1.25rem;
          }

          .verdict-icon { font-size: 2.8rem; }
          .score-circle { width: 60px; height: 60px; font-size: 1.4rem; }
          
          .layer-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .url-list li {
            font-size: 0.75rem;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        /* ===== Accessibility ===== */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .result-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        /* ===== Scrollbar for long content ===== */
        .result-card {
          max-height: calc(100vh - 160px);
          overflow-y: auto;
        }
        .result-card::-webkit-scrollbar { width: 5px; }
        .result-card::-webkit-scrollbar-track { background: transparent; }
        .result-card::-webkit-scrollbar-thumb { 
          background: var(--border); 
          border-radius: 10px; 
        }
        .result-card::-webkit-scrollbar-thumb:hover {
          background: var(--border-glow);
        }
      `}</style>

      <div className="result-wrapper">
        <div className="result-card" role="region" aria-label="Email Analysis Results">
          
          {/* ===== Verdict Hero Box ===== */}
          <div className={`verdict-box ${verdictType}`} role="status" aria-live="polite">
            <div className="verdict-icon" aria-hidden="true">{config.icon}</div>
            <h2>{result.verdict}</h2>
            
            <div className="score-display" aria-label={`Security score: ${result.overallScore} out of 10`}>
              <div className="score-circle">{result.overallScore}</div>
              <span className="score-label">/ 10</span>
            </div>
            
            <div className="confidence">
              <span>Confidence</span>
              <div className="confidence-bar" aria-hidden="true">
                <div className="confidence-fill" style={{ width: `${confidencePct}%` }}></div>
              </div>
              <span style={{marginLeft: '0.5rem'}}>{confidencePct}%</span>
            </div>
            
            {/* Verdict Badge */}
            <div style={{marginTop: '0.75rem'}}>
              <span className={`badge badge-${verdictType}`}>
                {verdictType.toUpperCase()}
              </span>
            </div>
          </div>

          {/* ===== Analysis Breakdown ===== */}
          <div className="layers-section">
            <h3>📊 Analysis Breakdown</h3>

            {/* Dataset Rules Layer */}
            <div className={`layer-item ${verdictType}`}>
              <div className="layer-header">
                <span className="layer-title">📋 Dataset Rules</span>
                <span className="layer-score">{result.layers?.datasetRules?.score ?? 0}/5</span>
              </div>
              <div className="score-bar" aria-hidden="true">
                <div 
                  className="score-bar-fill" 
                  style={{ width: `${Math.min((result.layers?.datasetRules?.score ?? 0) / 5 * 100, 100)}%` }}
                />
              </div>
              {result.layers?.datasetRules?.patterns?.length > 0 ? (
                <ul className="pattern-list">
                  {result.layers.datasetRules.patterns.slice(0, 3).map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                  {result.layers.datasetRules.patterns.length > 3 && (
                    <li className="no-data" style={{color: 'var(--text-dim)', fontStyle: 'italic'}}>
                      +{result.layers.datasetRules.patterns.length - 3} more patterns
                    </li>
                  )}
                </ul>
              ) : (
                <p className="no-data">No suspicious patterns detected</p>
              )}
            </div>

            {/* URL Analysis Layer */}
            <div className={`layer-item ${verdictType}`}>
              <div className="layer-header">
                <span className="layer-title">🔗 URL Analysis</span>
                <span className="layer-score">{result.layers?.urlAnalysis?.score ?? 0}/5</span>
              </div>
              <div className="score-bar" aria-hidden="true">
                <div 
                  className="score-bar-fill" 
                  style={{ width: `${Math.min((result.layers?.urlAnalysis?.score ?? 0) / 5 * 100, 100)}%` }}
                />
              </div>
              <p style={{margin: '0.5rem 0', fontSize: '0.85rem', color: 'var(--text-muted)'}}>
                URLs found: <strong style={{color: 'var(--text)'}}>{result.layers?.urlAnalysis?.urlCount ?? 0}</strong>
              </p>
              {result.layers?.urlAnalysis?.suspiciousUrls?.length > 0 ? (
                <ul className="url-list">
                  {result.layers.urlAnalysis.suspiciousUrls.map((u, i) => (
                    <li key={i} title={u}>
                      {u.length > 45 ? u.substring(0, 45) + '...' : u}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No suspicious URLs detected</p>
              )}
            </div>

            {/* AI Analysis Layer */}
            <div className={`layer-item ${verdictType}`}>
              <div className="layer-header">
                <span className="layer-title">🤖 AI Analysis</span>
                <span className="layer-score">
                  {result.layers?.aiAnalysis?.score != null 
                    ? result.layers.aiAnalysis.score.toFixed(1) 
                    : 'N/A'}/5
                </span>
              </div>
              <div className="score-bar" aria-hidden="true">
                <div 
                  className="score-bar-fill" 
                  style={{ 
                    width: result.layers?.aiAnalysis?.score != null
                      ? `${Math.min(result.layers.aiAnalysis.score / 5 * 100, 100)}%` 
                      : '0%' 
                  }}
                />
              </div>
              {result.layers?.aiAnalysis?.error ? (
                <p className="error">⚠️ {result.layers.aiAnalysis.error}</p>
              ) : (
                <>
                  <p style={{margin: '0.5rem 0', fontSize: '0.85rem', color: 'var(--text-muted)'}}>
                    <strong style={{color: 'var(--text)'}}>AI Confidence:</strong>{' '}
                    {Math.round((result.layers.aiAnalysis?.confidence ?? 0) * 100)}%
                  </p>
                  <p className="reasoning">
                    <strong>Analysis:</strong> {result.layers?.aiAnalysis?.reasoning || 'No analysis available'}
                  </p>
                  {result.layers?.aiAnalysis?.indicators?.length > 0 && (
                    <ul className="indicator-list">
                      {result.layers.aiAnalysis.indicators.map((ind, i) => (
                        <li key={i}>{ind}</li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ===== Timestamp ===== */}
          <div className="timestamp" aria-label={`Analysis completed at ${result.timestamp}`}>
            🕐 Analyzed: {result.timestamp ? new Date(result.timestamp).toLocaleString() : 'Just now'}
          </div>
        </div>
      </div>
    </>
  )
}

export default ResultDisplay