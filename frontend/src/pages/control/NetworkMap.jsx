import React, { useEffect, useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { createApiClient } from '../../services/apiClient';
import { LiveNetworkMap } from '../../components/map/LiveNetworkMap';
import { Map, Filter, Navigation, Clock, ShieldAlert, ArrowRight, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import './control.css';

const NetworkMap = () => {
  const { appMode, lastUpdated } = useApp();
  const [trains, setTrains] = useState([]);
  const [selectedTrainId, setSelectedTrainId] = useState('12675');
  const [filterType, setFilterType] = useState('ALL');
  const [loading, setLoading] = useState(true);

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
    if (filterType === 'DELAYED') return t.status === 'Delayed';
    if (filterType === 'AT_RISK') return t.status === 'At Risk' || t.riskLevel === 'High';
    if (filterType === 'EXPRESS') return t.type !== 'Freight';
    if (filterType === 'FREIGHT') return t.type === 'Freight';
    return true;
  });

  const selectedTrain = trains.find(t => t.id === selectedTrainId) || trains[0];

  if (loading) return <div className="p-5 text-muted">Loading network telemetry map...</div>;

  return (
    <div className="network-map-page animate-fade-in-up">
      {/* Top Filter & Control Bar */}
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Map className="text-primary-navy" /> Railway Corridor Network Visualization
          </h1>
          <span className="text-xs text-muted">
            OpenStreetMap Southern Railway track alignment with real-time interpolated train telemetry
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1">
          <Filter size={14} className="text-muted mr-1" />
          {[
            { id: 'ALL', label: 'ALL TRAINS' },
            { id: 'DELAYED', label: 'DELAYED' },
            { id: 'AT_RISK', label: 'AT RISK' },
            { id: 'EXPRESS', label: 'EXPRESS' },
            { id: 'FREIGHT', label: 'FREIGHT' }
          ].map(f => (
            <button
              key={f.id}
              className={`btn text-xs ${filterType === f.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '3px 8px' }}
              onClick={() => setFilterType(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Side Telemetry Panel Grid Layout */}
      <div className="network-map-layout">
        {/* Map Container */}
        <div className="network-map-canvas-card">
          <LiveNetworkMap 
            trains={filteredTrains} 
            selectedTrainId={selectedTrainId} 
            onTrainSelect={setSelectedTrainId} 
            height="100%" 
          />
        </div>

        {/* Side Telemetry Drawer */}
        {selectedTrain && (
          <div className="network-map-drawer">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="type-pill mb-1">{selectedTrain.type || 'Express'}</span>
                  <h3 className="font-bold text-base text-primary-navy m-0">
                    {selectedTrain.number}
                  </h3>
                  <div className="text-xs text-muted font-medium">{selectedTrain.name}</div>
                </div>
                <span className={`badge badge-${selectedTrain.status === 'On Time' ? 'green' : selectedTrain.status === 'At Risk' ? 'red' : 'orange'}`}>
                  {selectedTrain.status}
                </span>
              </div>

              <div className="text-xs font-mono text-muted mb-3 flex items-center gap-1 border-b pb-2">
                <Navigation size={12} /> {selectedTrain.route} ({selectedTrain.division} Div)
              </div>

              {/* Telemetry Metrics */}
              <div className="grid mb-3" style={{ gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div className="p-2 bg-main rounded border text-xs">
                  <div className="text-muted">Track Speed</div>
                  <div className="font-bold text-primary-navy font-mono text-sm mt-1">{selectedTrain.speed} km/h</div>
                </div>

                <div className="p-2 bg-main rounded border text-xs">
                  <div className="text-muted">Current Delay</div>
                  <div className="font-bold text-sm mt-1" style={{ color: selectedTrain.delayMinutes > 20 ? 'var(--status-red)' : selectedTrain.delayMinutes > 5 ? 'var(--status-orange)' : 'var(--status-green)' }}>
                    {selectedTrain.delayMinutes > 0 ? `+${selectedTrain.delayMinutes}m` : '0m'}
                  </div>
                </div>
              </div>

              {/* Station Progression */}
              <div className="p-3 bg-main rounded border text-xs mb-3 flex flex-col gap-2">
                <div>
                  <span className="text-muted">Current Block Section:</span>
                  <div className="font-bold text-primary-navy">{selectedTrain.currentLocation}</div>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-muted">Next Station & ETA:</span>
                  <div className="flex justify-between items-center font-bold">
                    <span>{selectedTrain.nextStation}</span>
                    <span className="text-purple font-mono">{selectedTrain.predictedArrival}</span>
                  </div>
                </div>
                <div className="pt-2 border-t flex justify-between items-center">
                  <span className="text-muted">Risk Score:</span>
                  <span className="badge badge-purple font-mono">
                    {selectedTrain.riskLevel === 'High' ? '86 HIGH' : selectedTrain.riskLevel === 'Medium' ? '54 MED' : '18 LOW'}
                  </span>
                </div>
              </div>

              <div className="text-xs text-muted mb-3">
                💡 <strong>Precedence Alert:</strong> Straight path clearance recommended through next interlock to maintain timetable buffer.
              </div>
            </div>

            <div>
              <Link 
                to={`/control/train/${selectedTrain.id}`} 
                className="btn btn-primary text-xs w-full text-center flex items-center justify-center gap-1"
              >
                Deep Dive Intelligence <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkMap;
