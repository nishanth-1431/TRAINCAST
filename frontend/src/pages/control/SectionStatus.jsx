import React, { useEffect, useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { createApiClient } from '../../services/apiClient';
import { StationRoutePanel } from '../../components/interlocking/StationRoutePanel';
import { GitCommit, Activity, ShieldAlert, CheckCircle2, AlertTriangle, Filter, Search, Layout, Table, Monitor } from 'lucide-react';
import './control.css';

const SectionStatus = () => {
  const { appMode, lastUpdated } = useApp();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [divisionFilter, setDivisionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'vdu' | 'table'
  const [latestInterlockingEvent, setLatestInterlockingEvent] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const api = createApiClient(appMode);
        const data = await api.getBlockSections();
        setSections(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, [appMode, lastUpdated]);

  const filteredSections = sections.filter(sec => {
    if (divisionFilter !== 'All' && sec.division !== divisionFilter) return false;
    if (statusFilter !== 'All' && sec.status !== statusFilter) return false;
    if (searchQuery && 
        !sec.section.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !sec.code.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const healthyCount = sections.filter(s => s.status === 'HEALTHY').length;
  const watchCount = sections.filter(s => s.status === 'WATCH').length;
  const degradedCount = sections.filter(s => s.status === 'DEGRADED').length;

  if (loading) return <div className="p-5 text-muted">Loading block section infrastructure telemetry...</div>;

  return (
    <div className="animate-fade-in-up">
      {/* Top Header & View Mode Switcher */}
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <GitCommit className="text-primary-navy" /> Station Route Interlocking & Section Status
          </h1>
          <span className="text-xs text-muted">
            Station Yard Electronic Interlocking (EI/RRI) Visualization & Block Section Telemetry
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-main p-1 rounded border">
          <button 
            className={`btn text-xs flex items-center gap-1 ${viewMode === 'split' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '3px 8px' }}
            onClick={() => setViewMode('split')}
          >
            <Layout size={12} /> Split View (Both)
          </button>
          <button 
            className={`btn text-xs flex items-center gap-1 ${viewMode === 'vdu' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '3px 8px' }}
            onClick={() => setViewMode('vdu')}
          >
            <Monitor size={12} /> Station Yard VDU
          </button>
          <button 
            className={`btn text-xs flex items-center gap-1 ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '3px 8px' }}
            onClick={() => setViewMode('table')}
          >
            <Table size={12} /> Section Matrix
          </button>
        </div>
      </div>

      {/* Feature 1: Station Yard Electronic Interlocking (EI/RRI) Visual Display Unit Panel */}
      {(viewMode === 'split' || viewMode === 'vdu') && (
        <StationRoutePanel 
          onOperationalEvent={(ev) => setLatestInterlockingEvent(ev)} 
        />
      )}

      {/* Feature 2: Corridor Infrastructure Telemetry Table */}
      {(viewMode === 'split' || viewMode === 'table') && (
        <>
          {/* KPI Summary Strip */}
          <div className="control-kpi-grid mb-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            <div className="control-kpi-card p-3">
              <span className="control-kpi-label">Monitored Sections</span>
              <div className="control-kpi-value text-primary-navy">{sections.length}</div>
              <span className="text-xs text-muted">Trunk Block Corridors</span>
            </div>
            <div className="control-kpi-card kpi-ontime p-3">
              <span className="control-kpi-label text-green">Clear / Healthy</span>
              <div className="control-kpi-value text-green">{healthyCount}</div>
              <span className="text-xs text-muted">Signals Nominal</span>
            </div>
            <div className="control-kpi-card kpi-delayed p-3">
              <span className="control-kpi-label text-orange">Watch Sections</span>
              <div className="control-kpi-value text-orange">{watchCount}</div>
              <span className="text-xs text-muted">Capacity &gt; 75%</span>
            </div>
            <div className="control-kpi-card kpi-risk p-3">
              <span className="control-kpi-label text-red">Degraded Sections</span>
              <div className="control-kpi-value text-red">{degradedCount}</div>
              <span className="text-xs text-muted">Active Block Congestion</span>
            </div>
            <div className="control-kpi-card kpi-avg p-3">
              <span className="control-kpi-label text-purple">Avg Clearance Rate</span>
              <div className="control-kpi-value text-purple">11.4 <span style={{ fontSize: '13px', fontWeight: '500' }}>mins</span></div>
              <span className="text-xs text-muted">Headway Spacing</span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="card mb-3 p-3 flex justify-between items-center gap-3 flex-wrap">
            <div className="flex gap-2 items-center flex-1" style={{ minWidth: '260px' }}>
              <Search size={18} className="text-muted" />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search section (e.g. SA–ED, Katpadi, Villupuram)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-xs text-muted font-bold">Division:</span>
              {['All', 'MAS', 'SA', 'TPJ', 'SBC', 'MDU'].map(div => (
                <button 
                  key={div}
                  className={`btn text-xs ${divisionFilter === div ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '3px 8px' }}
                  onClick={() => setDivisionFilter(div)}
                >
                  {div === 'All' ? 'All' : div}
                </button>
              ))}
            </div>

            <div className="flex gap-2 items-center">
              <Filter size={16} className="text-muted" />
              <select 
                className="form-input text-xs" 
                style={{ width: '130px', padding: '6px 8px' }}
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="HEALTHY">Healthy</option>
                <option value="WATCH">Watch</option>
                <option value="DEGRADED">Degraded</option>
              </select>
            </div>
          </div>

          {/* Section Infrastructure Grid Table */}
          <div className="card p-0" style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Section Code & Route</th>
                  <th>Division</th>
                  <th>Track Configuration</th>
                  <th>Occupancy Gauge</th>
                  <th>Signal State</th>
                  <th>Block Status</th>
                  <th>Avg Clearance</th>
                  <th>Active Trains in Block</th>
                  <th>Capacity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSections.map(sec => {
                  const signalColor = sec.signalState === 'CLEAR' ? '#10b981' : sec.signalState === 'RESTRICTED' ? '#f59e0b' : '#ef4444';
                  const statusBadge = sec.status === 'HEALTHY' ? 'badge-green' : sec.status === 'WATCH' ? 'badge-orange' : 'badge-red';
                  const occColor = sec.occupancyPercent > 80 ? '#ef4444' : sec.occupancyPercent > 60 ? '#f59e0b' : '#10b981';

                  return (
                    <tr key={sec.id}>
                      <td>
                        <div className="font-bold text-primary-navy">{sec.code}</div>
                        <div className="text-xs text-muted">{sec.section}</div>
                        {sec.speedRestriction !== 'None' && (
                          <div className="text-xs text-orange font-medium mt-1">⚠️ {sec.speedRestriction}</div>
                        )}
                      </td>
                      <td>
                        <span className="font-bold text-xs font-mono">{sec.division}</span>
                      </td>
                      <td>
                        <span className="text-xs text-muted">{sec.trackType}</span>
                      </td>
                      <td style={{ minWidth: '130px' }}>
                        <div className="flex justify-between text-xs mb-1 font-mono">
                          <span>{sec.occupancyPercent}%</span>
                          <span className="text-muted">{sec.capacityLimit}</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${sec.occupancyPercent}%`, height: '100%', backgroundColor: occColor, borderRadius: '3px' }}></div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span style={{
                            width: '9px',
                            height: '9px',
                            borderRadius: '50%',
                            backgroundColor: signalColor,
                            boxShadow: `0 0 6px ${signalColor}`,
                            display: 'inline-block'
                          }}></span>
                          <span className="font-bold text-xs font-mono" style={{ color: signalColor }}>
                            {sec.signalState}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-xs font-medium">{sec.blockStatus}</span>
                      </td>
                      <td>
                        <span className="text-xs font-mono">{sec.averageClearance}</span>
                      </td>
                      <td>
                        {sec.activeTrains.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {sec.activeTrains.map((t, idx) => (
                              <span key={idx} className="badge badge-purple text-xs" style={{ width: 'fit-content' }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-muted italic">Clear</span>
                        )}
                      </td>
                      <td>
                        <span className="font-mono text-xs font-bold">{sec.capacityPercent}%</span>
                      </td>
                      <td>
                        <span className={`badge ${statusBadge}`}>
                          {sec.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default SectionStatus;
