import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { createApiClient } from '../../services/apiClient';
import { Clock, MapPin, Activity, ShieldAlert, Navigation } from 'lucide-react';
import './public.css';
import { LiveNetworkMap } from '../../components/map/LiveNetworkMap';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon issue in react
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PassengerStatus = () => {
  const { trainId } = useParams();
  const { appMode, lastUpdated } = useApp();
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        const api = createApiClient(appMode);
        const data = await api.getTrainById(trainId);
        setTrain(data);
        setError(null);
      } catch (err) {
        setError('Unable to load train status. The train might not exist or the service is down.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrain();
  }, [trainId, appMode, lastUpdated]); // Refetch when lastUpdated changes (simulation step)

  if (loading) return <div className="page-loading">Loading live status...</div>;
  if (error) return <div className="page-error">{error}</div>;
  if (!train) return <div className="page-error">Train not found</div>;

  const statusColor = train.status === 'On Time' ? 'green' : train.status === 'At Risk' ? 'red' : 'orange';

  return (
    <div className="passenger-status-container">
      {/* Header */}
      <div className="train-header-card mb-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xxl font-bold text-primary-navy mb-1">{train.number} - {train.name}</h1>
            <div className="flex items-center gap-2 text-muted">
              <Navigation size={16} />
              <span>{train.route}</span>
            </div>
          </div>
          <div className="text-right">
            <span className={`badge badge-${statusColor} text-lg mb-1`}>{train.status}</span>
            <div className="text-sm text-muted">
              Updated: {new Date(train.lastUpdate).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <div className="status-grid">
        {/* Left Column: Cards */}
        <div className="status-cards-col">
          <div className="card mb-3">
            <h3 className="flex items-center gap-1 mb-2"><MapPin size={18} /> Current Status</h3>
            <div className="status-detail-row">
              <span className="text-muted">Location:</span>
              <span className="font-bold">{train.currentLocation}</span>
            </div>
            <div className="status-detail-row mt-1">
              <span className="text-muted">Delay:</span>
              <span className={`font-bold text-${statusColor}`}>
                {train.delayMinutes > 0 ? `+${train.delayMinutes} mins` : 'On Time'}
              </span>
            </div>
          </div>

          <div className="card mb-3 bg-purple">
            <h3 className="flex items-center gap-1 mb-2 text-purple"><Clock size={18} /> Dynamic ETA</h3>
            <div className="status-detail-row">
              <span className="text-muted">Next Station:</span>
              <span className="font-bold">{train.nextStation}</span>
            </div>
            
            <div className="eta-comparison mt-3">
              <div className="eta-block">
                <span className="text-sm text-muted">Scheduled</span>
                <span className="text-xl line-through">{train.scheduledArrival}</span>
              </div>
              <div className="eta-block highlight">
                <span className="text-sm text-purple font-bold">Predicted</span>
                <span className="text-xxl font-bold text-primary-navy">{train.predictedArrival}</span>
              </div>
            </div>
            
            <div className="confidence-range mt-2 text-center text-sm">
              Expected Range: <strong>{train.predictedArrivalMin} – {train.predictedArrivalMax}</strong>
              <div className="text-xs text-muted mt-1">Prediction interval available</div>
            </div>
          </div>

          <div className="card">
            <h3 className="flex items-center gap-1 mb-2"><Activity size={18} /> Route Progress</h3>
            <div className="passenger-timeline">
              {train.history && train.history.map((s, idx) => (
                <div key={idx} className="timeline-item completed">
                  <div className="timeline-marker">✓</div>
                  <div className="timeline-content">
                    <h4>{s.station}</h4>
                    <p>Departed {s.delay > 0 ? `(+${s.delay}m)` : '(On Time)'}</p>
                  </div>
                </div>
              ))}
              <div className="timeline-item current">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>{train.currentLocation}</h4>
                  <p>Current {train.delayMinutes > 0 ? `(+${train.delayMinutes}m)` : '(On Time)'}</p>
                </div>
              </div>
              {train.upcoming && train.upcoming.map((s, idx) => (
                <div key={idx} className="timeline-item upcoming">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>{s.station}</h4>
                    <p>ETA {s.predicted} (Sch: {s.scheduled})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="status-map-col">
          <div className="card map-card p-0 mb-3" style={{ height: '600px', overflow: 'hidden' }}>
            <LiveNetworkMap trains={[train]} selectedTrainId={train.id} height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerStatus;
