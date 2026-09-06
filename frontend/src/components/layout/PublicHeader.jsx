import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';
import IRCTCLogo from '../../assets/logos/IRCTC.png';
import IRLogo from '../../assets/logos/indian_railways_logo.png';
import teamLogo from '../../assets/logos/UNPAID_INTERNS.png';
import './layout.css';

export const PublicHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.location.reload();
    }
  };

  const setFontScale = (scale) => {
    document.documentElement.style.setProperty('--font-scale', scale);
    localStorage.setItem('traincast-font-scale', scale);
  };

  return (
    <header className="public-header">
      {/* Level 1 - Government Strip */}
      <div className="government-strip">
        <div className="gov-left">
          <span>🇮🇳 Government of India | Ministry of Railways</span>
        </div>
        <div className="gov-right">
          <div className="accessibility-controls">
            <button onClick={() => setFontScale(0.9)} aria-label="Decrease font size" title="Decrease font size">A-</button>
            <button onClick={() => setFontScale(1.0)} aria-label="Normal font size" title="Normal font size">A</button>
            <button onClick={() => setFontScale(1.1)} aria-label="Increase font size" title="Increase font size">A+</button>
          </div>
          <div className="language-dropdown">
            <select aria-label="Select Language (Prototype)" title="Language Preference (Prototype)">
              <option value="en">English ✓</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
        </div>
      </div>

      {/* Level 2 - Main Navigation */}
      <div className="main-navigation">
        <div className="nav-left">
          <Link to="/" onClick={handleHomeClick} className="logo-container" aria-label="Indian Railways Home">
            <img src={IRLogo} alt="Indian Railways" className="ir-logo" />
            <div className="logo-text">
              <span className="logo-title">Indian Railways</span>
              <span className="logo-tagline">Safety | Security | Punctuality</span>
            </div>
          </Link>
        </div>

        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-center ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" onClick={handleHomeClick} className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">Train Status</Link>
          <Link to="/network" className="nav-link">Network</Link>
          <Link to="/about" className="nav-link">About TrainCast</Link>
          <Link to="/contact" className="nav-link">Contact & Help</Link>
        </div>

        <div className="nav-right">
          <Link to="/about#team" onClick={() => {
            setTimeout(() => {
              const el = document.getElementById('team');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }} style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }} title="Meet the Team">
            <img src={teamLogo} alt="Team Logo" style={{ height: '54px', objectFit: 'contain' }} />
          </Link>
          <a 
            href="https://www.irctc.co.in/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Visit official IRCTC website"
            className="irctc-link"
          >
            <img src={IRCTCLogo} alt="IRCTC" className="irctc-logo" />
          </a>
          <Link to="/login" className="staff-portal-btn" title="Authorized Railway Operations Login">
            <Lock size={12} /> Staff Login
          </Link>
        </div>
      </div>
    </header>
  );
};
