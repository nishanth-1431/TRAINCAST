import React, { useState, useEffect } from 'react';
import { INTERLOCKING_STATIONS } from '../../data/interlocking/stations';
import { getYardDataByStation, executeInterlockingRoute, toggleBerthHold } from '../../data/interlocking/interlockingEngine';
import { Radio, ShieldAlert, CheckCircle2, RotateCcw, Play, Activity, Cpu, ArrowRight, Layers, Lock, Unlock } from 'lucide-react';
import './interlocking.css';

export const StationRoutePanel = ({ onOperationalEvent }) => {
  const [selectedStation, setSelectedStation] = useState('ED');
  const [yardData, setYardData] = useState(getYardDataByStation('ED'));
  const [activeEvent, setActiveEvent] = useState(null);
  const [clockTime, setClockTime] = useState('12:31:29');
  const [interlockingMode, setInterlockingMode] = useState('AUTO_ROUTE_SETTING');

  // Load yard data when station changes
  useEffect(() => {
    setYardData(getYardDataByStation(selectedStation));
    setActiveEvent(null);
  }, [selectedStation]);

  // Live simulation clock matching the CRT photo
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setClockTime(now.toLocaleTimeString('en-IN', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRouteRequest = (routeId) => {
    const result = executeInterlockingRoute(yardData, routeId);
    if (result.success) {
      setYardData(result.updatedYard);
      setActiveEvent(result.event);
      if (onOperationalEvent) onOperationalEvent(result.event);
    }
  };

  const handleToggleHold = (routeId) => {
    const result = toggleBerthHold(yardData, routeId);
    if (result.success) {
      setYardData(result.updatedYard);
      setActiveEvent(result.event);
      if (onOperationalEvent) onOperationalEvent(result.event);
    }
  };

  const stationMeta = INTERLOCKING_STATIONS.find(s => s.code === selectedStation);

  return (
    <div className="vdu-container animate-fade-in-up">
      {/* VDU Top Header Bar */}
      <div className="vdu-header">
        <div className="vdu-header-left">
          <div className="vdu-title-strip">
            <span className="vdu-blink-dot"></span>
            <span className="vdu-title">STATION YARD — EI/RRI VISUALIZATION</span>
            <span className="vdu-station-tag">{yardData.stationName}</span>
          </div>
          <span className="vdu-subtext">
            Simulated Prototype Schematic • Electronic Interlocking (EI) Visual Display Unit
          </span>
        </div>

        <div className="vdu-header-right">
          <div className="vdu-clock font-mono">
            {clockTime} IST
          </div>

          <div className="flex items-center gap-2">
            <span className="vdu-status-chip">
              <Lock size={12} className="text-green" /> ARS ACTIVE
            </span>
            <select 
              className="vdu-station-select font-mono"
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
            >
              {INTERLOCKING_STATIONS.map(st => (
                <option key={st.code} value={st.code}>
                  {st.code} — {st.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SVG Yard Canvas (CRT Display) */}
      <div className="vdu-canvas-wrapper">
        <svg 
          viewBox={yardData.viewBox} 
          className="vdu-svg-canvas"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Subtle Grid / Rail Corridor Guidelines */}
          <defs>
            <pattern id="vdu-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#070D19" />
          <rect width="100%" height="100%" fill="url(#vdu-grid)" />

          {/* Platform Island Blocks (Amber / Orange rectangular blocks matching photo) */}
          {yardData.platforms.map(pf => (
            <g key={pf.id} className="vdu-platform-group">
              <rect 
                x={pf.x} 
                y={pf.y} 
                width={pf.width} 
                height={pf.height} 
                rx="3" 
                fill="#C27803" 
                stroke="#F59E0B" 
                strokeWidth="1.5"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
              />
              <text 
                x={pf.x + pf.width / 2} 
                y={pf.y + pf.height / 2 + 4} 
                fill="#000" 
                fontSize="11" 
                fontWeight="800" 
                fontFamily="monospace"
                textAnchor="middle"
                letterSpacing="1px"
              >
                {pf.label}
              </text>
            </g>
          ))}

          {/* Track Circuits & Lines */}
          {yardData.tracks.map(trk => {
            const isOccupied = trk.isOccupied;
            const isLocked = trk.isRouteLocked;
            const strokeColor = isOccupied ? '#EF4444' : isLocked ? '#22C55E' : '#E2E8F0';
            const strokeWidth = isOccupied || isLocked ? '4' : '2.5';

            return (
              <g key={trk.id} className="vdu-track-segment">
                {/* Outer Track Line */}
                <line 
                  x1={trk.x1} 
                  y1={trk.y1} 
                  x2={trk.x2} 
                  y2={trk.y2} 
                  stroke={strokeColor} 
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  style={{
                    filter: isOccupied ? 'drop-shadow(0 0 6px #EF4444)' : isLocked ? 'drop-shadow(0 0 6px #22C55E)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                />

                {/* Track Circuit Labels (e.g. SLOW LINES, TO SALEM) */}
                {trk.label && trk.x1 < 100 && (
                  <text 
                    x={trk.x1} 
                    y={trk.y1 - 10} 
                    fill="#94A3B8" 
                    fontSize="9" 
                    fontFamily="monospace" 
                    fontWeight="700"
                  >
                    {trk.label}
                  </text>
                )}

                {/* Train Headcode Berth Display (Red occupied segment with train box) */}
                {trk.trainHeadcode && (
                  <g className="vdu-berth-group">
                    <rect 
                      x={(trk.x1 + trk.x2) / 2 - 45} 
                      y={trk.y1 - 11} 
                      width="90" 
                      height="22" 
                      rx="2" 
                      fill="#7F1D1D" 
                      stroke="#EF4444" 
                      strokeWidth="1.5"
                    />
                    <text 
                      x={(trk.x1 + trk.x2) / 2} 
                      y={trk.y1 + 4} 
                      fill="#FEE2E2" 
                      fontSize="10" 
                      fontWeight="900" 
                      fontFamily="monospace" 
                      textAnchor="middle"
                    >
                      {trk.trainHeadcode}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Turnout Points Machines */}
          {yardData.points.map(pt => (
            <g key={pt.id} transform={`translate(${pt.x}, ${pt.y})`}>
              <circle r="4" fill="#000" stroke="#CBD5E1" strokeWidth="1" />
              <text 
                x="8" 
                y="3" 
                fill="#F8FAFC" 
                fontSize="8" 
                fontFamily="monospace" 
                fontWeight="700"
              >
                {pt.name} [{pt.position.substring(0,3)}]
              </text>
            </g>
          ))}

          {/* Signal Heads (Coloured Aspects) */}
          {yardData.signals.map(sig => {
            const aspectColor = sig.aspect === 'GREEN' || sig.aspect === 'PROCEED' 
              ? '#10B981' 
              : sig.aspect === 'YELLOW' 
              ? '#F59E0B' 
              : '#EF4444';

            return (
              <g key={sig.id} className="vdu-signal-marker" transform={`translate(${sig.x}, ${sig.y})`}>
                {/* Signal Mast Post */}
                <line x1="0" y1="0" x2="0" y2="12" stroke="#64748B" strokeWidth="1.5" />
                
                {/* Signal Head Circle */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r="5" 
                  fill={aspectColor} 
                  stroke="#000" 
                  strokeWidth="1.5"
                  style={{ filter: `drop-shadow(0 0 6px ${aspectColor})` }}
                />

                {/* Second aspect lamp if home/multi-aspect */}
                {sig.type === 'HOME' && (
                  <circle cx="0" cy="-6" r="3" fill={sig.aspect === 'GREEN' ? '#065F46' : '#92400E'} stroke="#000" strokeWidth="0.5" />
                )}

                {/* Signal ID Label */}
                <text 
                  x="-2" 
                  y="-10" 
                  fill="#CBD5E1" 
                  fontSize="8" 
                  fontFamily="monospace" 
                  fontWeight="700" 
                  textAnchor="middle"
                >
                  {sig.label}
                </text>
              </g>
            );
          })}

          {/* Destination Arrows & Corridor Connections */}
          <text x="890" y="55" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="700">TO SALEM ▶</text>
          <text x="890" y="145" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="700">TO CBE ▶</text>
          <text x="890" y="275" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="700">◀ TO SA/MAS</text>

          {/* CRT Monitor Bottom Text (as in photo: PLATFORM LOCK OUT, ETC) */}
          <text x="50" y="420" fill="#94A3B8" fontSize="10" fontFamily="monospace" fontWeight="700">
            PLATFORM 1&2 LOCK OUT : OFF  |  PLATFORM 3&4 LOCK OUT : OFF  |  CRANK HANDLE : IN
          </text>
          <text x="750" y="420" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="700">
            ARS : ENABLED  |  INTERLOCKING : NORMAL
          </text>
        </svg>
      </div>

      {/* Live Event Emitted to TRAINCAST */}
      {activeEvent && (
        <div className="vdu-event-banner animate-fade-in">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-purple flex-shrink-0" />
            <div>
              <span className="font-bold text-xs text-primary-navy">
                TRAINCAST Telemetry Ingestion:
              </span>
              <span className="text-xs text-muted ml-2">{activeEvent.feedMessage}</span>
            </div>
          </div>
          <span className="badge badge-purple text-xs font-mono">{activeEvent.delayImpact}</span>
        </div>
      )}

      {/* Controller Route Requests & State-Driven Interlocking Bar */}
      <div className="vdu-controls-panel">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary-navy uppercase tracking-wider">
              Controller Route Setting & Precedence Simulator
            </span>
            <span className="text-xs text-muted">
              (Triggers State-Driven Route Locking & Downstream ETA Forecasting)
            </span>
          </div>
          <span className="text-xs text-muted font-mono">{yardData.routes.length} Interlocked Routes Defined</span>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
          {yardData.routes.map(r => {
            const isHolding = r.status === 'HOLDING';
            const isLocked = r.status.includes('LOCKED') || r.status.includes('CLEARED');

            return (
              <div key={r.id} className="vdu-route-card">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-xs text-primary-navy">{r.name}</span>
                  <span className={`badge ${isHolding ? 'badge-red' : isLocked ? 'badge-green' : 'badge-orange'} text-xs font-mono`}>
                    {r.status}
                  </span>
                </div>

                <div className="text-xs text-muted font-mono mb-2">
                  Signal: <strong>{r.entrySignal} &rarr; {r.exitSignal}</strong> • Delay Impact: <span className="text-purple font-bold">{r.delayImpact}</span>
                </div>

                <div className="flex gap-2">
                  {r.id === 'RT-GOODS-HOLD' ? (
                    <button 
                      className={`btn ${isHolding ? 'btn-secondary text-green' : 'btn-primary'} text-xs flex-1`}
                      onClick={() => handleToggleHold(r.id)}
                    >
                      {isHolding ? 'Release Freight Siding Hold' : 'Preempt Siding Hold (Precedence)'}
                    </button>
                  ) : (
                    <button 
                      className="btn btn-primary text-xs flex-1"
                      disabled={isLocked}
                      onClick={() => handleRouteRequest(r.id)}
                    >
                      {isLocked ? 'Route Locked & Signal Green ✓' : 'Lock Route & Clear Signal'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StationRoutePanel;
