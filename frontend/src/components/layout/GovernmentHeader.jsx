import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { useAuth } from '../../hooks/useAuth';
import { Train, ShieldAlert, User, LogOut, CheckCircle2, Info } from 'lucide-react';
import IRLogo from '../../assets/logos/indian_railways_logo.png';
import './layout.css';

export const GovernmentHeader = () => {
  const { appMode, lastUpdated } = useApp();
  const { user, logout } = useAuth();

  const formattedTime = new Date(lastUpdated).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <>
      <header className="gov-header">
        <div className="gov-header-left">
          <div className="gov-logos">
            <img src={IRLogo} alt="Indian Railways" className="gov-logo-img" />
            <div className="ministry-text">
              <span>Government of India</span>
              <span>Ministry of Railways</span>
            </div>
          </div>
          <div className="app-brand">
            <Link to="/control/dashboard" className="app-title-link">
              <Train size={22} className="mr-1" />
              <h1>TRAINCAST</h1>
            </Link>
            <span className="app-subtitle">AI-Based Train ETA & Delay Forecasting</span>
          </div>
        </div>
        
        <div className="gov-header-right">
          {/* System Operational Badge */}
          <div className="system-health-badge" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34d399',
            padding: '4px 10px',
            borderRadius: '16px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.5px'
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 6px #10b981'
            }}></span>
            SYSTEM OPERATIONAL
          </div>

          {/* Mode Badge */}
          <div className="mode-badge demo-mode" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            color: '#93c5fd',
            padding: '4px 10px',
            borderRadius: '16px',
            fontSize: '11px',
            fontWeight: '700'
          }}>
            REPLAY / SIMULATION
          </div>

          {/* Last Update */}
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>
            Last update: {formattedTime} IST
          </div>
          
          <div className="header-actions">
            <Link to="/control/alerts" className="icon-btn" aria-label="Notifications" title="Operational Alerts">
              <ShieldAlert size={18} />
            </Link>
            
            {user ? (
              <div className="user-profile">
                <User size={18} className="mr-1" />
                <span className="user-name" style={{ fontSize: '12px' }}>{user.name || 'Section Controller'}</span>
                <button className="icon-btn ml-2" onClick={logout} title="Logout">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-secondary text-xs" style={{ padding: '4px 10px' }}>
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Persistent Operational Disclaimer Bar */}
      <div style={{
        position: 'fixed',
        top: 'var(--header-height, 60px)',
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: '#07152B',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '11px',
        padding: '3px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Info size={12} className="text-muted" />
          <span>
            <strong>TRAINCAST Prototype:</strong> Operational data is replay-derived or simulated and does not represent a live connection to Indian Railways internal systems.
          </span>
        </div>
        <div style={{ fontSize: '10px', color: '#94a3b8' }}>
          SIH 2026 • Ministry of Railways (SIH26028)
        </div>
      </div>
    </>
  );
};
