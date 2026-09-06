import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Activity, BrainCircuit, ArrowRight, Zap, GitCommit, CheckCircle2, Award, Sparkles, Map, Radio, XCircle, Gauge, Layers, Users, GraduationCap } from 'lucide-react';
import VandeBharatSnow from '../../assets/images/vandeBharat_snow.png';
import teamLogo from '../../assets/logos/UNPAID_INTERNS.png';
import srecLogo from '../../assets/logos/SRECLoGo_v3.svg';
import { teamData } from '../../data/teamData';
import './public.css';

const About = () => {
  React.useEffect(() => {
    if (window.location.hash === '#team') {
      setTimeout(() => {
        const el = document.getElementById('team');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="about-page-wrapper animate-fade-in-up">
      {/* 1. Award-Winning Cinematic Blend Banner */}
      <section className="about-blend-banner">
        {/* High-Resolution Saffron Vande Bharat Train on the Left */}
        <div className="about-blend-image-container">
          <img 
            src={VandeBharatSnow} 
            alt="Saffron Vande Bharat Express in Kashmir Snow - Indian Railways High-Speed Trainset" 
            className="about-blend-train-image" 
          />
        </div>


        {/* Seamless Indian Railways Gradient Blend Overlay */}
        <div className="about-blend-gradient-overlay"></div>

        {/* Right-Aligned Narrative & Action Console */}
        <div className="about-blend-content-wrapper">
          <div className="about-blend-content-box">
            <span className="about-eyebrow-pill">
              <Sparkles size={13} /> Smart India Hackathon 2026 • SIH26028
            </span>
            <h1 className="about-blend-title">
              Predicting the Future <span className="about-gradient-text">of Every Journey.</span>
            </h1>
            <p className="about-blend-lead">
              TrainCast replaces rigid, static railway timetables with dynamic machine learning. By evaluating locomotive power curves, live section speed recovery, and junction headways, TrainCast delivers realistic arrival windows to passengers and controllers.
            </p>


            {/* Action CTAs */}
            <div className="flex gap-3 items-center flex-wrap">
              <Link to="/search" className="btn btn-primary cta-btn">
                Find Your Train & Live ETA <ArrowRight size={16} />
              </Link>
              <Link to="/network" className="btn btn-secondary cta-btn outline-white">
                <Map size={16} /> Explore Network Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Executive Narrative Container */}
      <div className="home-container" style={{ padding: '52px 24px', maxWidth: '1180px', margin: '0 auto' }}>

        {/* Header Eyebrow */}
        <div className="text-center mb-5">
          <span className="clean-tag">Operational Paradigm Shift</span>
          <h2 className="text-3xl font-bold text-primary-navy m-0">
            Why Static Timetables Fail vs. How TrainCast Solves It
          </h2>
          <p className="text-sm text-muted max-w-xl mx-auto mt-2">
            A direct comparative analysis between traditional static delay persistence and TrainCast's dynamic machine learning architecture.
          </p>
        </div>

        {/* Visual VS Comparison Cards with Real Run Timelines */}
        <div className="about-vs-grid">
          {/* Card 1: Traditional Way */}
          <div className="about-vs-card traditional">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-orange font-bold text-xs flex items-center gap-1">
                  <Clock size={13} /> Traditional Static Persistence (NTES)
                </span>
                <span className="text-xs text-muted font-mono">Conventional Model</span>
              </div>
              <h3 className="font-bold text-lg text-main mb-2">
                The Static Delay Blindspot
              </h3>
              <p className="text-xs text-muted mb-3 leading-relaxed">
                Conventional passenger tools merely broadcast the train's last reported location. If a train encounters a 20-minute delay at an origin station, it assumes the train remains 20 minutes late all the way to its destination.
              </p>

              {/* Simulated Static Timeline */}
              <div className="about-timeline-diagram">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-slate-700">Salem Jn Departure</span>
                  <span className="timeline-step-badge alert">+20m Late (15:20)</span>
                </div>
                <div className="text-xs text-muted mb-2 text-center" style={{ fontSize: '11px' }}>
                  ↓ <em>Assumes zero recovery over 60 km clear double track stretch</em> ↓
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Erode Jn Forecast</span>
                  <span className="timeline-step-badge alert">Static 16:40 (+20m Locked)</span>
                </div>
              </div>

              <ul className="text-xs text-muted flex flex-col gap-2 p-0 m-0" style={{ listStyle: 'none' }}>
                <li className="flex items-start gap-2">
                  <XCircle size={15} className="text-red flex-shrink-0 mt-0.5" />
                  <span><strong>Blind to Speed Recovery:</strong> Disregards 110/130 km/h acceleration headroom on cleared double-track stretches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle size={15} className="text-red flex-shrink-0 mt-0.5" />
                  <span><strong>Ignores Loco Power Profiles:</strong> Treats high-acceleration WAP-7 electric locomotives identically to heavy rakes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle size={15} className="text-red flex-shrink-0 mt-0.5" />
                  <span><strong>Commuter Uncertainty:</strong> Commuters rush to stations prematurely or miss connecting trains due to inaccurate estimates.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: TrainCast Dynamic AI */}
          <div className="about-vs-card traincast">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-purple font-bold text-xs flex items-center gap-1">
                  <Sparkles size={13} /> TrainCast Dynamic ML Engine
                </span>
              </div>
              <h3 className="font-bold text-lg text-primary-navy mb-2">
                Physics-Informed Real-Time Forecasting
              </h3>
              <p className="text-xs text-main mb-3 leading-relaxed">
                TrainCast continuously models section block density, locomotive horsepower, track speed limits, and driver recovery padding to calculate minutes clawed back or lost across upcoming sections.
              </p>

              {/* Simulated Dynamic Timeline */}
              <div className="about-timeline-diagram" style={{ backgroundColor: '#F5F3FF', borderColor: '#DDD6FE' }}>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-primary-navy">Salem Jn Departure</span>
                  <span className="timeline-step-badge alert">+20m Late (15:20)</span>
                </div>
                <div className="text-xs text-purple mb-2 text-center font-medium" style={{ fontSize: '11px' }}>
                  ↓ <em>High-speed clear section allows 6 minutes speed recovery</em> ↓
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-primary-navy">Erode Jn AI Forecast</span>
                  <span className="timeline-step-badge recovery">Dynamic 16:34 (6m Recovered!)</span>
                </div>
              </div>

              <ul className="text-xs text-main flex flex-col gap-2 p-0 m-0" style={{ listStyle: 'none' }}>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-green flex-shrink-0 mt-0.5" />
                  <span><strong>Locomotive Acceleration Modeling:</strong> Accurately predicts time recovery based on trainset traction and route grade.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-green flex-shrink-0 mt-0.5" />
                  <span><strong>Headway & Signal Intelligence:</strong> Evaluates live automated block circuit states to detect congestion before it impacts the train.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-green flex-shrink-0 mt-0.5" />
                  <span><strong>Confidence Intervals:</strong> Delivers dynamic arrival windows (e.g. 16:32 – 16:36) rather than fragile static point estimates.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Core Technical Pillars - Modern Bento Grid Architecture */}
        <div className="mb-6">
          <div className="text-center mb-5">
            <span className="clean-tag">System Architecture</span>
            <h2 className="text-2xl font-bold text-primary-navy m-0">
              Four Technological Pillars of TrainCast
            </h2>
            <p className="text-xs text-muted mt-1">
              Engineered specifically for high-density mixed-traffic railway corridors
            </p>
          </div>

          <div className="about-bento-grid">
            {/* Bento 1: Speed Recovery (Span 7) */}
            <div className="about-bento-item about-bento-col-7" style={{ borderLeft: '4px solid #0056B3' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="text-primary-navy" size={22} />
                  <h4 className="font-bold text-base text-primary-navy m-0">Dynamic Speed Recovery Engine</h4>
                </div>
                <p className="text-xs text-muted leading-relaxed m-0 mb-3">
                  Models historical traction envelopes of WAP-7, WAP-5, and Trainset 18 (Vande Bharat) rakes. Learns how drivers exploit timetable section margins on clear double-track stretches to recover 5–15 minutes of accumulated delay.
                </p>
              </div>
              <div className="about-bento-badge" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>
                <Gauge size={13} /> 130 km/h WAP-7 / Trainset-18 Traction Profiles Evaluated
              </div>
            </div>

            {/* Bento 2: Signal Telemetry (Span 5) */}
            <div className="about-bento-item about-bento-col-5" style={{ borderLeft: '4px solid #7C3AED' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="text-purple" size={22} />
                  <h4 className="font-bold text-base text-primary-navy m-0">Signal Headway Telemetry</h4>
                </div>
                <p className="text-xs text-muted leading-relaxed m-0 mb-3">
                  Ingests track circuit occupancy and preceding train headways. Forecasts caution aspect delays before they impact approaching trains.
                </p>
              </div>
              <div className="about-bento-badge" style={{ backgroundColor: '#F5F3FF', color: '#7C3AED' }}>
                <Radio size={13} /> Automatic Block Circuit Headway Tracking
              </div>
            </div>

            {/* Bento 3: Junction Conflict Prevention (Span 5) */}
            <div className="about-bento-item about-bento-col-5" style={{ borderLeft: '4px solid #059669' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <GitCommit className="text-green" size={22} />
                  <h4 className="font-bold text-base text-primary-navy m-0">Junction Cascade Prevention</h4>
                </div>
                <p className="text-xs text-muted leading-relaxed m-0 mb-3">
                  Simulates route locking and freight siding holds at key junction points (Erode, Salem, Katpadi) to prevent secondary delay ripples.
                </p>
              </div>
              <div className="about-bento-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>
                <Layers size={13} /> Electronic Interlocking (EI/RRI) Logic
              </div>
            </div>

            {/* Bento 4: Confidence Windows (Span 7) */}
            <div className="about-bento-item about-bento-col-7" style={{ borderLeft: '4px solid #D97706' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BrainCircuit className="text-orange" size={22} />
                  <h4 className="font-bold text-base text-primary-navy m-0">Confidence-Aware Arrival Envelopes</h4>
                </div>
                <p className="text-xs text-muted leading-relaxed m-0 mb-3">
                  Delivers probabilistic arrival intervals (e.g. 16:32 – 16:36) powered by gradient boosted regression (XGBoost), accounting for weather caution and dwell variance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Smart India Hackathon (SIH 2026) Executive Accreditation Card */}
        <div className="about-sih-card">
          <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
            <div>
              <div className="badge badge-purple mb-2 inline-flex items-center gap-1">
                <Award size={13} /> Official Problem Statement Accreditation
              </div>
              <h3 className="text-2xl font-bold text-white m-0">
                Smart India Hackathon 2026 (SIH)
              </h3>
              <div className="text-xs text-sky-300 font-semibold mt-1">
                Organization: Ministry of Railways • Category: Software • Theme: Smart Automation
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-2xl font-bold text-yellow-400">SIH26028</span>
              <div className="text-xs text-slate-300">Problem Statement ID</div>
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed mb-4">
            This project demonstrates an end-to-end prototype for AI-based train ETA and delay forecasting on the high-density Southern Railway trunk corridor connecting Chennai Central (MAS), Arakkonam (AJJ), Katpadi (KPD), Jolarpettai (JTJ), Salem (SA), Erode (ED), and Coimbatore (CBE).
          </p>

          <div className="flex items-center gap-4 flex-wrap pt-3 border-t border-slate-700 text-xs text-slate-300">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-green" /> 14-Page Operations Control Room Console</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-green" /> Live Station Route Relay & Electronic Interlocking (EI/RRI)</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-green" /> OpenStreetMap Multi-Train Telemetry Vector</span>
          </div>
        </div>

        {/* 5. Team & Mentors Showcase Section */}
        <section id="team" className="team-showcase-section">
          <div className="text-center mb-5">
            <span className="clean-tag">Meet the Team</span>
            <div className="flex flex-col justify-center items-center gap-3 mt-6 mb-4">
              <img src={teamLogo} alt="Team Logo" style={{ height: '150px', objectFit: 'contain' }} />
              <span style={{ color: '#64748B', fontStyle: 'italic', fontSize: '15px', fontWeight: '500' }}>from</span>
              <a href="https://srec.ac.in/" target="_blank" rel="noopener noreferrer" title="Sri Ramakrishna Engineering College" style={{ transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = 0.8} onMouseOut={(e) => e.currentTarget.style.opacity = 1}>
                <img src={srecLogo} alt="SREC Logo" style={{ height: '75px', objectFit: 'contain' }} />
              </a>
            </div>
            <h2 className="team-section-title">
              {teamData.teamName}
            </h2>

          </div>

          {/* 6 Team Member Cards Grid */}
          <div className="team-grid">
            {teamData.members.map((member) => (
              <div key={member.id} className="team-member-card">
                <div>
                  <div className="team-member-top">
                    <div 
                      className={`team-member-avatar${member.isLead ? ' team-lead-avatar' : ''}`}
                      style={{ background: member.avatarColor }}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <h4 className="team-member-name">{member.name}</h4>
                        {member.isLead && (
                          <span className="team-lead-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            </svg>
                            TEAM LEAD
                          </span>
                        )}
                      </div>
                      <div className="team-member-role">{member.role}</div>
                    </div>
                  </div>
                  <p className="team-member-focus">{member.focus}</p>
                </div>
                
                <div className="team-tags-row">
                  {member.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="team-tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mentors Sub-Section */}
          <div className="mb-4">
            <div className="text-center mb-4">
              <span className="clean-tag" style={{ backgroundColor: '#F1F5F9', color: '#475569' }}>
                Academic & Domain Guidance
              </span>
              <h3 className="text-xl font-bold text-primary-navy m-0 mt-1" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary-navy)', margin: '4px 0 0 0' }}>
                Project Mentors & Advisors
              </h3>
            </div>

            <div className="mentors-grid">
              {teamData.mentors.map((mentor) => (
                <div key={mentor.id} className="mentor-card-premium">
                  <div>
                    <div className="team-member-top">
                      <div 
                        className="team-member-avatar" 
                        style={{ background: mentor.avatarColor }}
                      >
                        <GraduationCap size={24} />
                      </div>
                      <div>
                        <h4 className="team-member-name">{mentor.name}</h4>
                        <div className="team-member-role">{mentor.role}</div>
                        <div className="mentor-affiliation">{mentor.affiliation}</div>
                      </div>
                    </div>
                    <p className="team-member-focus">{mentor.focus}</p>
                  </div>

                  <div className="team-tags-row">
                    {mentor.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="team-tag-pill" style={{ backgroundColor: '#FFFFFF' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Navigation CTAs */}
        <div className="flex justify-center items-center gap-3 flex-wrap mb-5">
          <Link to="/search" className="btn btn-primary cta-btn">
            Find Your Train & Live ETA <ArrowRight size={16} />
          </Link>
          <Link to="/network" className="btn btn-secondary cta-btn">
            <Map size={16} /> Explore Network Corridor
          </Link>
          <Link to="/contact" className="btn btn-secondary cta-btn">
            Help & Helplines
          </Link>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="text-center p-3 bg-main rounded border text-xs text-muted" style={{ fontSize: '11px' }}>
          TRAINCAST is a prototype demonstration developed for SIH 2026. Data is derived from Southern Railway timetable replay and simulated operational movements. It does not claim direct connection to Indian Railways internal COA or RTIS servers.
        </div>
      </div>
    </div>
  );
};

export default About;

