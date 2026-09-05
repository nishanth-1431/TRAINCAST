import { mockTrains, mockDashboardKPIs, mockAlerts, getMockTrains } from '../data/mockData';

// Simulates network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockService = {
  getDashboardKPIs: async () => {
    await delay();
    return mockDashboardKPIs;
  },

  getAllTrains: async () => {
    await delay();
    return getMockTrains();
  },

  getTrainById: async (id) => {
    await delay(300);
    const train = getMockTrains().find(t => t.id === id);
    if (!train) throw new Error("Train not found");
    return train;
  },

  getAlerts: async () => {
    await delay();
    return mockAlerts;
  },

  getDelayPropagation: async (trainId) => {
    await delay();
    // Return sample propagation data
    return [
      { section: 'Coimbatore - Tiruppur', currentDelay: 0, predictedChange: 3, resultingDelay: 3 },
      { section: 'Tiruppur - Erode', currentDelay: 3, predictedChange: 5, resultingDelay: 8 },
      { section: 'Erode - Salem', currentDelay: 8, predictedChange: -2, resultingDelay: 6 },
      { section: 'Salem - Chennai', currentDelay: 6, predictedChange: 0, resultingDelay: 6 }
    ];
  },

  getSimulatedDivisions: async () => {
    await delay(100);
    const { simulatedDivisions } = await import('../data/mockData');
    return simulatedDivisions;
  },

  getLiveOperationsEvents: async () => {
    await delay(100);
    const { liveOperationsEvents } = await import('../data/mockData');
    return liveOperationsEvents;
  },

  getSystemStatus: async () => {
    await delay(100);
    const { systemStatusData } = await import('../data/mockData');
    return systemStatusData;
  },

  getModelBenchmark: async () => {
    await delay(100);
    const { replayModelBenchmark } = await import('../data/mockData');
    return replayModelBenchmark;
  },

  getBlockSections: async () => {
    await delay(100);
    const { mockBlockSections } = await import('../data/sectionsData');
    return mockBlockSections;
  },

  getAnalyticsData: async () => {
    await delay(100);
    const { mockAnalyticsData } = await import('../data/analyticsData');
    return mockAnalyticsData;
  },

  getOperationalAlerts: async () => {
    await delay(100);
    const { mockOperationalAlerts } = await import('../data/alertsData');
    return mockOperationalAlerts;
  },

  getReports: async () => {
    await delay(100);
    const { mockReportsList } = await import('../data/reportsData');
    return mockReportsList;
  },

  getDataQualityMetrics: async () => {
    await delay(100);
    const { mockDataQualityMetrics } = await import('../data/dataQualityData');
    return mockDataQualityMetrics;
  }
};
