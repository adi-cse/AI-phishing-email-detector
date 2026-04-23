import React, { useState } from 'react'
import { detectEmail } from '../services/api'

function SampleEmails({ onLoadSample }) {
  const [loading, setLoading] = useState(false)
  const [selectedSample, setSelectedSample] = useState(null)

  const samples = [
    {
      type: 'phishing',
      name: 'Account Suspension',
      preview: 'Your account has been suspended...',
      email: {
        subject: 'URGENT: Your Account Has Been Suspended!',
        body: 'Dear Customer,\n\nYour account has been suspended due to suspicious activity. Click here immediately to verify your account or it will be permanently closed.\n\nVerify Account: http://192.168.1.1:8080/verify',
        sender: 'security@notabank.tk'
      }
    },
    {
      type: 'phishing',
      name: 'Prize Scam',
      preview: 'You have been selected as a lottery winner...',
      email: {
        subject: 'Congratulations! You Won $1,000,000!',
        body: 'You have been selected as a lottery winner! Click here to claim your prize immediately: https://bit.ly/claim-prize\n\nVerify with credit card and SSN.',
        sender: 'lottery@rewards.xyz'
      }
    },
    {
      type: 'suspicious',
      name: 'Payment Update',
      preview: 'We need to update your payment information...',
      email: {
        subject: 'Update Your Payment Method',
        body: 'We need to update your payment information. Click here to verify: https://tinyurl.com/verify',
        sender: 'noreply@company.info'
      }
    },
    {
      type: 'legitimate',
      name: 'Meeting Reminder',
      preview: 'Project meeting is tomorrow at 2 PM...',
      email: {
        subject: 'Project Meeting Tomorrow at 2 PM',
        body: 'Hi Team,\n\nReminder: Our project meeting is tomorrow at 2 PM in Conference Room B.\n\nAgenda:\n- Updates\n- Timeline\n- Q&A\n\nSee you then!',
        sender: 'john.smith@company.com'
      }
    }
  ]

  const handleAnalyzeSample = async (sample) => {
    setSelectedSample(sample.name)
    setLoading(true)
    try {
      const result = await detectEmail(sample.email)
      onLoadSample?.(result)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
      setSelectedSample(null)
    }
  }

  const getTypeConfig = (type) => {
    const configs = {
      phishing: {
        icon: '🚨',
        label: 'Phishing',
        border: 'rgba(244,63,94,0.4)',
        bg: 'rgba(244,63,94,0.1)',
        bgHover: 'rgba(244,63,94,0.2)',
        text: '#f43f5e',
        badgeBg: 'rgba(244,63,94,0.15)',
        glow: '0 0 20px rgba(244,63,94,0.15)'
      },
      suspicious: {
        icon: '⚠️',
        label: 'Suspicious',
        border: 'rgba(245,158,11,0.4)',
        bg: 'rgba(245,158,11,0.1)',
        bgHover: 'rgba(245,158,11,0.2)',
        text: '#f59e0b',
        badgeBg: 'rgba(245,158,11,0.15)',
        glow: '0 0 20px rgba(245,158,11,0.15)'
      },
      legitimate: {
        icon: '✅',
        label: 'Legitimate',
        border: 'rgba(16,185,129,0.4)',
        bg: 'rgba(16,185,129,0.1)',
        bgHover: 'rgba(16,185,129,0.2)',
        text: '#10b981',
        badgeBg: 'rgba(16,185,129,0.15)',
        glow: '0 0 20px rgba(16,185,129,0.15)'
      }
    }
    return configs[type] || configs.legitimate
  }

  return (
    <>
      <style>{`
        /* ===== SampleEmails - Modern Dark Theme ===== */
        .samples-wrapper {
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
          --danger: #f43f5e;
          --warning: #f59e0b;
          --success: #10b981;
          --radius: 16px;
          --radius-sm: 10px;
          --shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          --transition: all 0.25s ease;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        }

        /* ===== Samples Card Base ===== */
        .samples-card {
          background: var(--bg-card);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.25rem;
          margin: 0 auto;
          box-shadow: var(--shadow);
          animation: slideUp 0.3s ease-out;
          position: relative;
          overflow: hidden;
        }

        .samples-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-glow), transparent);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .samples-card h3 {
          margin: 0 0 1rem 0;
          color: var(--text);
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }

        .samples-card h3::after {
          content: '🧪';
          font-size: 1.1rem;
        }

        /* ===== Samples Grid Layout ===== */
        .samples-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 0.6rem;
        }

        /* ===== Sample Button Styles ===== */
        .sample-btn {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          padding: 0.875rem 1rem;
          background: var(--bg-glass);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
          min-height: 75px;
          font-family: inherit;
          overflow: hidden;
        }

        .sample-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.03) 100%);
          opacity: 0;
          transition: var(--transition);
          pointer-events: none;
        }

        .sample-btn:hover:not(:disabled):not(.loading) {
          border-color: var(--border-glow);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .sample-btn:hover::before {
          opacity: 1;
        }

        .sample-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .sample-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        /* ===== Type-Specific Styles ===== */
        .sample-btn.sample-phishing {
          border-left: 3px solid var(--danger);
        }
        .sample-btn.sample-phishing:hover:not(:disabled):not(.loading) {
          background: rgba(244,63,94,0.12);
          border-color: rgba(244,63,94,0.5);
          box-shadow: 0 8px 25px rgba(244,63,94,0.15);
        }

        .sample-btn.sample-suspicious {
          border-left: 3px solid var(--warning);
        }
        .sample-btn.sample-suspicious:hover:not(:disabled):not(.loading) {
          background: rgba(245,158,11,0.12);
          border-color: rgba(245,158,11,0.5);
          box-shadow: 0 8px 25px rgba(245,158,11,0.15);
        }

        .sample-btn.sample-legitimate {
          border-left: 3px solid var(--success);
        }
        .sample-btn.sample-legitimate:hover:not(:disabled):not(.loading) {
          background: rgba(16,185,129,0.12);
          border-color: rgba(16,185,129,0.5);
          box-shadow: 0 8px 25px rgba(16,185,129,0.15);
        }

        /* ===== Sample Type Badge ===== */
        .sample-type {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: var(--text);
        }

        .sample-btn.sample-phishing .sample-type { background: rgba(244,63,94,0.15); color: var(--danger); }
        .sample-btn.sample-suspicious .sample-type { background: rgba(245,158,11,0.15); color: var(--warning); }
        .sample-btn.sample-legitimate .sample-type { background: rgba(16,185,129,0.15); color: var(--success); }

        /* ===== Sample Name & Preview ===== */
        .sample-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text);
          line-height: 1.3;
        }

        .sample-preview {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          width: 100%;
        }

        /* ===== Loading State ===== */
        .sample-btn.loading {
          pointer-events: none;
          opacity: 0.8;
        }

        .sample-btn.loading .sample-name::after {
          content: '';
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-left: 6px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: var(--text);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ===== Selected State ===== */
        .sample-btn.selected {
          border-width: 2px;
          box-shadow: 0 0 0 2px var(--border-glow), var(--shadow);
        }

        .sample-btn.selected::after {
          content: '✓';
          position: absolute;
          top: 6px;
          right: 8px;
          width: 18px;
          height: 18px;
          background: var(--success);
          color: #fff;
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: popIn 0.3s ease-out;
        }

        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }

        /* ===== Tooltip ===== */
        .sample-btn[title]:hover::before {
          content: attr(title);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          padding: 0.4rem 0.6rem;
          background: var(--bg-input);
          color: var(--text);
          font-size: 0.75rem;
          border-radius: 6px;
          border: 1px solid var(--border);
          white-space: nowrap;
          opacity: 1;
          visibility: visible;
          pointer-events: none;
          z-index: 10;
          backdrop-filter: blur(8px);
        }

        /* ===== Responsive Design ===== */
        @media (max-width: 640px) {
          .samples-card {
            margin: 0;
            padding: 1rem;
          }

          .samples-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }

          .sample-btn {
            min-height: 70px;
            padding: 0.75rem;
          }

          .sample-name {
            font-size: 0.85rem;
          }

          .sample-preview {
            display: none;
          }
        }

        @media (max-width: 400px) {
          .samples-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ===== Accessibility ===== */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        .sample-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        /* ===== Scrollbar for card ===== */
        .samples-card {
          max-height: 300px;
          overflow-y: auto;
        }
        .samples-card::-webkit-scrollbar { width: 4px; }
        .samples-card::-webkit-scrollbar-track { background: transparent; }
        .samples-card::-webkit-scrollbar-thumb { 
          background: var(--border); 
          border-radius: 10px; 
        }
      `}</style>

      <div className="samples-wrapper">
        <div className="samples-card" role="region" aria-label="Sample Email Tests">
          <h3>Test Samples</h3>
          
          <div className="samples-grid" role="list">
            {samples.map((sample, i) => {
              const config = getTypeConfig(sample.type)
              const isSelected = selectedSample === sample.name
              
              return (
                <button
                  key={i}
                  className={`sample-btn sample-${sample.type}${isSelected ? ' selected' : ''}${loading && isSelected ? ' loading' : ''}`}
                  onClick={() => handleAnalyzeSample(sample)}
                  disabled={loading}
                  title={`Test ${config.label} example: ${sample.name}`}
                  role="listitem"
                  aria-label={`Analyze ${config.label} sample: ${sample.name}`}
                >
                  <span className="sample-type">
                    {config.icon} {sample.type}
                  </span>
                  <span className="sample-name">{sample.name}</span>
                  <span className="sample-preview">{sample.preview}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default SampleEmails