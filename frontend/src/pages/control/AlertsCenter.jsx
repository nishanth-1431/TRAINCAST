import React, { useEffect, useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { createApiClient } from '../../services/apiClient';
import { ShieldAlert, AlertTriangle, CheckCircle2, Info, Cpu, Filter, Search, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import './control.css';

const AlertsCenter = () => {
  const { appMode, lastUpdated } = useApp();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const api = createApiClient(appMode);
        const data = await api.getOperationalAlerts();
        setAlerts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, [appMode, lastUpdated]);

  const handleAcknowledge = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: !a.acknowledged } : a));
  };

  const filteredAlerts = alerts.filter(a => {
    if (severityFilter !== 'ALL' && a.severity !== severityFilter) return false;
    if (searchQuery && 
        !a.message.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !a.entity.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !a.section.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const criticalCount = alerts.filter(a => a.severity === 'CRITICAL' && !a.acknowledged).length;
  const warningCount = alerts.filter(a => a.severity === 'WARNING' && !a.acknowledged).length;
  const modelCount = alerts.filter(a => a.severity === 'MODEL').length;

  if (loading) return <div className="p-5 text-muted">Loading operational alerts...</div>;

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <ShieldAlert className="text-orange" /> Operational Alerts & Notifications Center
          </h1>
          <span className="text-xs text-muted">
            Live exception triage: Track block conflicts, precedence alerts & AI model revision events
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-red">{criticalCount} Unacknowledged Critical</span>
          <span className="badge badge-orange">{warningCount} Warnings</span>
        </div>
      </div>

      {/* Filter and Category Strip */}
      <div className="card mb-3 p-3 flex justify-between items-center gap-3 flex-wrap">
        <div className="flex gap-2 items-center flex-1" style={{ minWidth: '260px' }}>
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search alerts by train, section, or message..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-xs text-muted font-bold">Severity:</span>
          {['ALL', 'CRITICAL', 'WARNING', 'MODEL', 'INFO'].map(sev => (
            <button 
              key={sev}
              className={`btn text-xs ${severityFilter === sev ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '3px 10px' }}
              onClick={() => setSeverityFilter(sev)}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Stream List */}
      <div className="flex flex-col gap-3">
        {filteredAlerts.map(alert => {
          const isCritical = alert.severity === 'CRITICAL';
          const isWarning = alert.severity === 'WARNING';
          const isModel = alert.severity === 'MODEL';
          const badgeClass = isCritical ? 'badge-red' : isWarning ? 'badge-orange' : isModel ? 'badge-purple' : 'badge-green';

          return (
            <div 
              key={alert.id} 
              className="card p-3 transition-all"
              style={{
                borderLeft: `4px solid ${isCritical ? 'var(--status-red)' : isWarning ? 'var(--status-orange)' : isModel ? 'var(--status-purple)' : 'var(--status-green)'}`,
                opacity: alert.acknowledged ? 0.75 : 1
              }}
            >
              <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={`badge ${badgeClass} text-xs font-mono`}>{alert.severity}</span>
                  <span className="font-bold text-sm text-primary-navy">{alert.entity}</span>
                  <span className="text-xs font-mono text-muted">• Section: <strong>{alert.section}</strong> ({alert.division} Division)</span>
                </div>
                <div className="text-xs text-muted font-mono">{alert.timestamp}</div>
              </div>

              <p className="text-xs font-medium text-main mb-2">
                {alert.message}
              </p>

              <div className="p-2 bg-main rounded border text-xs text-muted mb-3 flex items-center justify-between">
                <div>
                  <strong>Recommended Action:</strong> {alert.recommendedAction}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <div className="flex gap-2">
                  {alert.entity.startsWith('12') || alert.entity.startsWith('20') ? (
                    <Link to={`/control/train/${alert.entity.split(' ')[0]}`} className="btn btn-secondary text-xs flex items-center gap-1">
                      View Train <ExternalLink size={12} />
                    </Link>
                  ) : null}
                  <Link to="/control/sections" className="btn btn-secondary text-xs flex items-center gap-1">
                    View Section <ExternalLink size={12} />
                  </Link>
                </div>

                <button 
                  className={`btn ${alert.acknowledged ? 'btn-secondary text-green' : 'btn-primary'} text-xs flex items-center gap-1`}
                  onClick={() => handleAcknowledge(alert.id)}
                >
                  <Check size={14} />
                  {alert.acknowledged ? 'Acknowledged ✓' : 'Acknowledge Alert'}
                </button>
              </div>
            </div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="card text-center p-5 text-muted">
            <CheckCircle2 size={36} className="text-green mb-2 mx-auto" />
            <p className="font-bold">No operational alerts match the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsCenter;
