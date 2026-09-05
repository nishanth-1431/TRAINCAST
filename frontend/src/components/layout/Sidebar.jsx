import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Train, 
  Map, 
  GitCommit, 
  Clock, 
  Activity, 
  AlertTriangle, 
  BarChart2, 
  FileText, 
  Database, 
  Server, 
  Settings 
} from 'lucide-react';
import './layout.css';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-heading">Overview</h3>
        <NavLink to="/control/dashboard" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">Operations</h3>
        <NavLink to="/control/trains" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <Train size={18} />
          <span>Train Monitor</span>
        </NavLink>
        <NavLink to="/control/network" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <Map size={18} />
          <span>Network Map</span>
        </NavLink>
        <NavLink to="/control/sections" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <GitCommit size={18} />
          <span>Section & Signal Status</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">Predictions</h3>
        <NavLink to="/control/predictions" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <Clock size={18} />
          <span>ETA Predictions</span>
        </NavLink>
        <NavLink to="/control/delay-propagation" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <Activity size={18} />
          <span>Delay Propagation</span>
        </NavLink>
        <NavLink to="/control/at-risk" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <AlertTriangle size={18} />
          <span>At-Risk Trains</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">Analytics</h3>
        <NavLink to="/control/analytics" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <BarChart2 size={18} />
          <span>Performance Analytics</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">Alerts & Reports</h3>
        <NavLink to="/control/alerts" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <AlertTriangle size={18} />
          <span>Alerts & Notifications</span>
        </NavLink>
        <NavLink to="/control/reports" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <FileText size={18} />
          <span>Reports</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">System</h3>
        <NavLink to="/control/data-quality" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <Database size={18} />
          <span>Data Quality</span>
        </NavLink>
        <NavLink to="/control/system" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <Server size={18} />
          <span>System Status</span>
        </NavLink>
        <NavLink to="/control/settings" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};
