import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import Home from '../pages/public/Home';
import SearchTrain from '../pages/public/SearchTrain';
import PassengerStatus from '../pages/public/PassengerStatus';
import Login from '../pages/auth/Login';
import DemoMode from '../pages/public/DemoMode';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import NotFound from '../pages/public/NotFound';

import Dashboard from '../pages/control/Dashboard';
import TrainMonitor from '../pages/control/TrainMonitor';
import TrainIntelligence from '../pages/control/TrainIntelligence';
import NetworkMap from '../pages/control/NetworkMap';
import DelayPropagation from '../pages/control/DelayPropagation';
import ETAPredictions from '../pages/control/ETAPredictions';
import AtRiskTrains from '../pages/control/AtRiskTrains';
import SystemStatus from '../pages/control/SystemStatus';
import SectionStatus from '../pages/control/SectionStatus';
import PerformanceAnalytics from '../pages/control/PerformanceAnalytics';
import AlertsCenter from '../pages/control/AlertsCenter';
import ReportsDashboard from '../pages/control/ReportsDashboard';
import DataQuality from '../pages/control/DataQuality';
import SettingsPage from '../pages/control/SettingsPage';

import { PublicLayout } from '../components/layout/PublicLayout';
import { ControlRoomLayout } from '../components/layout/ControlRoomLayout';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/search" element={<PublicLayout><SearchTrain /></PublicLayout>} />
      <Route path="/train/:trainId" element={<PublicLayout><PassengerStatus /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/demo" element={<PublicLayout><DemoMode /></PublicLayout>} />
      
      {/* Exposing public versions of control pages for demo purposes if needed, otherwise rely on control room */}
      <Route path="/predictions" element={<PublicLayout><ETAPredictions /></PublicLayout>} />
      <Route path="/network" element={<PublicLayout><NetworkMap /></PublicLayout>} />

      {/* Control Room Routes */}
      <Route path="/control/*" element={
        <ProtectedRoute>
          <ControlRoomLayout showSidebar={true}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="trains" element={<TrainMonitor />} />
              <Route path="network" element={<NetworkMap />} />
              <Route path="sections" element={<SectionStatus />} />
              <Route path="train/:trainId" element={<TrainIntelligence />} />
              <Route path="delay-propagation" element={<DelayPropagation />} />
              <Route path="predictions" element={<ETAPredictions />} />
              <Route path="at-risk" element={<AtRiskTrains />} />
              <Route path="analytics" element={<PerformanceAnalytics />} />
              <Route path="alerts" element={<AlertsCenter />} />
              <Route path="reports" element={<ReportsDashboard />} />
              <Route path="data-quality" element={<DataQuality />} />
              <Route path="system" element={<SystemStatus />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ControlRoomLayout>
        </ProtectedRoute>
      } />
      
      {/* Catch-all 404 */}
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
};
