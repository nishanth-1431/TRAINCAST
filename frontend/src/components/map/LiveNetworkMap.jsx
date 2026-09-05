import React, { useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    const timer1 = setTimeout(() => map.invalidateSize(), 150);
    const timer2 = setTimeout(() => map.invalidateSize(), 400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [map]);
  return null;
};

const trainIcon = new L.divIcon({
  html: '<div style="font-size: 20px; line-height: 1; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">🚆</div>',
  className: 'custom-train-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const getStatusColor = (status) => {
  switch(status) {
    case 'On Time': return '#28a745';
    case 'Delayed': return '#fd7e14';
    case 'At Risk': return '#dc3545';
    default: return '#0056b3';
  }
};

export const LiveNetworkMap = ({ trains, selectedTrainId, onTrainSelect, height = '400px' }) => {
  const navigate = useNavigate();

  // Create polylines for each train
  const mapData = useMemo(() => {
    return trains.map(train => {
      const isSelected = selectedTrainId === train.id;
      const isDimmed = selectedTrainId && !isSelected;
      
      const progressRatio = train.completedDistance / train.totalDistance;
      const totalSegments = train.routeGeometry.length - 1;
      const exactIndex = progressRatio * totalSegments;
      const currentSegmentIndex = Math.floor(exactIndex);

      const completedPath = [
        ...train.routeGeometry.slice(0, currentSegmentIndex + 1),
        { lat: train.lat, lng: train.lng }
      ];
      
      const remainingPath = [
        { lat: train.lat, lng: train.lng },
        ...train.routeGeometry.slice(currentSegmentIndex + 1)
      ];

      return {
        ...train,
        isSelected,
        isDimmed,
        completedPath,
        remainingPath
      };
    });
  }, [trains, selectedTrainId]);

  return (
    <div style={{ position: 'relative', height, width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
      {/* Map Control / Legend HUD Overlay */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: 500,
        backgroundColor: 'rgba(10, 25, 47, 0.9)',
        color: '#fff',
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '11px',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        pointerEvents: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#28a745', display: 'inline-block' }}></span>
          <span>On Time</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fd7e14', display: 'inline-block' }}></span>
          <span>Delayed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc3545', display: 'inline-block' }}></span>
          <span>At Risk</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '8px' }}>
          Corridor Replay
        </div>
      </div>

      <MapContainer center={[11.9, 78.5]} zoom={7} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapResizer />
        
        {mapData.map(train => {
          const color = getStatusColor(train.status);
          const opacity = train.isDimmed ? 0.2 : (train.isSelected ? 1 : 0.7);
          const weight = train.isSelected ? 5 : 3;

          return (
            <React.Fragment key={train.id}>
              {/* Completed Path */}
              <Polyline 
                positions={train.completedPath} 
                pathOptions={{ color: '#6c757d', weight: weight - 1, opacity: opacity * 0.7, dashArray: '4, 4' }} 
              />
              {/* Remaining Path */}
              <Polyline 
                positions={train.remainingPath} 
                pathOptions={{ color, weight, opacity }} 
              />
              
              {/* Station Markers */}
              {!train.isDimmed && train.routeStations?.map((station, i) => (
                <CircleMarker 
                  key={`${train.id}-st-${i}`}
                  center={[station.lat, station.lng]}
                  radius={i === 0 || i === train.routeStations.length - 1 ? 5 : 3}
                  pathOptions={{ 
                    color: '#0A192F', 
                    fillColor: i === 0 || i === train.routeStations.length - 1 ? '#fff' : color, 
                    fillOpacity: 1,
                    weight: 2
                  }}
                  eventHandlers={{
                    click: () => onTrainSelect && onTrainSelect(train.id)
                  }}
                >
                  <Popup>
                    <strong>{station.name} ({station.code})</strong>
                  </Popup>
                </CircleMarker>
              ))}

              {/* Train Marker */}
              <Marker 
                position={[train.lat, train.lng]} 
                icon={trainIcon}
                eventHandlers={{
                  click: () => onTrainSelect ? onTrainSelect(train.id) : navigate(`/train/${train.id}`)
                }}
              >
                <Popup>
                  <div style={{ padding: '4px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
                      {train.number} {train.name}
                    </div>
                    <div style={{ color: color, fontWeight: 'bold', marginBottom: '8px' }}>
                      {train.status} {train.delayMinutes > 0 ? `+${train.delayMinutes}m` : ''}
                    </div>
                    <div style={{ fontSize: '12px' }}>
                      <div><strong>Current:</strong> {train.currentLocation}</div>
                      <div><strong>Next:</strong> {train.nextStation}</div>
                      <div><strong>ETA:</strong> {train.predictedArrival}</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};
