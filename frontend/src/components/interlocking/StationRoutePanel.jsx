import React, { useState, useEffect } from 'react';
import { INTERLOCKING_STATIONS } from '../../data/interlocking/stations';
import { getYardDataByStation, executeInterlockingRoute, toggleBerthHold } from '../../data/interlocking/interlockingEngine';
import { Lock, Server, PanelRightClose, PanelRightOpen, X } from 'lucide-react';
import './interlocking.css';

export const StationRoutePanel = ({ onOperationalEvent, simulatedTime }) => {
  const [selectedStation, setSelectedStation] = useState('SA'); 
  const [yardData, setYardData] = useState(getYardDataByStation('SA'));
  
  // Inspector Panel State
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    setYardData(getYardDataByStation(selectedStation));
    setInspectorOpen(false);
    setSelectedElement(null);
  }, [selectedStation]);

  const handleRouteRequest = (routeId) => {
    const result = executeInterlockingRoute(yardData, routeId);
    if (result.success) {
      setYardData(result.updatedYard);
      if (onOperationalEvent) onOperationalEvent(result.event);
      
      // Update inspector if looking at the route
      if (selectedElement && selectedElement.type === 'ROUTE' && selectedElement.data.id === routeId) {
        setSelectedElement({
          type: 'ROUTE',
          data: result.updatedYard.routes.find(r => r.id === routeId)
        });
      }
    }
  };

  const handleToggleHold = (routeId) => {
    const result = toggleBerthHold(yardData, routeId);
    if (result.success) {
      setYardData(result.updatedYard);
      if (onOperationalEvent) onOperationalEvent(result.event);
    }
  };

  const openInspector = (type, data) => {
    setSelectedElement({ type, data });
    setInspectorOpen(true);
  };

  return (
    <div className="vdu-container flex h-[650px] relative bg-[#020617] font-mono">
      
      {/* MAIN VDU WORKSPACE */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${inspectorOpen ? 'mr-[320px]' : ''}`}>
        
        {/* VDU Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-[#0B1324] border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-sm font-bold text-slate-200">STATION YARD — VDU VISUALIZATION</span>
            <span className="text-xs text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded border border-blue-900/50">
              {yardData.stationName}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-green-500 font-bold border border-green-900 bg-green-900/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Lock size={10} /> DEMO CONTROL STATE: ACTIVE
              </span>
              <span className="text-[10px] text-slate-400 font-bold border border-slate-700 bg-slate-800 px-1.5 py-0.5 rounded">
                SIMULATED INTERLOCKING: NORMAL
              </span>
            </div>
            
            <select 
              className="bg-[#1E293B] border border-[#334155] text-white text-xs font-mono px-2 py-1 outline-none hover:border-blue-500 transition-colors"
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
            >
              {INTERLOCKING_STATIONS.map(st => (
                <option key={st.code} value={st.code}>{st.code} — {st.name}</option>
              ))}
            </select>

            <button 
              onClick={() => setInspectorOpen(!inspectorOpen)}
              className="text-slate-400 hover:text-white p-1 bg-[#1E293B] rounded border border-[#334155] transition-colors"
            >
              {inspectorOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
            </button>
          </div>
        </div>

        {/* SVG Canvas Area */}
        <div className="flex-1 relative overflow-auto bg-[#020617]">
          <svg viewBox={yardData.viewBox || '0 0 1200 600'} className="w-full h-full min-h-[400px]">
            <defs>
              <pattern id="vdu-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              </pattern>
              <filter id="neon-glow-green" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="neon-glow-red" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="neon-glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#vdu-grid)" />

            {/* Platforms - Minimal line representations */}
            {yardData.platforms.map(pf => (
              <g key={pf.id} className="cursor-pointer" onClick={() => openInspector('PLATFORM', pf)}>
                <rect x={pf.x} y={pf.y} width={pf.width} height={pf.height} fill="transparent" stroke="#475569" strokeWidth="1" />
                <text x={pf.x + pf.width/2} y={pf.y + pf.height/2 + 3} fill="#64748b" fontSize="10" textAnchor="middle" letterSpacing="1px">
                  {pf.number}
                </text>
              </g>
            ))}

            {/* Track Circuits */}
            {yardData.tracks.map(trk => {
              const isOccupied = trk.isOccupied;
              const isLocked = trk.isRouteLocked;
              const strokeColor = isOccupied ? '#ef4444' : isLocked ? '#eab308' : '#334155';
              const strokeWidth = isOccupied || isLocked ? '3' : '1.5';
              const filter = isOccupied ? 'url(#neon-glow-red)' : isLocked ? 'url(#neon-glow-yellow)' : 'none';

              return (
                <g key={trk.id} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => openInspector('TRACK', trk)}>
                  <line x1={trk.x1} y1={trk.y1} x2={trk.x2} y2={trk.y2} stroke={strokeColor} strokeWidth={strokeWidth} filter={filter} />
                  
                  {trk.label && (
                    <text x={trk.x1 + 10} y={trk.y1 - 5} fill="#475569" fontSize="9">{trk.label}</text>
                  )}

                  {/* Train Marker */}
                  {trk.trainHeadcode && (
                    <g transform={`translate(${(trk.x1+trk.x2)/2 - 25}, ${trk.y1 - 8})`}>
                      <rect width="50" height="16" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" filter="url(#neon-glow-red)" />
                      <text x="25" y="11" fill="#fee2e2" fontSize="9" textAnchor="middle" fontWeight="bold">
                        ◀ {trk.trainHeadcode}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Points (Switches) */}
            {yardData.points && yardData.points.map(pt => (
              <g key={pt.id} transform={`translate(${pt.x}, ${pt.y})`} className="cursor-pointer" onClick={() => openInspector('POINT', pt)}>
                <circle r="4" fill="#1E293B" stroke="#94A3B8" strokeWidth="1" />
                <text x="6" y="3" fill="#64748B" fontSize="8">{pt.name}</text>
                {pt.position === 'REVERSE' && (
                  <path d="M-2,2 L2,-2 M-2,-2 L2,2" stroke="#eab308" strokeWidth="1" />
                )}
              </g>
            ))}

            {/* Signal Heads */}
            {yardData.signals.map(sig => {
              const colorMap = { 'GREEN': '#22c55e', 'YELLOW': '#eab308', 'RED': '#ef4444' };
              const color = colorMap[sig.aspect] || '#ef4444';
              const glow = `url(#neon-glow-${sig.aspect.toLowerCase()})`;

              return (
                <g key={sig.id} transform={`translate(${sig.x}, ${sig.y})`} className="cursor-pointer" onClick={() => openInspector('SIGNAL', sig)}>
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#475569" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="4" fill={color} filter={glow} />
                  <text x="-8" y="-4" fill="#94A3B8" fontSize="8" textAnchor="end">{sig.label}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* RIGHT SIDE INSPECTOR PANEL */}
      <div className={`absolute top-0 right-0 h-full w-[320px] bg-[#0B1324] border-l border-[#1E293B] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-300 flex flex-col ${inspectorOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Inspector Header */}
        <div className="p-3 border-b border-[#1E293B] flex justify-between items-center bg-[#070D19]">
          <span className="text-xs font-bold text-slate-300 tracking-wider">
            {selectedElement ? `${selectedElement.type} INSPECTOR` : 'ROUTE / INTERLOCKING'}
          </span>
          <button onClick={() => { setInspectorOpen(false); setSelectedElement(null); }} className="text-slate-500 hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Dynamic Inspector Content */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          
          {selectedElement ? (
            <div className="space-y-4">
              <div className="bg-[#1E293B]/30 border border-[#334155]/50 p-3 rounded">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Entity ID</span>
                <span className="text-lg text-white font-bold">{selectedElement.data.id || selectedElement.data.name || selectedElement.data.label}</span>
              </div>

              {selectedElement.type === 'SIGNAL' && (
                <>
                  <div className="bg-[#1E293B]/30 border border-[#334155]/50 p-3 rounded">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Current Aspect</span>
                    <div className="flex items-center gap-2 text-white font-bold">
                      <span className={`w-3 h-3 rounded-full shadow-[0_0_8px_currentColor] ${
                        selectedElement.data.aspect === 'GREEN' ? 'bg-green-500 text-green-500' :
                        selectedElement.data.aspect === 'YELLOW' ? 'bg-yellow-500 text-yellow-500' : 'bg-red-500 text-red-500'
                      }`}></span>
                      {selectedElement.data.aspect}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 space-y-2">
                    <div className="flex justify-between border-b border-slate-800 pb-1"><span>Direction:</span> <span>{selectedElement.data.line || 'MAIN'}</span></div>
                    <div className="flex justify-between border-b border-slate-800 pb-1"><span>Type:</span> <span>{selectedElement.data.type || 'HOME'}</span></div>
                    <div className="flex justify-between border-b border-slate-800 pb-1"><span>Route Lock:</span> <span>ACTIVE</span></div>
                    <div className="flex justify-between border-b border-slate-800 pb-1"><span>Simulated State:</span> <span className="text-amber-500">READ ONLY</span></div>
                  </div>
                </>
              )}

              {selectedElement.type === 'POINT' && (
                <>
                  <div className="bg-[#1E293B]/30 border border-[#334155]/50 p-3 rounded">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Commanded Position</span>
                    <span className={`text-sm font-bold ${selectedElement.data.position === 'REVERSE' ? 'text-yellow-500' : 'text-slate-300'}`}>
                      {selectedElement.data.position || 'NORMAL'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 space-y-2">
                    <div className="flex justify-between border-b border-slate-800 pb-1"><span>Lock State:</span> <span>LOCKED</span></div>
                    <div className="flex justify-between border-b border-slate-800 pb-1"><span>Associated Route:</span> <span>{selectedElement.data.route || 'N/A'}</span></div>
                    <div className="flex justify-between pb-1"><span>Simulated State:</span> <span className="text-amber-500">READ ONLY</span></div>
                  </div>
                </>
              )}

              <button 
                onClick={() => setSelectedElement(null)}
                className="w-full mt-4 py-2 bg-[#1E293B] hover:bg-[#334155] text-xs text-white rounded transition-colors"
              >
                Back to Route List
              </button>
            </div>
          ) : (
            // Default Route Panel View
            <div className="space-y-3">
              {yardData.routes.map(r => {
                const isLocked = r.status.includes('LOCKED') || r.status.includes('CLEARED');
                
                return (
                  <div key={r.id} className="bg-[#1E293B]/30 border border-[#334155]/50 p-3 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-xs text-blue-400">{r.id}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border ${
                        isLocked ? 'border-green-800 bg-green-900/30 text-green-500' : 'border-slate-600 bg-slate-800 text-slate-400'
                      }`}>
                        {r.status}
                      </span>
                    </div>
                    
                    <div className="text-[10px] text-slate-300 mb-3 leading-relaxed">
                      {r.name}
                      <br/>
                      <span className="text-slate-500">Path: {r.entrySignal} → {r.exitSignal}</span>
                    </div>

                    <button 
                      className={`w-full py-1.5 text-[10px] font-bold rounded transition-colors ${
                        isLocked ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' : 'bg-blue-600 hover:bg-blue-500 text-white'
                      }`}
                      disabled={isLocked}
                      onClick={() => handleRouteRequest(r.id)}
                    >
                      {isLocked ? 'ROUTE LOCKED ✓' : 'SET & LOCK ROUTE'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default StationRoutePanel;
