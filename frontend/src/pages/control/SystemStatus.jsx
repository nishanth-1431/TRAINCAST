import React, { useEffect, useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { createApiClient } from '../../services/apiClient';
import { Server, CheckCircle2, Cpu, Database, Radio, RefreshCw, Layers, ShieldCheck, Activity } from 'lucide-react';
import './control.css';

const SystemStatus = () => {
  const { appMode, lastUpdated } = useApp();
  const [subsystems, setSubsystems] = useState([]);
  const [benchmark, setBenchmark] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const api = createApiClient(appMode);
        const [statusData, benchData] = await Promise.all([
          api.getSystemStatus(),
          api.getModelBenchmark()
        ]);
        setSubsystems(statusData);
        setBenchmark(benchData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [appMode, lastUpdated]);

  if (loading) return <div className="p-5 text-muted">Checking TRAINCAST Subsystem Health...</div>;

  return (
    <div className="system-status animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Server className="text-primary-navy" /> TRAINCAST Platform & Pipeline Status
          </h1>
          <span className="text-xs text-muted">
            Microservices, ML inference pipelines, telemetry gateways, and replay synchronization status
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-green flex items-center gap-1">
            <span className="dot demo-dot" style={{ backgroundColor: '#28a745' }}></span>
            All Subsystems Nominal
          </span>
        </div>
      </div>

      {/* Primary Overview Cards */}
      <div className="control-kpi-grid mb-4">
        <div className="control-kpi-card">
          <div className="control-kpi-header">
            <span className="control-kpi-label">Runtime Mode</span>
            <Radio size={16} className="text-primary-navy" />
          </div>
          <div className="control-kpi-value" style={{ fontSize: '20px' }}>REPLAY / SIMULATION</div>
          <div className="control-kpi-sub">
            <span>SR Corridor Live Replay</span>
          </div>
        </div>

        <div className="control-kpi-card kpi-ontime">
          <div className="control-kpi-header">
            <span className="control-kpi-label text-green">Inference Cycle</span>
            <RefreshCw size={16} className="text-green" />
          </div>
          <div className="control-kpi-value text-green" style={{ fontSize: '24px' }}>Every 30s</div>
          <div className="control-kpi-sub text-green">
            <span>Synchronized batch cycle</span>
          </div>
        </div>

        <div className="control-kpi-card kpi-avg">
          <div className="control-kpi-header">
            <span className="control-kpi-label text-purple">Loaded ML Model</span>
            <Cpu size={16} className="text-purple" />
          </div>
          <div className="control-kpi-value text-purple" style={{ fontSize: '20px' }}>XGBoost Ensemble</div>
          <div className="control-kpi-sub text-muted">
            <span>Replay v3.4 Pipeline</span>
          </div>
        </div>

        <div className="control-kpi-card">
          <div className="control-kpi-header">
            <span className="control-kpi-label">Last Synchronization</span>
            <Activity size={16} className="text-primary-navy" />
          </div>
          <div className="control-kpi-value" style={{ fontSize: '20px' }}>{new Date(lastUpdated).toLocaleTimeString()} IST</div>
          <div className="control-kpi-sub text-muted">
            <span>Telemetry heartbeat active</span>
          </div>
        </div>
      </div>

      {/* Subsystem Health Matrix */}
      <div className="card mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-sm">Core Subsystem Telemetry & Connectivity</h3>
          <span className="text-xs text-muted">6 Services Monitored</span>
        </div>

        <div className="status-grid-matrix">
          {subsystems.map((sub, idx) => (
            <div key={idx} className="status-matrix-card">
              <div>
                <div className="font-bold text-xs text-primary-navy">{sub.name}</div>
                <div className="text-xs text-muted mt-1">{sub.detail}</div>
                <div className="text-xs font-mono text-muted mt-1">Latency: {sub.latency}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="badge badge-green text-xs flex items-center gap-1">
                  <CheckCircle2 size={10} />
                  {sub.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture & Evaluation Boundaries */}
      <div className="dashboard-grid">
        <div className="card">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1">
            <ShieldCheck size={16} className="text-green" />
            Operational Boundaries & Data Provenance (SIH 2026)
          </h3>
          <p className="text-xs text-muted mb-3">
            TRAINCAST is architected with strict boundary separation between operational inputs and predictive machine learning:
          </p>

          <div className="flex flex-col gap-2 text-xs">
            <div className="p-2 bg-main rounded border">
              <strong>1. Operational Input Layer:</strong> Sourced via scheduled timetable and historical Southern Railway replay logs (NTES / COA timetable structures).
            </div>
            <div className="p-2 bg-main rounded border">
              <strong>2. Dynamic Feature Engineering:</strong> Synthesizes headway density, section dwell profiles, and speed variances.
            </div>
            <div className="p-2 bg-main rounded border">
              <strong>3. Explainable Machine Learning:</strong> Computes dynamic ETA predictions and downstream propagation without modifying base signaling or safety systems.
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1">
            <Cpu size={16} className="text-purple" />
            Offline Evaluation Benchmark
          </h3>
          <p className="text-xs text-muted mb-2">
            Replay-derived validation performance on Southern Railway trunk lines:
          </p>

          <div className="p-3 bg-main rounded border flex flex-col gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted">Model Name:</span>
              <span className="font-bold font-mono">{benchmark?.modelName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Validation MAE:</span>
              <span className="font-bold text-green font-mono">{benchmark?.mae}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Predictions within ±5 min:</span>
              <span className="font-bold font-mono">{benchmark?.within5Min}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Predictions within ±10 min:</span>
              <span className="font-bold font-mono">{benchmark?.within10Min}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
