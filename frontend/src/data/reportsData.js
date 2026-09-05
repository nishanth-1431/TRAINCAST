// Reports Dashboard Data & Client-Side Export Schemas
export const mockReportsList = [
  {
    id: 'REP-001',
    title: 'Daily Southern Railway Punctuality Audit',
    category: 'Daily Network Performance',
    date: '2026-09-03',
    division: 'All SR Divisions',
    trainsCount: 452,
    avgDelay: '12.4 mins',
    onTimeRate: '88.6%',
    status: 'Ready'
  },
  {
    id: 'REP-002',
    title: 'Peak Hour Delay Propagation Analysis',
    category: 'Train Delay Summary',
    date: '2026-09-03',
    division: 'Salem (SA) & MAS',
    trainsCount: 124,
    avgDelay: '18.2 mins',
    onTimeRate: '79.2%',
    status: 'Ready'
  },
  {
    id: 'REP-003',
    title: 'TrainCast ML vs Static Timetable Benchmark',
    category: 'ETA Prediction Accuracy',
    date: '2026-09-02',
    division: 'All SR Divisions',
    trainsCount: 452,
    avgDelay: '4.7 mins (MAE)',
    onTimeRate: '94.2% (±5m)',
    status: 'Ready'
  },
  {
    id: 'REP-004',
    title: 'At-Risk Precedence Intervention Report',
    category: 'At-Risk Train Summary',
    date: '2026-09-02',
    division: 'Trichy (TPJ)',
    trainsCount: 38,
    avgDelay: '34.5 mins',
    onTimeRate: '68.0%',
    status: 'Ready'
  },
  {
    id: 'REP-005',
    title: 'Trunk Block Section Bottleneck Assessment',
    category: 'Section Performance',
    date: '2026-09-01',
    division: 'Salem (SA)',
    trainsCount: 84,
    avgDelay: '16.0 mins',
    onTimeRate: '82.5%',
    status: 'Ready'
  }
];

export const generateSampleCsv = (report) => {
  const headers = "Train Number,Train Name,Division,Section,Scheduled Arrival,Predicted Arrival,Variance (Mins),Status\n";
  const rows = [
    "20607,Vande Bharat Express,MAS,KPD-JTJ,07:50,07:52,+2,On Time",
    "12675,Kovai Express,MAS,SA-ED,16:20,16:38,+18,Delayed",
    "12607,Lalbagh Express,MAS,MAS-AJJ,16:45,16:47,+2,On Time",
    "12633,Kanyakumari Express,TPJ,VM-TPJ,19:30,20:15,+45,At Risk",
    "12243,Shatabdi Express,MAS,ED-CBE,12:15,12:11,-4,On Time",
    "12624,Chennai Mail,PGT,SA-ED,22:10,22:19,+9,Delayed",
    "22625,Double Decker Express,MAS,MAS-KPD,08:40,08:43,+3,On Time",
    "BCN-E,Container Freight 44A,SA,JTJ-SA,14:00,14:55,+55,At Risk"
  ].join("\n");
  return headers + rows;
};
