import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Map, Zap, GitCommit, ShieldAlert, Train, MapPin, Users, Sparkles, Clock, Radio } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { VandeBharatScrollCanvas } from '../../components/home/VandeBharatScrollCanvas';
import './public.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Hero Content Entrance
      gsap.from('.welcome-text, .welcome-subtext, .traincast-branding', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
      });

      gsap.from('.hero-actions, .stat-item', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power2.out'
      });

      // 2. Section 1 Heading Reveal
      gsap.from('.home-heading-anim', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.home-heading-anim',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      // 3. Side-by-Side Comparison Reveal
      gsap.from('.static-side', {
        x: -45,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.comparison-showcase',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.ai-side', {
        x: 45,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.comparison-showcase',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      });

      // 4. Staggered Feature Capability Cards
      gsap.from('.feature-trio-card', {
        y: 40,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.feature-trio-grid',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      });

      // 5. 3-Stage Pipeline Header & Cards Reveal
      gsap.from('.pipeline-header-anim', {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pipeline-header-anim',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.pipeline-stage-card', {
        y: 40,
        opacity: 0,
        duration: 0.75,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.clean-pipeline-flow',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      });

      // 6. Transparency Section Entrance
      gsap.from('.transparency-section', {
        y: 25,
        opacity: 0,
        scale: 0.98,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.transparency-section',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="home-wrapper">
      {/* 1. Hero Banner Section with Interactive Scroll Video */}
      <section className="hero-banner" ref={heroRef}>
        <div className="hero-image-container">
          <VandeBharatScrollCanvas scrollTriggerRef={heroRef} />
        </div>
        <div className="hero-gradient-overlay"></div>
        <div className="hero-bottom-blend"></div>
        
        <div className="hero-content">
          <div className="welcome-text">Welcome to Indian Railways</div>
          <div className="welcome-subtext">Your journey. Our priority.</div>
          
          <div className="traincast-branding mt-4">
            <div className="traincast-label">
              TRAINCAST • AI-BASED TRAIN ETA & DELAY FORECASTING (SIH26028)
            </div>
            <h1 className="hero-title">
              Smarter Predictions.<br />
              Better Journeys.
            </h1>
            <p className="hero-subtitle">
              Dynamic ETA forecasting and delay intelligence for railway operations and passengers.
            </p>
          </div>

          {/* Hero Action CTAs */}
          <div className="hero-actions flex gap-3 mb-5 mt-4">
            <Link to="/search" className="btn btn-primary cta-btn">
              <Search size={18} /> Find Your Train & Live ETA
            </Link>
            <Link to="/network" className="btn btn-secondary cta-btn outline-white">
              <Map size={18} /> View Network Map
            </Link>
          </div>

          {/* Hero Stats Strip */}
          <div className="hero-stats">
            <div className="stat-item">
              <Train className="stat-icon" size={22} />
              <div className="stat-details">
                <span className="stat-value">23,456+</span>
                <span className="stat-label">Daily Trains</span>
              </div>
            </div>
            <div className="stat-item">
              <MapPin className="stat-icon" size={22} />
              <div className="stat-details">
                <span className="stat-value">7,349+</span>
                <span className="stat-label">Stations</span>
              </div>
            </div>
            <div className="stat-item">
              <Users className="stat-icon" size={22} />
              <div className="stat-details">
                <span className="stat-value">13 Million+</span>
                <span className="stat-label">Daily Passengers</span>
              </div>
            </div>

          </div>
          <div className="stat-disclaimer">* Southern Railway trunk corridor evaluation dataset (SIH 2026)</div>
        </div>
      </section>

      {/* 2. Main Content Container Merged Smoothly Over Hero */}
      <div className="home-merge-wrapper">
        <div className="home-container" style={{ padding: '0 24px', maxWidth: '1160px', margin: '0 auto' }}>

        {/* Section Header */}
        <div className="text-center mb-5 home-heading-anim">
          <span className="clean-tag">Problem Statement SIH26028 • Ministry of Railways</span>
          <h2 className="text-3xl font-bold text-primary-navy m-0">
            Real-Time Speed Recovery vs. Static Delay
          </h2>
          <p className="text-sm text-muted max-w-xl mx-auto mt-2">
            Why traditional timetable tracking fails passengers, and how TrainCast’s dynamic machine learning predicts realistic arrival windows.
          </p>
        </div>

        {/* Visual Side-by-Side Comparison Showcase */}
        <div className="comparison-showcase">
          {/* Static Persistence Side */}
          <div className="comparison-side static-side">
            <div>
              <div className="comparison-badge static">
                <Clock size={13} /> Traditional Static Timetable (NTES)
              </div>
              <h3 className="font-bold text-lg text-main mb-2">
                Assumes Delay Carries Forward Forever
              </h3>
              <p className="text-xs text-muted mb-3 leading-relaxed">
                When a train departs an intermediate station 20 minutes late, conventional systems assume it remains 20 minutes late all the way to its destination, ignoring clear tracks and locomotive acceleration.
              </p>
              
              <div className="scenario-pill">
                <strong>Simulated Run:</strong> 12675 Kovai Express departing Salem Jn (+20m late) heading to Erode Jn (60 km clear double-track stretch).
              </div>
            </div>

            <div className="arrival-callout static">
              <div className="flex justify-between items-center text-xs text-muted mb-1">
                <span>Timetable Arrival Forecast:</span>
                <span className="badge badge-orange font-mono">Static +20m</span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-700">
                16:40 IST
              </div>
              <div className="text-xs text-muted mt-1" style={{ fontSize: '11px' }}>
                ❌ Blind to cleared block sections and 110 km/h locomotive acceleration
              </div>
            </div>
          </div>

          {/* TrainCast AI Side */}
          <div className="comparison-side ai-side">
            <div>
              <div className="comparison-badge ai">
                <Sparkles size={13} /> TrainCast Dynamic ML Engine
              </div>
              <h3 className="font-bold text-lg text-primary-navy mb-2">
                Forecasts Real Speed Recovery & Headway
              </h3>
              <p className="text-xs text-main mb-3 leading-relaxed">
                TrainCast continuously models section occupancy, train priority, and loco acceleration profiles (e.g. WAP-7 / Vande Bharat) to calculate minutes recovered on high-speed clear stretches.
              </p>

              <div className="scenario-pill" style={{ borderColor: '#DDD6FE', backgroundColor: '#F5F3FF' }}>
                <strong>Dynamic Analysis:</strong> Cleared double track + 108 km/h sustained speed allows <strong>6 minutes recovery</strong> before Erode Jn.
              </div>
            </div>

            <div className="arrival-callout ai">
              <div className="flex justify-between items-center text-xs font-bold text-purple mb-1">
                <span>TrainCast Dynamic Arrival Forecast:</span>
                <span className="badge badge-green font-mono">6m Recovered</span>
              </div>
              <div className="text-2xl font-bold font-mono text-primary-navy">
                16:34 IST
              </div>
              <div className="text-xs text-purple mt-1 font-medium" style={{ fontSize: '11px' }}>
                ✓ Confidence Window [16:32 – 16:36] • Commuters save 6 minutes
              </div>
            </div>
          </div>
        </div>

        {/* 3 High-Impact Capability Cards */}
        <div className="feature-trio-grid">
          <div className="feature-trio-card">
            <div className="feature-icon-wrapper" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>
              <Zap size={22} />
            </div>
            <h4 className="font-bold text-base text-primary-navy mb-2">Section Speed Recovery</h4>
            <p className="text-xs text-muted leading-relaxed m-0">
              Modern passenger rakes regularly make up 5–15 minutes on clear track segments. TrainCast models historical acceleration curves to reflect actual recovery times.
            </p>
          </div>

          <div className="feature-trio-card">
            <div className="feature-icon-wrapper" style={{ backgroundColor: '#F5F3FF', color: '#7C3AED' }}>
              <Radio size={22} />
            </div>
            <h4 className="font-bold text-base text-primary-navy mb-2">Signal & Headway Awareness</h4>
            <p className="text-xs text-muted leading-relaxed m-0">
              Evaluates live block circuit occupancy and preceding train intervals to anticipate yellow/red signal delays before they impact the commuter.
            </p>
          </div>

          <div className="feature-trio-card">
            <div className="feature-icon-wrapper" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>
              <GitCommit size={22} />
            </div>
            <h4 className="font-bold text-base text-primary-navy mb-2">Downstream Cascade Prevention</h4>
            <p className="text-xs text-muted leading-relaxed m-0">
              Simulates junction precedence to identify knock-on ripple delays on connecting trains, giving controllers actionable dispatch intelligence.
            </p>
          </div>
        </div>

        {/* 3-Stage Pipeline */}
        <div className="mb-6">
          <div className="text-center mb-4 pipeline-header-anim">
            <h3 className="text-xl font-bold text-primary-navy m-0">
              How TrainCast Predicts Dynamic Arrival Times
            </h3>
            <p className="text-xs text-muted mt-1">End-to-end intelligent railway forecasting workflow</p>
          </div>

          <div className="clean-pipeline-flow">
            <div className="pipeline-stage-card" style={{ borderTop: '3px solid #0056B3' }}>
              <div className="stage-step-tag">STAGE 01</div>
              <h4 className="font-bold text-sm text-primary-navy mb-2">Telemetry Ingestion</h4>
              <p className="text-xs text-muted leading-relaxed m-0">
                Streams real-time station departure logs, GPS track positions, track speed limits, and official timetable schedules.
              </p>
            </div>

            <div className="pipeline-stage-card" style={{ borderTop: '3px solid #7C3AED' }}>
              <div className="stage-step-tag">STAGE 02</div>
              <h4 className="font-bold text-sm text-primary-navy mb-2">XGBoost ML Inference</h4>
              <p className="text-xs text-muted leading-relaxed m-0">
                Processes block headways, weather caution orders, and historical dwell profiles to predict section-by-section delay drift.
              </p>
            </div>

            <div className="pipeline-stage-card" style={{ borderTop: '3px solid #10B981' }}>
              <div className="stage-step-tag">STAGE 03</div>
              <h4 className="font-bold text-sm text-primary-navy mb-2">Precision ETA Delivery</h4>
              <p className="text-xs text-muted leading-relaxed m-0">
                Delivers dynamic arrival windows with confidence intervals directly to passengers, station master consoles, and division controllers.
              </p>
            </div>
          </div>
        </div>

        {/* Clean Transparency Notice */}
        <section className="transparency-section p-4 rounded border text-center" style={{ backgroundColor: '#F8FAFC' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ShieldAlert size={24} className="mx-auto mb-2 text-orange" />
            <h4 className="mb-1 font-bold text-sm text-primary-navy">Smart India Hackathon 2026 Prototype</h4>
            <p className="text-xs text-muted mb-2">
              <strong>Problem Statement SIH26028:</strong> AI-Based Train ETA & Delay Forecasting • Ministry of Railways
            </p>
            <p className="text-xs text-muted" style={{ fontSize: '11px' }}>
              TRAINCAST is a prototype demonstration utilizing Southern Railway replay data and simulated movement telemetry. It does not represent a live production connection to Indian Railways internal COA/RTIS systems.
            </p>
            <div className="text-xs text-muted mt-2 pt-2 border-t" style={{ borderColor: '#E2E8F0' }}>
              <Link to="/login" style={{ color: '#64748B', textDecoration: 'underline', fontSize: '11px' }}>
                Authorized Railway Staff & Operations Login
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  );
};

export default Home;
