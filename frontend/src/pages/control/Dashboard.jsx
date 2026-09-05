import React, { useEffect, useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { createApiClient } from '../../services/apiClient';
import { Activity, ShieldAlert, Train, Radio, Clock, AlertTriangle, ArrowUpRight, CheckCircle2, ChevronRight, Gauge } from 'lucide-react';
import { LiveNetworkMap } from '../../components/map/LiveNetworkMap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import './control.css';

const Dashboard = () => {
  const { appMode, lastUpdated } = useApp();
  const [kpis, setKpis] = useState(null);
  const [trains, setTrains] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const api = createApiClient(appMode);
        const [kpiData, trainData, alertData, divData, eventData] = await Promise.all([
          api.getDashboardKPIs(),
          api.getAllTrains(),
          api.getAlerts(),
          api.getSimulatedDivisions(),
          api.getLiveOperationsEvents()
        ]);
        setKpis(kpiData);
        setTrains(trainData);
        setAlerts(alertData);
        setDivisions(divData);
        setEvents(eventData);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard operational telemetry.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [appMode, lastUpdated]);

  if (loading) return <div className="p-5 text-muted">Loading Railway Operations Control Center...</div>;
  if (error) return <div className="p-4 text-red font-bold">{error}</div>;
  if (!kpis || !trains) return <div className="p-4 text-orange">No telemetry available</div>;

  const delayDistributionData = [
    { name: '0-15m', value: 45, label: 'Normal' },
    { name: '15-30m', value: 25, label: 'Moderate' },
    { name: '30-60m', value: 15, label: 'Significant' },
    { name: '>60m', value: 5, label: 'Severe' },
  ];

  return (
    <div className="dashboard animate-fade-in-up">
      {/* Live Dispatch & Telemetry Ticker */}
      <div className="telemetry-ticker">
        <div className="ticker-label">
          <Radio size={14} className="animate-pulse" />
          Live Dispatch Feed
        </div>
        <div className="ticker-content">
          <span><strong>REPLAY STREAM:</strong> Southern Railway Central Corridor (MAS - JTJ - CBE - SBC)</span>
          <span>•</span>
          <span><strong>Active Dispatch Cycle:</strong> 30s ML Interval</span>
          <span>•</span>
          <span><strong>Latest:</strong> {events[0]?.event || 'All corridors operating within variance bounds'}</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-xl font-bold">Railway Operations Control Center</h1>
          <span className="text-xs text-muted">Replay-Derived Operational Telemetry & Predictive Dispatch Monitor</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="badge badge-green flex items-center gap-1">
            <span className="dot demo-dot" style={{ backgroundColor: '#28a745' }}></span>
            Replay Sync Active
          </span>
          <span className="text-muted">Last sync: {new Date(lastUpdated).toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="control-kpi-grid">
        <div className="control-kpi-card">
          <div className="control-kpi-header">
            <span className="control-kpi-label">Active Trains</span>
            <Train size={18} className="text-primary-navy" />
          </div>
          <div className="control-kpi-value">{kpis.totalTrains}</div>
          <div className="control-kpi-sub">
            <span>8 Monitored Express & Freight</span>
          </div>
        </div>

        <div className="control-kpi-card kpi-ontime">
          <div className="control-kpi-header">
            <span className="control-kpi-label text-green">On Time</span>
            <CheckCircle2 size={18} className="text-green" />
          </div>
          <div className="control-kpi-value text-green">{kpis.onTime}</div>
          <div className="control-kpi-sub text-green">
            <ArrowUpRight size={14} />
            <span>{kpis.onTimeTrend || '+1.8% vs 1h ago'}</span>
          </div>
        </div>

        <div className="control-kpi-card kpi-delayed">
          <div className="control-kpi-header">
            <span className="control-kpi-label text-orange">Delayed (&gt;15m)</span>
            <Clock size={18} className="text-orange" />
          </div>
          <div className="control-kpi-value text-orange">{kpis.delayed}</div>
          <div className="control-kpi-sub text-muted">
            <span>{kpis.delayedTrend || '-3 trains vs 1h ago'}</span>
          </div>
        </div>

        <div className="control-kpi-card kpi-risk">
          <div className="control-kpi-header">
            <span className="control-kpi-label text-red">At-Risk Trains</span>
            <AlertTriangle size={18} className="text-red" />
          </div>
          <div className="control-kpi-value text-red">{kpis.atRisk}</div>
          <div className="control-kpi-sub text-red">
            <span>Critical dispatch precedence</span>
          </div>
        </div>

        <div className="control-kpi-card kpi-avg">
          <div className="control-kpi-header">
            <span className="control-kpi-label text-purple">Average Delay</span>
            <Gauge size={18} className="text-purple" />
          </div>
          <div className="control-kpi-value text-purple">{kpis.avgDelay}</div>
          <div className="control-kpi-sub text-muted">
            <span>Corridor recovery active</span>
          </div>
        </div>
      </div>

      {/* Row 2: Map & Operational Analytics Grid */}
      <div className="dashboard-grid mb-4">
        {/* Live Network Map */}
        <div className="card map-panel">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-bold flex items-center gap-2">
                <Train size={18} className="text-primary-navy" />
                Live Corridor Network Map
              </h3>
              <span className="text-xs text-muted">Real-time route geometry, intermediate stations & train tracking</span>
            </div>
            <Link to="/control/network" className="text-xs text-railway-blue font-bold flex items-center gap-1 hover:underline">
              Fullscreen Telemetry <ChevronRight size={14} />
            </Link>
          </div>
          <LiveNetworkMap trains={trains} selectedTrainId={selectedTrain} onTrainSelect={setSelectedTrain} height="430px" />
        </div>

        {/* Right Operations Panel: Simulated Division Status & Delay Distribution */}
        <div className="flex flex-col gap-3">
          {/* Simulated Division Status */}
          <div className="card">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold">Simulated Division Status</h3>
              <span className="text-xs text-muted">SR Zones</span>
            </div>
            <div className="division-grid">
              {divisions.map(div => (
                <div key={div.code} className="division-item">
                  <div className="division-item-header">
                    <span>{div.name} ({div.code})</span>
                    <span style={{ color: div.punctuality >= 90 ? '#10b981' : div.punctuality >= 85 ? '#f59e0b' : '#ef4444' }}>
                      {div.punctuality}%
                    </span>
                  </div>
                  <div className="division-item-status">
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: div.status === 'Healthy' ? '#10b981' : div.status === 'Watch' ? '#f59e0b' : '#ef4444'
                    }}></span>
                    <span style={{ fontSize: '11px', color: '#475569' }}>{div.status}</span>
                    <span style={{ fontSize: '10px', color: '#94a3b8', marginLeft: 'auto' }}>{div.activeCount} runs</span>
                  </div>
                  <div className="division-item-alert" title={div.alert}>{div.alert}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Delay Distribution Chart */}
          <div className="card" style={{ flex: 1 }}>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-bold">Delay Distribution</h3>
              <span className="text-xs text-muted">Active Runs</span>
            </div>
            <div style={{ height: '170px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={delayDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ fontSize: '12px', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                    formatter={(val, name, item) => [`${val} trains (${item.payload.label})`, 'Volume']}
                  />
                  <Bar dataKey="value" fill="var(--railway-blue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Active Trains Roster Table */}
      <div className="card table-panel mb-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-bold">Active Fleet Operational Roster</h3>
            <span className="text-xs text-muted">Real-time status, block sections, speed, and TrainCast predicted arrival</span>
          </div>
          <Link to="/control/trains" className="btn btn-secondary text-xs">
            Open Train Monitor ({trains.length} Trains)
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '920px' }}>
            <thead>
              <tr>
                <th>Train</th>
                <th>Type</th>
                <th>Division</th>
                <th>Block Section</th>
                <th>Speed</th>
                <th>Delay</th>
                <th>Next Station & ETA</th>
                <th>Risk</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trains.map(t => {
                const isSelected = selectedTrain === t.id;
                const delayColor = t.delayMinutes > 30 ? 'var(--status-red)' : t.delayMinutes > 5 ? 'var(--status-orange)' : 'var(--status-green)';
                const typeClass = t.type === 'Vande Bharat' ? 'vande-bharat' : t.type === 'Shatabdi' ? 'shatabdi' : t.type === 'Freight' ? 'freight' : '';

                return (
                  <tr 
                    key={t.id} 
                    className="transition-all" 
                    style={{ backgroundColor: isSelected ? 'rgba(0, 86, 179, 0.08)' : 'transparent', cursor: 'pointer' }}
                    onClick={() => setSelectedTrain(t.id)}
                  >
                    <td>
                      <div className="font-bold" style={{ color: 'var(--primary-navy)' }}>{t.number}</div>
                      <div className="text-xs text-muted">{t.name}</div>
                    </td>
                    <td>
                      <span className={`type-pill ${typeClass}`}>{t.type || 'Express'}</span>
                    </td>
                    <td>
                      <span className="font-bold text-xs">{t.division || 'MAS'}</span>
                    </td>
                    <td>
                      <span className="text-xs font-mono">{t.section || t.currentLocation}</span>
                    </td>
                    <td>
                      <span className="text-xs font-bold">{t.speed} km/h</span>
                    </td>
                    <td>
                      <span className="font-bold" style={{ color: delayColor }}>
                        {t.delayMinutes < 0 ? `${t.delayMinutes}m (Early)` : t.delayMinutes > 0 ? `+${t.delayMinutes}m` : 'On Time'}
                      </span>
                    </td>
                    <td>
                      <div className="text-xs">{t.nextStation}</div>
                      <div className="text-xs font-bold text-purple">{t.predictedArrival}</div>
                    </td>
                    <td>
                      <span className={`badge badge-${t.riskLevel === 'High' ? 'red' : t.riskLevel === 'Medium' ? 'orange' : 'green'}`}>
                        {t.riskLevel}
                      </span>
                    </td>
                    <td>
                      <Link 
                        to={`/control/train/${t.id}`} 
                        className="btn btn-secondary text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Analyze
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: Live Operations Event Feed & Alerts */}
      <div className="dashboard-grid">
        {/* Operations Event Stream */}
        <div className="card">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Activity size={16} className="text-railway-blue" />
              Live Operations & Telemetry Event Stream
            </h3>
            <span className="text-xs text-muted">Auto-refreshes with simulation clock</span>
          </div>
          <div className="event-feed-list">
            {events.map(ev => (
              <div key={ev.id} className={`event-feed-item event-${ev.type}`}>
                <span className="event-time">{ev.time}</span>
                <span className="event-train">{ev.train}</span>
                <span className="event-desc">{ev.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TRAINCAST System Health */}
        <div className="card">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <ShieldAlert size={16} className="text-green" />
              TRAINCAST System Health
            </h3>
            <Link to="/control/system" className="text-xs text-purple font-medium hover:underline">
              Full Status &rarr;
            </Link>
          </div>
          <p className="text-xs text-muted mb-2">Platform microservices & ML inference runtime status:</p>

          <div className="grid text-xs" style={{ gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { name: 'Prediction Engine', status: 'Operational', latency: '21ms' },
              { name: 'Replay Engine', status: 'Running', latency: 'Active' },
              { name: 'Map Layer (OSM)', status: 'Connected', latency: 'Nominal' },
              { name: 'Data Pipeline', status: 'Synchronized', latency: '02:18:34' },
              { name: 'WebSocket Stream', status: 'Simulated Live', latency: '30s sync' },
              { name: 'Model Service', status: 'XGBoost v3.4', latency: 'Loaded' },
            ].map((s, idx) => (
              <div key={idx} className="p-2 bg-main rounded border flex justify-between items-center">
                <div>
                  <div className="font-bold text-primary-navy">{s.name}</div>
                  <div className="text-muted" style={{ fontSize: '10px' }}>{s.latency}</div>
                </div>
                <span className="badge badge-green text-xs" style={{ padding: '2px 6px' }}>
                  ● {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
