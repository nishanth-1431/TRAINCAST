import React, { useEffect, useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { createApiClient } from '../../services/apiClient';
import { Link } from 'react-router-dom';
import { Search, Filter, Train, Gauge, AlertTriangle, CheckCircle2, Clock, Navigation } from 'lucide-react';
import './control.css';

const TrainMonitor = () => {
  const { appMode, lastUpdated } = useApp();
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [divisionFilter, setDivisionFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const api = createApiClient(appMode);
        const data = await api.getAllTrains();
        setTrains(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrains();
  }, [appMode, lastUpdated]);

  const filteredTrains = trains.filter(t => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (divisionFilter !== 'All' && t.division !== divisionFilter) return false;
    if (searchQuery && 
        !t.number.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !t.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !t.route.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const onTimeCount = trains.filter(t => t.status === 'On Time').length;
  const delayedCount = trains.filter(t => t.status === 'Delayed').length;
  const atRiskCount = trains.filter(t => t.status === 'At Risk').length;
  const avgSpeed = trains.length ? Math.round(trains.reduce((acc, t) => acc + (t.speed || 0), 0) / trains.length) : 0;

  return (
    <div className="train-monitor animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Train className="text-primary-navy" /> Fleet Operational Monitor
          </h1>
          <span className="text-xs text-muted">Real-time corridor telemetry, section block occupancy & dynamic ETA tracking</span>
        </div>
        <div className="text-xs text-muted">
          Updated: {new Date(lastUpdated).toLocaleTimeString()}
        </div>
      </div>

      {/* Summary Telemetry Strip */}
      <div className="control-kpi-grid mb-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
        <div className="control-kpi-card p-3">
          <span className="control-kpi-label">Active Fleet</span>
          <div className="control-kpi-value text-primary-navy">{trains.length}</div>
          <span className="text-xs text-muted">Monitored Runs</span>
        </div>
        <div className="control-kpi-card kpi-ontime p-3">
          <span className="control-kpi-label text-green">On Time Fleet</span>
          <div className="control-kpi-value text-green">{onTimeCount}</div>
          <span className="text-xs text-muted">{Math.round((onTimeCount / (trains.length || 1)) * 100)}% Punctual</span>
        </div>
        <div className="control-kpi-card kpi-delayed p-3">
          <span className="control-kpi-label text-orange">Delayed Runs</span>
          <div className="control-kpi-value text-orange">{delayedCount}</div>
          <span className="text-xs text-muted">Delay &gt; 5m</span>
        </div>
        <div className="control-kpi-card kpi-risk p-3">
          <span className="control-kpi-label text-red">At-Risk Precedence</span>
          <div className="control-kpi-value text-red">{atRiskCount}</div>
          <span className="text-xs text-muted">Priority Dispatch</span>
        </div>
        <div className="control-kpi-card kpi-avg p-3">
          <span className="control-kpi-label text-purple">Avg Network Speed</span>
          <div className="control-kpi-value text-purple">{avgSpeed} <span style={{ fontSize: '14px', fontWeight: '500' }}>km/h</span></div>
          <span className="text-xs text-muted">Corridor Average</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card mb-3 p-3 flex justify-between items-center gap-3 flex-wrap">
        <div className="flex gap-2 items-center flex-1" style={{ minWidth: '280px' }}>
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search by train number, name (e.g. Kovai, Vande Bharat) or route..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Division Filter Pills */}
        <div className="flex gap-2 items-center">
          <span className="text-xs text-muted font-bold">Division:</span>
          {['All', 'MAS', 'SA', 'TPJ', 'PGT'].map(div => (
            <button 
              key={div}
              className={`btn text-xs ${divisionFilter === div ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '4px 10px' }}
              onClick={() => setDivisionFilter(div)}
            >
              {div === 'All' ? 'All Divisions' : div}
            </button>
          ))}
        </div>

        {/* Status Dropdown */}
        <div className="flex gap-2 items-center">
          <Filter size={16} className="text-muted" />
          <select 
            className="form-input text-xs" 
            style={{ width: '130px', padding: '6px 8px' }}
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="On Time">On Time</option>
            <option value="Delayed">Delayed</option>
            <option value="At Risk">At Risk</option>
          </select>
        </div>
      </div>

      {/* High Density Train Roster Table */}
      <div className="card p-0" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Train No. & Name</th>
              <th>Type</th>
              <th>Division</th>
              <th>Block Section</th>
              <th>Loco / Speed</th>
              <th>Current Status</th>
              <th>Accumulated Delay</th>
              <th>Next Station & TrainCast ETA</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" className="text-center p-5 text-muted">Loading fleet telemetry...</td></tr>
            ) : filteredTrains.map(t => {
              const delayColor = t.delayMinutes > 30 ? 'var(--status-red)' : t.delayMinutes > 5 ? 'var(--status-orange)' : 'var(--status-green)';
              const typeClass = t.type === 'Vande Bharat' ? 'vande-bharat' : t.type === 'Shatabdi' ? 'shatabdi' : t.type === 'Freight' ? 'freight' : '';

              return (
                <tr key={t.id}>
                  <td>
                    <div className="font-bold text-primary-navy">{t.number}</div>
                    <div className="text-xs text-muted">{t.name}</div>
                    <div className="text-xs font-mono text-muted">{t.route}</div>
                  </td>
                  <td>
                    <span className={`type-pill ${typeClass}`}>{t.type || 'Express'}</span>
                  </td>
                  <td>
                    <span className="font-bold text-xs">{t.division || 'MAS'}</span>
                  </td>
                  <td>
                    <div className="text-xs font-mono font-bold">{t.section || t.currentLocation}</div>
                    <div className="text-xs text-muted flex items-center gap-1">
                      <Navigation size={10} /> At: {t.currentLocation}
                    </div>
                  </td>
                  <td>
                    <div className="text-xs font-mono">{t.locoType || 'WAP-7'}</div>
                    <div className="text-xs font-bold text-primary-navy">{t.speed} km/h</div>
                  </td>
                  <td>
                    <span className={`badge badge-${t.status === 'On Time' ? 'green' : t.status === 'At Risk' ? 'red' : 'orange'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <span className="font-bold" style={{ color: delayColor }}>
                      {t.delayMinutes < 0 ? `${t.delayMinutes}m (Early)` : t.delayMinutes > 0 ? `+${t.delayMinutes}m` : '0m'}
                    </span>
                  </td>
                  <td>
                    <div className="text-xs font-medium">{t.nextStation}</div>
                    <div className="text-xs">
                      <span className="text-muted line-through mr-1">{t.scheduledArrival}</span>
                      <span className="font-bold text-purple">{t.predictedArrival}</span>
                    </div>
                  </td>
                  <td>
                    <Link to={`/control/train/${t.id}`} className="btn btn-secondary text-xs">
                      Intelligence
                    </Link>
                  </td>
                </tr>
              );
            })}
            {!loading && filteredTrains.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center p-5 text-muted">
                  No trains found matching the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainMonitor;
