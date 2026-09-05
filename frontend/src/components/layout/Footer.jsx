import React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

export const Footer = () => {
  return (
    <footer className="gov-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>TrainCast</h3>
          <span className="footer-brand-tag">• Dynamic Railway ETA (SIH26028)</span>
        </div>

        <div className="footer-links">
          <Link to="/about#team" className="footer-team-badge">Our Team</Link>
          <Link to="/">Home</Link>
          <Link to="/search">Train Status</Link>
          <Link to="/network">Network</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className="footer-disclaimer-sub">
        <span>Prototype demonstration for Smart India Hackathon. Displayed operational data is simulated/replayed.</span>
        <span>Ministry of Railways</span>
      </div>
    </footer>
  );
};
