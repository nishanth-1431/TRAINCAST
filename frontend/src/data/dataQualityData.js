// Data Quality & Ingestion Governance Metrics (Replay Dataset Integrity)
export const mockDataQualityMetrics = {
  healthScore: '97.2%',
  metrics: [
    { metric: 'Train Timetable Records', value: '98.4%', status: 'Nominal', description: 'Complete arrival/departure timestamps across all monitored stations' },
    { metric: 'Station Code Geocoding', value: '96.2%', status: 'Nominal', description: 'Latitude/longitude mapping resolved for all intermediate halts' },
    { metric: 'Timestamp & Sequence Integrity', value: '99.1%', status: 'Optimal', description: 'Zero monotonic time inversions detected in corridor runs' },
    { metric: 'Missing Delay Attribute Rate', value: '2.3%', status: 'Acceptable', description: 'Unrecorded section delay gracefully imputed via historical distribution' },
    { metric: 'Railway Route Track Coverage', value: '100.0%', status: 'Optimal', description: 'OpenStreetMap railway track alignment verified for Southern Railway corridors' },
    { metric: 'Environmental / Weather Feed', value: '94.0%', status: 'Nominal', description: 'Hourly precipitation & visibility telemetry available' }
  ],
  pipelineLogs: [
    { timestamp: '02:15:00 IST', source: 'Replay Telemetry Loader', status: 'SUCCESS', details: 'Ingested 14,280 section records without schema violation' },
    { timestamp: '02:00:00 IST', source: 'GeoJSON Topology Validator', status: 'SUCCESS', details: 'All 8 Southern Railway route vectors verified with 0 orphan coordinates' },
    { timestamp: '01:45:00 IST', source: 'Imputation Sanitizer', status: 'INFO', details: 'Imputed 4 missing intermediate dwell points using median section padding' },
    { timestamp: '01:30:00 IST', source: 'OSM Railway Track Extractor', status: 'SUCCESS', details: 'Track layer cache synchronized (Zero missing node IDs)' }
  ]
};
