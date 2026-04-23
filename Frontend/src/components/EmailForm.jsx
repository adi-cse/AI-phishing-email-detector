import React, { useState } from 'react'
import { detectEmail } from '../services/api'

function EmailForm({ onAnalyze, setLoading, setError, loading, error }) {
  const [email, setEmail] = useState({ subject: '', body: '', sender: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email.subject.trim() || !email.body.trim()) {
      setError('Please fill in subject and body')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await detectEmail(email)
      onAnalyze(result)
    } catch (err) {
      setError(err.message || 'Failed to analyze email')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmail(prev => ({ ...prev, [name]: value }))
  }

  const clearForm = () => {
    setEmail({ subject: '', body: '', sender: '' })
  }

  return (
    <>
      <style>{`
        /* ===== EmailForm Embedded Styles - FIXED ===== */
        .email-form-wrapper {
          /* Light Theme Variables */
          --primary: #4361ee;
          --primary-hover: #3a56d4;
          --primary-light: #eef2ff;
          --danger: #ef4444;
          --danger-light: #fef2f2;
          --success: #22c55e;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --bg-card: #ffffff;
          --bg-page: #f8fafc;
          --border: #e2e8f0;
          --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          --radius: 16px;
          --radius-sm: 10px;
          --transition: all 0.2s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .form-card {
          background: var(--bg-card);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 2rem;
          max-width: 650px;
          margin: 2rem auto;
          border: 1px solid var(--border);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-card h2 {
          margin: 0 0 1.5rem 0;
          color: var(--text-primary);
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--primary-light);
        }

        .email-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .form-group label::before {
          content: '';
          width: 4px;
          height: 14px;
          background: var(--primary);
          border-radius: 2px;
        }

        /* ✅ FIXED: Input/Textarea - Always Visible Text */
        .form-group input,
        .form-group textarea {
          padding: 0.875rem 1rem;
          border: 2px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          
          /* Text color - light theme */
          color: var(--text-primary);
          background: var(--bg-page);
          
          transition: var(--transition);
          outline: none;
          font-family: inherit;
          resize: vertical;
          min-height: 44px;
          
          /* ✅ Ensure text is always visible */
          -webkit-text-fill-color: var(--text-primary);
          caret-color: var(--primary);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--primary);
          background: #fff;
          box-shadow: 0 0 0 4px var(--primary-light);
          color: var(--text-primary) !important;
          -webkit-text-fill-color: var(--text-primary) !important;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: var(--text-secondary);
          opacity: 0.7;
          -webkit-text-fill-color: var(--text-secondary);
        }

        .form-group textarea {
          min-height: 140px;
          line-height: 1.5;
        }

        .alert {
          padding: 0.875rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: shake 0.3s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        .alert-error {
          background: var(--danger-light);
          color: var(--danger);
          border: 1px solid #fecaca;
        }

        .alert-error::before {
          content: '⚠️';
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-analyze,
        .btn-clear {
          padding: 0.875rem 1.5rem;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-width: 140px;
        }

        .btn-analyze {
          background: linear-gradient(135deg, var(--primary), var(--primary-hover));
          color: white;
          box-shadow: 0 4px 14px rgba(67, 97, 238, 0.4);
        }

        .btn-analyze:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(67, 97, 238, 0.6);
        }

        .btn-analyze:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-clear {
          background: var(--bg-page);
          color: var(--text-secondary);
          border: 2px solid var(--border);
        }

        .btn-clear:hover {
          background: var(--border);
          color: var(--text-primary);
          border-color: var(--text-secondary);
        }

        /* ✅ FIXED: Dark Mode - Proper Input Text Visibility */
        @media (prefers-color-scheme: dark) {
          .email-form-wrapper {
            --text-primary: #f1f5f9;        /* Light text for dark mode */
            --text-secondary: #94a3b8;
            --bg-card: #1e293b;
            --bg-page: #0f172a;              /* Dark background for inputs */
            --border: #334155;
            --primary-light: #1e3a8a;
          }
          
          .form-group input,
          .form-group textarea {
            background: var(--bg-page) !important;
            color: var(--text-primary) !important;           /* ✅ White text */
            -webkit-text-fill-color: var(--text-primary) !important;
            border-color: var(--border);
          }
          
          .form-group input:focus,
          .form-group textarea:focus {
            background: #1e293b !important;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            border-color: var(--primary);
          }
          
          .form-group input::placeholder,
          .form-group textarea::placeholder {
            color: var(--text-secondary) !important;
            -webkit-text-fill-color: var(--text-secondary) !important;
          }
          
          .btn-clear {
            background: #334155;
            color: #f1f5f9;
          }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .form-card {
            margin: 1rem;
            padding: 1.5rem;
          }
          
          .button-group {
            flex-direction: column;
          }
          
          .btn-analyze,
          .btn-clear {
            width: 100%;
          }
        }
      `}</style>

      <div className="email-form-wrapper">
        <div className="form-card">
          <h2>📧 Analyze Email</h2>
          <form onSubmit={handleSubmit} className="email-form">
            <div className="form-group">
              <label htmlFor="sender">From (Sender Email)</label>
              <input
                type="email"
                id="sender"
                name="sender"
                className="form-input"
                value={email.sender}
                onChange={handleChange}
                placeholder="attacker@phishing.com"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-input"
                value={email.subject}
                onChange={handleChange}
                placeholder="URGENT: Verify Your Account Now!"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="body">Email Body</label>
              <textarea
                id="body"
                name="body"
                className="form-input"
                value={email.body}
                onChange={handleChange}
                placeholder="Paste the full email body here..."
                rows="10"
              />
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="button-group">
              <button type="submit" disabled={loading} className="btn-analyze">
                {loading ? '⏳ Analyzing...' : '🔍 Analyze Email'}
              </button>
              <button type="button" onClick={clearForm} className="btn-clear">
                🗑️ Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EmailForm