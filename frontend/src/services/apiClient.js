import { mockService } from './mockService';

// API Client that switches between real backend and mock based on AppMode
// In a real implementation, it would use axios instance to call Spring Boot APIs.

export const createApiClient = (appMode) => {
  const isDemo = appMode === 'demo';

  return {
    getDashboardKPIs: () => {
      if (isDemo) return mockService.getDashboardKPIs();
      return fetch('/api/dashboard').then(r => r.json()); // Example abstraction
    },
    getAllTrains: () => {
      if (isDemo) return mockService.getAllTrains();
      return fetch('/api/trains').then(r => r.json());
    },
    getTrainById: (id) => {
      if (isDemo) return mockService.getTrainById(id);
      return fetch(`/api/trains/${id}`).then(r => r.json());
    },
    getAlerts: () => {
      if (isDemo) return mockService.getAlerts();
      return fetch('/api/alerts').then(r => r.json());
    },
    getDelayPropagation: (trainId) => {
      if (isDemo) return mockService.getDelayPropagation(trainId);
      return fetch(`/api/delay-flow?trainId=${trainId}`).then(r => r.json());
    },
    getSimulatedDivisions: () => {
      if (isDemo) return mockService.getSimulatedDivisions();
      return fetch('/api/divisions').then(r => r.json());
    },
    getLiveOperationsEvents: () => {
      if (isDemo) return mockService.getLiveOperationsEvents();
      return fetch('/api/operations-events').then(r => r.json());
    },
    getSystemStatus: () => {
      if (isDemo) return mockService.getSystemStatus();
      return fetch('/api/system-status').then(r => r.json());
    },
    getModelBenchmark: () => {
      if (isDemo) return mockService.getModelBenchmark();
      return fetch('/api/model-benchmark').then(r => r.json());
    },
    getBlockSections: () => {
      if (isDemo) return mockService.getBlockSections();
      return fetch('/api/sections').then(r => r.json());
    },
    getAnalyticsData: () => {
      if (isDemo) return mockService.getAnalyticsData();
      return fetch('/api/analytics').then(r => r.json());
    },
    getOperationalAlerts: () => {
      if (isDemo) return mockService.getOperationalAlerts();
      return fetch('/api/alerts').then(r => r.json());
    },
    getReports: () => {
      if (isDemo) return mockService.getReports();
      return fetch('/api/reports').then(r => r.json());
    },
    getDataQualityMetrics: () => {
      if (isDemo) return mockService.getDataQualityMetrics();
      return fetch('/api/data-quality').then(r => r.json());
    }
  };
};
