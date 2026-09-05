// Realistic Southern Railway Station Coordinates
const STATIONS = {
  MAS: { code: 'MAS', name: 'Chennai Central', lat: 13.0827, lng: 80.2707 },
  AJJ: { code: 'AJJ', name: 'Arakkonam', lat: 13.0850, lng: 79.6677 },
  KPD: { code: 'KPD', name: 'Katpadi', lat: 12.9774, lng: 79.1363 },
  JTJ: { code: 'JTJ', name: 'Jolarpettai', lat: 12.5529, lng: 78.5630 },
  SA:  { code: 'SA',  name: 'Salem', lat: 11.6643, lng: 78.1460 },
  ED:  { code: 'ED',  name: 'Erode', lat: 11.3404, lng: 77.7171 },
  TUP: { code: 'TUP', name: 'Tiruppur', lat: 11.1085, lng: 77.3411 },
  CBE: { code: 'CBE', name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
  BWT: { code: 'BWT', name: 'Bangarapet', lat: 12.9918, lng: 78.1887 },
  KJM: { code: 'KJM', name: 'Krishnarajapuram', lat: 13.0039, lng: 77.6830 },
  SBC: { code: 'SBC', name: 'Bengaluru City', lat: 12.9779, lng: 77.5663 },
  MYS: { code: 'MYS', name: 'Mysuru Jn', lat: 12.3166, lng: 76.6496 },
  VM:  { code: 'VM',  name: 'Villupuram', lat: 11.9401, lng: 79.4861 },
  TPJ: { code: 'TPJ', name: 'Tiruchirappalli', lat: 10.7847, lng: 78.6942 },
  MDU: { code: 'MDU', name: 'Madurai', lat: 9.9324, lng: 78.1075 },
  NCJ: { code: 'NCJ', name: 'Nagercoil', lat: 8.1866, lng: 77.4283 },
  PGT: { code: 'PGT', name: 'Palakkad Jn', lat: 10.7867, lng: 76.6548 },
  TVC: { code: 'TVC', name: 'Thiruvananthapuram', lat: 8.4875, lng: 76.9525 }
};

// Map station points into detailed route geometry
const getRouteGeometry = (stationCodes) => {
  return stationCodes.map(code => ({ lat: STATIONS[code].lat, lng: STATIONS[code].lng }));
};

const route_MAS_CBE = ['MAS', 'AJJ', 'KPD', 'JTJ', 'SA', 'ED', 'TUP', 'CBE'];
const route_MAS_SBC = ['MAS', 'AJJ', 'KPD', 'JTJ', 'BWT', 'KJM', 'SBC'];
const route_MAS_MYS = ['MAS', 'AJJ', 'KPD', 'JTJ', 'BWT', 'KJM', 'SBC', 'MYS'];
const route_MAS_NCJ = ['MAS', 'VM', 'TPJ', 'MDU', 'NCJ'];
const route_TVC_MAS = ['TVC', 'PGT', 'CBE', 'ED', 'SA', 'JTJ', 'KPD', 'MAS'];
const route_JTJ_ED  = ['JTJ', 'SA', 'ED'];

let currentTrains = [
  {
    id: "20607",
    number: "20607",
    name: "Vande Bharat Express",
    type: "Vande Bharat",
    division: "MAS",
    locoType: "Trainset 18",
    section: "KPD–JTJ",
    route: "MAS - MYS",
    routeStations: route_MAS_MYS.map(code => STATIONS[code]),
    routeGeometry: getRouteGeometry(route_MAS_MYS),
    status: "On Time",
    currentLocation: "Katpadi Jn (KPD)",
    lastUpdate: new Date().toISOString(),
    delayMinutes: 2,
    nextStation: "Jolarpettai (JTJ)",
    scheduledArrival: "07:50",
    predictedArrival: "07:52",
    predictedArrivalMax: "07:55",
    predictedArrivalMin: "07:49",
    riskLevel: "Low",
    speed: 108,
    completedDistance: 130,
    totalDistance: 500,
    lat: 12.9774,
    lng: 79.1363,
    history: [
      { station: "Chennai Central (MAS)", status: "Departed", delay: 0 },
      { station: "Arakkonam (AJJ)", status: "Departed", delay: 1 }
    ],
    upcoming: [
      { station: "Jolarpettai (JTJ)", scheduled: "07:50", persistence: "07:52", predicted: "07:52" },
      { station: "Bengaluru (SBC)", scheduled: "10:15", persistence: "10:17", predicted: "10:16" },
      { station: "Mysuru Jn (MYS)", scheduled: "12:20", persistence: "12:22", predicted: "12:20" }
    ]
  },
  {
    id: "12675",
    number: "12675",
    name: "Kovai Express",
    type: "Superfast",
    division: "MAS",
    locoType: "WAP-7",
    section: "SA–ED",
    route: "MAS - CBE",
    routeStations: route_MAS_CBE.map(code => STATIONS[code]),
    routeGeometry: getRouteGeometry(route_MAS_CBE),
    status: "Delayed",
    currentLocation: "Salem Jn (SA)",
    lastUpdate: new Date().toISOString(),
    delayMinutes: 18,
    nextStation: "Erode Jn (ED)",
    scheduledArrival: "16:20",
    predictedArrival: "16:38",
    predictedArrivalMax: "16:42",
    predictedArrivalMin: "16:32",
    riskLevel: "Medium",
    speed: 82,
    completedDistance: 330,
    totalDistance: 496,
    lat: 11.6643,
    lng: 78.1460,
    history: [
      { station: "Chennai Central (MAS)", status: "Departed", delay: 0 },
      { station: "Arakkonam (AJJ)", status: "Departed", delay: 5 },
      { station: "Katpadi (KPD)", status: "Departed", delay: 8 },
      { station: "Jolarpettai (JTJ)", status: "Departed", delay: 12 },
      { station: "Salem (SA)", status: "Departed", delay: 18 }
    ],
    upcoming: [
      { station: "Erode (ED)", scheduled: "16:20", persistence: "16:38", predicted: "16:38" },
      { station: "Tiruppur (TUP)", scheduled: "17:05", persistence: "17:23", predicted: "17:28" },
      { station: "Coimbatore (CBE)", scheduled: "18:00", persistence: "18:18", predicted: "18:22" }
    ]
  },
  {
    id: "12607",
    number: "12607",
    name: "Lalbagh Express",
    type: "Express",
    division: "MAS",
    locoType: "WAP-7",
    section: "MAS–AJJ",
    route: "MAS - SBC",
    routeStations: route_MAS_SBC.map(code => STATIONS[code]),
    routeGeometry: getRouteGeometry(route_MAS_SBC),
    status: "On Time",
    currentLocation: "Arakkonam (AJJ)",
    lastUpdate: new Date().toISOString(),
    delayMinutes: 2,
    nextStation: "Katpadi (KPD)",
    scheduledArrival: "16:45",
    predictedArrival: "16:47",
    predictedArrivalMax: "16:50",
    predictedArrivalMin: "16:44",
    riskLevel: "Low",
    speed: 76,
    completedDistance: 70,
    totalDistance: 360,
    lat: 13.0850,
    lng: 79.6677,
    history: [
      { station: "Chennai Central (MAS)", status: "Departed", delay: 0 }
    ],
    upcoming: [
      { station: "Katpadi (KPD)", scheduled: "16:45", persistence: "16:47", predicted: "16:47" },
      { station: "Jolarpettai (JTJ)", scheduled: "17:45", persistence: "17:47", predicted: "17:47" },
      { station: "Bengaluru (SBC)", scheduled: "20:20", persistence: "20:22", predicted: "20:21" }
    ]
  },
  {
    id: "12633",
    number: "12633",
    name: "Kanyakumari Express",
    type: "Superfast",
    division: "TPJ",
    locoType: "WAP-7",
    section: "VM–TPJ",
    route: "MAS - NCJ",
    routeStations: route_MAS_NCJ.map(code => STATIONS[code]),
    routeGeometry: getRouteGeometry(route_MAS_NCJ),
    status: "At Risk",
    currentLocation: "Villupuram (VM)",
    lastUpdate: new Date().toISOString(),
    delayMinutes: 36,
    nextStation: "Trichy (TPJ)",
    scheduledArrival: "19:30",
    predictedArrival: "20:15",
    predictedArrivalMax: "20:30",
    predictedArrivalMin: "20:05",
    riskLevel: "High",
    speed: 61,
    completedDistance: 160,
    totalDistance: 740,
    lat: 11.9401,
    lng: 79.4861,
    history: [
      { station: "Chennai Central (MAS)", status: "Departed", delay: 10 }
    ],
    upcoming: [
      { station: "Trichy (TPJ)", scheduled: "19:30", persistence: "20:06", predicted: "20:15" },
      { station: "Madurai (MDU)", scheduled: "22:00", persistence: "22:36", predicted: "22:45" },
      { station: "Nagercoil (NCJ)", scheduled: "02:30", persistence: "03:06", predicted: "03:20" }
    ]
  },
  {
    id: "12243",
    number: "12243",
    name: "Shatabdi Express",
    type: "Shatabdi",
    division: "MAS",
    locoType: "WAP-7",
    section: "ED–CBE",
    route: "MAS - CBE",
    routeStations: route_MAS_CBE.map(code => STATIONS[code]),
    routeGeometry: getRouteGeometry(route_MAS_CBE),
    status: "On Time",
    currentLocation: "Erode Outer (ED)",
    lastUpdate: new Date().toISOString(),
    delayMinutes: 0,
    nextStation: "Tiruppur (TUP)",
    scheduledArrival: "12:15",
    predictedArrival: "12:11",
    predictedArrivalMax: "12:15",
    predictedArrivalMin: "12:08",
    riskLevel: "Low",
    speed: 94,
    completedDistance: 395,
    totalDistance: 496,
    lat: 11.3404,
    lng: 77.7171,
    history: [
      { station: "Chennai Central (MAS)", status: "Departed", delay: 0 },
      { station: "Katpadi (KPD)", status: "Departed", delay: 2 },
      { station: "Salem (SA)", status: "Departed", delay: 0 }
    ],
    upcoming: [
      { station: "Tiruppur (TUP)", scheduled: "12:15", persistence: "12:15", predicted: "12:11" },
      { station: "Coimbatore (CBE)", scheduled: "13:00", persistence: "13:00", predicted: "12:56" }
    ]
  },
  {
    id: "12624",
    number: "12624",
    name: "Chennai Mail",
    type: "Mail",
    division: "PGT",
    locoType: "WAP-4",
    section: "SA–ED",
    route: "TVC - MAS",
    routeStations: route_TVC_MAS.map(code => STATIONS[code]),
    routeGeometry: getRouteGeometry(route_TVC_MAS),
    status: "Delayed",
    currentLocation: "Erode Jn (ED)",
    lastUpdate: new Date().toISOString(),
    delayMinutes: 9,
    nextStation: "Salem Jn (SA)",
    scheduledArrival: "22:10",
    predictedArrival: "22:19",
    predictedArrivalMax: "22:24",
    predictedArrivalMin: "22:15",
    riskLevel: "Medium",
    speed: 69,
    completedDistance: 420,
    totalDistance: 880,
    lat: 11.3404,
    lng: 77.7171,
    history: [
      { station: "Thiruvananthapuram (TVC)", status: "Departed", delay: 0 },
      { station: "Palakkad (PGT)", status: "Departed", delay: 4 },
      { station: "Coimbatore (CBE)", status: "Departed", delay: 7 }
    ],
    upcoming: [
      { station: "Salem (SA)", scheduled: "22:10", persistence: "22:19", predicted: "22:19" },
      { station: "Katpadi (KPD)", scheduled: "01:30", persistence: "01:39", predicted: "01:37" },
      { station: "Chennai Central (MAS)", scheduled: "04:00", persistence: "04:09", predicted: "04:05" }
    ]
  },
  {
    id: "22625",
    number: "22625",
    name: "Double Decker Express",
    type: "Double Decker",
    division: "MAS",
    locoType: "WAP-7",
    section: "MAS–KPD",
    route: "MAS - SBC",
    routeStations: route_MAS_SBC.map(code => STATIONS[code]),
    routeGeometry: getRouteGeometry(route_MAS_SBC),
    status: "On Time",
    currentLocation: "Arakkonam Jn (AJJ)",
    lastUpdate: new Date().toISOString(),
    delayMinutes: 3,
    nextStation: "Katpadi Jn (KPD)",
    scheduledArrival: "08:40",
    predictedArrival: "08:43",
    predictedArrivalMax: "08:46",
    predictedArrivalMin: "08:40",
    riskLevel: "Low",
    speed: 84,
    completedDistance: 70,
    totalDistance: 360,
    lat: 13.0850,
    lng: 79.6677,
    history: [
      { station: "Chennai Central (MAS)", status: "Departed", delay: 0 }
    ],
    upcoming: [
      { station: "Katpadi (KPD)", scheduled: "08:40", persistence: "08:43", predicted: "08:43" },
      { station: "Jolarpettai (JTJ)", scheduled: "09:40", persistence: "09:43", predicted: "09:42" },
      { station: "Bengaluru (SBC)", scheduled: "12:30", persistence: "12:33", predicted: "12:31" }
    ]
  },
  {
    id: "BCN-E",
    number: "BCN-E",
    name: "Container Freight 44A",
    type: "Freight",
    division: "SA",
    locoType: "WAG-9",
    section: "JTJ–SA",
    route: "JTJ - ED",
    routeStations: route_JTJ_ED.map(code => STATIONS[code]),
    routeGeometry: getRouteGeometry(route_JTJ_ED),
    status: "At Risk",
    currentLocation: "Morappur Siding (SA)",
    lastUpdate: new Date().toISOString(),
    delayMinutes: 55,
    nextStation: "Salem Jn (SA)",
    scheduledArrival: "14:00",
    predictedArrival: "14:55",
    predictedArrivalMax: "15:10",
    predictedArrivalMin: "14:45",
    riskLevel: "High",
    speed: 42,
    completedDistance: 65,
    totalDistance: 180,
    lat: 12.1150,
    lng: 78.4050,
    history: [
      { station: "Jolarpettai Yard (JTJ)", status: "Departed", delay: 25 }
    ],
    upcoming: [
      { station: "Salem (SA)", scheduled: "14:00", persistence: "14:55", predicted: "14:55" },
      { station: "Erode Goods Yard (ED)", scheduled: "16:30", persistence: "17:25", predicted: "17:35" }
    ]
  }
];

export const getMockTrains = () => [...currentTrains];

export const updateMockTrains = (newTrains) => {
  currentTrains = newTrains;
};

export const mockTrains = currentTrains;

export const mockDashboardKPIs = {
  totalTrains: 452,
  onTime: 380,
  delayed: 54,
  atRisk: 18,
  avgDelay: "12m",
  onTimeTrend: "+1.8% vs 1h ago",
  delayedTrend: "-3 trains vs 1h ago",
  atRiskTrend: "+1 train vs 1h ago"
};

// Scientifically grounded simulated division status
export const simulatedDivisions = [
  { code: 'MAS', name: 'Chennai', punctuality: 94, status: 'Healthy', activeCount: 142, alert: 'Normal throughput on MAS-AJJ quadruple corridor' },
  { code: 'SA',  name: 'Salem', punctuality: 88, status: 'Watch', activeCount: 96, alert: 'Section speed restriction 45 km/h near Morappur' },
  { code: 'TPJ', name: 'Tiruchirappalli', punctuality: 82, status: 'Degraded', activeCount: 78, alert: 'Single-line token block congestion VM-TPJ' },
  { code: 'PGT', name: 'Palakkad', punctuality: 91, status: 'Healthy', activeCount: 84, alert: 'Ghat section speed monitored (Palakkad Gap corridor)' }
];

// Real-time simulated operations event feed
export const liveOperationsEvents = [
  { id: 1, time: '02:17:42', train: '12675', section: 'SA–ED', event: 'Entered SA–ED block section (Speed 82 km/h)', type: 'normal' },
  { id: 2, time: '02:17:40', train: '12633', section: 'VM–TPJ', event: 'TrainCast ETA revised +4 min at VM due to platform dwell variance', type: 'warning' },
  { id: 3, time: '02:17:36', train: '20607', section: 'KPD–JTJ', event: 'Vande Bharat recovery trend detected (-2m on high-speed track)', type: 'recovery' },
  { id: 4, time: '02:17:31', train: 'BCN-E', section: 'JTJ Siding', event: 'Freight loop siding hold extended +6 min for express precedence', type: 'hold' },
  { id: 5, time: '02:17:28', train: '12243', section: 'ED–CBE', event: 'Shatabdi delay reduced 3m → 0m (Approaching ED outer)', type: 'recovery' },
  { id: 6, time: '02:17:15', train: '12624', section: 'ED–SA', event: 'Section controller cleared block signal ED-SA Line 1', type: 'normal' }
];

// Operational alerts with realistic replay metadata
export const mockAlerts = [
  { id: 1, severity: "Critical", train: "12633", message: "Unexpected Dwell at Villupuram (VM) - Block Conflict", time: "8 mins ago" },
  { id: 2, severity: "Warning", train: "12675", message: "Section Congestion Ahead (SA-ED) - Precedence Conflict", time: "18 mins ago" },
  { id: 3, severity: "Information", train: "20607", message: "High-speed clearance active on MAS-JTJ corridor", time: "32 mins ago" },
  { id: 4, severity: "Warning", train: "BCN-E", message: "Loop line siding hold extended at Morappur", time: "45 mins ago" }
];

// TRAINCAST System Status (Simulation & Replay Runtime Telemetry)
export const systemStatusData = [
  { name: 'Backend API Gateway', status: 'Operational', detail: 'Spring Boot REST / SSE Emulation', latency: '24ms' },
  { name: 'TrainCast Prediction Engine', status: 'Operational', detail: 'Inference cycle active every 30s', latency: '42ms' },
  { name: 'Replay Simulation Engine', status: 'Running', detail: 'Southern Railway Corridor Replay Feed', latency: '100% sync' },
  { name: 'Map Tile Service', status: 'Operational', detail: 'OpenStreetMap Cartography Layer', latency: 'Active' },
  { name: 'ML Model Runtime', status: 'Loaded', detail: 'XGBoost / GBDT Ensemble (Replay v3.4)', latency: '21ms' },
  { name: 'Telemetry Mode', status: 'Simulation', detail: 'Replay-derived operational telemetry', latency: 'Local' }
];

// Replay Evaluation Benchmark
export const replayModelBenchmark = {
  modelName: 'TrainCast ETA Engine (XGBoost / GBDT Ensemble)',
  status: 'Replay Evaluation Benchmark',
  mae: '4.7 min',
  p95Error: '11.2 min',
  within5Min: '78%',
  within10Min: '93%',
  validationCorridor: 'Southern Railway Corridors (MAS-CBE, MAS-SBC, MAS-NCJ)',
  inferenceLatency: '21 ms'
};
