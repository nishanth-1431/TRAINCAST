import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Train, Clock, MapPin, Navigation, ArrowRight, ShieldAlert, Sparkles, Filter, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { createApiClient } from '../../services/apiClient';
import './public.css';

const SearchTrain = () => {
  const [query, setQuery] = useState('');
  const [allTrains, setAllTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [selectedType, setSelectedType] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const { appMode } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrains = async () => {
      setLoading(true);
      try {
        const api = createApiClient(appMode);
        const data = await api.getAllTrains();
        // Public passenger portal: only display scheduled passenger trains (exclude internal freight rakes)
        const passengerOnly = data.filter(t => t.type !== 'Freight' && /^\d{5}$/.test(t.number));
        setAllTrains(passengerOnly);
        setFilteredTrains(passengerOnly);
      } catch (err) {
        console.error('Failed to load fleet:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrains();
  }, [appMode]);

  // Live filter as user types or changes filter
  useEffect(() => {
    let results = allTrains;

    if (selectedType !== 'ALL') {
      results = results.filter(t => t.type === selectedType);
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(t => 
        t.number.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.route.toLowerCase().includes(q) ||
        t.currentLocation.toLowerCase().includes(q) ||
        t.nextStation.toLowerCase().includes(q) ||
        t.division?.toLowerCase().includes(q)
      );
    }

    setFilteredTrains(results);
  }, [query, selectedType, allTrains]);

  return (
    <div className="search-page-wrapper animate-fade-in-up">
      {/* Search Header Banner */}
      <div className="search-header-hero">
        <div className="search-header-inner">
          <div className="badge badge-purple mb-2 inline-flex items-center gap-1">
            <Sparkles size={12} /> Live Passenger ETA Forecasting Engine
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Find Your Train & Live Dynamic ETA
          </h1>
          <p className="text-sm text-slate-200 mb-4 max-w-2xl">
            Real-time arrival forecasts powered by machine learning: Unlike static timetables, TrainCast dynamically predicts arrival times by accounting for section recovery and track congestion.
          </p>

          {/* Interactive Search Bar */}
          <div className="search-bar-card">
            <div className="search-input-field">
              <Search className="text-muted" size={20} />
              <input 
                type="text"
                className="search-main-input"
                placeholder="Search by Train No. or Name (e.g. 12675, Kovai Express, 20607, Vande Bharat)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              {query && (
                <button 
                  className="search-clear-btn" 
                  onClick={() => setQuery('')}
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button 
              className="btn btn-primary search-submit-btn"
              onClick={() => {
                if (filteredTrains.length === 1) {
                  navigate(`/train/${filteredTrains[0].id}`);
                }
              }}
            >
              Track Train
            </button>
          </div>
        </div>
      </div>

      {/* Main Results Body - Cleanly separated from Hero */}
      <div className="search-body-container">
        {/* Filter and Count Bar */}
        <div className="fleet-heading-row">
          <div>
            <h2 className="text-xl font-bold text-primary-navy m-0">
              Active Monitored Passenger Fleet ({filteredTrains.length} Trains)
            </h2>
            <div className="text-xs text-muted mt-1">
              Select any train to view real-time route progress, station-by-station dynamic ETA & GPS map tracking
            </div>
          </div>

          {/* Classification Filters */}
          <div className="filter-pills-group">
            {['ALL', 'Vande Bharat', 'Shatabdi', 'Superfast Express', 'Express'].map(type => (
              <button 
                key={type}
                type="button"
                className={`filter-pill-btn ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type === 'ALL' ? 'All Types' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="card text-center p-6 text-muted">
            <Train size={36} className="mx-auto mb-2 text-primary-navy animate-pulse" />
            <p className="font-bold">Fetching Southern Railway corridor telemetry...</p>
          </div>
        )}

        {/* Train Cards Grid */}
        {!loading && filteredTrains.length > 0 && (
          <div className="train-search-grid">
            {filteredTrains.map(train => {
              const delay = train.delayMinutes || 0;
              const statusBadgeClass = train.status === 'On Time' ? 'badge-green' : train.status === 'At Risk' ? 'badge-red' : 'badge-orange';
              const delayText = delay < 0 ? `${Math.abs(delay)}m Early` : delay > 0 ? `+${delay}m Late` : 'On Time';
              const typeClass = train.type === 'Vande Bharat' ? 'vande-bharat' : train.type === 'Shatabdi' ? 'shatabdi' : train.type === 'Freight' ? 'freight' : '';

              return (
                <div 
                  key={train.id} 
                  className="passenger-train-card"
                  onClick={() => navigate(`/train/${train.id}`)}
                >
                  {/* Card Header */}
                  <div className="card-top-row">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xl text-primary-navy font-mono">{train.number}</span>
                        <span className={`type-pill ${typeClass}`}>{train.type || 'Express'}</span>
                      </div>
                      <h3 className="font-bold text-base text-main mt-1">{train.name}</h3>
                    </div>
                    <span className={`badge ${statusBadgeClass} text-xs font-bold`}>
                      {train.status} ({delayText})
                    </span>
                  </div>

                  {/* Route & Corridor */}
                  <div className="route-strip mb-3">
                    <Navigation size={14} className="text-muted flex-shrink-0" />
                    <span className="text-xs font-medium text-muted">
                      {train.route} • Division: <strong>{train.division || 'MAS'}</strong>
                    </span>
                  </div>

                  {/* Current Status Box */}
                  <div className="current-status-box mb-3">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-muted flex items-center gap-1">
                        <MapPin size={12} /> Current Location:
                      </span>
                      <span className="font-bold text-primary-navy">{train.currentLocation}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted">Current Track Speed:</span>
                      <span className="font-mono font-bold text-muted">{train.speed} km/h</span>
                    </div>
                  </div>

                  {/* Dynamic ETA Forecasting Box (The Problem Statement Core) */}
                  <div className="eta-forecast-box mb-3">
                    <div className="text-xs text-purple font-bold mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1"><Clock size={12} /> Next Stop: {train.nextStation}</span>
                      <span className="badge badge-purple text-xs">AI Forecast</span>
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-2 border-t" style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}>
                      <div>
                        <div className="text-xs text-muted">Scheduled Timetable:</div>
                        <div className="text-sm font-mono line-through text-muted">{train.scheduledArrival}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-purple font-bold">Predicted Dynamic ETA:</div>
                        <div className="text-lg font-mono font-bold text-primary-navy">{train.predictedArrival}</div>
                      </div>
                    </div>

                    <div className="text-xs text-muted mt-2 text-center" style={{ fontSize: '11px' }}>
                      Expected Confidence Range: <strong>{train.predictedArrivalMin} – {train.predictedArrivalMax}</strong>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="card-action-row">
                    <button 
                      className="btn btn-primary text-xs w-full flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/train/${train.id}`);
                      }}
                    >
                      Track Live Route & Station ETAs <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty Search Result */}
        {!loading && filteredTrains.length === 0 && (
          <div className="card text-center p-6 text-muted">
            <p className="font-bold text-base mb-1">No trains matching "{query}" found in current Southern Railway corridor.</p>
            <p className="text-xs text-muted mb-3">Try searching for <strong>12675</strong> (Kovai Express), <strong>20607</strong> (Vande Bharat), or <strong>12633</strong> (Kanyakumari Express).</p>
            <button className="btn btn-secondary text-xs" onClick={() => { setQuery(''); setSelectedType('ALL'); }}>
              Reset Filters & Show All Runs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTrain;
