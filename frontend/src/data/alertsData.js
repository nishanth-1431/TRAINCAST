// Operational and ML Model Alerts Center Data
export const mockOperationalAlerts = [
  {
    id: 'ALT-101',
    timestamp: '02:18:34 IST',
    severity: 'CRITICAL',
    category: 'TRACK_OCCUPANCY',
    entity: '12633 Kanyakumari Express',
    section: 'VM–TPJ',
    division: 'TPJ',
    message: 'Predicted to exceed +45m delay at Vriddhachalam due to single-line block hold',
    recommendedAction: 'Hold freight crossover 44A on loop siding; prioritize green aspect for 12633',
    status: 'ACTIVE',
    acknowledged: false
  },
  {
    id: 'ALT-102',
    timestamp: '02:15:10 IST',
    severity: 'WARNING',
    category: 'CAPACITY_BREACH',
    entity: 'SA–ED Section',
    section: 'SA–ED',
    division: 'SA',
    message: 'Section capacity operating at 88%; secondary delay propagation threshold imminent',
    recommendedAction: 'Implement speed regulation on trailing freight rakes approaching Salem outer',
    status: 'ACTIVE',
    acknowledged: false
  },
  {
    id: 'ALT-103',
    timestamp: '02:11:45 IST',
    severity: 'MODEL',
    category: 'ETA_REVISION',
    entity: '12675 Kovai Express',
    section: 'SA–ED',
    division: 'MAS',
    message: 'TrainCast revised expected arrival at Erode Jn (ED) to 16:38 (+18m variance detected)',
    recommendedAction: 'Rebroadcast revised ETA to passenger timetable feed & Station Master ED',
    status: 'ACTIVE',
    acknowledged: true
  },
  {
    id: 'ALT-104',
    timestamp: '02:08:20 IST',
    severity: 'INFO',
    category: 'RECOVERY_TREND',
    entity: '20607 Vande Bharat Express',
    section: 'KPD–JTJ',
    division: 'MAS',
    message: 'High-speed recovery trend detected (-2 min delay recovered on 130 km/h stretch)',
    recommendedAction: 'Clear automatic signal aspects along straight-line track through Jolarpettai',
    status: 'ACKNOWLEDGED',
    acknowledged: true
  },
  {
    id: 'ALT-105',
    timestamp: '01:58:12 IST',
    severity: 'WARNING',
    category: 'RAKE_TURNAROUND',
    entity: '12676 Return Kovai Express',
    section: 'CBE Terminal',
    division: 'SA',
    message: 'Turnaround buffer compressed to 14 mins (standard allowance: 45 mins)',
    recommendedAction: 'Pre-position terminal maintenance & watering crew on Platform 1 Coimbatore',
    status: 'ACTIVE',
    acknowledged: false
  },
  {
    id: 'ALT-106',
    timestamp: '01:45:00 IST',
    severity: 'INFO',
    category: 'MODEL_CYCLE',
    entity: 'TrainCast Inference Engine',
    section: 'System Core',
    division: 'ALL',
    message: 'Scheduled 30s ML inference cycle executed with 0 convergence anomalies',
    recommendedAction: 'No action required (System nominal)',
    status: 'ACKNOWLEDGED',
    acknowledged: true
  }
];
