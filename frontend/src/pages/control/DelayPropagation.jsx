import React, { useState, useEffect } from 'react';
import { useApp } from '../../hooks/useApp';
import { createApiClient } from '../../services/apiClient';
import { GitCommit, ArrowRight, Clock, AlertTriangle, Play, RotateCcw, ShieldAlert, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import './control.css';

const DelayPropagation = () => {
  const { appMode, lastUpdated } = useApp();
  const [trains, setTrains] = useState([]);
  const [selectedTrainId, setSelectedTrainId] = useState('12675');
  const [injectionDelay, setInjectionDelay] = useState(0);
  const [injectionReason, setInjectionReason] = useState('Baseline Replay');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const api = createApiClient(appMode);
        const trainData = await api.getAllTrains();
        setTrains(trainData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [appMode, lastUpdated]);

  if (loading) return <div className="p-5 text-muted">Loading Delay Propagation Intelligence...</div>;

  const currentTrain = trains.find(t => t.id === selectedTrainId) || trains[0];
  const baseDelay = currentTrain ? currentTrain.delayMinutes : 18;
  const simulatedDelay = baseDelay + injectionDelay;

  // Station propagation cascade along Kovai Express / Selected Route
  const routeStationsCascade = [
    { code: 'MAS', name: 'Chennai Central', dist: '0 km', base: 0, add: 0, status: 'Departed' },
    { code: 'KPD', name: 'Katpadi Jn', dist: '130 km', base: 8, add: 0, status: 'Departed' },
    { code: 'JTJ', name: 'Jolarpettai Jn', dist: '214 km', base: 12, add: 0, status: 'Departed' },
    { code: 'SA',  name: 'Salem Jn', dist: '334 km', base: 18, add: injectionDelay > 0 ? injectionDelay : 0, status: 'Current Stop' },
    { code: 'ED',  name: 'Erode Jn', dist: '395 km', base: 18, add: Math.round(injectionDelay * 0.9), status: 'Upcoming' },
    { code: 'TUP', name: 'Tiruppur', dist: '445 km', base: 22, add: Math.round(injectionDelay * 0.85), status: 'Upcoming' },
    { code: 'CBE', name: 'Coimbatore Jn', dist: '496 km', base: 22, add: Math.round(injectionDelay * 0.8), status: 'Destination' }
  ];

  // Secondary downstream trains affected by this corridor delay
  const secondaryImpacts = [
    {
      train: 'BCN-E Container Freight',
      type: 'Freight Siding Hold',
      location: 'Morappur Loop Line (SA)',
      delayImpact: injectionDelay > 0 ? `+${24 + injectionDelay} min` : '+24 min',
      cause: 'Held on loop siding to allow high-priority express clearance',
      severity: injectionDelay >= 30 ? 'Critical' : 'Warning'
    },
    {
      train: '12608 Incoming Express',
      type: 'Platform Turnaround Conflict',
      location: 'Erode Jn (ED)',
      delayImpact: injectionDelay > 0 ? `+${8 + Math.round(injectionDelay * 0.4)} min` : '+8 min',
      cause: 'Platform 2 occupancy conflict due to extended dwell of primary train',
      severity: injectionDelay >= 30 ? 'Warning' : 'Information'
    },
    {
      train: '12676 Return Kovai Express',
      type: 'Rake Turnaround Compression',
      location: 'Coimbatore Terminal (CBE)',
      delayImpact: injectionDelay >= 30 ? 'Turnaround Buffer Depleted (-38m)' : 'Buffer compressed to 14m',
      cause: 'Inbound rake turnaround buffer at CBE compressed below standard 45 min buffer',
      severity: injectionDelay >= 30 ? 'Critical' : 'Warning'
    }
  ];

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <GitCommit className="text-purple" /> Delay Propagation Intelligence & Simulator
          </h1>
          <span className="text-xs text-muted">
            Interactive What-If Simulation: Forecast downstream cascading delays & track block occupancy
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-purple">SIH Replay Simulation</span>
        </div>
      </div>

      {/* Interactive Scenario Injection Bar */}
      <div className="card mb-4" style={{ borderLeft: '4px solid var(--status-purple)' }}>
        <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold text-purple uppercase tracking-wider">Interactive What-If Scenario Trigger</span>
            <h3 className="text-sm font-bold mt-1">Inject Simulated Section Delay to Primary Train</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Primary Train:</span>
            <select 
              className="form-input text-xs" 
              style={{ width: '220px', padding: '4px 8px' }}
              value={selectedTrainId}
              onChange={(e) => {
                setSelectedTrainId(e.target.value);
                setInjectionDelay(0);
                setInjectionReason('Baseline Replay');
              }}
            >
              {trains.map(t => (
                <option key={t.id} value={t.id}>{t.number} - {t.name} ({t.status})</option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xs text-muted mb-3">
          Simulate an unplanned section disruption to observe how TrainCast predicts the ripple effect across downstream stations and secondary trains:
        </p>

        {/* Simulation Buttons */}
        <div className="sim-scenario-bar">
          <button 
            className={`sim-btn ${injectionDelay === 0 ? 'active' : ''}`}
            onClick={() => { setInjectionDelay(0); setInjectionReason('Baseline Replay'); }}
          >
            <RotateCcw size={14} />
            Live Baseline (+{baseDelay}m)
          </button>

          <button 
            className={`sim-btn ${injectionDelay === 15 ? 'active' : ''}`}
            onClick={() => { setInjectionDelay(15); setInjectionReason('+15m Signal Clearance Hold at SA'); }}
          >
            <Play size={14} className="text-orange" />
            +15m Signal Fault (SA)
          </button>

          <button 
            className={`sim-btn ${injectionDelay === 30 ? 'active' : ''}`}
            onClick={() => { setInjectionDelay(30); setInjectionReason('+30m Traction Loco Issue at ED'); }}
          >
            <Play size={14} className="text-red" />
            +30m Loco Issue (ED)
          </button>

          <button 
            className={`sim-btn ${injectionDelay === 60 ? 'active' : ''}`}
            onClick={() => { setInjectionDelay(60); setInjectionReason('+60m Track Work / Siding Block at JTJ'); }}
          >
            <Play size={14} className="text-red" />
            +60m Track Block (JTJ)
          </button>
        </div>

        {injectionDelay > 0 && (
          <div className="mt-3 p-2 bg-orange-bg rounded text-xs flex items-center gap-2 text-orange border" style={{ borderColor: 'rgba(253, 126, 20, 0.4)' }}>
            <AlertTriangle size={16} />
            <span>
              <strong>Active Simulation:</strong> Injected <strong>+{injectionDelay} mins</strong> ({injectionReason}). Total forecasted primary delay: <strong>+{simulatedDelay} mins</strong>.
            </span>
          </div>
        )}
      </div>

      {/* Propagation Cascade Visualizer */}
      <div className="card mb-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-bold text-sm">Station-by-Station Delay Ripple Cascade</h3>
            <span className="text-xs text-muted">Estimated recovery curves and arrival drift through the corridor</span>
          </div>
          <span className="text-xs text-muted font-mono">{currentTrain?.name} ({currentTrain?.route})</span>
        </div>

        <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '850px' }}>
            {routeStationsCascade.map((st, idx) => {
              const totalDelayAtStation = st.base + st.add;
              const isCurrent = st.status === 'Current Stop';
              const isPassed = st.status === 'Departed';

              return (
                <React.Fragment key={st.code}>
                  <div 
                    style={{
                      flex: 1,
                      padding: '12px 10px',
                      borderRadius: '6px',
                      backgroundColor: isCurrent ? '#EEF2FF' : isPassed ? '#F1F5F9' : '#FFFFFF',
                      border: isCurrent ? '2px solid var(--primary-navy)' : '1px solid #CBD5E1',
                      boxShadow: isCurrent ? '0 2px 8px rgba(10, 25, 47, 0.15)' : 'none',
                      textAlign: 'center'
                    }}
                  >
                    <div className="text-xs font-bold font-mono text-primary-navy">{st.code}</div>
                    <div className="text-xs text-muted mb-1" style={{ fontSize: '10px' }}>{st.name}</div>
                    
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '800',
                      color: totalDelayAtStation > 30 ? 'var(--status-red)' : totalDelayAtStation > 10 ? 'var(--status-orange)' : 'var(--status-green)'
                    }}>
                      {totalDelayAtStation > 0 ? `+${totalDelayAtStation}m` : '0m'}
                    </div>

                    <div className="text-xs text-muted" style={{ fontSize: '9px', marginTop: '2px' }}>
                      {st.status}
                    </div>
                  </div>

                  {idx < routeStationsCascade.length - 1 && (
                    <ArrowRight size={14} className="text-muted" style={{ flexShrink: 0 }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="text-xs text-muted text-center pt-2 border-t mt-2">
          * TrainCast ML incorporates historical section recovery allowances (-2m to -4m on high-speed sections ED-TUP).
        </div>
      </div>

      {/* Downstream Secondary Trains Impact & Actionable Mitigations */}
      <div className="dashboard-grid mb-4">
        {/* Secondary Downstream Impacts */}
        <div className="card">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-sm flex items-center gap-1">
              <ShieldAlert size={16} className="text-red" />
              Cascading Downstream Network Impact
            </h3>
            <span className="text-xs text-muted">{secondaryImpacts.length} Trains Affected</span>
          </div>
          <p className="text-xs text-muted mb-3">
            Trains sharing block sections, junctions, or turnaround rakes impacted by this delay:
          </p>

          <div className="flex flex-col gap-2">
            {secondaryImpacts.map((sec, i) => (
              <div 
                key={i} 
                className="p-3 bg-main rounded border"
                style={{ borderLeft: `3px solid ${sec.severity === 'Critical' ? 'var(--status-red)' : 'var(--status-orange)'}` }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs text-primary-navy">{sec.train}</span>
                  <span className={`badge badge-${sec.severity === 'Critical' ? 'red' : 'orange'} text-xs`}>
                    {sec.delayImpact}
                  </span>
                </div>
                <div className="text-xs font-medium text-muted mb-1">Type: {sec.type} • {sec.location}</div>
                <div className="text-xs text-muted">{sec.cause}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Dispatch Mitigations */}
        <div className="card">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-sm flex items-center gap-1">
              <CheckCircle2 size={16} className="text-green" />
              TrainCast Recommended Dispatch Mitigations
            </h3>
            <span className="text-xs text-muted">AI Decision Support</span>
          </div>
          <p className="text-xs text-muted mb-3">
            Optimal controller actions to contain downstream propagation and preserve turnaround:
          </p>

          <div className="flex flex-col gap-3">
            <div className="p-3 bg-main rounded border text-xs">
              <div className="font-bold text-primary-navy mb-1 flex items-center justify-between">
                <span>1. Preempt Loop Line at Morappur</span>
                <span className="text-green font-bold">+8m Recovery</span>
              </div>
              <p className="text-muted mb-2">
                Hold Freight BCN-E on siding loop to grant straight-line green signal to express 12675.
              </p>
              <button className="btn btn-secondary text-xs" style={{ padding: '3px 8px' }}>
                Simulate Override
              </button>
            </div>

            <div className="p-3 bg-main rounded border text-xs">
              <div className="font-bold text-primary-navy mb-1 flex items-center justify-between">
                <span>2. Platform Swap at Erode Jn (ED)</span>
                <span className="text-green font-bold">+12m Recovery</span>
              </div>
              <p className="text-muted mb-2">
                Divert incoming 12608 to Platform 3 to eliminate dwell bottleneck with 12675.
              </p>
              <button className="btn btn-secondary text-xs" style={{ padding: '3px 8px' }}>
                Simulate Override
              </button>
            </div>

            <div className="p-3 bg-main rounded border text-xs">
              <div className="font-bold text-primary-navy mb-1 flex items-center justify-between">
                <span>3. Passenger App ETA Rebroadcast</span>
                <span className="text-purple font-bold">NTES Sync</span>
              </div>
              <p className="text-muted mb-2">
                Proactively broadcast updated ETA to passenger search endpoints to prevent platform crowding.
              </p>
              <button className="btn btn-primary text-xs" style={{ padding: '3px 8px' }}>
                Send Advisory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelayPropagation;
