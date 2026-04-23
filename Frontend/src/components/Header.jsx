import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  const scrollToSection = (e, id) => {
    e.preventDefault()
    if (id) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <style>{`
        .header-wrapper {
          --bg:#0a0b0f; --bg2:#111318; --bg3:#181c25; --bg4:#1e2330;
          --border:#2a3040; --border2:#3a4560;
          --text:#e8eaf2; --text2:#8b92a8; --text3:#555e78;
          --accent:#4f6fff; --accent2:#7b5fff; --accent3:#00d4aa;
          --danger:#ff4f6e; --warn:#ffaa00; --success:#00cc7a;
          --radius:12px; --radius2:8px; --radius3:20px;
          --transition: all 0.2s ease;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        }

        /* ===== Sticky Header with Glass Effect ===== */
        .top-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 11, 15, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 0 2rem;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: var(--transition);
        }

        .top-header.scrolled {
          background: rgba(10, 11, 15, 0.95);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ===== Logo Styles ===== */
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          border-radius: var(--radius2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          animation: pulse 2s infinite;
          flex-shrink: 0;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79, 111, 255, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(79, 111, 255, 0); }
        }

        .logo-text {
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(135deg, #fff, var(--text2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.3px;
        }

        /* ===== Navigation Styles ===== */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-btn {
          background: none;
          border: 1px solid var(--border);
          color: var(--text2);
          padding: 6px 16px;
          border-radius: var(--radius3);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .nav-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(79, 111, 255, 0.1);
          transform: translateY(-1px);
        }

        .nav-btn.primary {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          font-weight: 600;
        }

        .nav-btn.primary:hover {
          background: #3a5aee;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(79, 111, 255, 0.4);
        }

        .nav-btn:active {
          transform: translateY(0);
        }

        /* ===== Mobile Menu Toggle ===== */
        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 8px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 101;
        }

        .mobile-toggle span {
          width: 24px;
          height: 2px;
          background: var(--text);
          border-radius: 2px;
          transition: var(--transition);
        }

        .mobile-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .mobile-toggle.active span:nth-child(2) {
          opacity: 0;
        }
        .mobile-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* ===== Responsive Design ===== */
        @media (max-width: 768px) {
          .top-header {
            padding: 0 1rem;
          }

          .nav-links {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background: var(--bg2);
            flex-direction: column;
            padding: 1rem;
            gap: 0.5rem;
            border-bottom: 1px solid var(--border);
            transform: translateY(-150%);
            transition: transform 0.3s ease;
            z-index: 99;
          }

          .nav-links.active {
            transform: translateY(0);
          }

          .nav-links .nav-btn {
            width: 100%;
            justify-content: center;
            padding: 10px;
            font-size: 14px;
          }

          .mobile-toggle {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .logo-text {
            font-size: 16px;
          }
          .logo-icon {
            width: 28px;
            height: 28px;
            font-size: 14px;
          }
        }

        /* ===== Accessibility ===== */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        .logo:focus-visible,
        .nav-btn:focus-visible,
        .mobile-toggle:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
          border-radius: var(--radius2);
        }
      `}</style>

      <div className="header-wrapper">
        <header className="top-header" id="top-header">
          <div className="header-content">
            {/* Logo */}
            <div 
              className="logo" 
              onClick={() => navigate('/')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
              aria-label="PhishGuard Home"
            >
              <div className="logo-icon" aria-hidden="true">🛡️</div>
              <span className="logo-text">PhishGuard</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="nav-links" id="nav-links" aria-label="Main Navigation">
              <button 
                className="nav-btn"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    scrollToSection(e, 'how-it-works')
                  } else {
                    navigate('/#how-it-works')
                  }
                }}
              >
                How It Works
              </button>
              <button 
                className="nav-btn"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    scrollToSection(e, 'features')
                  } else {
                    navigate('/#features')
                  }
                }}
              >
                Features
              </button>
              <button 
                className="nav-btn primary"
                onClick={() => navigate('/analyze')}
              >
                Analyze Email
              </button>
            </nav>

            {/* Mobile Toggle Button */}
            <button 
              className="mobile-toggle" 
              aria-label="Toggle menu"
              aria-expanded="false"
              aria-controls="nav-links"
              onClick={(e) => {
                const nav = document.getElementById('nav-links')
                const toggle = e.currentTarget
                nav?.classList.toggle('active')
                toggle.classList.toggle('active')
                toggle.setAttribute('aria-expanded', 
                  nav?.classList.contains('active') ? 'true' : 'false'
                )
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </header>
      </div>

      {/* Scroll Effect Script */}
      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          const header = document.getElementById('top-header');
          if (!header) return;
          
          let ticking = false;
          window.addEventListener('scroll', function() {
            if (!ticking) {
              window.requestAnimationFrame(function() {
                if (window.scrollY > 10) {
                  header.classList.add('scrolled');
                } else {
                  header.classList.remove('scrolled');
                }
                ticking = false;
              });
              ticking = true;
            }
          }, { passive: true });
        })();
      `}} />
    </>
  )
}

export default Header