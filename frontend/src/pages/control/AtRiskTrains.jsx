import React, { useState, useEffect } from 'react';
import { useApp } from '../../hooks/useApp';
import { createApiClient } from '../../services/apiClient';
import { AlertTriangle, Activity, CheckCircle, Clock, ShieldAlert, ArrowRight, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import './control.css';

const AtRiskTrains = () => {
  const { appMode, lastUpdated } = useApp();
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const api = createApiClient(appMode);
        const trainData = await api.getAllTrains();
        setTrains(trainData.filter(t => t.riskLevel === 'High' || t.riskLevel === 'Medium'));
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load at-risk operational telemetry.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [appMode, lastUpdated]);

  if (loading) return <div className="p-5 text-muted">Loading at-risk train triage queue...</div>;
  if (error) return <div className="p-4 text-red font-bold">{error}</div>;

  const highRiskCount = trains.filter(t => t.riskLevel === 'High').length;
  const mediumRiskCount = trains.filter(t => t.riskLevel === 'Medium').length;

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="text-red" /> At-Risk Priority Dispatch Queue
          </h1>
          <span className="text-xs text-muted">
            Operational triage queue for trains exceeding tolerance thresholds or causing secondary downstream impact
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-red">{highRiskCount} Critical</span>
          <span className="badge badge-orange">{mediumRiskCount} Watch</span>
        </div>
      </div>

      {/* Grid of At-Risk Trains */}
      <div className="dashboard-grid">
        {trains.length === 0 ? (
          <div className="card text-center p-5 text-muted" style={{ gridColumn: 'span 2' }}>
            <CheckCircle size={48} className="text-green mb-2 mx-auto" />
            <p className="font-bold">No trains currently exceed risk thresholds.</p>
            <span className="text-xs text-muted">All active corridor runs operating within standard timetable margins.</span>
          </div>
        ) : (
          trains.sort((a,b) => b.delayMinutes - a.delayMinutes).map(train => (
            <div key={train.id} className="card">
              {/* Header */}
              <div className="flex justify-between items-center mb-3 pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-primary-navy m-0 text-base">{train.number} - {train.name}</h3>
                    <span className="type-pill">{train.type || 'Express'}</span>
                  </div>
                  <div className="text-xs text-muted mt-1 flex items-center gap-1 font-mono">
                    <Navigation size={12} /> {train.route} • Division: <strong>{train.division || 'MAS'}</strong>
                  </div>
                </div>
                <div className={`badge badge-${train.riskLevel === 'High' ? 'red' : 'orange'}`}>
                  {train.riskLevel} Priority
                </div>
              </div>
              
              {/* Telemetry Row */}
              <div className="grid mb-3 text-xs" style={{ gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div className="p-2 bg-main rounded border">
                  <div className="text-muted">Current Location & Speed</div>
                  <div className="font-bold text-primary-navy mt-1">{train.currentLocation}</div>
                  <div className="text-muted font-mono">{train.speed} km/h (Track Speed)</div>
                </div>
                <div className="p-2 bg-main rounded border">
                  <div className="text-muted">Accumulated Delay</div>
                  <div className="font-bold text-red text-base mt-1">+{train.delayMinutes} mins</div>
                  <div className="text-muted">Next: {train.nextStation}</div>
                </div>
              </div>

              {/* Recommended Dispatch Actions */}
              <div className="bg-main p-3 rounded mb-3 text-xs border">
                <div className="font-bold mb-2 flex items-center gap-1 text-primary-navy">
                  <Activity size={14} className="text-purple" /> 
                  TrainCast Dispatch Mitigations
                </div>
                <ul className="text-muted flex flex-col gap-1" style={{ paddingLeft: '16px', margin: 0 }}>
                  {train.id === '12633' && (
                    <>
                      <li>Priority clearance on Villupuram - Trichy single-line token block.</li>
                      <li>Hold freight crossover at Vriddhachalam to avoid +15m cascading delay.</li>
                    </>
                  )}
                  {train.id === 'BCN-E' && (
                    <>
                      <li>Extend siding hold on Morappur loop line to allow Kovai Express precedence.</li>
                      <li>Estimated release window: 15:10 IST once block section clears.</li>
                    </>
                  )}
                  {train.id === '12675' && (
                    <>
                      <li>Advance straight-line route setting at Erode Jn (ED) Platform 2.</li>
                      <li>Predicted section recovery: -4m on straight stretch to Tiruppur.</li>
                    </>
                  )}
                  {train.id === '12624' && (
                    <>
                      <li>Monitor Palakkad Gap weather caution order.</li>
                      <li>Maintain 75 km/h target speed to recover 3 min buffer before Salem.</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="flex gap-2">
                <Link to={`/control/train/${train.id}`} className="btn btn-primary text-xs flex-1 text-center">
                  Deep Dive Intelligence
                </Link>
                <Link to="/control/delay_propagation" className="btn btn-secondary text-xs">
                  Simulate Ripple
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AtRiskTrains;
