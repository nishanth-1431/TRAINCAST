import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { Settings, Sliders, Map, Bell, RotateCcw, CheckCircle2, Shield } from 'lucide-react';
import './control.css';

const SettingsPage = () => {
  const { appMode, setAppMode } = useApp();
  const [refreshInterval, setRefreshInterval] = useState('30');
  const [animateMap, setAnimateMap] = useState(true);
  const [density, setDensity] = useState('compact');
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    setRefreshInterval('30');
    setAnimateMap(true);
    setDensity('compact');
    setSoundAlerts(false);
    setAppMode('demo');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="animate-fade-in-up" style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Settings className="text-primary-navy" /> Control Room Operations & Demo Settings
          </h1>
          <span className="text-xs text-muted">
            Configure telemetry refresh rates, map visual behaviors, and simulation parameters
          </span>
        </div>
        <button 
          className="btn btn-secondary text-xs flex items-center gap-1"
          onClick={handleReset}
        >
          <RotateCcw size={12} /> Reset Demo Settings
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 mb-4 rounded border text-xs flex items-center gap-2 bg-green-bg text-green border-green">
          <CheckCircle2 size={16} />
          <span>Operational settings updated successfully.</span>
        </div>
      )}

      {/* Setting Section 1: Telemetry & Simulation */}
      <div className="card mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Sliders size={16} className="text-railway-blue" />
          Simulation & Telemetry Cycle
        </h3>

        <div className="flex flex-col gap-3 text-xs">
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <div className="font-bold">ML Prediction Inference Cycle</div>
              <div className="text-muted">Interval at which TrainCast recalculates arrival drift and cascade ripples</div>
            </div>
            <select 
              className="form-input text-xs" 
              style={{ width: '140px' }}
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
            >
              <option value="15">Every 15 seconds</option>
              <option value="30">Every 30 seconds (Default)</option>
              <option value="60">Every 60 seconds</option>
            </select>
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <div className="font-bold">Operational Data Stream Mode</div>
              <div className="text-muted">Switch between Southern Railway Replay dataset and future Spring Boot live feed</div>
            </div>
            <select 
              className="form-input text-xs" 
              style={{ width: '180px' }}
              value={appMode}
              onChange={(e) => setAppMode(e.target.value)}
            >
              <option value="demo">Replay / Simulated Live</option>
              <option value="connected">Live REST Gateway</option>
            </select>
          </div>
        </div>
      </div>

      {/* Setting Section 2: Map & Visual Display */}
      <div className="card mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Map size={16} className="text-railway-blue" />
          Map & Density Preferences
        </h3>

        <div className="flex flex-col gap-3 text-xs">
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <div className="font-bold">Interpolate Live Train Markers</div>
              <div className="text-muted">Smoothly interpolate train icons along actual OpenStreetMap track vectors</div>
            </div>
            <input 
              type="checkbox" 
              checked={animateMap} 
              onChange={(e) => setAnimateMap(e.target.checked)} 
            />
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <div className="font-bold">Table Information Density</div>
              <div className="text-muted">Compact spacing optimizes screen space for high-density railway dispatching</div>
            </div>
            <select 
              className="form-input text-xs" 
              style={{ width: '140px' }}
              value={density}
              onChange={(e) => setDensity(e.target.value)}
            >
              <option value="compact">Compact (Standard)</option>
              <option value="comfortable">Comfortable</option>
            </select>
          </div>

          <div className="flex justify-between items-center py-2">
            <div>
              <div className="font-bold">Audible Dispatch Alert Beeps</div>
              <div className="text-muted">Play alert chime when a train transitions to Critical At-Risk status</div>
            </div>
            <input 
              type="checkbox" 
              checked={soundAlerts} 
              onChange={(e) => setSoundAlerts(e.target.checked)} 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn btn-primary text-xs" onClick={handleSave}>
          Apply Preferences
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
