import React from 'react';
import { useSimulation } from '../../hooks/useSimulation';
import { Play, Square, FastForward, RotateCcw } from 'lucide-react';
import './public.css';
import { Link } from 'react-router-dom';

const DemoMode = () => {
  const { isPlaying, play, pause, reset, stepForward, simulationSpeed, setSimulationSpeed, simulatedTrains } = useSimulation();

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Jury Demonstration Mode</h2>
        <p className="text-muted text-sm mt-1">
          This panel controls the global simulation engine. It injects movement and delay events into the offline mock service.
        </p>
      </div>

      <div className="card mb-4 bg-purple-bg" style={{ borderColor: 'var(--status-purple)' }}>
        <h3 className="mb-3 text-purple">Simulation Controls</h3>
        
        <div className="flex gap-3 justify-center mb-4">
          {!isPlaying ? (
            <button className="btn btn-primary" onClick={play}>
              <Play size={18} className="mr-1" /> Play Simulation
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={pause} style={{ borderColor: 'var(--status-orange)', color: 'var(--status-orange)' }}>
              <Square size={18} className="mr-1" /> Pause Simulation
            </button>
          )}
          
          <button className="btn btn-secondary" onClick={stepForward}>
            <FastForward size={18} className="mr-1" /> Step Forward
          </button>
          
          <button className="btn btn-secondary" onClick={reset}>
            <RotateCcw size={18} className="mr-1" /> Reset
          </button>
        </div>

        <div className="flex justify-center items-center gap-2">
          <span className="text-sm font-bold">Speed:</span>
          {[1, 2, 5].map(speed => (
            <button 
              key={speed}
              className={`badge ${simulationSpeed === speed ? 'badge-purple' : 'bg-main border'}`}
              onClick={() => setSimulationSpeed(speed)}
              style={{ cursor: 'pointer' }}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="mb-3">Simulated Trains State</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Train</th>
              <th>Current Delay</th>
              <th>Predicted ETA (Dest)</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {simulatedTrains.map(t => (
              <tr key={t.id}>
                <td className="font-bold">
                  <Link to={`/train/${t.id}`}>{t.number}</Link>
                </td>
                <td className={t.delayMinutes > 0 ? 'text-orange font-bold' : 'text-green'}>
                  {t.delayMinutes > 0 ? `+${t.delayMinutes}m` : '0m'}
                </td>
                <td>{t.predictedArrival}</td>
                <td>
                  <span className={`badge badge-${t.status === 'At Risk' ? 'red' : t.status === 'Delayed' ? 'orange' : 'green'}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-4 p-3 bg-main border rounded text-sm text-muted">
          <strong>Demo Scenario:</strong> Hit play or step forward. Train 12675 will experience an unexpected slowdown, and Train 12633 will worsen. Watch their delay increase, risk status change, and ETAs dynamically update. You can view the impact live on the passenger status page or control room dashboard.
        </div>
      </div>
    </div>
  );
};

export default DemoMode;
