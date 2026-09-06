import { useState, useEffect, useRef } from 'react';

const INITIAL_EVENTS = [
  {
    id: 'EV-INIT-0',
    time: new Date().toLocaleTimeString('en-IN', { hour12: false }),
    source: 'SYSTEM',
    feedMessage: 'SIMULATED OPERATIONAL ENVIRONMENT INITIALIZED.',
    traincastResponse: 'Awaiting events...'
  }
];

const BASE_SECTIONS = [
  { id: 'S1', code: 'SA–ED', section: 'Salem – Erode', status: 'HEALTHY', occupancyPercent: 42, averageClearance: '12m', activeTrains: ['12675 KOVAI'], capacityLimit: 4 },
  { id: 'S2', code: 'ED–TUP', section: 'Erode – Tiruppur', status: 'HEALTHY', occupancyPercent: 25, averageClearance: '14m', activeTrains: [], capacityLimit: 4 },
  { id: 'S3', code: 'TUP–CBE', section: 'Tiruppur – Coimbatore', status: 'HEALTHY', occupancyPercent: 30, averageClearance: '11m', activeTrains: ['12624 MAIL'], capacityLimit: 5 },
  { id: 'S4', code: 'VM–TPJ', section: 'Villupuram – Trichy', status: 'WATCH', occupancyPercent: 78, averageClearance: '18m', activeTrains: ['12633 KANYAKUMARI'], capacityLimit: 3 },
  { id: 'S5', code: 'KPD–JTJ', section: 'Katpadi – Jolarpettai', status: 'HEALTHY', occupancyPercent: 55, averageClearance: '9m', activeTrains: ['20607 VANDE'], capacityLimit: 6 }
];

export const useSimulationEngine = () => {
  const [clock, setClock] = useState(new Date());
  const [scenario, setScenario] = useState('NORMAL OPERATIONS');
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [sections, setSections] = useState(BASE_SECTIONS);
  const [simulationActive, setSimulationActive] = useState(true);
  
  // Specific intelligence state tracking for the primary train (12675 KOVAI EXP)
  const [intelligenceState, setIntelligenceState] = useState({
    train: '12675 KOVAI EXPRESS',
    location: 'SALEM JUNCTION',
    scheduledArrival: '22:13',
    currentDelay: '+2 min',
    predictedArrival: '22:15',
    predictionDelta: '+2 min',
    confidence: '94%',
    
    // Delay propagation chain
    propagation: [
      { node: 'CURRENT', val: '+2m' },
      { node: 'SA–ED', val: '+2m' },
      { node: 'ED–TUP', val: '+1m' },
      { node: 'TUP–CBE', val: '+1m' },
      { node: 'CBE ARRIVAL', val: '+0m (Recovered)' }
    ],
    
    // XAI feature weights
    reasoning: [
      { feature: 'Current delay', weight: '+2.0m' },
      { feature: 'Section running time', weight: '+0.5m' },
      { feature: 'Historical pattern', weight: '+0.5m' },
      { feature: 'Station dwell', weight: '-1.0m' },
      { feature: 'Recovery tendency', weight: '-2.0m' }
    ]
  });

  // Master simulation loop
  useEffect(() => {
    if (!simulationActive) return;

    const interval = setInterval(() => {
      setClock(new Date());
      
      // In a "Normal" scenario, slowly fluctuate occupancy
      if (scenario === 'NORMAL OPERATIONS') {
        setSections(prev => prev.map(s => {
          if (s.id === 'S1') {
            const newOcc = Math.max(20, Math.min(80, s.occupancyPercent + (Math.random() > 0.5 ? 2 : -2)));
            return { ...s, occupancyPercent: newOcc, status: newOcc > 75 ? 'WATCH' : 'HEALTHY' };
          }
          return s;
        }));
      }
      
    }, 5000); // Tick every 5s

    return () => clearInterval(interval);
  }, [simulationActive, scenario]);

  // Scenario Trigger Logic
  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour12: false });
    
    if (scenario === 'SIGNAL HOLD') {
      // Inject major delay
      setSections(prev => prev.map(s => {
        if (s.code === 'SA–ED') return { ...s, occupancyPercent: 88, status: 'DEGRADED', averageClearance: '24m' };
        if (s.code === 'ED–TUP') return { ...s, occupancyPercent: 15, status: 'HEALTHY' }; // Starved downstream
        return s;
      }));

      setIntelligenceState({
        train: '12675 KOVAI EXPRESS',
        location: 'SALEM JUNCTION (HELD)',
        scheduledArrival: '22:13',
        currentDelay: '+18 min',
        predictedArrival: '22:31',
        predictionDelta: '+18 min',
        confidence: '87%',
        propagation: [
          { node: 'CURRENT (SA)', val: '+18m' },
          { node: 'SA–ED', val: '+18m', cascade: true },
          { node: 'ED–TUP', val: '+15m', cascade: true },
          { node: 'TUP–CBE', val: '+12m', cascade: true },
          { node: 'CBE ARRIVAL', val: '+11m', cascade: true }
        ],
        reasoning: [
          { feature: 'Current delay', weight: '+11.2m' },
          { feature: 'Section running time', weight: '+3.8m' },
          { feature: 'Historical pattern', weight: '+2.6m' },
          { feature: 'Station dwell', weight: '+1.7m' },
          { feature: 'Downstream load', weight: '+1.4m' },
          { feature: 'Recovery tendency', weight: '-2.1m' }
        ]
      });

      setEvents(prev => [
        {
          id: `EV-${Date.now()}`,
          time: timeStr,
          source: 'REPLAY ENGINE',
          feedMessage: 'SIMULATED OPERATIONAL EVENT: 12675 HELD at Salem Junction. Section SA-ED occupancy critical (88%).',
          traincastResponse: 'Downstream ETA recalculation triggered. CBE arrival predicted +11m.'
        },
        ...prev
      ].slice(0, 15));

    } else if (scenario === 'NORMAL OPERATIONS') {
      // Reset to nominal
      setSections(BASE_SECTIONS);
      setIntelligenceState({
        train: '12675 KOVAI EXPRESS',
        location: 'SALEM JUNCTION',
        scheduledArrival: '22:13',
        currentDelay: '+2 min',
        predictedArrival: '22:15',
        predictionDelta: '+2 min',
        confidence: '94%',
        propagation: [
          { node: 'CURRENT', val: '+2m' },
          { node: 'SA–ED', val: '+2m' },
          { node: 'ED–TUP', val: '+1m' },
          { node: 'TUP–CBE', val: '+1m' },
          { node: 'CBE ARRIVAL', val: '+0m' }
        ],
        reasoning: [
          { feature: 'Current delay', weight: '+2.0m' },
          { feature: 'Section running time', weight: '+0.5m' },
          { feature: 'Historical pattern', weight: '+0.5m' },
          { feature: 'Station dwell', weight: '-1.0m' },
          { feature: 'Recovery tendency', weight: '-2.0m' }
        ]
      });
      
      setEvents(prev => [
        {
          id: `EV-${Date.now()}`,
          time: timeStr,
          source: 'REPLAY ENGINE',
          feedMessage: 'SIMULATED SCENARIO CHANGE: Normal Operations resumed.',
          traincastResponse: 'ETA stabilized.'
        },
        ...prev
      ].slice(0, 15));
    } else if (scenario === 'RECOVERY') {
       // Recovery scenario
       setSections(prev => prev.map(s => {
        if (s.code === 'SA–ED') return { ...s, occupancyPercent: 60, status: 'HEALTHY', averageClearance: '10m' };
        return s;
      }));
      
      setIntelligenceState({
        train: '12675 KOVAI EXPRESS',
        location: 'SA-ED SECTION',
        scheduledArrival: '22:13',
        currentDelay: '+12 min',
        predictedArrival: '22:18',
        predictionDelta: '+5 min',
        confidence: '82%',
        propagation: [
          { node: 'CURRENT (SA-ED)', val: '+12m' },
          { node: 'ED–TUP', val: '+8m', cascade: true },
          { node: 'TUP–CBE', val: '+6m', cascade: true },
          { node: 'CBE ARRIVAL', val: '+5m', cascade: true }
        ],
        reasoning: [
          { feature: 'Current delay', weight: '+12.0m' },
          { feature: 'Historical pattern', weight: '-2.5m' },
          { feature: 'Aggressive recovery', weight: '-4.5m' },
        ]
      });

      setEvents(prev => [
        {
          id: `EV-${Date.now()}`,
          time: timeStr,
          source: 'REPLAY ENGINE',
          feedMessage: 'SIMULATED OPERATIONAL EVENT: 12675 cleared SA-ED section. Aggressive recovery detected.',
          traincastResponse: 'ETA recalculation triggered. Delay cascading reduced.'
        },
        ...prev
      ].slice(0, 15));
    }
  }, [scenario]);

  const changeScenario = (newScenario) => {
    setScenario(newScenario);
  };

  const addEvent = (ev) => {
    setEvents(prev => [ev, ...prev].slice(0, 15));
  };

  return {
    clock,
    scenario,
    sections,
    events,
    intelligenceState,
    changeScenario,
    addEvent,
    setSimulationActive
  };
};
